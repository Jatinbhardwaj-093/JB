const e=`# Bootstrap Estimator in pgmpy: From Mentorship Discussions to Production Implementation

During my mentorship with **pgmpy** under [**Ankur Ankan**](https://github.com/ankurankan), I worked on designing and implementing a non-parametric **\`BootstrapEstimator\`** for causal discovery. 

Causal discovery algorithms often produce a single estimated graph from observational data. But in practical applications, observational data is noisy and limited, meaning slight variations in the dataset can yield starkly different graph topologies. 

This post documents the architectural choices, weekly design discussions, technical challenges (like cycle resolution in PDAGs), and a complete practical usability guide for the new estimator.

---

### The Problem: Structural Uncertainty & Sensitivity

When learning Directed Acyclic Graphs (DAGs) or Partial DAGs (PDAGs) using algorithms like \`PC\` or \`HillClimbSearch\`:

1. **Sample Variability**: Minor noise or small sample sizes can drastically alter edge presence and orientation.
2. **Markov Equivalence**: Multiple graphs often explain observed conditional independencies equally well.
3. **No Confidence Metrics**: A single point-estimate graph provides no indication of whether an edge is solidly supported or an artifact of sample variance.

A key insight discussed early in the mentorship was the asymmetry between **False Positives** and **False Negatives**:

> **Why False Negatives Hurt More than False Positives in Causal Discovery**  
> A fully connected DAG can represent *any* probability distribution without constraint. However, removing an edge introduces a strict conditional independence constraint, restricting the family of distributions the model can represent. Therefore, erroneously removing an edge (False Negative) restricts your model far more severely than accidentally including an edge (False Positive).

To address this, non-parametric bootstrapping is used, inspired by the seminal work of [Friedman et al. (1999)](https://arxiv.org/pdf/1301.6695), to measure edge confidence, detect robust features, and quantify structural stability under repeated resampling.

---

### Week-by-Week Evolution & Key Decisions

#### Week 0: Scoping & Terminology
- **Non-Parametric vs. Parametric**: I initially explored both parametric and non-parametric bootstrapping approaches. However, after discussing with my mentor, we decided to focus for now strictly on non-parametric resampling with replacement (\`sample_frac * N\`), as it is model-agnostic and relies on fewer distribution assumptions.
- **"Summarizing" vs. "Scoring"**: Rather than treating graph aggregation as a "scoring" process, we framed it as **summarization**, separating how samples are collected from how the consensus graph is constructed.

#### Week 1: Clean Separation of Responsibilities
- Initially, I considered a multi-class design with separate classes for bootstrapping and summary statistics (\`bootstrap_results\`).
- After review, we realized the \`fit()\` method was taking on too many disparate roles. We streamlined the architecture into a single unified \`BootstrapEstimator\` class following standard scikit-learn meta-estimator patterns, where \`fit()\` performs resampling and core aggregation, and dedicated accessor methods handle dynamic consensus extraction.

#### Week 2: Dynamic Thresholding Without Refitting
- Users frequently need to explore different probability cutoffs (τ ∈ [0, 1]) to evaluate network density.
- Rather than forcing users to refit the estimator when experimenting with thresholds, I designed \`get_consensus_graph(threshold)\` and \`get_adjacency_matrix(threshold)\`. The expensive bootstrapping runs once, allowing instant threshold experimentation.

#### Weeks 3-4: Consensus Research & Probability Data Structure Architecture
- **Consensus Literature Survey**: Explored research literature on alternative consensus graph algorithms and opened [pgmpy Issue #3411](https://github.com/pgmpy/pgmpy/issues/3411) summarizing four methods across three papers, adopting the greedy thresholding baseline for the initial release while tracking advanced optimization methods.
- **Probability Data Structure Architecture**: A central technical discussion during Weeks 3 and 4 focused on designing the mathematical formulas and data structures used to store edge existence and orientation probabilities.

In causal discovery, an edge between two variables $u$ and $v$ can take several orientations across bootstrap resamples:
- Directed ($u \\to v$): observed $n_1$ times
- Reversed directed ($u \\leftarrow v$): observed $n_2$ times
- Undirected ($u - v$ in PDAGs): observed $n_3$ times

##### Initial Mathematical Formulation and Its Failure Modes
Initially, we explored deriving direction probabilities using a matrix/dictionary setup where directed orientation probabilities were computed as:
$$A_{u, v} = \\frac{n_1}{n_1 + n_2 + n_3}, \\quad A_{v, u} = \\frac{n_2}{n_1 + n_2 + n_3}$$

When undirected edges were present, $A_{u, v} + A_{v, u} \\ne 1$. The remaining probability mass was assumed to be the undirected edge:
$$P(u - v) = 1 - A_{u, v} - A_{v, u}$$

**Why This Formulation Failed:**  
While this identity seemed mathematically neat at first glance, we quickly discovered two critical failure cases:
1. **Absent Edges Produced Phantom 100% Probabilities**: When no edge exists between $u$ and $v$ across any bootstrap resamples ($n_1 = 0, n_2 = 0, n_3 = 0$), both directed entries are zero ($A_{u, v} = 0, A_{v, u} = 0$). Evaluating $1 - A_{u, v} - A_{v, u}$ results in $1 - 0 - 0 = 1.0$! An edge that never existed was erroneously calculated as a 100% certain undirected edge instead of 0.
2. **Breakdown with Bidirected and Mixed Edges**: If extended to more expressive causal structures (like ADMGs with bidirected edges $u \\leftrightarrow v$ or PAGs with circle marks), subtracting directed shares from 1 cannot distinguish which non-directed edge type absorbed the remaining mass. When a user checks for bidirected edges, it would also evaluate to 1 instead of 0.

##### Candidate Representations and Edge-Case Bottlenecks
We then explored alternative structures to store these probabilities, each presenting distinct architectural issues:

1. **Adjacency Matrix with Numerical Scalars**:
   - We considered filling an adjacency matrix directly with edge presence and orientation numbers. However, this immediately raised the question: *what should be placed in the cell when an edge has no directional orientation or does not exist?*
   - If filled with \`0\`: It creates an unresolvable ambiguity between "an edge exists but has 0% directional certainty in that direction" and "no edge exists at all". Downstream functions computing maximums or applying threshold filters would fail or misinterpret absent edges.
   - If filled with sentinel values like \`-1\`, \`NaN\`, or \`Null\`: Placing sentinel values inside a numerical matrix breaks compatibility when users pass the matrix into other machine learning, numerical, or graph libraries (such as scikit-learn, NumPy, or NetworkX). Arithmetic operations, matrix slicing, and thresholding either raise type errors or require convoluted masking logic.

2. **Dictionary-Based Structures (\`(u, v): (edge_type, prob)\`)**:
   - Dictionaries can store string keys or tuples cleanly, but they discard the tabular matrix layout that practitioners expect. They prevent vectorization, make matrix masking and slicing clunky, and force users into manual nested loops just to perform simple threshold queries.

3. **Separate Disjoint Containers (\`directed_edges_\` and \`undirected_edges_\`)**:
   - Splitting graph statistics into multiple separate attributes fragments the internal representation. Users are forced to coordinate lookups across two different containers, doubling state management overhead.

##### The Chosen Architecture: Decoupled DataFrames with Dynamic Tuples
To resolve all these issues, I designed a two-tiered architecture that cleanly separates edge presence from directional probability, using **tuples as cell values**:

1. **\`edge_prob_\`**: A symmetric $N \\times N$ pandas DataFrame indicating overall edge existence frequency ($\\sum A_i / N$). It answers one question unambiguously: *Is there an edge between these two variables?* Absent edges are simply \`0.0\`.
2. **\`direction_prob_\`**: An $N \\times N$ pandas DataFrame where each cell $(u, v)$ stores a **tuple of conditional probabilities** given that an edge exists.

**Why Dynamic Tuples? Adapting to Estimator Return Types:**  
Storing a tuple inside each cell of \`direction_prob_\` solved the sentinel problem and provided dynamic extensibility based on the return type of the underlying DAG estimator:
- **DAG Estimators**: Only directed edges are possible. Each cell $(u, v)$ holds a 1-tuple \`(p_directed,)\` representing $P(u \\to v \\mid \\text{edge}(u, v))$.
- **PDAG Estimators**: When returning Markov equivalence classes (from constraint-based algorithms like \`PC\`), candidate edges can be directed or undirected. Each cell $(u, v)$ dynamically stores a 2-tuple \`(p_directed, p_undirected)\` representing $P(u \\to v)$ and $P(u - v)$ respectively.
- **Future Graph Types (ADMGs and PAGs)**: For graph classes supporting latent confounding or selection bias with bidirected edges ($u \\leftrightarrow v$) or circle marks ($u \\circ \\to v$), the tuple dynamically expands to \`(p_directed, p_undirected, p_bidirected, ...)\` matching the estimator's return type, without altering the DataFrame structure or breaking user APIs.

I also vectorized the resampling index generation into a single step (\`rng.choice\`), avoiding per-iteration overhead.

#### Week 5: Handling PDAGs, Acyclicity, and \`warm_start\`
This week involved solving one of the most interesting theoretical issues: **cyclicity in PDAGs**.
- In a DAG, cycle detection is straightforward: check if adding u → v creates a cycle via \`nx.has_path(dag, v, u)\`.
- In a PDAG (returned by constraint-based algorithms like \`PC\`), candidate edges can be directed (u → v) or undirected (u - v).
- **Crucial Theoretical Realization**: Undirected edges in a PDAG represent reversible orientations in a Markov equivalence class; they do *not* form directed cycles on their own!
- Therefore, I removed cycle checks for undirected edges and used \`pdag.has_acyclic_extension()\` specifically when orienting directed edges.

I also added **\`warm_start=True\`** (scikit-learn style). If a user fits 20 bootstraps and wants to increase to 50, \`warm_start\` only executes the 30 new iterations, reusing previously computed graphs.

#### Week 6: Consensus Research and Aggregation Strategies
While the baseline consensus method uses greedy frequency-based edge insertion with cycle prevention, I surveyed more advanced graph aggregation approaches, tracked in [pgmpy Issue #3411](https://github.com/pgmpy/pgmpy/issues/3411).

In our Week 6 discussion, we explored alternative aggregation formulations from the literature, evaluating whether mathematical programming could enforce consensus without greedy heuristics. Analyzing these trade-offs confirmed that keeping the bootstrap consensus layer fast, lightweight, and focused on empirical edge frequencies was the right design for scalable bootstrap estimation.

---

### Usability Guide

The \`BootstrapEstimator\` works seamlessly with any pgmpy causal discovery estimator (\`HillClimbSearch\`, \`PC\`, \`GES\`, etc.).

#### 1. Basic Setup & Fitting (Score-Based DAG Search)

\`\`\`python
import pandas as pd
from pgmpy.causal_discovery import BootstrapEstimator, HillClimbSearch
from pgmpy.example_models import load_model

# 1. Load sample dataset
data = load_model("bnlearn/cancer").simulate(n_samples=2000, seed=42)

# 2. Instantiate base learner and wrap with BootstrapEstimator
hc = HillClimbSearch(return_type="dag")
estimator = BootstrapEstimator(
    estimator=hc,
    n_bootstraps=20,
    threshold=0.5,
    n_jobs=-1,        # Parallel execution across all CPU cores
    seed=42,
    show_progress=True,
)

# 3. Fit across resampled datasets
estimator.fit(data)
\`\`\`

#### 2. Inspecting Edge & Direction Probabilities

Once fitted, you can evaluate the empirical stability of relationships and orientation confidence:

\`\`\`python
# View edge presence probability matrix
print("Edge Probabilities:")
print(estimator.edge_prob_)

# View conditional direction probabilities (u -> v vs v -> u)
print("\\nDirection Probabilities:")
print(estimator.direction_prob_)
\`\`\`

Sample output:
\`\`\`
Edge Probabilities:
           Cancer  Dyspnoea  Pollution  Smoker  Xray
Cancer        0.0       0.9        0.9     0.8   0.1
Dyspnoea      0.0       0.0        0.0     0.0   0.0
Pollution     0.0       0.1        0.0     0.1   0.0
Smoker        0.1       0.0        0.0     0.0   0.0
Xray          0.9       0.0        0.0     0.0   0.0

Direction Probabilities:
             Cancer Dyspnoea Pollution    Smoker    Xray
Cancer       (0.0,)   (1.0,)    (1.0,)  (0.889,)  (0.1,)
Dyspnoea     (0.0,)   (0.0,)    (0.0,)    (0.0,)  (0.0,)
Pollution    (0.0,)   (1.0,)    (0.0,)    (1.0,)  (0.0,)
Smoker     (0.111,)   (0.0,)    (0.0,)    (0.0,)  (0.0,)
Xray         (0.9,)   (0.0,)    (0.0,)    (0.0,)  (0.0,)
\`\`\`

#### 3. Dynamically Adjusting Thresholds (No Refitting Required)

You can extract consensus graphs at different confidence cutoffs instantly:

\`\`\`python
# High-confidence consensus graph (threshold >= 0.8)
strict_graph = estimator.get_consensus_graph(threshold=0.8)
print("High-confidence edges:", strict_graph.edges())

# Permissive adjacency matrix (threshold >= 0.3)
permissive_adj = estimator.get_adjacency_matrix(threshold=0.3)
print("\\nPermissive Adjacency Matrix (threshold=0.3):")
print(permissive_adj)
\`\`\`

Sample output:
\`\`\`
High-confidence edges: [('Cancer', 'Dyspnoea'), ('Cancer', 'Pollution'), ('Cancer', 'Smoker'), ('Xray', 'Cancer')]

Permissive Adjacency Matrix (threshold=0.3):
           Cancer  Dyspnoea  Pollution  Smoker  Xray
Cancer          0         1          1       1     0
Dyspnoea        0         0          0       0     0
Pollution       0         0          0       0     0
Smoker          0         0          0       0     0
Xray            1         0          0       0     0
\`\`\`

#### 4. Constraint-Based Causal Discovery (PDAG with \`PC\`)

\`BootstrapEstimator\` automatically recognizes PDAG return types and resolves undirected vs directed confidence:

\`\`\`python
from pgmpy.causal_discovery import PC

pc = PC(return_type="pdag")
bootstrap_pc = BootstrapEstimator(pc, n_bootstraps=15, threshold=0.5, seed=42)
bootstrap_pc.fit(data)

# Resulting graph preserves both directed (->) and undirected (--) edges
pdag = bootstrap_pc.causal_graph_
print("Learned PDAG edges:", pdag.edges())
\`\`\`

Sample output:
\`\`\`
Learned PDAG edges: [('Cancer', 'Dyspnoea'), ('Pollution', 'Cancer'), ('Smoker', 'Cancer'), ('Cancer', 'Xray')]
\`\`\`

#### 5. Incremental Bootstrapping with \`warm_start\`

If you want to add more resamples without re-running from scratch:

\`\`\`python
# Enable warm_start
estimator.warm_start = True

# Increase from 20 to 50 bootstraps (only runs 30 new iterations)
estimator.n_bootstraps = 50
estimator.fit(data)

print(f"Total bootstrap samples fitted: {len(estimator.bootstrap_samples_)}")
\`\`\`

Sample output:
\`\`\`
Total bootstrap samples fitted: 50
\`\`\`

---

### Resources & Research References

- **Mentor:** [Ankur Ankan](https://github.com/ankurankan)
- **Foundational Paper:** [Data Analysis with Bayesian Networks: A Bootstrap Approach (Friedman, Goldszmidt, & Wyner, UAI 1999 / arXiv:1301.6695)](https://arxiv.org/pdf/1301.6695)
- **Consensus Methods Tracking Issue:** [pgmpy/pgmpy#3411](https://github.com/pgmpy/pgmpy/issues/3411)
- **Enhancement Proposal:** [PEP 6 Draft Proposal](https://github.com/pgmpy/enhancement_proposals/blob/main/6_bootstrap_causal_discovery/draft.md)
- **Discussion Issue:** [pgmpy/pgmpy#3450](https://github.com/pgmpy/pgmpy/issues/3450)
- **Implementation PR:** [pgmpy/pgmpy#3464](https://github.com/pgmpy/pgmpy/pull/3464)
`;export{e as default};

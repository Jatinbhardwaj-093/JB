# Bootstrap Estimator in pgmpy: From Mentorship Discussions to Production Implementation

During my mentorship with **pgmpy** under [**Ankur Ankan**](https://github.com/ankurankan), I worked on designing and implementing a non-parametric **`BootstrapEstimator`** for causal discovery. 

Causal discovery algorithms often produce a single estimated graph from observational data. But in practical applications, observational data is noisy and limited, meaning slight variations in the dataset can yield starkly different graph topologies. 

This post documents the architectural choices, weekly design discussions, technical challenges (like cycle resolution in PDAGs), and a complete practical usability guide for the new estimator.

---

### The Problem: Structural Uncertainty & Sensitivity

When learning Directed Acyclic Graphs (DAGs) or Partial DAGs (PDAGs) using algorithms like `PC` or `HillClimbSearch`:

1. **Sample Variability**: Minor noise or small sample sizes can drastically alter edge presence and orientation.
2. **Markov Equivalence**: Multiple graphs often explain observed conditional independencies equally well.
3. **No Confidence Metrics**: A single point-estimate graph provides no indication of whether an edge is solidly supported or an artifact of sample variance.

A key insight discussed early in the mentorship was the asymmetry between **False Positives** and **False Negatives**:

> **Why False Negatives Hurt More than False Positives in Causal Discovery**  
> A fully connected DAG can represent *any* probability distribution without constraint. However, removing an edge introduces a strict conditional independence constraint, restricting the family of distributions the model can represent. Therefore, erroneously removing an edge (False Negative) restricts your model far more severely than accidentally including an edge (False Positive).

To address this, we rely on **non-parametric bootstrapping**, inspired by the seminal work of [Friedman et al. (1999)](https://arxiv.org/pdf/1301.6695), to measure edge confidence, detect robust features, and quantify structural stability under repeated resampling.

---

### Week-by-Week Evolution & Key Decisions

#### Week 0: Scoping & Terminology
- **Non-Parametric vs. Parametric**: I initially explored both parametric and non-parametric bootstrapping approaches. However, after discussing with my mentor, we decided to focus for now strictly on non-parametric resampling with replacement (`sample_frac * N`), as it is model-agnostic and relies on fewer distribution assumptions.
- **"Summarizing" vs. "Scoring"**: Rather than treating graph aggregation as a "scoring" process, we framed it as **summarization**, separating how samples are collected from how the consensus graph is constructed.

#### Week 1: Clean Separation of Responsibilities
- Initially, I considered a multi-class design with separate classes for bootstrapping and summary statistics (`bootstrap_results`).
- After review, we realized the `fit()` method was taking on too many disparate roles. We streamlined the architecture into a single unified `BootstrapEstimator` class following standard scikit-learn meta-estimator patterns, where `fit()` performs resampling and core aggregation, and dedicated accessor methods handle dynamic consensus extraction.

#### Week 2: Dynamic Thresholding Without Refitting
- Users frequently need to explore different probability cutoffs (τ ∈ [0, 1]) to evaluate network density.
- Rather than forcing users to refit the estimator when experimenting with thresholds, we designed `get_consensus_graph(threshold)` and `get_adjacency_matrix(threshold)`. The expensive bootstrapping runs once, allowing instant threshold experimentation.

#### Week 3: Consensus Literature Survey & Data Structures
- Explored research literature on alternative consensus graph algorithms and opened [pgmpy Issue #3411](https://github.com/pgmpy/pgmpy/issues/3411) summarizing four methods across three papers.
- Decided to adopt the greedy thresholding baseline for the initial release while tracking advanced optimization methods.

#### Week 4: The Architecture of Probability Data Structures
A central technical discussion during this week and upcoming sessions focused on the exact mathematical formulation and data types used to store edge and direction probabilities.

In causal discovery, an edge between two variables $u$ and $v$ can take several orientations across bootstrap resamples:
- Directed ($u \to v$): observed $n_1$ times
- Reversed directed ($u \leftarrow v$): observed $n_2$ times
- Undirected ($u - v$ in PDAGs): observed $n_3$ times

##### Mathematical Formulation of Direction & Edge Probabilities
To capture orientation confidence without losing structural information:
- Directed orientation probabilities in the adjacency matrix:
  - `A_{u, v} = n1 / (n1 + n2 + n3)`
  - `A_{v, u} = n2 / (n1 + n2 + n3)`
- When undirected edges are present, `A_{u, v} + A_{v, u} != 1`. The remaining probability mass corresponds to the undirected edge:
  - `P(u - v) = 1 - A_{u, v} - A_{v, u}`
- The overall edge presence matrix `edge_prob_` is symmetric and captures edge existence across all resamples:
  - `adjacency matrix: sum(A_i) / N` (where $N$ is total bootstrap iterations)

##### Data Structure Proposals Evaluated
During our design review, we debated several candidate data structures to store these statistics:

1. **Agenda Proposal A: Single Dictionary (`direction_probabilities_`)**  
   - Format: `(u, v) : (Directed or Undirected[str], prob)`  
   - *Why dropped:* Dictionaries lack the tabular structure that data scientists rely on. They hinder vectorization, make matrix slicing and masking clunky, and require manual iteration for simple threshold queries.

2. **Agenda Proposal B: Two Separate Attributes**  
   - Format: `directed_edges_: [u, v] : prob` and `undirected_edges_: [u, v] : prob`  
   - *Why dropped:* Fragmenting the graph representation into multiple disjoint containers complicates API consumption, forces users to reconcile two separate lookups, and doubles state maintenance overhead.

3. **Alternative: Sentinel Values in a Single Matrix (`Null`, `NaN`, or `-1`)**  
   - Format: A single numerical matrix encoding undirected edges as `-1` and absent edges as `NaN` or `Null`.  
   - *Why dropped:* Conflating presence significance with directional confidence creates severe semantic ambiguity. Sentinel numbers distort standard arithmetic operations, corrupt matrix thresholding, and place an unnatural cognitive burden on users to decode arbitrary conventions.

##### The Chosen Architecture: Decoupled DataFrames with Dynamic Tuples
We cleanly separated presence from orientation into two coordinated pandas DataFrames:
1. **`edge_prob_`**: A symmetric $N \times N$ matrix indicating overall edge existence frequency (`sum(A_i) / N`). It answers one question unambiguously: *Is there an edge between these variables?*
2. **`direction_prob_`**: An $N \times N$ DataFrame containing conditional probabilities of edge orientations given that an edge exists.

**Why Tuples as Cell Values? (Extensibility to ADMGs and PAGs):**  
Rather than hardcoding scalar columns, storing **tuples inside each DataFrame cell** provided a crucial architectural advantage: dynamic extensibility. The cell tuple expands based on the graph family returned by the underlying causal discovery estimator:
- **DAG Estimators**: Each cell $(u, v)$ stores a 1-tuple `(p_directed,)` representing $P(u \to v \mid \text{edge}(u, v))$.
- **PDAG Estimators**: Each cell $(u, v)$ stores a 2-tuple `(p_directed, p_undirected)` representing $P(u \to v)$ and $P(u - v)$ respectively.
- **Future Graph Types (ADMGs and PAGs)**: Causal discovery frequently extends beyond DAGs and PDAGs into models with latent confounding and selection bias. For **ADMGs** (Acyclic Directed Mixed Graphs with bidirected edges $u \leftrightarrow v$) or **PAGs** (Partial Ancestral Graphs with circle marks $u \circ \to v$, $u \circ - \circ v$), the tuple size dynamically expands to represent bidirected, directed, and circle marks as required by the algorithm, without redesigning the data structure or breaking user APIs.

We also vectorized the resampling index generation into a single step (`rng.choice`), avoiding per-iteration overhead.

#### Week 5: Handling PDAGs, Acyclicity, and `warm_start`
This week involved solving one of the most interesting theoretical issues: **cyclicity in PDAGs**.
- In a DAG, cycle detection is straightforward: check if adding u → v creates a cycle via `nx.has_path(dag, v, u)`.
- In a PDAG (returned by constraint-based algorithms like `PC`), candidate edges can be directed (u → v) or undirected (u - v).
- **Crucial Theoretical Realization**: Undirected edges in a PDAG represent reversible orientations in a Markov equivalence class; they do *not* form directed cycles on their own!
- Therefore, we removed cycle checks for undirected edges and used `pdag.has_acyclic_extension()` specifically when orienting directed edges.

We also added **`warm_start=True`** (scikit-learn style). If a user fits 20 bootstraps and wants to increase to 50, `warm_start` only executes the 30 new iterations, reusing previously computed graphs.

#### Week 6: Consensus Research and the Path to ILP
While our baseline consensus method uses greedy frequency-based edge insertion with cycle prevention, we surveyed more advanced graph aggregation approaches, tracked in [pgmpy Issue #3411](https://github.com/pgmpy/pgmpy/issues/3411).

In our Week 6 discussion, we explored Integer Linear Programming (ILP) formulations from the literature. My mentor advised me to research both possibilities: whether to employ ILP as an advanced consensus method for the bootstrap aggregator, or to develop it as a standalone causal discovery algorithm.

Following deeper research and exploration into ILP formulations for structure learning, I decided to focus on building a dedicated causal discovery algorithm rather than restricting it to a consensus aggregation mechanism.

This marks the next chapter of my mentorship work. I will be detailing the formulation, causal constraints, and implementation in a dedicated follow-up post: [ILP-Based Causal Discovery in pgmpy](/blog/ilp-causal-discovery).

---

### Usability Guide

The `BootstrapEstimator` works seamlessly with any pgmpy causal discovery estimator (`HillClimbSearch`, `PC`, `GES`, etc.).

#### 1. Basic Setup & Fitting (Score-Based DAG Search)

```python
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
```

#### 2. Inspecting Edge & Direction Probabilities

Once fitted, you can evaluate the empirical stability of relationships and orientation confidence:

```python
# View edge presence probability matrix
print("Edge Probabilities:")
print(estimator.edge_prob_)

# View conditional direction probabilities (u -> v vs v -> u)
print("\nDirection Probabilities:")
print(estimator.direction_prob_)
```

Sample output:
```
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
```

#### 3. Dynamically Adjusting Thresholds (No Refitting Required)

You can extract consensus graphs at different confidence cutoffs instantly:

```python
# High-confidence consensus graph (threshold >= 0.8)
strict_graph = estimator.get_consensus_graph(threshold=0.8)
print("High-confidence edges:", strict_graph.edges())

# Permissive adjacency matrix (threshold >= 0.3)
permissive_adj = estimator.get_adjacency_matrix(threshold=0.3)
print("\nPermissive Adjacency Matrix (threshold=0.3):")
print(permissive_adj)
```

Sample output:
```
High-confidence edges: [('Cancer', 'Dyspnoea'), ('Cancer', 'Pollution'), ('Cancer', 'Smoker'), ('Xray', 'Cancer')]

Permissive Adjacency Matrix (threshold=0.3):
           Cancer  Dyspnoea  Pollution  Smoker  Xray
Cancer          0         1          1       1     0
Dyspnoea        0         0          0       0     0
Pollution       0         0          0       0     0
Smoker          0         0          0       0     0
Xray            1         0          0       0     0
```

#### 4. Constraint-Based Causal Discovery (PDAG with `PC`)

`BootstrapEstimator` automatically recognizes PDAG return types and resolves undirected vs directed confidence:

```python
from pgmpy.causal_discovery import PC

pc = PC(return_type="pdag")
bootstrap_pc = BootstrapEstimator(pc, n_bootstraps=15, threshold=0.5, seed=42)
bootstrap_pc.fit(data)

# Resulting graph preserves both directed (->) and undirected (--) edges
pdag = bootstrap_pc.causal_graph_
print("Learned PDAG edges:", pdag.edges())
```

Sample output:
```
Learned PDAG edges: [('Cancer', 'Dyspnoea'), ('Pollution', 'Cancer'), ('Smoker', 'Cancer'), ('Cancer', 'Xray')]
```

#### 5. Incremental Bootstrapping with `warm_start`

If you want to add more resamples without re-running from scratch:

```python
# Enable warm_start
estimator.warm_start = True

# Increase from 20 to 50 bootstraps (only runs 30 new iterations)
estimator.n_bootstraps = 50
estimator.fit(data)

print(f"Total bootstrap samples fitted: {len(estimator.bootstrap_samples_)}")
```

Sample output:
```
Total bootstrap samples fitted: 50
```

---

### Resources & Research References

- **Mentor:** [Ankur Ankan](https://github.com/ankurankan)
- **Foundational Paper:** [Data Analysis with Bayesian Networks: A Bootstrap Approach (Friedman, Goldszmidt, & Wyner, UAI 1999 / arXiv:1301.6695)](https://arxiv.org/pdf/1301.6695)
- **Consensus Methods Tracking Issue:** [pgmpy/pgmpy#3411](https://github.com/pgmpy/pgmpy/issues/3411)
- **Enhancement Proposal:** [PEP 6 Draft Proposal](https://github.com/pgmpy/enhancement_proposals/blob/main/6_bootstrap_causal_discovery/draft.md)
- **Discussion Issue:** [pgmpy/pgmpy#3450](https://github.com/pgmpy/pgmpy/issues/3450)
- **Implementation PR:** [pgmpy/pgmpy#3464](https://github.com/pgmpy/pgmpy/pull/3464)
- **Next Chapter:** [ILP-Based Causal Discovery in pgmpy](/blog/ilp-causal-discovery)

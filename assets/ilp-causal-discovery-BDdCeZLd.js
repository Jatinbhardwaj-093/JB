const e=`# Optimal Causal Structure with Integer Linear Programming (ILP) in pgmpy

During my **pgmpy** mentorship, a major focus was formulating and implementing **Integer Linear Programming (ILP)** for exact causal structure learning from continuous observational data.

While heuristic causal discovery algorithms (like \`HillClimbSearch\` or \`PC\`) and continuous optimization approaches provide scalable approximations, exact mathematical programming algorithms offer unique theoretical guarantees by finding globally optimal DAG structures accompanied by formal optimality gap certificates.

Through [\`ILPSearch\`](https://github.com/pgmpy/pgmpy/pull/3536), I implemented an exact Mixed-Integer Linear Programming (MILP) algorithm in \`pgmpy.causal_discovery\`. By formulating continuous Linear Structural Equation Models (SEMs) into exact integer programming constraints over directed candidate edges, \`ILPSearch\` eliminates the risk of local minima while incorporating prior structural knowledge seamlessly.

Best of all, by relying directly on SciPy's built-in MILP solver ([\`scipy.optimize.milp\`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.milp.html)), \`ILPSearch\` provides exact causal structure learning with **zero extra dependencies**, requiring no external solver installations, commercial licenses, or binary toolchains.

---

### The Causal Optimization Problem

In causal discovery from continuous observational data, the data-generating process is modeled using a linear **Structural Equation Model (SEM)**:

$$X_k = \\sum_{j \\in \\text{pa}(k)} \\beta_{jk} X_j + \\delta_k, \\quad \\forall k \\in \\{1, \\dots, m\\}$$

where $\\text{pa}(k)$ represents the direct causal parents of variable $X_k$, $\\beta_{jk}$ denotes the structural causal coefficient (edge weight), and $\\delta_k$ is an independent noise term.

For an observed data matrix $\\mathcal{X} \\in \\mathbb{R}^{n \\times m}$ and sample empirical covariance matrix $S = \\frac{1}{n} \\mathcal{X}^T \\mathcal{X}$, the continuous loss function measures the residual sum of squares (RSS):

$$l_n(B) = \\frac{1}{2} \\text{tr}\\left( (I - B)(I - B)^T S \\right) = \\frac{1}{2n} \\sum_{k=1}^m \\sum_{d=1}^n \\left( x_{dk} - \\sum_{(j,k) \\in \\vec{E}} \\beta_{jk} x_{dj} \\right)^2$$

The overarching goal is to minimize this loss penalized by structural sparsity over a candidate directed edge set $\\vec{E}$:

$$\\min_{B} \\quad l_n(B) + \\lambda \\phi(B) \\quad \\text{s.t. } G(B) \\text{ is an induced DAG from } \\vec{E}$$

---

### Bridging Quadratic Loss to a Linear Objective

The foundational formulation in [Manzour et al. (2021)](https://pubsonline.informs.org/doi/epdf/10.1287/ijoo.2019.0040) is a Mixed-Integer Quadratic Program (MIQP), where the residual sum of squares is minimized jointly over continuous weights $\\beta_{jk}$ and binary edge selectors.

However, \`scipy.optimize.milp\` natively supports **linear** objectives only. To make exact global causal discovery accessible to every pgmpy user without demanding commercial quadratic solvers (like Gurobi or CPLEX), I converted the quadratic loss into a linear objective over binary activation variables.

Before running the solver, I pre-compute the marginal RSS improvement $\\Delta S_{jk}$ for each candidate directed edge $(j, k)$ using unconstrained ordinary least squares (OLS):

$$\\Delta S_{jk} = \\frac{1}{n} \\left( \\text{RSS}_{\\emptyset}^{(k)} - \\text{RSS}_{\\{j\\}}^{(k)} \\right)$$

This allows expressing the objective function in a purely linear form over edge selection variables $g_{jk}$:

$$\\min_{g} \\quad \\sum_{(j,k) \\in \\vec{E}} \\left( -\\Delta S_{jk} + \\lambda \\right) g_{jk}$$

Each candidate edge is included in the optimal causal DAG only if its empirical error reduction outweighs the structural sparsity penalty $\\lambda$.

---

### Layered Network (LN) Formulation

To guarantee that the learned graph is strictly acyclic without requiring exponential constraint generation, I implemented the **Layered Network (LN)** formulation from [Manzour et al. (2021)](https://pubsonline.informs.org/doi/epdf/10.1287/ijoo.2019.0040).

#### 1. Decision Variables
The optimization model defines four sets of variables packed into a unified solver vector:
- **$z_{jk} \\in \\{0, 1\\}$**: Binary orientation indicators. $z_{jk} = 1$ indicates that the edge between $j$ and $k$ is oriented from $j \\to k$.
- **$\\beta_{jk} \\in \\mathbb{R}$**: Continuous structural causal weights, bounded within $[-M, M]$.
- **$g_{jk} \\in \\{0, 1\\}$**: Binary edge selection flags. $g_{jk} = 1$ indicates that directed edge $j \\to k$ is active in the causal graph.
- **$\\psi_k \\in [1, m]$**: Continuous layer potential variables representing the topological depth of each node $k$.

#### 2. Constraints & Big-M Weight Bounds
The optimization is governed by linear constraints:

$$\\begin{aligned}
\\min_{\\beta, z, g, \\psi} \\quad & \\sum_{(j,k) \\in \\vec{E}} \\left( -\\Delta S_{jk} + \\lambda \\right) g_{jk} \\\\[6pt]
\\text{s.t.} \\quad & -M g_{jk} \\le \\beta_{jk} \\le M g_{jk}, \\quad \\forall (j,k) \\in \\vec{E} && \\text{(Big-M Weight Bound)} \\\\[4pt]
& g_{jk} \\le z_{jk}, \\quad \\forall (j,k) \\in \\vec{E} && \\text{(Active Edge Link)} \\\\[4pt]
& z_{jk} + z_{kj} = 1, \\quad \\forall (j,k) \\in \\vec{E}, \\; j < k && \\text{(Tournament Choice)} \\\\[4pt]
& z_{jk} - (m-1) z_{kj} \\le \\psi_k - \\psi_j, \\quad \\forall (j,k) \\in \\vec{E} && \\text{(Layer Acyclicity)} \\\\[4pt]
& 1 \\le \\psi_k \\le m, \\quad \\forall k \\in V && \\text{(Layer Bounds)} \\\\[4pt]
& z_{jk}, g_{jk} \\in \\{0, 1\\}, \\quad \\beta_{jk} \\in \\mathbb{R}, \\quad \\psi_k \\in \\mathbb{R}
\\end{aligned}$$

- **Tournament Choice ($z_{jk} + z_{kj} = 1$)**: For any connected pair of nodes, at most one direction can be selected in the global ordering.
- **Big-M Coupling**: If edge $j \\to k$ is inactive ($g_{jk} = 0$), Big-M forces its weight $\\beta_{jk} = 0$. If active ($g_{jk} = 1$), the weight is free to take any value in $[-M, M]$. $M$ is estimated safely via OLS coefficients: $M = \\max(2.0 \\cdot \\max |\\hat{\\beta}_{\\text{OLS}}|, 10.0)$.
- **Layer Acyclicity**: If $z_{jk} = 1$, the constraint forces $\\psi_k \\ge \\psi_j + 1$. Because node depths must strictly increase along directed edges, directed cycles are mathematically impossible!

---

### Why the Layered Network Beats Alternative Formulations

When designing \`ILPSearch\`, I evaluated multiple mathematical programming formulations for exact causal graph learning:

#### 1. Cutting Plane (CP) Approach
- **Mechanism**: Uses binary edge variables and dynamically injects cycle-elimination cuts whenever cycles are detected during branch-and-cut (via DFS callbacks).
- **Why dropped:** Requires dynamic solver callbacks during tree exploration, which the standard \`scipy.optimize.milp\` HiGHS wrapper does not support.

#### 2. Linear Ordering (LO) Approach
- **Mechanism**: Enforces a strict topological order by introducing pairwise ordering variables and 3-cycle triangle elimination constraints.
- **Why dropped:** Generates $O(m^3)$ constraints for $m$ nodes, which causes severe memory overhead and cripples branch-and-bound exploration on graphs with $m \\ge 20$.

#### 3. Topological Ordering (TO) Approach
- **Mechanism**: Uses a binary permutation matrix to assign topological positions directly to nodes.
- **Why dropped:** Suffers from high permutation symmetry (many equivalent topological permutations correspond to the exact same causal DAG), leading to redundant search branches.

#### 4. The Layered Network (LN) Advantage (Selected)
- **Mechanism**: Assigns continuous potential variables $\\psi_k \\in [1, m]$ to nodes, enforcing acyclicity via $z_{jk} - (m-1)z_{kj} \\le \\psi_k - \\psi_j$.
- **Why chosen:** Requires only $O(m^2)$ linear constraints, needs no dynamic callbacks, eliminates permutation symmetry, and solves directly with SciPy's HiGHS backend in milliseconds.

---

### Mentorship Milestones & Design Decisions (Weeks 7 to 12)

#### Week 7: First Discussion & Problem Scoping
In Week 7, we held our initial discussions on formulating exact causal structure learning from continuous observational data as an Integer Linear Program:
- **Zero External Dependencies**: Rather than relying on commercial or third-party solvers (like Gurobi or CPLEX) that introduce licensing and C-extension installation hurdles, we decided to build \`ILPSearch\` strictly on top of SciPy's built-in MILP solver ([\`scipy.optimize.milp\`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.milp.html)) powered by the HiGHS backend.
- **Full Solver Passthrough**: Rather than exposing only a narrow \`time_limit\` parameter, \`ILPSearch\` accepts an \`options\` dictionary forwarding all parameters supported by \`scipy.optimize.milp\` (e.g., \`time_limit\`, \`presolve\`, \`disp\`, \`mip_rel_gap\`, \`node_limit\`).
- **Repository Transition**: We closed the exploratory draft on \`pgmpy/enhancement_proposals\` and transitioned directly to active development on the main repository via [pgmpy Issue #3534](https://github.com/pgmpy/pgmpy/issues/3534) and [pgmpy PR #3536](https://github.com/pgmpy/pgmpy/pull/3536).

#### Week 8: Reviewing the Plan & Mathematical Alternatives
In Week 8, we reviewed the formal execution plan and evaluated alternative mathematical formulations to prevent cycles:
- **Acyclicity Formulations Evaluated**: As detailed above, we contrasted the Cutting Plane approach (callbacks unsupported by SciPy), the Linear Ordering approach ($O(m^3)$ constraints creating severe memory bottlenecks), and Topological Ordering (high permutation symmetry). We selected the Layered Network (LN) formulation because its $O(m^2)$ potential-difference constraints solve directly without callbacks.
- **Superstructure & Prior Knowledge**: For $m$ variables, the unconstrained search space contains $m(m-1)$ directed edges and $2^{m-1}$ candidate parent sets per node. We planned \`ExpertKnowledge\` integration to allow users to prune candidate edges, locking required edges ($lb=1$) and forbidden edges ($ub=0$) directly into variable bounds before the solver executes.

#### Week 9: Reviewing the Implementation of \`ILPSearch\`
In Week 9, we reviewed the full implementation in [pgmpy PR #3536](https://github.com/pgmpy/pgmpy/pull/3536):
- **API Standardization**: Ensured strict compliance with pgmpy's \`BaseCausalDiscovery\` interface (\`fit()\`, \`causal_graph_\`, \`adjacency_matrix_\`).
- **Continuous Feature Validation**: Validated input data format, ensuring continuous numeric features (\`get_dataset_type(X) == "continuous"\`).
- **Big-M Bound Estimation**: Implemented automatic unconstrained OLS regressions per node to safely bound continuous causal weights: $M = \\max(2.0 \\cdot \\max |\\hat{\\beta}_{\\text{OLS}}|, 10.0)$.
- **Sparse Constraint Assembly**: Engineered sparse constraint matrix assembly using \`scipy.sparse.csc_matrix\`, preventing out-of-memory overhead during matrix generation.

#### Week 10: Benchmarking & Empirical Validation
In Week 10, we reviewed extensive benchmark results across synthetic and benchmark DAGs:
- **8-Graph Mixture Suite**: Evaluated performance across varying sample sizes ($n \\in \\{100, 1000\\}$), variable counts ($m \\in \\{10, 20, 30, 40\\}$), and penalty parameters ($\\lambda \\in \\{0.1, 1.0\\}$).
- **Search Space Acceleration**: Evaluated the Complete Graph search space against Moral Graph candidate screening, observing a **16x to 20x speedup** on 40-node graphs (reducing runtime from ~0.74s to ~0.03s).
- **Certified Optimality**: Verified that the solver achieved a certified **0.0% MIP relative gap** with zero solver timeouts across all test configurations.

#### Week 11: Reviewing Differences & Theoretical Limitations (Why L0 vs L1)
In Week 11, our mentorship discussions tackled the theoretical differences and limitations of the integer programming formulation:

##### 1. Why L0 Regularization Is the Native Choice Over L1
- In continuous optimization (like Lasso), the $L_1$ norm $\\sum |\\beta_{jk}|$ is used as a convex proxy for sparsity because the true $L_0$ count is non-convex.
- However, implementing an $L_1$ penalty on continuous weights $\\beta_{jk}$ inside an integer program turns the problem into a Mixed-Integer Quadratic Program (MIQP) because the RSS loss is quadratic in $\\beta$. Since \`scipy.optimize.milp\` is strictly a linear solver, handling $L_1$ would require iterative linearization heuristics that destroy global optimality certificates.
- In contrast, in integer programming, binary edge selection variables $g_{jk} \\in \\{0, 1\\}$ directly represent the true $L_0$ edge count:

$$\\text{Penalty} = \\lambda \\sum_{(j,k) \\in \\vec{E}} g_{jk}$$

- Penalizing edge existence via $L_0$ is natively linear, mathematically exact, and requires no approximations. I therefore focused on the $L_0$ penalty in my implementation.

##### 2. Exposing Unconstrained Complete Graph Execution
- While heuristic screening shrinks the search space for large networks, users working on small-to-moderate networks often want to avoid heuristic pre-screening entirely.
- I structured \`ILPSearch\` so that when \`expert_knowledge=None\`, it evaluates the true complete graph, guaranteeing a completely uncompromised global search.

#### Week 12: Wrap-Up, Production Polish & Merging
In Week 12, we completed the final review and wrapped up the pull request for production release:
- **Markov Equivalence Classes (PDAG / CPDAG)**: Finalized Meek rule orientation logic when users request \`return_type="pdag"\`, converting the exact DAG into a \`pgmpy.base.PDAG\`.
- **Type Annotations & Documentation**: Added comprehensive docstrings, parameter specifications, and inline comments following pgmpy coding guidelines.
- **Merge Preparation**: Verified all test suites passed cleanly, closed discussion issue [pgmpy Issue #3534](https://github.com/pgmpy/pgmpy/issues/3534), and finalized [pgmpy PR #3536](https://github.com/pgmpy/pgmpy/pull/3536) for merging into pgmpy.

---

### The 5-Step Algorithm Pipeline

When \`ilp.fit(X)\` executes, it runs through a systematic 5-step pipeline:

\`\`\`
Step 1: Validate continuous data and compute empirical covariance matrix S
                          │
                          ▼
Step 2: Resolve candidate directed edges and ExpertKnowledge bounds
        (Lock required edges: lb=1; Lock forbidden edges: ub=0)
                          │
                          ▼
Step 3: Estimate Big-M bound via unconstrained OLS regressions
        M = max(2.0 * max_ols_weight, 10.0)
                          │
                          ▼
Step 4: Construct MILP objective, variable bounds, and sparse constraints
        [z (orientation), beta (weights), g (active edges), psi (layers)]
                          │
                          ▼
Step 5: Invoke scipy.optimize.milp (HiGHS backend) and extract optimal DAG
\`\`\`

---

### Usability Guide: Using \`ILPSearch\` in Practice

#### 1. Basic Exact Causal DAG Discovery

Fit a globally optimal causal DAG from continuous data using the default $L_0$ sparsity penalty:

\`\`\`python
from pgmpy.causal_discovery import ILPSearch
from pgmpy.example_models import load_model

# Load benchmark dataset and convert to continuous numeric features
model = load_model("bnlearn/cancer")
df = model.simulate(n_samples=5000, seed=42, show_progress=False)
df = df.astype("category").apply(lambda x: x.cat.codes).astype(float)

# Fit globally optimal DAG
ilp = ILPSearch(l_penalty=0.0001)
ilp.fit(df)

# Inspect the globally optimal causal DAG
print("Exact causal edges:")
print(sorted(ilp.causal_graph_.edges()))
\`\`\`

Sample output:
\`\`\`
Exact causal edges:
[('Cancer', 'Dyspnoea'), ('Cancer', 'Pollution'), ('Cancer', 'Smoker'), ('Cancer', 'Xray')]
\`\`\`

#### 2. Incorporating Domain Knowledge & Edge Constraints

You can inject prior causal knowledge (required edges, forbidden directions, or custom search space) via \`ExpertKnowledge\`:

\`\`\`python
from pgmpy.causal_discovery import ExpertKnowledge, ILPSearch

# Enforce known causal relationships and forbid counter-intuitive directions
expert = ExpertKnowledge(
    required_edges=[("Pollution", "Cancer"), ("Smoker", "Cancer")],
    forbidden_edges=[("Cancer", "Pollution")]
)

ilp_expert = ILPSearch(l_penalty=0.0001, expert_knowledge=expert)
ilp_expert.fit(df)

print("Constrained causal edges:")
print(sorted(ilp_expert.causal_graph_.edges()))
\`\`\`

Sample output:
\`\`\`
Constrained causal edges:
[('Cancer', 'Dyspnoea'), ('Cancer', 'Xray'), ('Pollution', 'Cancer'), ('Smoker', 'Cancer')]
\`\`\`

#### 3. Configuring Solver Limits & Tolerances

For larger networks, configure execution bounds and solver diagnostics directly through the \`options\` parameter passed to [\`scipy.optimize.milp\`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.milp.html):

\`\`\`python
ilp_bounded = ILPSearch(
    l_penalty=0.001,
    options={
        "time_limit": 60.0,       # Stop after 60 seconds
        "mip_rel_gap": 0.001,     # Terminate within 0.1% optimality gap
        "disp": True,             # Display solver progression
        "presolve": True          # Enable MILP presolve simplifications
    }
)
ilp_bounded.fit(df)

print("Solver status:", ilp_bounded.milp_result_.status)
print("Termination message:", ilp_bounded.milp_result_.message)
\`\`\`

Sample output:
\`\`\`
Solver status: 0
Termination message: Optimization terminated successfully. (HiGHS Status 7: Optimal)
\`\`\`

#### 4. Returning Markov Equivalence Classes (PDAG / CPDAG)

If you wish to return a Completed Partially Directed Acyclic Graph (CPDAG) representing the Markov equivalence class:

\`\`\`python
ilp_pdag = ILPSearch(l_penalty=0.0001, return_type="pdag")
ilp_pdag.fit(df)

# The resulting causal_graph_ is a pgmpy.base.PDAG
print("Learned PDAG edges:")
print(sorted(ilp_pdag.causal_graph_.edges()))

print("\\nUndirected edges (Markov equivalence class):")
print(sorted(ilp_pdag.causal_graph_.undirected_edges))
\`\`\`

Sample output:
\`\`\`
Learned PDAG edges:
[('Cancer', 'Dyspnoea'), ('Cancer', 'Pollution'), ('Cancer', 'Smoker'), ('Cancer', 'Xray'), ('Dyspnoea', 'Cancer'), ('Pollution', 'Cancer'), ('Smoker', 'Cancer'), ('Xray', 'Cancer')]

Undirected edges (Markov equivalence class):
[('Cancer', 'Dyspnoea'), ('Cancer', 'Pollution'), ('Cancer', 'Smoker'), ('Cancer', 'Xray')]
\`\`\`

In \`pgmpy.base.PDAG\`, undirected edges representing reversible orientations within the Markov equivalence class are stored bidirectionally in \`edges()\`, and can be accessed directly via \`causal_graph_.undirected_edges\` and \`causal_graph_.directed_edges\`.

---

### Empirical Benchmark Evaluation

To evaluate empirical performance and validate the Layered Network formulation, I ran extensive benchmarks across an 8-graph mixture benchmark suite with varying sample sizes ($n \\in \\{100, 1000\\}$), variable counts ($m \\in \\{10, 20, 30, 40\\}$), and penalty parameters ($\\lambda \\in \\{0.1, 1.0\\}$).

The benchmark compared two search space configurations under native $L_0$ regularization:
1. **Complete Graph Search Space**: All $m(m-1)$ candidate directed edges are considered by the MILP solver, providing exact global optimality with no prior edge restriction.
2. **Moral Graph Search Space**: Candidate edges are pre-filtered using Graphical Lasso / conditional independence tests, restricting the binary edge variables $z_{jk}$ to statistically plausible neighbors.

#### Benchmark Part 1: Complete and Moral Search Spaces ($\\lambda = 0.1$)

The first benchmark tests graph recovery across sample sizes $n \\in \\{100, 1000\\}$ and node counts $m \\in \\{10, 20, 30, 40\\}$ with an $L_0$ penalty of $\\lambda = 0.1$:

![Benchmark Suite Part 1: Complete and Moral Search Spaces with L0 penalty (Lambda = 0.1)](/images/blogs/pgmpy/ilp-benchmark-lambda-0-1.webp)

#### Benchmark Part 2: Strong Regularization ($\\lambda = 1.0$) and Convergence Comparison

The second benchmark demonstrates solver behavior under stronger edge regularization ($\\lambda = 1.0$) and highlights the speedup of Moral Graph candidate filtering:

![Benchmark Suite Part 2: Complete vs Moral Search Space Comparison (Lambda = 1.0)](/images/blogs/pgmpy/ilp-benchmark-lambda-1-0.webp)

#### Key Insights from the Empirical Results

1. **Massive Speedup via Moral Graph Pruning**:
   - For a 40-variable graph ($m = 40$), the Complete Graph search space required approximately 0.45s to 0.74s to solve to certified optimality.
   - Restricting candidate edges to the Moral Graph reduced execution time to **0.027s to 0.045s** (a **16x to 20x acceleration**), allowing 40-node causal discovery to finish in milliseconds.

2. **Certified Global Optimality**:
   - Across all test configurations ($n \\in \\{100, 1000\\}$ and $m \\in \\{10, 20, 30, 40\\}$), the solver achieved a **0.0% MIP relative gap** with zero timeouts. Every returned causal structure is guaranteed to be mathematically optimal under the objective.

3. **Structural Accuracy (SHD & F1 Score)**:
   - At $\\lambda = 0.1$, the Moral Graph search space achieved an **F1 score between 0.958 and 1.000**, with Structural Hamming Distance (SHD) as low as 0 to 5 on networks with up to 40 variables.
   - At $\\lambda = 1.0$, Moral Graph pruning preserved high precision (0.96 to 1.00) and kept SHD low, preventing spurious edges that can arise when searching over unconstrained candidate spaces.

---

### Summary & Takeaways

The addition of \`ILPSearch\` gives pgmpy a state-of-the-art exact causal structure learning method:
- **Global Optimality**: Completely avoids greedy local search traps by solving an exact discrete optimization problem.
- **Zero-Dependency Architecture**: Leverages \`scipy.optimize.milp\` directly, eliminating third-party solver installation barriers.
- **Native L0 Regularization**: Enforces sparsity directly on edge counts without continuous relaxations.
- **Seamless Expert Integration**: Prior knowledge directly sets integer variable bounds, ensuring guaranteed constraint satisfaction.

---

### Resources & Research References

- **Primary Research Paper (Follow Paper):** [Integer Programming for Learning Directed Acyclic Graphs from Continuous Data (Manzour, Küçükyavuz, Wu, & Shojaie, INFORMS Journal on Optimization 2021)](https://pubsonline.informs.org/doi/epdf/10.1287/ijoo.2019.0040)
- **Foundational Paper:** [Integer Linear Programming for the Bayesian network structure learning problem (Bartlett & Cussens, Artificial Intelligence 2017 / arXiv:1508.07727)](https://arxiv.org/abs/1508.07727)
- **Solver Documentation:** [SciPy MILP Reference (scipy.optimize.milp)](https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.milp.html)
- **Discussion Issue:** [pgmpy/pgmpy#3534](https://github.com/pgmpy/pgmpy/issues/3534)
- **Implementation PR:** [pgmpy/pgmpy#3536](https://github.com/pgmpy/pgmpy/pull/3536)

`;export{e as default};

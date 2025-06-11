# GSoC-25: Week-1

The first week of my GSoC internship has concluded. During this time, I had two meetings with my mentors. After discussions with them, several significant changes have been made to the original proposal’s implementation plan.

Before explaining the current design choices, I want to highlight why these changes were necessary instead of strictly following the original proposal.
The core goal of this project is to provide a better representation for the Power Series Ring. There are two main reasons for building this class:
1. To provide a more usable and user-friendly API.
2. To support faster computation.

The second point is particularly important because, eventually, we want to use python-flint’s types—specifically fmpq_series and fmpz_series. This means the Python implementation should be as close as possible in structure and behavior so that when flint is installed, we can seamlessly switch to using the classes backed by fmp_series.


## Current Understanding and Decisions Made

Let me explain what was decided and what my current understanding is.

First, here’s a simple example of how flint’s fmp_series type works:

```python
from flint import fmpz_series, ctx

# This is the global context for Flint types. It contains many useful attributes. One of them is `cap`, which sets the truncation cap for the power series.
ctx.cap = 20

x = fmpz_series([0, 1])  # Precision (prec) isn’t defined here, so Flint uses the global context cap for truncation
print(x)  # x + O(x^20)

x = fmpz_series([0, 1], 30)  # Since prec is provided, it creates a new fmpz_series with the given precision instead of using the global one
print(x)  # x + O(x^30)
```



## Adapting the Design in SymPy

The SymPy implementation should aim to behave similarly to the above.

### Representor for the sereis[List of Coeff]

For storing the series coefficients, we’ll use the Dense Univariate Polynomial (DUP) representation, which essentially means using a list of elements from the ground domain.

**Why this?**

- We’re only dealing with univariate formal power series (FPS), so there’s no need for a sparse representation. The list-based form is sufficient.
- The list will always be at level 0 (i.e., no nesting), avoiding the complexity of multivariate polynomial cases.
- Since power series are infinite, many operations—such as exp, log, inverse, and trigonometric series expansions—will involve expanding terms up to the specified precision. In most cases, these expansions are dense or have regular gaps (like order 2), so there won’t be performance issues from a list filled with too many zeros.

### Classes for the fast fps ring series 
There will be three classes. These interfaces aren’t final yet—I need to confirm them with my mentor. But here’s my current understanding.

The Ring class will act as the global class for the series. It should behave similarly to how Flint’s global context cap works.

This class will hold the precision for the ring. This precision will serve as the default (or global) for all series created using this ring. However, when creating a new generator (gen) or series over this ring, there should always be an option to specify a custom precision, which must be less than or equal to the global ring precision. 

```python
from sympy.polys.domains.fpsring import PowerSeriesRing as fpsR, PythonSeriesContext as context
from sympy import ZZ

R = fpsR([0, 1], ZZ, 20)

x = context(R)  # Creates a new generator `x` with the ring's default precision
print(x)  # x + O(x**20)

y = context(R, 10)  # Creates a generator `y` with a custom precision
print(y)  # y + O(y**10)
```

So yeah, this is what I currently have in mind for the Ring and Context classes.

There will also be a FlintSeriesContext class that provides operations like sin, cos, antiderivative, multiply, and more—similar to what PythonSeriesContext provides. Once flint is installed, there should be a mechanism to automatically decide whether to create elements using the Flint-backed series types.

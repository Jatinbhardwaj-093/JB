# GSoC-25: Week 5

This week was highly productive. The focus was on implementing efficient algorithms for series manipulation, particularly for operations that were previously missing or handled suboptimally in the `dense*` modules of SymPy.

### Implemented Operations

We added optimized arithmetic methods for:

- **Multiplication**: Uses the basic Cauchy product for small series (`n < 100`), and Karatsuba multiplication with adaptive truncation for larger series.
- **Power**: Uses recursive exponentiation-by-squaring, with truncation at each recursive step.
- **Multiplicative Inverse**: Already available via `dup_revert` in `densetools.py`.

### Composition

To compute series composition, the existing Horner’s method (`dup_compose`) was not sufficient for performance. We introduced a faster approach in `dup_series_compose`, using a divide-and-conquer strategy with truncation enabled. While its optimality is still under evaluation, it performs reasonably well for general-purpose use.

### Compositional Inverse (Series Reversion)

We implemented the **Fast Lagrange Inversion algorithm**, proposed by Fredrik Johansson in his paper [A Fast Algorithm for Reversion of Power Series](https://fredrikj.net/math/reversion.pdf). This algorithm avoids Newton iteration by precomputing powers of `h, h², h³, ..., hᵐ`, allowing efficient coefficient extraction using Lagrange’s formula.

### Why Fast Lagrange Inversion?

- Avoids redundancy by directly using the Lagrange inversion formula
- Reduces overhead compared to Newton iteration, particularly for large series
- Achieves speedup factors of **1.2× to 1.5×** over classical methods
- Works well with coefficient rings like ℤ and ℚ

As Johansson writes in his paper:  
> "Our algorithm can be viewed as a baby-step giant-step version of the Lagrange inversion formula, avoiding Newton iteration entirely (apart from a single `O(M(n))` reciprocal computation)."

### Benchmarks from the Paper

#### Timing Comparison Over ℤ/pℤ

| n     | Lagrange Inversion | Newton + BK 2.1 | Fast Lagrange Inversion |
|-------|--------------------|-----------------|--------------------------|
| 10²   | 2.8 ms             | 0.92 ms         | 0.54 ms                  |
| 10³   | 690 ms             | 66 ms           | 45 ms                    |
| 10⁴   | 110 s              | 3300 ms         | 2100 ms                  |
| 10⁵   | 12100 s            | 144000 ms       | 85000 ms                 |

The Fast Lagrange algorithm consistently outperformed naive Lagrange inversion and Newton iteration with BK 2.1, making it a strong default candidate for series reversion.

Additionally, a helper function was implemented for small precision reversion (`n ≥ 4`). This delivers up to **60× speedup** compared to general algorithms. While currently limited to `n = 4`, we plan to extend support to `n = 5, 6, ...` in the future.

### Convenience Utilities

Three helper functions were added to `densbasic.py`:

- `dup_truncate`: Efficiently truncate series to a given length
- `dup_from_list`: Construct a series from a coefficient list
- `dup_print`: A prototype function for formatted series output (to be improved later)

### Final Note

All of the above was merged in [gh-28208](https://github.com/sympy/sympy/pull/28208), building a robust foundation for further development of symbolic series arithmetic.



# GSoC-25: Week 6

This week was a bit slower due to a scheduled quiz. Still, I was able to contribute meaningful changes to the Series Ring PR.

### Progress

Following the merge of [gh-28208](https://github.com/sympy/sympy/pull/28208), we introduced support for:

- **Composition**
- **Inverse**
- **Reversion**

Each of these methods relies on new `dup_series_*` routines that are integrated with the Series Ring class logic.

Additionally, a PR related to **type annotations** for the polynomial domain structure was merged: [gh-28177](https://github.com/sympy/sympy/pull/28177). This improves type safety for series operations, as we use the `DUP` representation — a list of ground domain coefficients. For example:

- `DUP[MPZ]` for integers (ℤ)
- `DUP[MPQ]` for rationals (ℚ)

This allows solid and specific type checking, moving away from loosely typed `Any` or generic `TypeVar`.

### Testing Updates

A new structure was proposed for test files. Instead of using `pytest.mark.parametrize`, we now leverage **pytest fixtures** for greater modularity and clarity.

---

I’m hoping to wrap up minor cleanups next week and get the Series Ring PR finalized and merged. After that, I plan to focus on expanding support for transcendental functions.


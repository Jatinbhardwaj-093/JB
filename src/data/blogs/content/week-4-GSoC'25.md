# GSoC-25: Week-4

This week was quite productive, especially around testing and fixing methods.

✅ Progress

I mainly focused on refining how equality is determined for power series. While the work is still in the development phase and hasn’t been reviewed yet, I made substantial progress.

⚠️ The Challenge: Power Series Equality

Equality for power series is surprisingly tricky.

Unlike polynomials—where we can directly compare coefficients of matching exponents—power series involve truncation, which hides terms beyond a certain degree. This makes it impossible to be certain about what comes after the truncation point.

Example: **`s = 1 + x^2 + 4x^3 + 7x^4 + O(x^5)`**

At a glance, comparing s with a longer or differently truncated series might seem like a match, but we cannot guarantee what happens after x^4.

To handle this correctly, I studied how gr_series from **python-flint** behaves:

```python
import flint.types._gr as gr
R = gr.gr_series_ctx.new(gr.gr_fmpq_ctx, 4)
R2 = gr.gr_series_ctx.new(gr.gr_fmpq_ctx, 10)
x, x2 = R('x'), R2('x')

s = 1 + x**2 + x**4
s2 = 1 + x2**2 + x2**4 + x2**10
R2(s) == s2  # returns None
```

As expected, it returns None, indicating uncertainty due to the truncation mismatch.

But if the “extra” terms go beyond the shared precision and do change the lower-degree part, equality must return False:

```python
s2 = 1 + x2**2 + x2**3 + x2**10
R2(s) == s2  # returns False
```

This confirms the rule: if two series differ within the shared precision, they are unequal. If they match, but one has unknown values beyond that range, we return None (indeterminate).

🧪 My Implementation

Although the current implementation may not be pretty, it does reflect this behavior accurately:

```python
def _useries_equality(s1: USeries[T], s2: USeries[T], dom: Domain) -> bool | None:
    """Check if two power series are equal."""
    coeffs1, prec1 = s1
    coeffs2, prec2 = s2

    # if elif handling the exact polynomial case here
    if prec1 is None and prec2 is None:
        return s1 == s2
    elif prec1 is None or prec2 is None:
        return False
    else:
        min_prec = min(prec1, prec2)

    # we just checking for minprec from both series truncation as the confliction in this determine the non equality.
    coeffs1 = dup_slice(coeffs1, 0, min_prec, dom)
    coeffs2 = dup_slice(coeffs2, 0, min_prec, dom)
    if coeffs1 != coeffs2:
        return False
    return None
```

It checks for equality up to the shared truncation precision, returns False if a conflict is found, and None if values match but further terms are unknown.
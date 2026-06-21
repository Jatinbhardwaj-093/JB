# GSoC’25 Week-2

Unfortunately, I wasn’t able to write a blog post this week about my progress. That said, there hasn’t been a lot of tangible output this week due to ongoing design discussions and some confusion.

Following our Week-1 meeting, I created a rough sketch of the design and asked for feedback. However, ****Oscar**** had a different approach in mind—specifically, he suggested we completely avoid introducing an Element class for now. This isn’t necessarily contradictory to my initial proposal, since our primary goal is to treat the ring as a context (ctx) for constructing and manipulating elements. Hence, a dedicated element class might be unnecessary at this stage.

As I began working, ****Oscar**** shared a very interesting and elegant behavior from Flint‘s gr_series implementation. When a gr_series element is constructed using a DUP (dense univariate polynomial) list, and the list length is smaller than the ring’s precision, **Flint** automatically treats it as a regular polynomial instead of a truncated series. This is mathematically more accurate, as there’s no truncation happening and all coefficients are fully defined.

```python
>>> import Flint.types._gr as gr
>>> R = gr.gr_series_ctx.new(gr.gr_fmpq_ctx, 2)
>>> R2 = gr.gr_series_ctx.new(gr.gr_fmpq_ctx, 4)
>>> a = R('x') + R('x')**3

>>> a
x + O(x^2)

>>> R2(a)
x + O(x^2)

>>> R2(a) * R2('x')
0 + O(x^2)

>>> R2('x')
x

>>> R2('x') * R2('x')
x^2
```

This design is really clean and sets a good precedent, so I started working toward a similar behavior in our implementation.

However, on the last day of the week, ****Oscar**** shared a new design sketch that involved building our series ring directly on top of gr_series from **Flint**. This introduced some confusion for me, primarily because:
- gr_series currently lacks support for series expansions of **Transcendental functions**.
- It is also somewhat unstable at the moment in **python-Flint**.

While this direction is promising, I’m still unsure if it aligns with our current goals, especially given those limitations.


# GSoC’25 Week 3

This week marked significant progress after the slow momentum in Week 2. I continued from where I left off and worked through key design questions that were previously unresolved.

There were two main agenda items this week:
1.	Finalizing which series type to use from **Flint**.
2.	Clarifying how precision should be handled.

As discussed earlier, gr_series is currently not well-supported in **python-Flint** and lacks APIs for **Transcendental functions**. Hence, we agreed to use fmpz_series and fmpq_series for now. In the future, once **python-flint** improves support for generic rings (gr_series), we can internally switch to it without affecting the public interface. This decouples implementation from usage, which is ideal.

### Precision Design

The design around precision had some ambiguity. Here’s the structure we eventually settled on:
- Each series can optionally have its own precision.
- If a series has precision, we use it.
- If none of the operands specify precision, we fall back to the ring’s default precision.

However, the tricky part arises when multiple series are involved in an operation. The natural instinct might be to return the result with the minimum precision among the inputs (i.e., min(p1, p2, ...)). But this doesn’t always align with mathematical correctness.

Consider:
```python
s1 = 1 + x + O(x**2)
s2 = x + O(x**3)

mul(s1, s2)
```
If we use min(2, 3), the result is x + O(x**2).
But mathematically, we can compute up to x^2, so the correct result is:
```python
x + x^2 + O(x^3)
```
While this richer result is desirable, implementing it is challenging. Doing so requires finding the first non-zero exponent of one series and combining it with the other’s precision, which isn’t straightforward, especially when series are sparse or symbolic.

Ultimately, we decided to follow Flint’s behavior, which truncates to the minimum precision. While not always the most informative, it’s consistent, simple, and mathematically valid (since truncation is deliberate and explicit).

### Domain Separation

Another major improvement this week was the decision to separate rings based on ground domains (e.g., ℤ and ℚ). This avoids runtime errors when attempting unsupported operations like transcendental expansions over ℤ.

Instead of allowing these errors to propagate, the ring itself will not expose operations that are unsupported on its domain. This design is both safer and more user-friendly. Currently, ZZ and QQ domains are supported, and more will be added as **python-flint** evolves.

## Code Structure

As the codebase grows, the series implementation will now live under a proper submodule (polys.series) instead of being a loose file in polys. This keeps things organized and aligns with SymPy’s module structure.
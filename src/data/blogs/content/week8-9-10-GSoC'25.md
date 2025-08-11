
# GSoC-25: Weeks 8, 9, 10

The past three weeks have been both very productive and tiring. I had almost no time to update the progress on the project, but finally, at the end of week 10, I completed the major part of the project.

The main PR [gh-28109](https://github.com/sympy/sympy/pull/28109) was merged in the middle of week 8, which officially made the Series Module available in the main `master` branch.

For the follow-up PR, I needed to add transcendental functions to provide algorithms for their series expansions. This was done in PR [gh-28273](https://github.com/sympy/sympy/pull/28273). This PR also contains some other work that was left in gh-28109—such as adding a method for series precision, separating the protocol, and optimizing the routine of `unify_prec`. It also increases the current test coverage of the whole module.

This has also been merged into master a few days back—with the help of other supporting PRs: [gh-28281](https://github.com/sympy/sympy/pull/28281), [gh-28283](https://github.com/sympy/sympy/pull/28283), and [gh-28293](https://github.com/sympy/sympy/pull/28293).

All in all, we now have the lower-level rings over (ZZ, QQ) ground domains with almost all significant methods and operations needed for power series manipulation.

#### Some Examples of How to Use the Poly/Series Module of SymPy

```python
>>> from sympy.polys.series import power_series_ring
>>> from sympy import ZZ, QQ


# Create the ring R over QQ with default precision, which is 6.
>>> R = power_series_ring(QQ)
>>> RQQ = power_series_ring(QQ, 10)
>>> RZZ = power_series_ring(ZZ, 10)

# Let's create a ring with precision 8 over the integers:
>>> R = power_series_ring(ZZ, prec=8)
>>> f = R([1, 2, 3])
>>> g = R([4, 1])

# Arithmetic operations are performed using the ring's methods. The print method provides a readable string representation.
>>> R.print(R.add(f, g))
5 + 3*x + 3*x**2
>>> R.print(R.multiply(f, g))
4 + 9*x + 14*x**2 + 3*x**3

# As shown below, when the result of an operation is a polynomial with a degree less than the ring's precision, the exact result is returned.
>>> p = R([2, -3])
>>> q = R([0, 7, 6, 1])
>>> R.print(R.multiply(p, q))
14*x - 9*x**2 - 16*x**3 - 3*x**4

# However, if an operation produces a result that exceeds the precision threshold, it is automatically truncated.
>>> r = R([1, 2, 3, 4, 5, 6, 7, 8])
>>> s = R([0, 1, 1])
>>> R.print(R.multiply(r, s))
x + 3*x**2 + 5*x**3 + 7*x**4 + 9*x**5 + 11*x**6 + 13*x**7 + O(x**8)

# Some series expansions:
# Currently, it only allows the Taylor expansion when x=0.
# So, almost all the provided functions in the QQ class work when the series has zero constant term, except log.

# Keep in mind the series expansion for this trancendental function contain the rational coeffs so it need the Ring over QQ. 
>>> R = power_series_ring(QQ, 8)
>>> R.print(R.log(R.add(R.one, R.gen)))
x - 1/2*x**2 + 1/3*x**3 - 1/4*x**4 + 1/5*x**5 - 1/6*x**6 + 1/7*x**7 + O(x**8)
>>> R.print(R.tan(R.gen))
x + 1/3*x**3 + 2/15*x**5 + 17/315*x**7 + O(x**8)

```

### Next Steps From Here

Now, what I would like to do is wrap these classes in an upper-level domain ring. This way, it won't be necessary to import different types of rings for different ground domains. What we want is to provide the ground domain as a parameter, which will internally create the ring automatically using the correct class—similar to what the PolyRing does in SymPy and like our `power_series_ring` factory function.

We want smooth conversion between ground domains in the upper-level ring class—this will also be much better for series elements. Currently, we have named methods in the class to perform arithmetic operations on series elements. We would like to set up the series element so that it has a proper representation, making it more user (human) readable instead of just a list of coefficients.
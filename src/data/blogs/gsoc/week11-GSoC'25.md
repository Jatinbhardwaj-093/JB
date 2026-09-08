# GSoC-25: Weeks 11

As week 11 is ending, I started working on the final PR of the project.

The PR [**gh-28325**](https://github.com/sympy/sympy/pull/28325) implements three classes:

- **Ring** (`PowerSeriesRing`)  
The `PowerSeriesRing` class maintains a base ring (`self.ring`) that represents a lower-level ring defined by the domain and ground type (e.g., Python, Flint). The base ring supplies the core logic for operations such as addition, inversion, logarithm, and exponentiation.  
Additionally, this class extends functionality with methods for converting or constructing ring elements from various types (e.g., expressions, lists, integers).

- **Element** (`PowerSeriesElement`)  
The `PowerSeriesElement` class provides a structured representation of ring elements, supporting standard arithmetic operations (`+`, `-`, `/`, etc.). This implementation also supports an explicit Order term. If the external order term exceeds the precision of the ring, it is truncated to the ring's precision.

- **Domain** (`Series`)  
The `Series` domain class includes the associated ring (`self.ring`) as metadata, which can be extracted for ring-specific operations. It provides methods for converting elements from other domains into its own data type.

This functionality or design is similar to the **Multivariate Polynomial Ring** of SymPy.

There is also a change for the `power_series_ring` function.
Now instead of returning the lower ring, it returns the `PowerSeriesRing` instance with the ring generator. This works something like this now:

```python
>>> from sympy import QQ
>>> from sympy.polys.series import power_series_ring
>>> R, y = power_series_ring("y", QQ, 10)
>>> R.inverse(1 + y)
1 - y + y**2 - y**3 + y**4 - y**5 + y**6 - y**7 + y**8 - y**9 + O(y**10)
```

As week 12 is starting tomorrow, this is going to be the last stretch of the project. This class needs some more methods and proper type annotations, then it will be ready to merge into master, finishing my project.

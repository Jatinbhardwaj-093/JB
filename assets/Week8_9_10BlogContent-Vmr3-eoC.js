import{d as s,u as a,b as n,c as o,a as r,o as i}from"./index-BSXKl_kP.js";import{H as t,p as l}from"./github-dark-DsXzy-Sw.js";const m={class:"leading-6 sm:leading-7 relative isolate max-w-full sm:max-w-3xl md:max-w-[800px] mx-auto px-3 sm:px-4 w-full text-slate-700 dark:text-gray-50 font-[ubuntu] font-feature-settings-kern font-feature-settings-liga font-feature-settings-calt"},g=s({__name:"Week8_9_10BlogContent",setup(d){return a(),t.registerLanguage("python",l),n(()=>{t.highlightAll()}),(p,e)=>(i(),o("div",m,[...e[0]||(e[0]=[r(`<p class="font-bold text-xl sm:text-3xl md:text-3xl lg:text-4xl mt-6 mb-4 leading-tight py-2 px-2 rounded-md bg-gray-100/70 dark:bg-gray-900/40 w-full"> GSoC-25: Weeks 8, 9, 10 </p><p class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"> The past three weeks have been both very productive and tiring. I had almost no time to update the progress on the project, but finally, at the end of week 10, I completed the major part of the project. </p><p class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"> The main PR <a href="https://github.com/sympy/sympy/pull/28109" class="text-blue-600 dark:text-blue-400 underline">gh-28109</a> was merged in the middle of week 8, which officially made the Series Module available in the main <code>master</code> branch. </p><p class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"> For the follow-up PR, I needed to add transcendental functions to provide algorithms for their series expansions. This was done in PR <a href="https://github.com/sympy/sympy/pull/28273" class="text-blue-600 dark:text-blue-400 underline">gh-28273</a>. This PR also contains some other work that was left in gh-28109—such as adding a method for series precision, separating the protocol, and optimizing the routine of <code>unify_prec</code>. It also increases the current test coverage of the whole module. </p><p class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"> This has also been merged into master a few days back—with the help of other supporting PRs: <a href="https://github.com/sympy/sympy/pull/28281" class="text-blue-600 dark:text-blue-400 underline">gh-28281</a>, <a href="https://github.com/sympy/sympy/pull/28283" class="text-blue-600 dark:text-blue-400 underline">gh-28283</a>, and <a href="https://github.com/sympy/sympy/pull/28293" class="text-blue-600 dark:text-blue-400 underline">gh-28293</a>. </p><p class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"> All in all, we now have the lower-level rings over (ZZ, QQ) ground domains with almost all significant methods and operations needed for power series manipulation. </p><h2 class="font-bold text-lg sm:text-xl md:text-2xl mb-3 mt-6"> Some Examples of How to Use the Poly/Series Module of SymPy </h2><pre><code class="language-python">from sympy.polys.series import power_series_ring
from sympy import ZZ, QQ

&quot;&quot;&quot;Create the ring R over QQ with default precision, which is 6.&quot;&quot;&quot;
R = power_series_ring(QQ)
RQQ = power_series_ring(QQ, 10)
RZZ = power_series_ring(ZZ, 10)

&quot;&quot;&quot;Let&#39;s create a ring with precision 8 over the integers:&quot;&quot;&quot;
R = power_series_ring(ZZ, prec=8)
f = R([1, 2, 3])
g = R([4, 1])

&quot;&quot;&quot;Arithmetic operations are performed using the ring&#39;s methods. The print
method provides a readable string representation.&quot;&quot;&quot;
R.print(R.add(f, g))
R.print(R.multiply(f, g))

&quot;&quot;&quot;As shown below, when the result of an operation is a polynomial with a
degree less than the ring&#39;s precision, the exact result is returned.&quot;&quot;&quot;
p = R([2, -3])
q = R([0, 7, 6, 1])
R.print(R.multiply(p, q))

&quot;&quot;&quot;However, if an operation produces a result that exceeds the precision
threshold, it is automatically truncated.&quot;&quot;&quot;
r = R([1, 2, 3, 4, 5, 6, 7, 8])
s = R([0, 1, 1])
R.print(R.multiply(r, s))

&quot;&quot;&quot;Some series expansions:
Currently, it only allows the Taylor expansion when x=0.
So, almost all the provided functions in the QQ class work when the series
has zero constant term, except log.

Keep in mind the series expansion for this trancendental function contain
the rational coeffs so it need the Ring over QQ.&quot;&quot;&quot;
R = power_series_ring(QQ, 8)
R.print(R.log(R.add(R.one, R.gen)))
R.print(R.tan(R.gen))
</code></pre><h2 class="font-bold text-lg sm:text-xl md:text-2xl mb-3 mt-6"> Next Steps From Here </h2><p class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"> Now, what I would like to do is wrap these classes in an upper-level domain ring. This way, it won&#39;t be necessary to import different types of rings for different ground domains. What we want is to provide the ground domain as a parameter, which will internally create the ring automatically using the correct class—similar to what the PolyRing does in SymPy and like our <code>power_series_ring</code> factory function. </p><p class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"> We want smooth conversion between ground domains in the upper-level ring class—this will also be much better for series elements. Currently, we have named methods in the class to perform arithmetic operations on series elements. We would like to set up the series element so that it has a proper representation, making it more user (human) readable instead of just a list of coefficients. </p>`,11)])]))}});export{g as default};

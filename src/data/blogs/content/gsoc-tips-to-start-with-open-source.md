# GSoC: Tips to Start with Open Source

This blog aims to provide some tips for getting started with the open-source community. While the focus is more on the community itself rather than specifically on GSoC, building a strong foundation in open source can greatly help in achieving goals like GSoC and open-source internships.

## My Experience Contributing to Open Source

I generally contribute to various libraries while also engaging with the community, understanding codebases, and more. In terms of pull requests (PRs), I have mainly contributed to SymPy and Wagtail (a CMS library).

From here, I’ll share what I’ve learned from working with SymPy, as that has been my primary area of interest. When I first started contributing, I felt overwhelmed by the codebase, especially since I had no prior work experience. Later, I discovered that even people with years of experience often take months to adjust to a new library or technology. Now, that makes complete sense. For example, shifting from a web-focused library to something machine learning-related involves a drastic change in coding practices. Over time, you become more familiar with the library. One of the fastest ways to do so is by trying to fix bugs. Debugging forces you to explore different modules in the repository, which helps you build a mental map of how the different parts are connected.

Once I became familiar with a large portion of the codebase, I decided to plan a bigger project. Initially, I proposed adding support for solving second-order partial differential equations. To my surprise, the idea was rejected—not because it was a bad idea, but because it lacked sufficient applications and use cases within the library. From that experience, I learned two very important lessons (these are my personal takeaways):
- You can’t overload a repository with niche features that have little to no user demand. It increases the package size without providing much value.
- In open source, resources are limited. Every contributor wants their efforts to have meaningful impact. Since most contributors have other commitments, they prefer to work on areas where their work will actually be used.

Eventually, I decided to work on developing a domain for FPS Ring. Rather than focusing on why I chose this project, I want to share how I selected it. As of now, SymPy has a well-developed series module, but one major bottleneck is the speed of series expansion. In GSoC 2015, Shivam Vats improved this by introducing ring_series in the polys module, which is significantly faster compared to the global series implementation in SymPy. However, this came at the cost of user-friendly syntax. Additionally, the master function of ring_series, which is rs_series, uses raw expressions instead of structured data types like Poly. In calculus, we learn series much like polynomials—the operations we apply to polynomials can be applied to series as well. So, my goal was to maintain both speed and improve ease of use for users.

Key Takeaway you can take from this when working on any open-source project, the two main goals should be:
- Performance (speed)
- Ease of use (friendly syntax and interface)

These are crucial reasons why someone chooses to adopt and continue using your project.

## Tips on Open Source

### 1. Empathy and Sympathy Towards Others

One of the best things you can do when engaging with others is to have empathy. A lot of people believe that being clear about your thoughts and having strong communication skills is what matters most. While that’s important, I believe that having empathy can take your conversations much further and lead to better outcomes.

Let me give you an analogy: in life, it’s often difficult to truly feel empathy for others because it requires self-reflection and the ability to put yourself in someone else’s shoes. But in a profession like tech—where we are constantly learning and encountering new challenges—it becomes easier to relate. We’ve all been there: asking questions that might seem “dumb,” suggesting ideas that don’t quite work. If you’re lucky, you’ll have mentors who guide you and explain why something won’t work or isn’t needed, without making you feel lesser for asking.

Keep this in mind when you seek help: ask politely and wait patiently for a response. And if you see someone new trying to find their footing, take the time to help them get onboard. It creates a better, more welcoming community for everyone.

### 2. Reading Matters

This point might seem obvious—many people talk about it—but it’s still important no matter how many times you hear it. These days, with so many video tutorials available, we often avoid reading and jump straight to watching content. Platforms like YouTube have made educational content more accessible, but relying only on videos can be limiting. If you try reading a technical or math-related article after a long time, you might find it difficult to follow.

This becomes a bigger issue in open source, where most libraries aren’t very mainstream. There usually aren’t full video courses or detailed tutorials covering them. And even when you do find something, it often only explains a small part of the entire codebase.

In open source, you’ll spend a lot of time reading—whether it’s documentation, source code, GitHub issues, or mailing list discussions. So be prepared: reading is a big part of the process, and there’s a lot of it to do.

### 3. Write a Clear Pull Request Description

This is a very important step whenever you’re contributing a patch or introducing something new to a library. In many repositories, you’ll often see new contributors opening pull requests with empty or unclear descriptions. This is not a good practice.

Remember, the reviewer is there to review your changes, not to guess what you’re trying to do.In the description, you should clearly explain:
- What changes you’ve made
-	Why you’ve made them
-	What the motivation is behind the change
-	Any resources or links that support your changes

If you don’t provide a good description, it not only delays the time it takes to merge your patch, but also increases the chance that the reviewer might fix the issue themselves rather than reviewing your work—especially if they don’t have enough context from your PR.

A good tip is to look at the PRs made by maintainers or experienced contributors. This helps you understand what kind of details are important to mention.

Clear PR descriptions also help future contributors understand why a change was made when they look back through the project’s history.


### GSoC-Specific Tip

Most of the time, you can find potential project ideas from personal blogs or articles written by repository members or mentors. These ideas are often based on individual opinions and preferences, so they might not be discussed openly or prominently in the repository itself. However, since these members usually have significant experience with the library, they often have a good sense of its future direction. Exploring their writings can give you valuable insights and help you identify strong ideas to propose for GSoC.

This is a more niche way to find potential projects, which is why I mentioned it. Of course, you can always find more ideas through the usual, general methods as well.

> **Note**: The order of the sections matters. However, keep in mind that everything shared here is based on my personal opinions.
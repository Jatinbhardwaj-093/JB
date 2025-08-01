<script setup lang="ts">
import { useThemeStore } from "../../../store/theme";

// Define props or component logic for the GSoC blog
const themeStore = useThemeStore();
</script>

<template>
  <div
    class="leading-6 sm:leading-7 relative isolate max-w-full sm:max-w-3xl md:max-w-[800px] mx-auto px-3 sm:px-4 w-full text-slate-700 dark:text-gray-50 font-[ubuntu] font-feature-settings-kern font-feature-settings-liga font-feature-settings-calt"
  >
    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      This blog aims to provide some tips for getting started with the
      open-source community. While the focus is more on the community itself
      rather than specifically on GSoC, building a
      <strong class="font-bold text-indigo-700 dark:text-indigo-300"
        >strong foundation in open source</strong
      >
      can greatly help in achieving goals like GSoC and open-source internships.
    </p>

    <p
      class="font-bold text-xl sm:text-3xl md:text-3xl lg:text-4xl mt-6 mb-2 leading-tight py-2 px-2 rounded-md bg-gray-100/70 dark:bg-gray-900/40 w-full"
    >
      My Experience Contributing to Open Source
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      I am currently new to open source, so I am trying to learn more about the
      plans of a particular repository, understand its codebase, and more. In
      terms of pull requests(PRs), I have mainly contributed to
      <strong class="font-bold text-indigo-700 dark:text-indigo-300"
        >SymPy</strong
      >
      and
      <strong class="font-bold text-indigo-700 dark:text-indigo-300"
        >Wagtail</strong
      >
      (a CMS library).
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      From here, I'll share what I've learned from working with SymPy, as that
      has been my primary area of interest. When I first started contributing, I
      felt
      <em
        class="italic bg-indigo-50/50 dark:bg-indigo-900/10 px-2 py-0.5 rounded inline-block"
        >overwhelmed by the codebase</em
      >, especially since I had no prior work experience. Later, I discovered
      that even people with years of experience often take months to adjust to a
      new library or technology. Now, that makes complete sense. For example,
      shifting from a web-focused library to something machine learning-related
      involves a drastic change in coding practices. Over time, you become more
      familiar with the library.
      <strong class="font-bold text-indigo-700 dark:text-indigo-300"
        >One of the fastest ways to do so is by trying to fix bugs.</strong
      >
      Debugging forces you to explore different modules in the repository, which
      helps you build a mental map of how the different parts are connected.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      Once I became familiar with a large portion of the codebase, I decided to
      plan a bigger project. Initially, I proposed adding support for solving
      second-order partial differential equations. To my surprise, the idea was
      rejected—not because it was a bad idea, but because it lacked sufficient
      applications and use cases within the library. From that experience, I
      learned two very important lessons (these are my personal takeaways):
    </p>

    <ul
      class="py-1 sm:py-2 px-3 sm:px-4 md:px-6 my-1 sm:my-2 mb-4 sm:mb-6 mx-1 sm:mx-2 md:mx-4 rounded-lg bg-indigo-50/30 dark:bg-indigo-900/5 w-full sm:w-[95%] list-outside"
    >
      <li
        class="relative leading-6 sm:leading-6 ml-3 sm:ml-4 pb-1 sm:pb-2 pl-1 list-disc"
      >
        <p
          class="mb-1 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 tracking-[0.01em] sm:tracking-[0.015em] inline-block align-top"
        >
          You can't overload a repository with niche features that have little
          to no user demand. It increases the package size without providing
          much value.
        </p>
      </li>
      <li
        class="relative leading-6 sm:leading-6 ml-3 sm:ml-4 pb-1 sm:pb-2 pl-1 list-disc"
      >
        <p
          class="mb-1 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 tracking-[0.01em] sm:tracking-[0.015em] inline-block align-top"
        >
          In open source, resources are limited. Every contributor wants their
          efforts to have meaningful impact. Since most contributors have other
          commitments, they prefer to work on areas where their work will
          actually be used.
        </p>
      </li>
    </ul>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      Eventually, I decided to work on developing a domain for FPS Ring. Rather
      than focusing on why I chose this project, I want to share how I selected
      it. As of now, SymPy has a well-developed series module, but one major
      bottleneck is the speed of series expansion. In GSoC 2015, Shivam Vats
      improved this by introducing ring_series in the polys module, which is
      significantly faster compared to the global series implementation in
      SymPy. However, this came at the cost of user-friendly syntax.
      Additionally, the master function of ring_series, which is rs_series, uses
      raw expressions instead of structured data types like Poly. In calculus,
      we learn series much like polynomials—the operations we apply to
      polynomials can be applied to series as well. So, my goal was to maintain
      both speed and improve ease of use for users.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      <strong class="font-bold text-indigo-700 dark:text-indigo-300"
        >Key Takeaway</strong
      >
      you can take from this when working on any open-source project, the two
      main goals should be:
    </p>

    <ul
      class="py-1 sm:py-2 px-3 sm:px-4 md:px-6 my-1 sm:my-2 mb-4 sm:mb-6 mx-1 sm:mx-2 md:mx-4 rounded-lg bg-indigo-50/30 dark:bg-indigo-900/5 w-full sm:w-[95%] list-outside"
    >
      <li
        class="relative leading-6 sm:leading-6 ml-3 sm:ml-4 pb-1 sm:pb-2 pl-1 list-disc"
      >
        <p
          class="mb-1 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 tracking-[0.01em] sm:tracking-[0.015em] inline-block align-top"
        >
          Performance (speed)
        </p>
      </li>
      <li
        class="relative leading-6 sm:leading-6 ml-3 sm:ml-4 pb-1 sm:pb-2 pl-1 list-disc"
      >
        <p
          class="mb-1 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 tracking-[0.01em] sm:tracking-[0.015em] inline-block align-top"
        >
          Ease of use (friendly syntax and interface)
        </p>
      </li>
    </ul>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      These are
      <em
        class="italic bg-indigo-50/50 dark:bg-indigo-900/10 px-2 py-0.5 rounded inline-block"
        >crucial reasons</em
      >
      why someone chooses to adopt and continue using your project.
    </p>

    <p
      class="font-bold text-xl sm:text-3xl md:text-3xl lg:text-4xl mt-6 mb-2 leading py-2 px-2 rounded-md bg-gray-100/70 dark:bg-gray-900/40 w-full"
    >
      Tips on Open Source
    </p>

    <p
      class="pt-2 font-bold text-lg sm:text-xl md:text-xl lg:text-2xl leading-snug text-gray-800 dark:text-gray-200 border-b border-dashed border-gray-200 dark:border-gray-700 w-full"
    >
      1. Empathy and Sympathy Towards Others
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      One of the best things you can do when engaging with others is to have
      <strong class="font-bold text-indigo-700 dark:text-indigo-300"
        >empathy</strong
      >. A lot of people believe that being clear about your thoughts and having
      strong communication skills is what matters most. While that's important,
      I believe that having empathy can take your conversations much further and
      lead to better outcomes.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      Let me give you an analogy: in life, it's often difficult to truly feel
      empathy for others because it requires self-reflection and the ability to
      put yourself in someone else's shoes. But in a profession like tech—where
      we are constantly learning and encountering new challenges—it becomes
      easier to relate.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      We've all been there: asking questions that might seem "dumb," suggesting
      ideas that don't quite work. If you're lucky, you'll have mentors who
      guide you and explain why something won't work or isn't needed, without
      making you feel lesser for asking.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty italic text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-900/40 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-300 p-3 sm:p-4 rounded-lg shadow-sm hover:shadow border-b border-dashed border-gray-200 dark:border-gray-700 w-full relative overflow-hidden"
    >
      <span
        class="absolute inset-0 bg-gradient-to-r from-indigo-50/40 dark:from-indigo-900/10 to-white/0 dark:to-gray-900/0 -z-10"
      ></span>
      <em
        class="italic bg-indigo-50/50 dark:bg-indigo-900/10 px-2 py-0.5 rounded inline-block"
        >Keep this in mind when you seek help:</em
      >
      ask politely and wait patiently for a response. And if you see someone new
      trying to find their footing, take the time to help them get onboard. It
      creates a better, more welcoming community for everyone.
    </p>

    <p
      class="pt-2 font-bold text-lg sm:text-xl md:text-xl lg:text-2xl mt-6 mb-3 leading-snug text-gray-800 dark:text-gray-200 border-b border-dashed border-gray-200 dark:border-gray-700 w-full"
    >
      2. Reading Matters
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      This point might seem obvious—many people talk about it—but it's still
      important no matter how many times you hear it. These days, with so many
      video tutorials available, we often avoid reading and jump straight to
      watching content. Platforms like YouTube have made educational content
      more accessible, but
      <strong class="font-bold text-indigo-700 dark:text-indigo-300"
        >relying only on videos can be limiting</strong
      >. If you try reading a technical or math-related article after a long
      time, you might find it difficult to follow.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      This becomes a bigger issue in open source, where most libraries aren't
      very mainstream. There usually aren't full video courses or detailed
      tutorials covering them. And even when you do find something, it often
      only explains a small part of the entire codebase.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty italic text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-900/40 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-300 p-3 sm:p-4 rounded-lg shadow-sm hover:shadow border-b border-dashed border-gray-200 dark:border-gray-700 w-full relative overflow-hidden"
    >
      <span
        class="absolute inset-0 bg-gradient-to-r from-indigo-50/40 dark:from-indigo-900/10 to-white/0 dark:to-gray-900/0 -z-10"
      ></span>
      In open source, you'll spend a lot of time reading—whether it's
      documentation, source code, GitHub issues, or mailing list discussions. So
      be prepared:
      <em
        class="italic bg-indigo-50/50 dark:bg-indigo-900/10 px-2 py-0.5 rounded inline-block"
        >reading is a big part of the process, and there's a lot of it to
        do.</em
      >
    </p>

    <p
      class="pt-2 font-bold text-lg sm:text-xl md:text-xl lg:text-2xl mt-6 mb-3 leading-snug text-gray-800 dark:text-gray-200 border-b border-dashed border-gray-200 dark:border-gray-700 w-full"
    >
      3. Write a Clear Pull Request Description
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      This is a very important step whenever you're contributing a patch or
      introducing something new to a library. In many repositories, you'll often
      see new contributors opening pull requests with empty or unclear
      descriptions. This is not a good practice.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      Remember, the reviewer is there to review your changes, not to guess what
      you're trying to do. In the description, you should clearly explain:
    </p>

    <ul
      class="py-1 sm:py-2 px-3 sm:px-4 md:px-6 my-1 sm:my-2 mb-4 sm:mb-6 mx-1 sm:mx-2 md:mx-4 rounded-lg bg-indigo-50/30 dark:bg-indigo-900/5 w-full sm:w-[95%] list-outside"
    >
      <li
        class="relative leading-6 sm:leading-6 ml-3 sm:ml-4 pb-1 sm:pb-2 pl-1 list-disc"
      >
        <p
          class="mb-1 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 tracking-[0.01em] sm:tracking-[0.015em] inline-block align-top"
        >
          What changes you've made
        </p>
      </li>
      <li
        class="relative leading-6 sm:leading-6 ml-3 sm:ml-4 pb-1 sm:pb-2 pl-1 list-disc"
      >
        <p
          class="mb-1 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 tracking-[0.01em] sm:tracking-[0.015em] inline-block align-top"
        >
          Why you've made them
        </p>
      </li>
      <li
        class="relative leading-6 sm:leading-6 ml-3 sm:ml-4 pb-1 sm:pb-2 pl-1 list-disc"
      >
        <p
          class="mb-1 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 tracking-[0.01em] sm:tracking-[0.015em] inline-block align-top"
        >
          What the motivation is behind the change
        </p>
      </li>
      <li
        class="relative leading-6 sm:leading-6 ml-3 sm:ml-4 pb-1 sm:pb-2 pl-1 list-disc"
      >
        <p
          class="mb-1 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 tracking-[0.01em] sm:tracking-[0.015em] inline-block align-top"
        >
          Any resources or links that support your changes
        </p>
      </li>
    </ul>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      If you don't provide a good description, it not only delays the time it
      takes to merge your patch, but also increases the chance that the reviewer
      might fix the issue themselves rather than reviewing your work—especially
      if they don't have enough context from your PR.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      A good tip is to look at the PRs made by maintainers or experienced
      contributors. This helps you understand what kind of details are important
      to mention.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      Clear PR descriptions also help future contributors understand why a
      change was made when they look back through the project's history.
    </p>

    <h3
      class="font-bold text-xl sm:text-2xl md:text-2xl lg:text-3xl mt-6 mb-3 leading-snug text-gray-800 dark:text-gray-200 border-b border-dashed border-gray-200 dark:border-gray-700 w-full"
    >
      GSoC-Specific Tip
    </h3>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      Most of the time, you can find
      <strong class="font-bold text-indigo-700 dark:text-indigo-300"
        >potential project ideas</strong
      >
      from personal blogs or articles written by repository members or mentors.
      These ideas are often based on individual opinions and preferences, so
      they might not be discussed openly or prominently in the repository
      itself.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      However, since these members usually have significant experience with the
      library, they often have a good sense of its future direction.
      <em
        class="italic bg-indigo-50/50 dark:bg-indigo-900/10 px-2 py-0.5 rounded inline-block"
        >Exploring their writings can give you valuable insights and help you
        identify strong ideas to propose for GSoC.</em
      >
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      This is a more niche way to find potential projects, which is why I
      mentioned it. Of course, you can always find more ideas through the usual,
      general methods as well.
    </p>

    <blockquote
      class="relative p-4 sm:p-5 md:p-7 my-6 sm:my-8 mx-auto rounded-lg sm:rounded-xl md:rounded-2xl w-full sm:w-[95%] max-w-full shadow-md sm:shadow-lg overflow-hidden z-10 border border-white/25 dark:border-indigo-800/30 transform transition-transform duration-200 ease-in-out hover:-translate-y-0.5 bg-white/60 dark:bg-gray-900/65 backdrop-blur-md hover:shadow-xl"
    >
      <p
        class="mb-0 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty"
      >
        <strong class="text-indigo-700 dark:text-indigo-300 font-bold"
          >Note</strong
        >: The order of the sections matters. However, keep in mind that
        everything shared here is based on my personal opinions.
      </p>
      <div
        class="absolute inset-0 -z-10 bg-gradient-radial from-indigo-200/30 dark:from-indigo-800/40 to-transparent opacity-50 sm:opacity-60"
      ></div>
    </blockquote>
  </div>
</template>

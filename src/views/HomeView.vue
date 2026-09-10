<script setup>
import { ref, computed, onMounted } from "vue";
import projects from "../data/projects";

// Project filtering logic
const activeFilter = ref("all");

const setFilter = (category) => {
  activeFilter.value = category;
};

const filteredProjects = computed(() => {
  if (activeFilter.value === "all") return projects;
  if (activeFilter.value === "math") {
    return projects.filter(
      (p) => p.category === "ML/AI" || p.category === "Open Source"
    );
  }
  if (activeFilter.value === "systems") {
    return projects.filter((p) => p.category === "Web Dev");
  }
  return projects;
});

// Accordion toggle states for contributions
const expandedContributions = ref({
  pgmpy: false,
  sympy: false,
});

const toggleContribution = (key) => {
  expandedContributions.value[key] = !expandedContributions.value[key];
};

const expandedProjects = ref({});
const toggleProjectDetails = (id) => {
  expandedProjects.value[id] = !expandedProjects.value[id];
};

const getLinkLabel = (type) => {
  const labels = {
    github: "GitHub",
    kaggle: "Kaggle",
    drive: "Google Docs",
    figma: "Figma",
    gsoc: "GSoC",
    hfspace: "HF Space",
    colab: "Colab Notebook",
    blog_bootstrap: "Bootstrap Blog",
    blog_ilp: "ILP Blog",
    blog: "Blog Post",
  };
  return labels[type] || type;
};

const getLinkClass = (type) => {
  const t = type.toLowerCase();
  if (t === 'github') return 'hover:text-gruv-green hover:underline';
  if (t === 'colab') return 'hover:text-gruv-orange hover:underline';
  if (t === 'hfspace') return 'hover:text-gruv-yellow hover:underline';
  if (t === 'gsoc') return 'hover:text-gruv-blue hover:underline';
  if (t === 'drive') return 'hover:text-gruv-aqua hover:underline';
  if (t === 'figma') return 'hover:text-gruv-purple hover:underline';
  if (t === 'blog_bootstrap' || t === 'blog_ilp' || t === 'blog') return 'hover:text-gruv-accent hover:underline';
  return 'hover:text-gruv-accent hover:underline';
};

// Typewriter effect for terminal title
const typedText = ref("");
const fullText = "Jatin Bhardwaj";

onMounted(() => {
  let i = 0;
  const type = () => {
    if (i < fullText.length) {
      typedText.value += fullText.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  };
  type();
});
</script>

<template>
  <div class="space-y-20 md:space-y-28 w-full max-w-5xl mx-auto">
    <!-- Hero Section: Terminal Console -->
    <section id="about" class="pt-6 md:pt-10">
      <div class="border border-gruv-border rounded-xl overflow-hidden bg-gruv-card/35 backdrop-blur-sm shadow-sm w-full transition-all duration-300">
        <!-- Terminal window header bar -->
        <div class="bg-gruv-card/80 px-4 py-2.5 flex items-center justify-between border-b border-gruv-border select-none">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-gruv-red"></div>
            <div class="w-3 h-3 rounded-full bg-gruv-yellow"></div>
            <div class="w-3 h-3 rounded-full bg-gruv-green"></div>
            <span class="ml-3 font-mono text-[11px] text-gruv-muted tracking-wider">zsh - jatin@portfolio</span>
          </div>
          <div class="hidden sm:flex items-center gap-1 text-[10px] font-mono text-gruv-muted">
            <span class="w-1.5 h-1.5 rounded-full bg-gruv-green animate-pulse"></span>
            <span>active</span>
          </div>
        </div>
        
        <!-- Interior Grid -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 md:p-8 items-center">
          <!-- Text Content -->
          <div class="md:col-span-8 space-y-5 order-2 md:order-1">
            <div class="flex items-center gap-2 font-mono text-xs text-gruv-orange">
              <span class="text-gruv-green font-bold">➜</span>
              <span class="text-gruv-muted">~</span>
              <span class="text-gruv-fg font-medium">whoami</span>
            </div>
            
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gruv-fg leading-none min-h-[48px] flex items-center font-mono">
              <span>{{ typedText }}</span>
              <span class="w-2.5 h-7 sm:h-8 bg-gruv-accent ml-1.5 animate-pulse inline-block"></span>
            </h1>

            <div class="space-y-3">
              <p class="mono-text text-xs tracking-widest text-gruv-muted uppercase font-medium">
                MACHINE LEARNING & SYMBOLIC SYSTEMS
              </p>
              <p class="max-w-2xl text-gruv-fg text-sm sm:text-base font-light leading-relaxed">
                Developer and researcher specializing in causal discovery, explainable machine learning, and exact algebraic computing. Through research mentorships with 
                <span class="text-gruv-accent font-medium border-b border-gruv-accent/30 hover:border-gruv-accent transition-colors">pgmpy</span> and 
                <span class="text-gruv-accent font-medium border-b border-gruv-accent/30 hover:border-gruv-accent transition-colors">SymPy</span> (GSoC '25), 
                I build structural causal learning algorithms, bootstrap estimators, and high-precision arithmetic systems.
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-gruv-fg">
              <a 
                href="https://github.com/Jatinbhardwaj-093" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gruv-border/60 bg-gruv-card/40 hover:border-gruv-green hover:text-gruv-green transition-all"
              >
                <i class="bi bi-github"></i>
                <span>[GitHub]</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/jatin-bhardwaj093/" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gruv-border/60 bg-gruv-card/40 hover:border-gruv-blue hover:text-gruv-blue transition-all"
              >
                <i class="bi bi-linkedin"></i>
                <span>[LinkedIn]</span>
              </a>
              <span class="text-gruv-muted hidden sm:inline">|</span>
              <div class="inline-flex items-center gap-2 text-gruv-muted">
                <span class="inline-block w-2 h-2 rounded-full bg-gruv-green animate-pulse"></span>
                <span>Available for core engineering roles</span>
              </div>
            </div>
          </div>

          <!-- Profile Portrait -->
          <div class="md:col-span-4 flex justify-center md:justify-end order-1 md:order-2">
            <div class="relative w-44 aspect-[4/5] sm:w-52 md:w-full max-w-[230px] group">
              <div class="absolute -inset-1 rounded-xl bg-gradient-to-tr from-gruv-accent/15 to-transparent blur-sm opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <img 
                src="../assets/images/profileImage/myimage_light.jpg" 
                alt="Jatin Bhardwaj" 
                class="relative z-10 w-full h-full object-cover rounded-xl border border-gruv-border/60 shadow-sm dark:hidden"
              />
              <img 
                src="../assets/images/profileImage/myimage_dark.jpg" 
                alt="Jatin Bhardwaj" 
                class="relative z-10 w-full h-full object-cover rounded-xl border border-gruv-border/60 shadow-sm hidden dark:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Focus Areas -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
      <div class="p-3.5 sm:p-4 rounded-xl border border-gruv-border bg-gruv-card/50 backdrop-blur-sm shadow-sm relative overflow-hidden group hover:border-gruv-accent transition-all duration-300">
        <div class="flex items-center justify-between">
          <span class="mono-text text-[9px] text-gruv-accent uppercase tracking-widest font-semibold">// FOCUS_01</span>
          <span class="text-[9px] text-gruv-muted font-mono px-1.5 py-0.5 rounded border border-gruv-border bg-gruv-card/60">ML</span>
        </div>
        <p class="text-base sm:text-lg font-bold tracking-tight text-gruv-fg font-mono mt-2">
          Causal Learning
        </p>
        <p class="text-[11px] text-gruv-muted leading-tight mt-1">Machine learning & structure discovery</p>
      </div>

      <div class="p-3.5 sm:p-4 rounded-xl border border-gruv-border bg-gruv-card/50 backdrop-blur-sm shadow-sm relative overflow-hidden group hover:border-gruv-accent transition-all duration-300">
        <div class="flex items-center justify-between">
          <span class="mono-text text-[9px] text-gruv-accent uppercase tracking-widest font-semibold">// FOCUS_02</span>
          <span class="text-[9px] text-gruv-muted font-mono px-1.5 py-0.5 rounded border border-gruv-border bg-gruv-card/60">XAI</span>
        </div>
        <p class="text-base sm:text-lg font-bold tracking-tight text-gruv-fg font-mono mt-2">
          Explainable AI
        </p>
        <p class="text-[11px] text-gruv-muted leading-tight mt-1">Model interpretability & uncertainty</p>
      </div>

      <div class="p-3.5 sm:p-4 rounded-xl border border-gruv-border bg-gruv-card/50 backdrop-blur-sm shadow-sm relative overflow-hidden group hover:border-gruv-accent transition-all duration-300">
        <div class="flex items-center justify-between">
          <span class="mono-text text-[9px] text-gruv-accent uppercase tracking-widest font-semibold">// FOCUS_03</span>
          <span class="text-[9px] text-gruv-muted font-mono px-1.5 py-0.5 rounded border border-gruv-border bg-gruv-card/60">SYSTEMS</span>
        </div>
        <p class="text-base sm:text-lg font-bold tracking-tight text-gruv-fg font-mono mt-2">
          High-Precision Math
        </p>
        <p class="text-[11px] text-gruv-muted leading-tight mt-1">Arbitrary precision & fast algorithms</p>
      </div>

      <div class="p-3.5 sm:p-4 rounded-xl border border-gruv-border bg-gruv-card/50 backdrop-blur-sm shadow-sm relative overflow-hidden group hover:border-gruv-accent transition-all duration-300">
        <div class="flex items-center justify-between">
          <span class="mono-text text-[9px] text-gruv-accent uppercase tracking-widest font-semibold">// FOCUS_04</span>
          <span class="text-[9px] text-gruv-muted font-mono px-1.5 py-0.5 rounded border border-gruv-border bg-gruv-card/60">THEORY</span>
        </div>
        <p class="text-base sm:text-lg font-bold tracking-tight text-gruv-fg font-mono mt-2">
          Math & Optimization
        </p>
        <p class="text-[11px] text-gruv-muted leading-tight mt-1">Mathematical logic & optimization</p>
      </div>
    </section>

    <!-- Mentorships & Engineering Experience -->
    <section id="experience" class="space-y-6 scroll-mt-20">
      <span id="contributions" class="hidden"></span>
      <div class="space-y-1">
        <h2 class="mono-text text-xs text-gruv-muted tracking-widest uppercase font-medium">// EXPERIENCE_LOGS</h2>
        <h3 class="text-2xl font-semibold tracking-tight text-gruv-fg">Mentorships & Engineering Experience</h3>
      </div>

      <div class="relative pl-7 space-y-6 max-w-4xl">
        <!-- Continuous timeline vertical spine -->
        <div class="absolute left-[11px] top-6 bottom-6 w-[2px] bg-gruv-border"></div>

        <!-- Item 1: pgmpy -->
        <div class="relative">
          <!-- Timeline dot precisely centered on spine -->
          <span class="absolute -left-[24px] top-6 flex h-4 w-4 items-center justify-center rounded-full bg-gruv-bg border-2 border-gruv-accent z-10 shadow-sm">
            <span class="h-1.5 w-1.5 rounded-full bg-gruv-accent"></span>
          </span>

          <div class="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 bg-gruv-card/50 border border-gruv-border rounded-xl p-5 md:p-6 shadow-sm hover:border-gruv-accent hover:bg-gruv-card/70 transition-all duration-300">
            <div class="md:col-span-4 space-y-2">
              <span class="mono-text text-xs text-gruv-accent font-mono font-semibold tracking-wider">[JUN 2026 - SEPT 2026]</span>
              <h4 class="font-semibold text-base text-gruv-fg">pgmpy Mentorship</h4>
              <p class="text-[11px] text-gruv-muted font-mono">Research Mentorship (12 Weeks)</p>
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="tech-badge">Causal Discovery</span>
                <span class="tech-badge">ILP Optimization</span>
                <span class="tech-badge">Python</span>
              </div>
            </div>
            
            <div class="md:col-span-8 space-y-3">
              <p class="text-sm text-gruv-muted font-light leading-relaxed">
                Designed and implemented the <strong class="text-gruv-fg font-medium">Bootstrap Estimator</strong> for edge confidence and uncertainty estimation across DAGs, PDAGs, and PAGs, and formulated optimal causal discovery using <strong class="text-gruv-fg font-medium">Integer Linear Programming (ILPSearch)</strong> with cluster-based acyclicity constraints.
              </p>
              
              <!-- Accordion Toggle -->
              <div class="pt-1">
                <button 
                  @click="toggleContribution('pgmpy')"
                  class="btn-details flex items-center gap-1 focus:outline-none"
                >
                  <span>{{ expandedContributions.pgmpy ? '[-]' : '[+]' }}</span>
                  <span>{{ expandedContributions.pgmpy ? 'hide_details' : 'view_details' }}</span>
                </button>

                <transition name="page-fade">
                  <div v-if="expandedContributions.pgmpy" class="mt-3 space-y-3">
                    <ul class="space-y-2 text-xs text-gruv-fg dark:text-gruv-muted font-mono bg-gruv-card/70 p-3 rounded-lg border border-gruv-border">
                      <li class="flex items-start gap-2">
                        <span class="text-gruv-accent font-bold">•</span>
                        <span>Designed non-parametric BootstrapEstimator for edge confidence and structural uncertainty across DAGs, PDAGs, and PAGs</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="text-gruv-accent font-bold">•</span>
                        <span>Formulated optimal causal discovery via Integer Linear Programming (ILPSearch) with cluster acyclicity constraints and L0 regularization</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="text-gruv-accent font-bold">•</span>
                        <span>Engineered dynamic thresholding and graph consensus aggregation mechanisms without model refitting</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="text-gruv-accent font-bold">•</span>
                        <span>Conducted empirical benchmarks across standard solvers (CBC, SCIP, GLPK) on synthetic and ground-truth causal graphs</span>
                      </li>
                    </ul>

                    <!-- Blog Deep-Dive Links -->
                    <div class="flex flex-wrap items-center gap-3 font-mono text-xs pt-1">
                      <router-link 
                        to="/blog/bootstrap-estimator" 
                        class="inline-flex items-center gap-1 text-gruv-accent hover:underline"
                      >
                        <i class="bi bi-book text-[11px]"></i>
                        <span>[Read Blog: Bootstrap Estimator]</span>
                      </router-link>
                      <router-link 
                        to="/blog/ilp-causal-discovery" 
                        class="inline-flex items-center gap-1 text-gruv-accent hover:underline"
                      >
                        <i class="bi bi-book text-[11px]"></i>
                        <span>[Read Blog: ILP Causal Discovery]</span>
                      </router-link>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>

        <!-- Item 2: GSoC @ SymPy -->
        <div class="relative">
          <!-- Timeline dot precisely centered on spine -->
          <span class="absolute -left-[24px] top-6 flex h-4 w-4 items-center justify-center rounded-full bg-gruv-bg border-2 border-gruv-accent z-10 shadow-sm">
            <span class="h-1.5 w-1.5 rounded-full bg-gruv-accent"></span>
          </span>

          <div class="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 bg-gruv-card/50 border border-gruv-border rounded-xl p-5 md:p-6 shadow-sm hover:border-gruv-accent hover:bg-gruv-card/70 transition-all duration-300">
            <div class="md:col-span-4 space-y-2">
              <span class="mono-text text-xs text-gruv-accent font-mono font-semibold tracking-wider">[JUN 2025 - SEPT 2025]</span>
              <h4 class="font-semibold text-base text-gruv-fg">GSoC @ SymPy</h4>
              <p class="text-[11px] text-gruv-muted font-mono">GSoC '25 Student Developer & Mentee (12 Weeks)</p>
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="tech-badge">GSoC '25</span>
                <span class="tech-badge">Power Series Ring</span>
                <span class="tech-badge">Flint Interop</span>
                <span class="tech-badge">Python</span>
              </div>
            </div>

            <div class="md:col-span-8 space-y-3">
              <p class="text-sm text-gruv-muted font-light leading-relaxed">
                Architected and implemented the new <strong class="text-gruv-fg font-medium">Power Series Ring Module</strong> (`sympy.polys.series`) from scratch, designing core ring, element, and domain abstractions and implementing fast series algorithms with <strong class="text-gruv-fg font-medium">Fast Lagrange Inversion</strong>.
              </p>

              <!-- Accordion Toggle -->
              <div class="pt-1">
                <button 
                  @click="toggleContribution('sympy')"
                  class="btn-details flex items-center gap-1 focus:outline-none"
                >
                  <span>{{ expandedContributions.sympy ? '[-]' : '[+]' }}</span>
                  <span>{{ expandedContributions.sympy ? 'hide_details' : 'view_details' }}</span>
                </button>

                <transition name="page-fade">
                  <div v-if="expandedContributions.sympy" class="mt-3 space-y-3">
                    <ul class="space-y-2 text-xs text-gruv-fg dark:text-gruv-muted font-mono bg-gruv-card/70 p-3 rounded-lg border border-gruv-border">
                      <li class="flex items-start gap-2">
                        <span class="text-gruv-accent font-bold">•</span>
                        <span>Designed PowerSeriesRing, PowerSeriesElement (with explicit Order O(x^n) truncation), and Series domain in sympy.polys.series</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="text-gruv-accent font-bold">•</span>
                        <span>Implemented Fast Lagrange Inversion (Fredrik Johansson's baby-step giant-step algorithm) for fast compositional series reversion without Newton iteration</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="text-gruv-accent font-bold">•</span>
                        <span>Implemented Karatsuba multiplication with adaptive truncation, divide-and-conquer composition, series division, and transcendental expansions (log, exp, tan)</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="text-gruv-accent font-bold">•</span>
                        <span>Structured univariate series representations aligned with python-flint (fmpz_series, fmpq_series) for seamless C-level interop</span>
                      </li>
                    </ul>

                    <!-- Blog & Project Links -->
                    <div class="flex flex-wrap items-center gap-3 font-mono text-xs pt-1">
                      <router-link 
                        to="/blogs" 
                        class="inline-flex items-center gap-1 text-gruv-accent hover:underline"
                      >
                        <i class="bi bi-book text-[11px]"></i>
                        <span>[Read GSoC '25 Blog Series]</span>
                      </router-link>
                      <a 
                        href="https://github.com/sympy/sympy/wiki/GSoC-2025-Report-Jatin-Bhardwaj:-%22A-New-Power-Series-Ring-Module-for-SymPy%22" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="inline-flex items-center gap-1 text-gruv-muted hover:text-gruv-accent transition-colors"
                      >
                        <i class="bi bi-arrow-up-right text-[10px]"></i>
                        <span>[Final Wiki Report]</span>
                      </a>
                      <a 
                        href="https://github.com/sympy/sympy/pulls?q=is%3Apr+author%3AJatinbhardwaj-093+is%3Amerged+created%3A2025-06-01..2025-08-31" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="inline-flex items-center gap-1 text-gruv-muted hover:text-gruv-accent transition-colors"
                      >
                        <i class="bi bi-arrow-up-right text-[10px]"></i>
                        <span>[Merged PRs]</span>
                      </a>
                      <a 
                        href="https://summerofcode.withgoogle.com/programs/2025/projects/8VslkGZ9" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="inline-flex items-center gap-1 text-gruv-muted hover:text-gruv-accent transition-colors"
                      >
                        <i class="bi bi-arrow-up-right text-[10px]"></i>
                        <span>[GSoC Project Page]</span>
                      </a>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Selected Projects Section -->
    <section id="projects" class="space-y-8">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div class="space-y-1">
          <h2 class="mono-text text-xs text-gruv-muted tracking-widest uppercase font-medium">Selected Works</h2>
          <h3 class="text-2xl font-semibold tracking-tight text-gruv-fg">Engineering Portfolio</h3>
        </div>
        
        <!-- Filter Controls -->
        <div class="flex items-center gap-1.5 font-mono text-xs border border-gruv-border p-1 rounded-full bg-gruv-card/40 backdrop-blur-sm">
          <button 
            @click="setFilter('all')"
            class="px-3 py-1 rounded-full transition-all cursor-pointer"
            :class="activeFilter === 'all' 
              ? 'filter-btn-active' 
              : 'text-gruv-muted hover:text-gruv-fg'"
          >
            All
          </button>
          <button 
            @click="setFilter('math')"
            class="px-3 py-1 rounded-full transition-all cursor-pointer"
            :class="activeFilter === 'math' 
              ? 'filter-btn-active' 
              : 'text-gruv-muted hover:text-gruv-fg'"
          >
            Algorithms/Math
          </button>
          <button 
            @click="setFilter('systems')"
            class="px-3 py-1 rounded-full transition-all cursor-pointer"
            :class="activeFilter === 'systems' 
              ? 'filter-btn-active' 
              : 'text-gruv-muted hover:text-gruv-fg'"
          >
            Systems/Web
          </button>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="projectsGrid">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card border border-gruv-border rounded-xl p-5 md:p-6 bg-gruv-card/50 backdrop-blur-sm shadow-sm flex flex-col justify-between group hover:border-gruv-accent hover:bg-gruv-card/70 transition-all duration-300 relative overflow-hidden"
        >
          <div class="space-y-3.5">
            <div class="flex justify-between items-center">
              <span class="mono-text text-[10px] text-gruv-muted uppercase tracking-wider">
                // {{ project.subtitle }}
              </span>
              <span class="text-[9px] font-mono text-gruv-muted px-2 py-0.5 rounded-full border border-gruv-border bg-gruv-card uppercase">
                {{ project.category }}
              </span>
            </div>

            <h4 class="text-lg font-semibold tracking-tight text-gruv-fg group-hover:text-gruv-accent transition-colors duration-300 font-mono">
              {{ project.title }}
            </h4>

            <p class="text-xs text-gruv-muted font-light leading-relaxed">
              {{ project.description }}
            </p>

            <!-- Clickable Details Accordion Toggle -->
            <div v-if="project.features && project.features.length" class="pt-1">
              <button 
                @click="toggleProjectDetails(project.id)"
                class="btn-details flex items-center gap-1 focus:outline-none"
              >
                <span>{{ expandedProjects[project.id] ? '[-]' : '[+]' }}</span>
                <span>{{ expandedProjects[project.id] ? 'hide_details' : 'view_details' }}</span>
              </button>

              <transition name="page-fade">
                <ul v-if="expandedProjects[project.id]" class="mt-3 space-y-2 text-xs text-gruv-fg dark:text-gruv-muted font-mono bg-gruv-card/70 p-3 rounded-lg border border-gruv-border">
                  <li v-for="feat in project.features" :key="feat" class="flex items-start gap-2">
                    <span class="text-gruv-accent font-bold">•</span>
                    <span>{{ feat }}</span>
                  </li>
                </ul>
              </transition>
            </div>
          </div>

          <!-- Technologies badges -->
          <div class="flex flex-wrap gap-1.5 mt-5">
            <span 
              v-for="tech in project.technologies" 
              :key="tech"
              class="tech-badge"
            >
              {{ tech }}
            </span>
          </div>

          <!-- Action links -->
          <div class="flex flex-wrap gap-4 mt-5 border-t border-gruv-border pt-3.5 font-mono text-[11px]">
            <template v-for="(url, type) in project.links" :key="type">
              <a 
                v-if="url.startsWith('http')"
                :href="url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-gruv-muted transition-colors hover:text-gruv-accent"
              >
                <i class="bi bi-arrow-up-right text-[10px]"></i>
                <span class="hover:underline underline-offset-2">{{ getLinkLabel(type) }}</span>
              </a>
              <router-link
                v-else
                :to="url"
                class="inline-flex items-center gap-1 text-gruv-muted transition-colors hover:text-gruv-accent"
              >
                <i class="bi bi-book text-[10px]"></i>
                <span class="hover:underline underline-offset-2">{{ getLinkLabel(type) }}</span>
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Skill Grid -->
    <section class="space-y-8 border-t border-gruv-border pt-12">
      <div class="space-y-1">
        <h2 class="mono-text text-xs text-gruv-muted tracking-widest uppercase font-medium">Competencies</h2>
        <h3 class="text-2xl font-semibold tracking-tight text-gruv-fg">Capability Matrix</h3>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-xs">
        <!-- Col 1 -->
        <div class="space-y-3 pl-4 border-l-2 border-gruv-border">
          <h4 class="text-gruv-purple font-semibold tracking-wider">// SYSTEMS & ALGORITHMS</h4>
          <ul class="space-y-2 text-gruv-muted">
            <li class="hover:text-gruv-fg transition-colors">Causal Discovery & Graph Models</li>
            <li class="hover:text-gruv-fg transition-colors">Computer Algebra & Symbolic Computing</li>
            <li class="hover:text-gruv-fg transition-colors">Explainable AI (XAI)</li>
            <li class="hover:text-gruv-fg transition-colors">Time Series Forecasting & Analysis</li>
            <li class="hover:text-gruv-fg transition-colors">Parameter Estimation & Optimization</li>
            <li class="hover:text-gruv-fg transition-colors">Statistical Uncertainty Quantification</li>
          </ul>
        </div>
        <!-- Col 2 -->
        <div class="space-y-3 pl-4 border-l-2 border-gruv-border">
          <h4 class="text-gruv-purple font-semibold tracking-wider">// LANGUAGES & RUNTIMES</h4>
          <ul class="space-y-2 text-gruv-muted">
            <li class="hover:text-gruv-fg transition-colors">Python (Advanced)</li>
            <li class="hover:text-gruv-fg transition-colors">C / C++ (Data Structures & Algos)</li>
            <li class="hover:text-gruv-fg transition-colors">Cython (Performance Extensions)</li>
            <li class="hover:text-gruv-fg transition-colors">UNIX & Shell Environments</li>
          </ul>
        </div>
        <!-- Col 3 -->
        <div class="space-y-3 pl-4 border-l-2 border-gruv-border">
          <h4 class="text-gruv-purple font-semibold tracking-wider">// ENGINEERING & COLLABORATION</h4>
          <ul class="space-y-2 text-gruv-muted">
            <li class="hover:text-gruv-fg transition-colors">Distributed Git Workflows</li>
            <li class="hover:text-gruv-fg transition-colors">Open Source CI/CD Pipelines</li>
            <li class="hover:text-gruv-fg transition-colors">Performance Backends & Bindings</li>
            <li class="hover:text-gruv-fg transition-colors">Sphinx & Sphinx-Gallery Documentation</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.project-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.project-card:hover {
  transform: translateY(-2px);
}
</style>

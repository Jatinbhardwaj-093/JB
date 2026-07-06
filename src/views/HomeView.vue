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
  <div class="space-y-24 w-full">
    <!-- Hero Section -->
    <section id="about" class="pt-8">
      <div class="border border-gruv-border rounded-lg overflow-hidden bg-gruv-card/30 backdrop-blur-sm shadow-md w-full">
        <!-- macOS window header bar -->
        <div class="bg-gruv-border/10 px-4 py-2.5 flex items-center gap-2 border-b border-gruv-border/80">
          <div class="w-3 h-3 rounded-full bg-gruv-red"></div>
          <div class="w-3 h-3 rounded-full bg-gruv-yellow"></div>
          <div class="w-3 h-3 rounded-full bg-gruv-green"></div>
          <span class="ml-4 font-mono text-[10px] text-gruv-muted tracking-wider">zsh — jatin@portfolio</span>
        </div>
        
        <!-- Unified Grid inside Terminal -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 md:p-8 items-center">
          <!-- Text Content -->
          <div class="md:col-span-8 space-y-6 order-2 md:order-1">
            <div class="flex items-center gap-2 font-mono text-xs text-gruv-orange">
              <span>➜</span>
              <span class="text-gruv-green">~</span>
              <span class="text-gruv-fg">whoami</span>
            </div>
            
            <h1 class="text-4xl md:text-5xl font-semibold tracking-tight text-gruv-fg leading-none min-h-[50px] flex items-center font-mono">
              <span>{{ typedText }}</span>
              <span class="w-2.5 h-7 bg-gruv-accent ml-1 animate-pulse"></span>
            </h1>

            <div class="space-y-4">
              <p class="mono-text text-xs tracking-widest text-gruv-muted uppercase font-medium">
                Software & Algorithmic Systems
              </p>
              <p class="max-w-2xl text-gruv-fg text-sm md:text-base font-light leading-relaxed">
                I am a developer and researcher focused on algebraic computation, causal discovery, and symbolic systems. I contribute to major open-source libraries like 
                <span class="text-gruv-accent font-semibold border-b border-gruv-accent/30">SymPy</span> 
                and 
                <span class="text-gruv-accent font-semibold border-b border-gruv-accent/30">pgmpy</span>, 
                translating complex theories into clean, high-performance systems.
              </p>
            </div>

            <div class="flex flex-wrap gap-4 pt-2 font-mono text-xs text-gruv-fg">
              <a 
                href="https://github.com/Jatinbhardwaj-093" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="flex items-center gap-1.5 hover:text-gruv-green transition-colors"
              >
                <span>[GitHub]</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/jatin-bhardwaj093/" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="flex items-center gap-1.5 hover:text-gruv-blue transition-colors"
              >
                <span>[LinkedIn]</span>
              </a>
              <span class="text-gruv-muted">|</span>
              <span class="flex items-center gap-1.5 text-gruv-muted">
                <span class="inline-block w-1.5 h-1.5 rounded-full bg-gruv-green animate-pulse"></span>
                Available for core engineering roles
              </span>
            </div>
          </div>

          <!-- Integrated Profile Photo -->
          <div class="md:col-span-4 flex justify-center md:justify-end order-1 md:order-2">
            <div class="relative w-44 aspect-[4/5] sm:w-52 md:w-full max-w-[240px]">
              <!-- Gradients and borders styling photo as a retro console element -->
              <div class="absolute inset-0 rounded-lg bg-gradient-to-tr from-gruv-accent/10 to-transparent blur-sm"></div>
              <img 
                src="../assets/images/profileImage/myimage_light.jpg" 
                alt="Jatin Bhardwaj" 
                class="relative z-10 w-full h-full object-cover rounded-lg border border-gruv-border/60 shadow-sm dark:hidden"
              />
              <img 
                src="../assets/images/profileImage/myimage_dark.jpg" 
                alt="Jatin Bhardwaj" 
                class="relative z-10 w-full h-full object-cover rounded-lg border border-gruv-border/60 shadow-sm hidden dark:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Metric Grid -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-gruv-border/60">
      <div class="space-y-1.5 p-4 rounded-lg border border-gruv-border bg-gruv-card/30 backdrop-blur-sm relative overflow-hidden group hover:border-gruv-accent transition-all duration-300">
        <div class="flex items-center justify-between">
          <span class="mono-text text-[9px] text-gruv-muted uppercase tracking-widest font-semibold">// OSS_CORE</span>
          <span class="w-1.5 h-1.5 rounded-full bg-gruv-green animate-pulse"></span>
        </div>
        <p class="text-2xl font-bold tracking-tight text-gruv-fg font-mono mt-2">
          02 <span class="text-[11px] text-gruv-muted font-sans font-light">libs</span>
        </p>
        <p class="text-[10px] text-gruv-muted leading-tight">pgmpy & SymPy contributor</p>
      </div>
      <div class="space-y-1.5 p-4 rounded-lg border border-gruv-border bg-gruv-card/30 backdrop-blur-sm relative overflow-hidden group hover:border-gruv-accent transition-all duration-300">
        <div class="flex items-center justify-between">
          <span class="mono-text text-[9px] text-gruv-muted uppercase tracking-widest font-semibold">// GSoC</span>
          <span class="text-[9px] text-gruv-muted font-mono px-1.5 py-0.5 rounded border border-gruv-border/40 bg-gruv-border/10">STABLE</span>
        </div>
        <p class="text-2xl font-bold tracking-tight text-gruv-fg font-mono mt-2">
          SymPy <span class="text-[11px] text-gruv-muted font-sans font-light">2025</span>
        </p>
        <p class="text-[10px] text-gruv-muted leading-tight">Series Expansion Algorithms</p>
      </div>
      <div class="space-y-1.5 p-4 rounded-lg border border-gruv-border bg-gruv-card/30 backdrop-blur-sm relative overflow-hidden group hover:border-gruv-accent transition-all duration-300">
        <div class="flex items-center justify-between">
          <span class="mono-text text-[9px] text-gruv-muted uppercase tracking-widest font-semibold">// DOMAIN</span>
          <span class="text-[9px] text-gruv-muted font-mono px-1.5 py-0.5 rounded border border-gruv-border/40 bg-gruv-border/10">CORE</span>
        </div>
        <p class="text-2xl font-bold tracking-tight text-gruv-fg font-mono mt-2">
          Causal <span class="text-[11px] text-gruv-muted font-sans font-light">& Symbolic</span>
        </p>
        <p class="text-[10px] text-gruv-muted leading-tight">Algebraic computational logic</p>
      </div>
      <div class="space-y-1.5 p-4 rounded-lg border border-gruv-border bg-gruv-card/30 backdrop-blur-sm relative overflow-hidden group hover:border-gruv-accent transition-all duration-300">
        <div class="flex items-center justify-between">
          <span class="mono-text text-[9px] text-gruv-muted uppercase tracking-widest font-semibold">// STACK</span>
          <span class="text-[9px] text-gruv-muted font-mono px-1.5 py-0.5 rounded border border-gruv-border/40 bg-gruv-border/10">SYSTEM</span>
        </div>
        <p class="text-2xl font-bold tracking-tight text-gruv-fg font-mono mt-2">
          Python <span class="text-[11px] text-gruv-muted font-sans font-light">/ C++</span>
        </p>
        <p class="text-[10px] text-gruv-muted leading-tight">Cython performance extensions</p>
      </div>
    </section>

    <!-- Open Source Contributions & Timeline -->
    <section id="contributions" class="space-y-12">
      <div class="space-y-2">
        <h2 class="mono-text text-xs text-gruv-muted tracking-widest uppercase font-medium">// RELEASE_LOGS</h2>
        <h3 class="text-2xl font-semibold tracking-tight text-gruv-fg">Open-Source Engineering & Contributions</h3>
      </div>

      <div class="relative border-l border-gruv-border/80 pl-6 ml-3 space-y-10 max-w-4xl">
        <!-- Timeline Dot for Item 1 -->
        <div class="relative">
          <!-- Pulsing Git Commit Dot -->
          <span class="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gruv-bg border border-gruv-accent">
            <span class="h-1.5 w-1.5 rounded-full bg-gruv-accent animate-pulse"></span>
          </span>

          <div class="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 bg-gruv-card/10 border border-gruv-border/60 rounded-lg p-5 md:p-6 hover:border-gruv-accent hover:bg-gruv-card/20 transition-all duration-300">
            <div class="md:col-span-4 space-y-2">
              <span class="mono-text text-xs text-gruv-accent font-mono font-semibold tracking-wider">[2026 — PRESENT]</span>
              <h4 class="font-semibold text-base text-gruv-fg">pgmpy</h4>
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="tech-badge">Causal Discovery</span>
                <span class="tech-badge">pgmpy</span>
                <span class="tech-badge">Python</span>
              </div>
            </div>
            
            <div class="md:col-span-8 space-y-3">
              <p class="text-sm text-gruv-muted font-light leading-relaxed">
                Developed causal discovery algorithms to identify causal structures from data. Designed the <strong>Bootstrap Estimator</strong> and statistical parameter estimation tools to handle complex and sparse datasets.
              </p>
              
              <!-- Clickable Details Accordion Toggle -->
              <div class="pt-1">
                <button 
                  @click="toggleContribution('pgmpy')"
                  class="btn-details flex items-center gap-1 focus:outline-none"
                >
                  <span>{{ expandedContributions.pgmpy ? '[-]' : '[+]' }}</span>
                  <span>{{ expandedContributions.pgmpy ? 'hide_details' : 'view_details' }}</span>
                </button>

                <transition name="page-fade">
                  <ul v-if="expandedContributions.pgmpy" class="mt-3 space-y-2 text-xs text-gruv-fg dark:text-gruv-muted font-mono bg-gruv-border/10 p-3 rounded border border-gruv-border/40">
                    <li class="flex items-start gap-2">
                      <span class="text-gruv-accent font-bold mr-1">•</span>
                      <span>Implementing bootstrap estimators to evaluate the reliability of learned networks</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-gruv-accent font-bold mr-1">•</span>
                      <span>Developing statistical methods to quantify uncertainty in causal discovery</span>
                    </li>
                  </ul>
                </transition>
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline Dot for Item 2 -->
        <div class="relative">
          <!-- Pulsing Git Commit Dot -->
          <span class="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gruv-bg border border-gruv-accent">
            <span class="h-1.5 w-1.5 rounded-full bg-gruv-accent"></span>
          </span>

          <div class="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 bg-gruv-card/10 border border-gruv-border/60 rounded-lg p-5 md:p-6 hover:border-gruv-accent hover:bg-gruv-card/20 transition-all duration-300">
            <div class="md:col-span-4 space-y-2">
              <span class="mono-text text-xs text-gruv-accent font-mono font-semibold tracking-wider">[2025]</span>
              <h4 class="font-semibold text-base text-gruv-fg">SymPy (Core Library)</h4>
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="tech-badge">Algebra</span>
                <span class="tech-badge">Series Ring</span>
                <span class="tech-badge">SymPy</span>
                <span class="tech-badge">Python</span>
                <span class="tech-badge">Cython</span>
              </div>
            </div>

            <div class="md:col-span-8 space-y-3">
              <p class="text-sm text-gruv-muted font-light leading-relaxed">
                Contributed to the core algebra and polynomial modules, focusing on architectural frameworks for series expansion algorithms to improve performance and user experience.
              </p>

              <!-- Clickable Details Accordion Toggle -->
              <div class="pt-1">
                <button 
                  @click="toggleContribution('sympy')"
                  class="btn-details flex items-center gap-1 focus:outline-none"
                >
                  <span>{{ expandedContributions.sympy ? '[-]' : '[+]' }}</span>
                  <span>{{ expandedContributions.sympy ? 'hide_details' : 'view_details' }}</span>
                </button>

                <transition name="page-fade">
                  <ul v-if="expandedContributions.sympy" class="mt-3 space-y-2 text-xs text-gruv-fg dark:text-gruv-muted font-mono bg-gruv-border/10 p-3 rounded border border-gruv-border/40">
                    <li class="flex items-start gap-2">
                      <span class="text-gruv-accent font-bold mr-1">•</span>
                      <span>Implemented formal mathematical series logic and class frameworks</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-gruv-accent font-bold mr-1">•</span>
                      <span>Built pure Python and optimized Cython backends for performance</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-gruv-accent font-bold mr-1">•</span>
                      <span>Achieved up to 1000x calculation speedups in modules</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-gruv-accent font-bold mr-1">•</span>
                      <span>Developed a comprehensive test suite to validate correctness</span>
                    </li>
                  </ul>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Selected Projects Section -->
    <section id="projects" class="space-y-12">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div class="space-y-2">
          <h2 class="mono-text text-xs text-gruv-muted tracking-widest uppercase font-medium">Selected Works</h2>
          <h3 class="text-2xl font-light tracking-tight text-gruv-fg">Engineering Portfolio</h3>
        </div>
        <!-- Mini Filter Controls -->
        <div class="flex items-center gap-2 font-mono text-[10px] border border-gruv-border p-1 rounded-lg">
          <button 
            @click="setFilter('all')"
            class="px-2.5 py-1 rounded border border-transparent transition-colors"
            :class="activeFilter === 'all' 
              ? 'filter-btn-active' 
              : 'text-gruv-muted hover:text-gruv-accent'"
          >
            All
          </button>
          <button 
            @click="setFilter('math')"
            class="px-2.5 py-1 rounded border border-transparent transition-colors"
            :class="activeFilter === 'math' 
              ? 'filter-btn-active' 
              : 'text-gruv-muted hover:text-gruv-accent'"
          >
            Algorithms/Math
          </button>
          <button 
            @click="setFilter('systems')"
            class="px-2.5 py-1 rounded border border-transparent transition-colors"
            :class="activeFilter === 'systems' 
              ? 'filter-btn-active' 
              : 'text-gruv-muted hover:text-gruv-accent'"
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
          class="project-card border border-gruv-border/80 rounded-lg p-5 md:p-6 bg-gruv-card/20 backdrop-blur-sm flex flex-col justify-between group hover:border-gruv-accent hover:bg-gruv-card/30 transition-all duration-300 relative overflow-hidden"
        >
          <!-- Top Accent highlight line -->
          <div class="absolute top-0 left-0 w-full h-[2px] bg-gruv-border/20 group-hover:bg-gruv-accent transition-colors duration-300"></div>

          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="mono-text text-[10px] text-gruv-muted uppercase tracking-wider">
                // {{ project.subtitle }}
              </span>
              <span class="text-[9px] font-mono text-gruv-muted px-1.5 py-0.5 rounded border border-gruv-border/40 bg-gruv-border/10 uppercase">
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
                <ul v-if="expandedProjects[project.id]" class="mt-3 space-y-2 text-xs text-gruv-fg dark:text-gruv-muted font-mono bg-gruv-border/10 p-3 rounded border border-gruv-border/40">
                  <li v-for="feat in project.features" :key="feat" class="flex items-start gap-2">
                    <span class="text-gruv-accent font-bold mr-1">•</span>
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
          <div class="flex gap-4 mt-6 border-t border-gruv-border/60 pt-3.5 font-mono text-[11px]">
            <a 
              v-for="(url, type) in project.links"
              :key="type"
              :href="url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1 text-gruv-muted transition-colors hover:text-gruv-accent"
            >
              <span>➜</span>
              <span class="underline decoration-dotted underline-offset-2">{{ getLinkLabel(type) }}</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Skill Grid -->
    <section class="space-y-8 border-t border-gruv-border pt-16">
      <div class="space-y-2">
        <h2 class="mono-text text-xs text-gruv-muted tracking-widest uppercase font-medium">Competencies</h2>
        <h3 class="text-2xl font-light tracking-tight text-gruv-fg">Capability Matrix</h3>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-xs">
        <!-- Col 1 -->
        <div class="space-y-3 pl-4 border-l border-gruv-border">
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
        <div class="space-y-3 pl-4 border-l border-gruv-border">
          <h4 class="text-gruv-purple font-semibold tracking-wider">// LANGUAGES & RUNTIMES</h4>
          <ul class="space-y-2 text-gruv-muted">
            <li class="hover:text-gruv-fg transition-colors">Python (Advanced)</li>
            <li class="hover:text-gruv-fg transition-colors">C / C++ (Data Structures & Algos)</li>
            <li class="hover:text-gruv-fg transition-colors">Cython (Performance Extensions)</li>
            <li class="hover:text-gruv-fg transition-colors">UNIX & Shell Environments</li>
          </ul>
        </div>
        <!-- Col 3 -->
        <div class="space-y-3 pl-4 border-l border-gruv-border">
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

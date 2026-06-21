<script setup>
import { ref, computed } from "vue";
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
</script>

<template>
  <div class="space-y-24 w-full">
    <!-- Hero Section -->
    <section id="about" class="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 items-center">
      <!-- Left side: Hero Text Info -->
      <div class="md:col-span-8 space-y-6 order-2 md:order-1">
        <p class="mono-text text-xs tracking-widest text-stone-500 dark:text-stone-400 uppercase font-medium">
          Software & Algorithmic Systems
        </p>
        <h1 class="text-4xl md:text-6xl font-light tracking-tight text-stone-950 dark:text-stone-50 leading-[1.1]">
          Designing systems with mathematical <span class="font-normal italic">precision</span>.
        </h1>
        <p class="max-w-2xl text-stone-600 dark:text-stone-400 text-base md:text-lg font-light leading-relaxed">
          I am a developer and researcher focused on algebraic computation, causal discovery, and symbolic systems. I contribute to major open-source libraries like 
          <span class="text-stone-950 dark:text-stone-100 font-medium border-b border-stone-300 dark:border-stone-800">SymPy</span> 
          and 
          <span class="text-stone-950 dark:text-stone-100 font-medium border-b border-stone-300 dark:border-stone-800">pgmpy</span>, 
          translating complex theories into clean, high-performance systems.
        </p>
        
        <div class="flex flex-wrap gap-3 pt-4 font-mono text-xs text-stone-500 dark:text-stone-400">
          <a 
            href="https://github.com/Jatinbhardwaj-093" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            <span>[GitHub]</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/jatin-bhardwaj093/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            <span>[LinkedIn]</span>
          </a>
          <span class="text-stone-300 dark:text-stone-800">|</span>
          <span class="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-stone-400 animate-pulse"></span>
            Available for core engineering roles
          </span>
        </div>
      </div>

      <!-- Right side: Profile Photo -->
      <div class="hidden md:flex md:col-span-4 justify-end order-1 md:order-2">
        <div class="relative w-48 aspect-[4/5] sm:w-56 lg:w-64">
          <!-- Subtle gray background glow -->
          <div class="absolute inset-0 rounded-2xl bg-gradient-to-tr from-stone-500/10 to-transparent blur-md"></div>
          <img 
            src="../assets/images/profileImage/myimage.webp" 
            alt="Jatin Bhardwaj" 
            class="relative z-10 w-full h-full object-cover rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm"
          />
        </div>
      </div>
    </section>

    <!-- Stats Metric Grid -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-stone-200 dark:border-stone-900 py-8">
      <div class="space-y-1">
        <p class="mono-text text-xs text-stone-400 dark:text-stone-500 uppercase">Core OSS Contributions</p>
        <p class="text-2xl font-light tracking-tight text-stone-900 dark:text-stone-100">02 <span class="text-sm text-stone-400">Libraries</span></p>
      </div>
      <div class="space-y-1">
        <p class="mono-text text-xs text-stone-400 dark:text-stone-500 uppercase">GSoC Alumnus</p>
        <p class="text-2xl font-light tracking-tight text-stone-900 dark:text-stone-100">SymPy <span class="text-sm text-stone-400">2025</span></p>
      </div>
      <div class="space-y-1">
        <p class="mono-text text-xs text-stone-400 dark:text-stone-500 uppercase">Specialization</p>
        <p class="text-2xl font-light tracking-tight text-stone-900 dark:text-stone-100">Symbolic <span class="text-sm text-stone-400">& Causal</span></p>
      </div>
      <div class="space-y-1">
        <p class="mono-text text-xs text-stone-400 dark:text-stone-500 uppercase">Preferred Stack</p>
        <p class="text-2xl font-light tracking-tight text-stone-900 dark:text-stone-100">Python / C++</p>
      </div>
    </section>

    <!-- Open Source Contributions & Timeline -->
    <section id="contributions" class="space-y-12">
      <div class="space-y-2">
        <h2 class="mono-text text-xs text-stone-500 dark:text-stone-400 tracking-widest uppercase font-medium">Core Achievements</h2>
        <h3 class="text-2xl font-light tracking-tight text-stone-900 dark:text-stone-100">Open-Source Research & Systems</h3>
      </div>

      <div class="space-y-8 max-w-4xl">
        <!-- pgmpy Item (on top) -->
        <div class="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 pb-8 border-b border-stone-200/50 dark:border-stone-900/50">
          <div class="md:col-span-3">
            <span class="mono-text text-xs text-stone-400 dark:text-stone-500 font-medium">2026 — PRESENT</span>
            <h4 class="font-medium text-sm text-stone-900 dark:text-stone-100 mt-1">pgmpy</h4>
            <!-- Separate technology tags -->
            <div class="flex flex-wrap gap-1.5 mt-2.5">
              <span class="px-2 py-0.5 text-[10px] font-mono rounded-md border border-stone-200/80 dark:border-stone-800/80 bg-stone-100/50 dark:bg-stone-900/30 text-stone-600 dark:text-stone-400 select-none">Causal Discovery</span>
              <span class="px-2 py-0.5 text-[10px] font-mono rounded-md border border-stone-200/80 dark:border-stone-800/80 bg-stone-100/50 dark:bg-stone-900/30 text-stone-600 dark:text-stone-400 select-none">pgmpy</span>
              <span class="px-2 py-0.5 text-[10px] font-mono rounded-md border border-stone-200/80 dark:border-stone-800/80 bg-stone-100/50 dark:bg-stone-900/30 text-stone-600 dark:text-stone-400 select-none">Python</span>
            </div>
          </div>
          <div class="md:col-span-9 space-y-3">
            <p class="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
              Developed causal discovery algorithms to identify causal structures from data. Designed the <strong>Bootstrap Estimator</strong> and statistical parameter estimation tools to handle complex and sparse datasets.
            </p>
            
            <!-- Clickable Details Accordion Toggle -->
            <div class="pt-1">
              <button 
                @click="toggleContribution('pgmpy')"
                class="text-[10px] font-mono border border-stone-200 dark:border-stone-800/80 rounded px-1.5 py-0.5 text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors flex items-center gap-1 focus:outline-none cursor-pointer"
              >
                <span>{{ expandedContributions.pgmpy ? '[-]' : '[+]' }}</span>
                <span>{{ expandedContributions.pgmpy ? 'hide_details' : 'view_details' }}</span>
              </button>

              <transition name="page-fade">
                <ul v-if="expandedContributions.pgmpy" class="mt-3 space-y-2 text-xs text-stone-500 dark:text-stone-400 font-light">
                  <li class="flex items-start gap-2">
                    <span class="text-stone-400 dark:text-stone-600 mt-0.5">•</span>
                    <span>Implementing bootstrap estimators to evaluate the reliability of learned networks</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-stone-400 dark:text-stone-600 mt-0.5">•</span>
                    <span>Developing statistical methods to quantify uncertainty in causal discovery</span>
                  </li>
                </ul>
              </transition>
            </div>
          </div>
        </div>

        <!-- SymPy Item (second) -->
        <div class="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 pb-8 border-b border-stone-200/50 dark:border-stone-900/50">
          <div class="md:col-span-3">
            <span class="mono-text text-xs text-stone-400 dark:text-stone-500 font-medium">2025</span>
            <h4 class="font-medium text-sm text-stone-900 dark:text-stone-100 mt-1">SymPy (Core Library)</h4>
            <!-- Separate technology tags -->
            <div class="flex flex-wrap gap-1.5 mt-2.5">
              <span class="px-2 py-0.5 text-[10px] font-mono rounded-md border border-stone-200/80 dark:border-stone-800/80 bg-stone-100/50 dark:bg-stone-900/30 text-stone-600 dark:text-stone-400 select-none">Algebra</span>
              <span class="px-2 py-0.5 text-[10px] font-mono rounded-md border border-stone-200/80 dark:border-stone-800/80 bg-stone-100/50 dark:bg-stone-900/30 text-stone-600 dark:text-stone-400 select-none">Series Ring</span>
              <span class="px-2 py-0.5 text-[10px] font-mono rounded-md border border-stone-200/80 dark:border-stone-800/80 bg-stone-100/50 dark:bg-stone-900/30 text-stone-600 dark:text-stone-400 select-none">SymPy</span>
              <span class="px-2 py-0.5 text-[10px] font-mono rounded-md border border-stone-200/80 dark:border-stone-800/80 bg-stone-100/50 dark:bg-stone-900/30 text-stone-600 dark:text-stone-400 select-none">Python</span>
              <span class="px-2 py-0.5 text-[10px] font-mono rounded-md border border-stone-200/80 dark:border-stone-800/80 bg-stone-100/50 dark:bg-stone-900/30 text-stone-600 dark:text-stone-400 select-none">Cython</span>
            </div>
          </div>
          <div class="md:col-span-9 space-y-3">
            <p class="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
              Contributed to the core algebra and polynomial modules, focusing on architectural frameworks for series expansion algorithms to improve performance and user experience.
            </p>

            <!-- Clickable Details Accordion Toggle -->
            <div class="pt-1">
              <button 
                @click="toggleContribution('sympy')"
                class="text-[10px] font-mono border border-stone-200 dark:border-stone-800/80 rounded px-1.5 py-0.5 text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors flex items-center gap-1 focus:outline-none cursor-pointer"
              >
                <span>{{ expandedContributions.sympy ? '[-]' : '[+]' }}</span>
                <span>{{ expandedContributions.sympy ? 'hide_details' : 'view_details' }}</span>
              </button>

              <transition name="page-fade">
                <ul v-if="expandedContributions.sympy" class="mt-3 space-y-2 text-xs text-stone-500 dark:text-stone-400 font-light">
                  <li class="flex items-start gap-2">
                    <span class="text-stone-400 dark:text-stone-600 mt-0.5">•</span>
                    <span>Implemented formal mathematical series logic and class frameworks</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-stone-400 dark:text-stone-600 mt-0.5">•</span>
                    <span>Built pure Python and optimized Cython backends for performance</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-stone-400 dark:text-stone-600 mt-0.5">•</span>
                    <span>Achieved up to 1000x calculation speedups in modules</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-stone-400 dark:text-stone-600 mt-0.5">•</span>
                    <span>Developed a comprehensive test suite to validate correctness</span>
                  </li>
                </ul>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Selected Projects Section -->
    <section id="projects" class="space-y-12">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div class="space-y-2">
          <h2 class="mono-text text-xs text-stone-500 dark:text-stone-400 tracking-widest uppercase font-medium">Selected Works</h2>
          <h3 class="text-2xl font-light tracking-tight text-stone-900 dark:text-stone-100">Engineering Portfolio</h3>
        </div>
        <!-- Mini Filter Controls -->
        <div class="flex items-center gap-2 font-mono text-[11px] border border-stone-200 dark:border-stone-900 p-1 rounded-lg">
          <button 
            @click="setFilter('all')"
            class="px-2.5 py-1 rounded transition-colors"
            :class="activeFilter === 'all' 
              ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900' 
              : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'"
          >
            All
          </button>
          <button 
            @click="setFilter('math')"
            class="px-2.5 py-1 rounded transition-colors"
            :class="activeFilter === 'math' 
              ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900' 
              : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'"
          >
            Algorithms/Math
          </button>
          <button 
            @click="setFilter('systems')"
            class="px-2.5 py-1 rounded transition-colors"
            :class="activeFilter === 'systems' 
              ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900' 
              : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'"
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
          class="project-card border border-stone-200 dark:border-stone-900 rounded-xl p-6 bg-stone-100/20 dark:bg-stone-900/10 flex flex-col justify-between hover:border-stone-300 dark:hover:border-stone-800 transition-all group"
        >
          <div class="space-y-4">
            <div class="flex justify-between items-start">
              <span class="mono-text text-xs text-stone-400 uppercase">
                {{ project.subtitle }}
              </span>
            </div>
            <h4 class="text-lg font-light tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-stone-950 dark:group-hover:text-stone-100 transition-colors">
              {{ project.title }}
            </h4>
            <p class="text-xs text-stone-600 dark:text-stone-400 font-light leading-relaxed">
              {{ project.description }}
            </p>

            <!-- Clickable Details Accordion Toggle -->
            <div v-if="project.features && project.features.length" class="pt-1">
              <button 
                @click="toggleProjectDetails(project.id)"
                class="text-[10px] font-mono border border-stone-200 dark:border-stone-800/80 rounded px-1.5 py-0.5 text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors flex items-center gap-1 focus:outline-none cursor-pointer"
              >
                <span>{{ expandedProjects[project.id] ? '[-]' : '[+]' }}</span>
                <span>{{ expandedProjects[project.id] ? 'hide_details' : 'view_details' }}</span>
              </button>

              <transition name="page-fade">
                <ul v-if="expandedProjects[project.id]" class="mt-3 space-y-2 text-xs text-stone-500 dark:text-stone-400 font-light">
                  <li v-for="feat in project.features" :key="feat" class="flex items-start gap-2">
                    <span class="text-stone-400 dark:text-stone-600 mt-0.5">•</span>
                    <span>{{ feat }}</span>
                  </li>
                </ul>
              </transition>
            </div>
          </div>
          <!-- Technologies badges -->
          <div class="flex flex-wrap gap-1.5 mt-4">
            <span 
              v-for="tech in project.technologies" 
              :key="tech"
              class="px-2 py-0.5 text-[10px] font-mono rounded-md border border-stone-200/80 dark:border-stone-800/80 bg-stone-100/50 dark:bg-stone-900/30 text-stone-600 dark:text-stone-400 select-none"
            >
              {{ tech }}
            </span>
          </div>
          <!-- Action links -->
          <div class="flex gap-4 mt-6 border-t border-stone-100 dark:border-stone-900/60 pt-3">
            <a 
              v-for="(url, type) in project.links"
              :key="type"
              :href="url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[11px] font-mono text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
            >
              [{{ type }}]
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Skill Grid -->
    <section class="space-y-8 border-t border-stone-200 dark:border-stone-900 pt-16">
      <h3 class="text-xl font-light tracking-tight text-stone-900 dark:text-stone-100">Capability Matrix</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        <!-- Col 1 -->
        <div class="space-y-4">
          <h4 class="text-stone-400 dark:text-stone-500 font-medium tracking-wide">// SYSTEMS & ALGORITHMS</h4>
          <ul class="space-y-2 text-stone-600 dark:text-stone-400">
            <li>• Causal Discovery & Graph Models</li>
            <li>• Computer Algebra & Symbolic Computing</li>
            <li>• Explainable AI (XAI)</li>
            <li>• Time Series Forecasting & Analysis</li>
            <li>• Parameter Estimation & Optimization</li>
            <li>• Statistical Uncertainty Quantification</li>
          </ul>
        </div>
        <!-- Col 2 -->
        <div class="space-y-4">
          <h4 class="text-stone-400 dark:text-stone-500 font-medium tracking-wide">// LANGUAGES & RUNTIMES</h4>
          <ul class="space-y-2 text-stone-600 dark:text-stone-400">
            <li>• Python (Advanced)</li>
            <li>• C / C++ (Data Structures & Algos)</li>
            <li>• Cython (Performance Extensions)</li>
            <li>• UNIX & Shell Environments</li>
          </ul>
        </div>
        <!-- Col 3 -->
        <div class="space-y-4">
          <h4 class="text-stone-400 dark:text-stone-500 font-medium tracking-wide">// ENGINEERING & COLLABORATION</h4>
          <ul class="space-y-2 text-stone-600 dark:text-stone-400">
            <li>• Distributed Git Workflows</li>
            <li>• Open Source CI/CD Pipelines</li>
            <li>• Performance Backends & Bindings</li>
            <li>• Sphinx & Sphinx-Gallery Documentation</li>
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

const projects = [
  {
    id: 6,
    title: "Bootstrap Estimator for Causal Discovery",
    subtitle: "pgmpy Mentorship",
    category: "Open Source",
    description: "Designed and implemented non-parametric bootstrap estimation in pgmpy to quantify edge confidence, assess structural uncertainty, and build consensus causal graphs across DAGs, PDAGs, and PAGs.",
    technologies: ["Python", "NetworkX", "Causal Inference", "Statistical Estimation"],
    features: [
      "Implemented non-parametric BootstrapEstimator for edge confidence and structural uncertainty across DAGs, PDAGs, and PAGs",
      "Engineered dynamic thresholding with get_edges() to evaluate confidence graphs without refitting",
      "Architected flexible direction probability data structures supporting absent-edge handling and partial orientations",
      "Integrated warm_start graph caching and consensus aggregation algorithms"
    ],
    links: {
      github: "https://github.com/pgmpy/pgmpy",
      blog: "/blog/bootstrap-estimator"
    }
  },
  {
    id: 7,
    title: "Optimal Causal Structure via ILP Optimization",
    subtitle: "pgmpy Mentorship",
    category: "Open Source",
    description: "Formulated and implemented ILPSearch in pgmpy, translating causal structure learning into an optimal 0-1 Integer Linear Program with cluster-based acyclicity constraints and L0 regularization.",
    technologies: ["Python", "Integer Linear Programming", "Optimization", "Causal Inference"],
    features: [
      "Formulated optimal DAG structure learning as a 0-1 Integer Linear Program (ILP)",
      "Linearized score metrics and enforced acyclicity using cluster-based cycle elimination constraints",
      "Incorporated L0 count regularization directly into the optimization objective for sparse graph recovery",
      "Conducted empirical benchmarks across standard solvers (CBC, SCIP, GLPK) on synthetic and ground-truth causal graphs"
    ],
    links: {
      github: "https://github.com/pgmpy/pgmpy",
      blog: "/blog/ilp-causal-discovery"
    }
  },
  {
    id: 4,
    title: "NLP Comment Classification",
    subtitle: "Natural Language Processing",
    category: "ML/AI",
    description: "An end-to-end NLP pipeline that analyzes textual entries from a discussion system and predicts how each entry is ultimately categorized by the platform using a LightGBM classification model.",
    technologies: ["NumPy", "Pandas", "sklearn", "Matplotlib", "LightGBM"],
    features: [
      "Multi-label emotion classification from raw text",
      "Feature extraction with TF-IDF and word embeddings",
      "Ensemble model with LightGBM for improved accuracy",
      "Comprehensive data visualization and analysis"
    ],
    links: {
      github: "https://github.com/Jatinbhardwaj-093/NLP_Comment_Classification",
      colab: "https://colab.research.google.com/drive/1OOmKKJ_ixLJAsQqT5l0emED68jTJC7Cg?usp=share_link"
    }
  },
  {
    id: 5,
    title: "Music Genre Classification",
    subtitle: "Vision Transformer",
    category: "ML/AI",
    description: "A machine learning system that analyzes audio files and classifies them into primary musical genres. It converts audio into visual spectrograms and leverages Vision Transformers to identify patterns, predicting the top matches with probability scores.",
    technologies: ["PyTorch", "Hugging Face", "Librosa", "NumPy", "Gradio", "W&B"],
    features: [
      "Spectrogram-based audio processing with Librosa",
      "End-to-End ViT Model tailored for music classification",
      "Interactive Web UI deployed on Hugging Face Spaces",
      "Real-time experiment tracking using Weights & Biases"
    ],
    links: {
      github: "https://github.com/Jatinbhardwaj-093/ViT_Music_Classifier",
      hfspace: "https://huggingface.co/spaces/jatin-093/ViT_Music_Classification",
      colab: "https://colab.research.google.com/drive/1D8tOYiKZtWHG531RT097Wj-OJZ1_lJ-y"
    }
  },
  {
    id: 3,
    title: "Power Series Ring Module (polys.series)",
    subtitle: "GSoC @ SymPy",
    category: "Open Source",
    description: "Architected and implemented the new Power Series Ring module from scratch in SymPy, introducing fast series arithmetic, Fast Lagrange Inversion, and ring-domain abstractions.",
    technologies: ["Python", "Flint Interop", "Computer Algebra", "Series Ring", "Pytest", "Hypothesis"],
    features: [
      "Implemented PowerSeriesRing, PowerSeriesElement (with Order truncation), and Series domain classes in sympy.polys.series",
      "Engineered Fast Lagrange Inversion algorithm for compositional series reversion, avoiding expensive Newton iterations",
      "Implemented Karatsuba multiplication with adaptive truncation, divide-and-conquer composition, and transcendental series expansions",
      "Aligned structure with python-flint (fmpz_series/fmpq_series) and merged across upstream PRs (#28109, #28208, #28273, #28325)"
    ],
    links: {
      github: "https://github.com/sympy/sympy/pulls?q=is%3Apr+author%3AJatinbhardwaj-093+is%3Amerged+created%3A2025-06-01..2025-08-31",
      gsoc: "https://summerofcode.withgoogle.com/programs/2025/projects/8VslkGZ9"
    }
  },
  {
    id: 1,
    title: "Influencer-Sponsor Engagement Platform",
    subtitle: "Web Development",
    category: "Web Dev",
    description: "A comprehensive collaboration platform connecting influencers with sponsors and sponsorship opportunities.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Flask", "SQLite"],
    features: [
      "Profile matching for influencers and sponsors",
      "Detailed analytics dashboard",
      "Secure messaging system",
      "Contract management tools"
    ],
    links: {
      github: "https://github.com/Jatinbhardwaj-093/Infulencer-Sponsor-Engagement-Platform",
      drive: "https://drive.google.com/drive/folders/1SLRgwuTLKnKVfdY9br0idI0x_NHyb0Qn?usp=drive_link"
    }
  },
  {
    id: 2,
    title: "HouseHold Service Platform",
    subtitle: "Web Development",
    category: "Web Dev",
    description: "A booking service platform that helps users find and schedule household services with verified service providers.",
    technologies: ["Vue.js", "Flask", "SQLite", "Redis", "Celery"],
    features: [
      "Real-time service provider tracking",
      "Secure payment processing",
      "Rating and review system",
      "Service provider verification process"
    ],
    links: {
      github: "https://github.com/Jatinbhardwaj-093/HouseHold-Service-Platform",
      drive: "https://drive.google.com/drive/folders/1YR5UsPf4jtXYstgQJDPUFEjy33uew83I?usp=drive_link",
      figma: "https://www.figma.com/design/a5MomTlXdFQ1qz7lAzog7E/Househod-Service-MAD-1?node-id=0-1&t=Xo1ho1DEgCnSpn03-1"
    }
  }
];

export default projects;

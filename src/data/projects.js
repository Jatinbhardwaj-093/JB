const projects = [
  {
    id: 6,
    title: "Causal Discovery & Parameter Estimation",
    subtitle: "pgmpy Mentorship",
    category: "Open Source",
    description: "Selected for the pgmpy mentorship program. Developed statistical estimation tools and bootstrap estimators to discover causal structures from data.",
    technologies: ["pgmpy", "Python", "NetworkX", "Causal Inference", "Statistical Estimation"],
    features: [
      "Implementing bootstrap estimators to evaluate the reliability of learned networks",
      "Developing statistical methods to quantify uncertainty in causal discovery",
      "Integrating parameter estimation routines and structural constraint resolution"
    ],
    links: {
      github: "https://github.com/pgmpy/pgmpy"
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
    title: "Google Summer of Code at SymPy",
    subtitle: "Open Source",
    category: "Open Source",
    description: "Implemented a formal mathematical series module for SymPy to improve calculation speeds and usability as part of Google Summer of Code 2025.",
    technologies: ["SymPy", "Python", "Cython", "C", "Pytest", "Hypothesis", "Codecov"],
    features: [
      "Implemented formal mathematical series logic and class frameworks",
      "Built pure Python and optimized Cython backends for performance",
      "Achieved up to 1000x calculation speedups in comparison to default methods",
      "Developed a comprehensive test suite to validate correctness"
    ],
    links: {
      github: "https://github.com/sympy/sympy/pulls?q=author%3AJatinbhardwaj-093",
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

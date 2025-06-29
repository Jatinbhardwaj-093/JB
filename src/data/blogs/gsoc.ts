export interface BlogPost {
  id: string;
  title: string;
  date: string;
  minutesToRead: number;
  summary: string;
  category: string;
  slug: string;
}

const gsocPosts: BlogPost[] = [
  {
    id: "gsoc-open-source-start",
    title: "GSoC: Tips to start with Open Source",
    date: "May 13, 2025", // Today's date in YYYY-MM-DD format
    minutesToRead: 5,
    summary:
      "A beginner's guide to contributing to open source projects and preparing for Google Summer of Code.",
    category: "gsoc",
    slug: "gsoc-tips-to-start-with-open-source",
  },
  {
    id: "gsoc-week1-fps-ring",
    title: "GSoC-25: Week-1 - Fast FPS Ring Implementation",
    date: "June 11, 2025", // Today's date in YYYY-MM-DD format
    minutesToRead: 5,
    summary:
      "First week progress on implementing formal power series domain system for SymPy. Discussing design decisions, class structure, and alignment with Flint's approach.",
    category: "gsoc",
    slug: "gsoc-week1-fps-ring",
  },
  {
    id: "gsoc-week2-3-fps-design",
    title: "GSoC-25: Week 2-3 - Series Design & Precision Handling",
    date: "June 23, 2025",
    minutesToRead: 10,
    summary:
      "Weeks 2-3 progress covering design discussions, precision handling decisions, and domain separation for formal power series in SymPy. Exploring Flint's gr_series behavior and implementation challenges.",
    category: "gsoc",
    slug: "gsoc-week2-3-fps-design",
  },
  // More blogs can be added here in the future
];

export default gsocPosts;

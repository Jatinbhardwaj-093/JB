import gsocPosts from "./gsoc";
import type { BlogPost } from "./gsoc";

// Import other categories as they are created
// import sympyPosts from './sympy';
// import mathPosts from './mathematics';
// import mlPosts from './machine-learning';
// import psychologyPosts from './psychology';

// Combine all posts in one array
const allPosts: BlogPost[] = [
  ...gsocPosts,
  // Add other categories when available
  // ...sympyPosts,
  // ...mathPosts,
  // ...mlPosts,
  // ...psychologyPosts,
];

console.log("All posts loaded:", allPosts);
console.log("GSoC posts:", gsocPosts);

// Get posts by category
export const getPostsByCategory = (category: string): BlogPost[] => {
  if (category === "all") return allPosts;
  return allPosts.filter((post) => post.category === category);
};

// Get a specific post by slug
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return allPosts.find((post) => post.slug === slug);
};

export type { BlogPost };
export { gsocPosts };
export default allPosts;

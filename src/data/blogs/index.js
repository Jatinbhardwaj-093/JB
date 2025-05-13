import gsocPosts from "./gsoc";
// Import other categories as they are created
// import sympyPosts from './sympy';
// import mathPosts from './mathematics';
// import mlPosts from './machine-learning';
// import psychologyPosts from './psychology';
// Combine all posts in one array
const allPosts = [
    ...gsocPosts,
    // Add other categories when available
    // ...sympyPosts,
    // ...mathPosts,
    // ...mlPosts,
    // ...psychologyPosts,
];
// Get posts by category
export const getPostsByCategory = (category) => {
    return allPosts.filter((post) => post.category === category);
};
// Get a specific post by slug
export const getPostBySlug = (slug) => {
    return allPosts.find((post) => post.slug === slug);
};
export { gsocPosts };
export default allPosts;

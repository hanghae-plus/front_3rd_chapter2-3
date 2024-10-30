const fetchPosts = (limit: number, skip: number) => `/api/posts?limit=${limit}&skip=${skip}`
const fetchTags = "/api/posts/tags"
const addPost = "/api/posts/add"
const updatePost = (id: number) => `/api/posts/${id}`
const deletePost = (id: number) => `/api/posts/${id}`
export { fetchPosts, fetchTags, addPost, updatePost, deletePost }

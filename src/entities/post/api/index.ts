export const postApis = {
  fetchPosts: async (skip: number, limit: number): Promise<ResPostsList> => {
    const response = await fetch(`/api/posts?skip=${skip}&limit=${limit}`);
    return await response.json();
  },

  fetchSearchPosts: async (query: string): Promise<ResPostsList> => {
    const response = await fetch(`/api/posts/search?q=${query}`);
    return await response.json();
  },

  fetchPostsWithTag: async (tag: string): Promise<ResPostsList> => {
    const response = await fetch(`/api/posts/tag/${tag}`);
    return await response.json();
  },

  addPost: async (post: ReqAddPostBody) => {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      body: JSON.stringify(post),
    });
    return await response.json();
  },

  updatePost: async (post: Post) => {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify(post),
    });
    return await response.json();
  },

  deletePost: async (id: number) => {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  },
};

import { BaseApi } from "../../../shared/api"
import { Post } from "../model/types"
import { PostsResponse, TagsResponse } from "./types"

class PostsApi extends BaseApi {
  constructor() {
    super("/api")
  }

  async getPosts(limit: number, skip: number): Promise<PostsResponse> {
    return this.get<PostsResponse>(`/posts?limit=${limit}&skip=${skip}`)
  }

  async searchPosts(query: string): Promise<PostsResponse> {
    return this.get<PostsResponse>(`/posts/search?q=${query}`)
  }

  async getPostsByTag(tag: string): Promise<PostsResponse> {
    return this.get<PostsResponse>(`/posts/tag/${tag}`)
  }

  async getTags(): Promise<TagsResponse> {
    return this.get<TagsResponse>("/posts/tags")
  }

  async addPost(post: Omit<Post, "id">): Promise<Omit<Post, "id">> {
    return this.post<Omit<Post, "id">>("/posts/add", post)
  }

  async updatePost(id: number, post: Partial<Post>): Promise<Post> {
    const updatedPost: Post = { ...post, id } as Post
    return this.put<Post>(`/posts/${id}`, updatedPost)
  }

  async deletePost(id: number): Promise<void> {
    return this.delete(`/posts/${id}`)
  }
}

export const postsApi = new PostsApi()

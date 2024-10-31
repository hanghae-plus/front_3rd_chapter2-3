import { BaseApi } from "../../../shared/api"
import { API_ENDPOINTS } from "../config/posts.config"
import { Post } from "../model/types"
import { AddPostRequest, PostsResponse, TagsResponse } from "./types"

class PostsApi extends BaseApi {
  constructor() {
    super("/api")
  }

  async getPosts(limit: number, skip: number): Promise<PostsResponse> {
    return this.get<PostsResponse>(
      `${API_ENDPOINTS.POSTS}?limit=${limit}&skip=${skip}`,
    )
  }

  async searchPosts(query: string): Promise<PostsResponse> {
    return this.get<PostsResponse>(`${API_ENDPOINTS.POSTS_SEARCH}?q=${query}`)
  }

  async getPostsByTag(tag: string): Promise<PostsResponse> {
    return this.get<PostsResponse>(`${API_ENDPOINTS.POSTS_BY_TAG}/${tag}`)
  }

  async getTags(): Promise<TagsResponse[]> {
    return this.get<TagsResponse[]>(`${API_ENDPOINTS.POSTS_TAGS}`)
  }

  async addPost(data: AddPostRequest) {
    return this.post(API_ENDPOINTS.POSTS_ADD, data)
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

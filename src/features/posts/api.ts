import { Post } from "../../entity/post/model";
import { PaginatedResponse } from "../../types";
import { User } from "../../entity/user/model";

export const postsApi = {
  fetchPosts: async (limit: number, skip: number): Promise<PaginatedResponse<Post>> => {
    let postsData: PaginatedResponse<Post>
    let usersData: User[]

    try {
      const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      postsData = await response.json()
      const usersResponse = await fetch("/api/users?limit=0&select=username,image")
      const usersResult = await usersResponse.json()
      usersData = usersResult.users

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.find((user) => user.id === post.userId),
      }))

      return {
        posts: postsWithUsers,
        total: postsData.total
      }
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
      throw error
    }
  },
}

import { PostsResponse, UsersResponse } from "../model/types"

type FetchPostsPayload = {
  limit: number
  skip: number
}

export const postApi = {
  fetchPosts: async ({ limit, skip }: FetchPostsPayload) => {
    try {
      const [postsData, usersData] = await Promise.all([
        fetch(`/api/posts?limit=${limit}&skip=${skip}`).then((response) => response.json() as Promise<PostsResponse>),
        fetch("/api/users?limit=0&select=username,image").then((response) => response.json() as Promise<UsersResponse>),
      ])

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      return {
        postsWithUsers,
        total: postsData.total,
      }
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
      throw error
    }
  },
}

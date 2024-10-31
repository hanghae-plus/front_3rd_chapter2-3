import { Post, PostFetchResponse, Tag } from "../types/postType"

export const postFetchTags = async (): Promise<Tag[] | undefined> => {
  try {
    const response = await fetch("/api/posts/tags")
    const data = await response.json()

    return data
  } catch (error) {
    console.error("태그 가져오기 오류:", error)
  }
}

export const postFetch = async ({ limit, skip }: { limit: number; skip: number }): Promise<PostFetchResponse> => {
  try {
    const postsResponse = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    const postsData = await postsResponse.json()

    const usersResponse = await fetch("/api/users?limit=0&select=username,image")
    const usersData = await usersResponse.json()

    // 게시물에 작성자 정보 추가
    const postsWithUsers = postsData.posts.map((post: Post) => ({
      ...post,
      author: usersData.users.find((user: { id: number }) => user.id === post.userId),
    }))

    console.log("postFetch", {
      posts: postsWithUsers,
      total: postsData.total,
    })

    return {
      posts: postsWithUsers,
      total: postsData.total,
    }
  } catch (error) {
    console.error("게시물 가져오기 오류:", error)
    return { posts: [], total: 0, error } // 기본값 추가
  }
}

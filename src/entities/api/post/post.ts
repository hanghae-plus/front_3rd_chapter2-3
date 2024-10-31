import { NewPost, Post, PostsData, User } from "../../../shared/types"

export const addPost = async (newPost: NewPost) => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
    return await response.json()
  } catch (error) {
    console.error("게시물 추가 오류:", error)
  }
}

export const updatePost = async (post: Post) => {
  try {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    return await response.json()
  } catch (error) {
    console.error("게시물 업데이트 오류:", error)
  }
}

export const deletePost = async (id: number) => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
    return true
  } catch (error) {
    console.error("게시물 삭제 오류:", error)
    return false
  }
}

export const fetchPostsByTag = async (tag: string) => {
  try {
    const [postsResponse, usersResponse] = await Promise.all([
      fetch(`/api/posts/tag/${tag}`),
      fetch("/api/users?limit=0&select=username,image"),
    ])

    const postsData: PostsData = await postsResponse.json()
    const usersData: { users: User[] } = await usersResponse.json()

    return {
      posts: postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      })),
      total: postsData.total,
    }
  } catch (error) {
    console.error("태그별 게시물 가져오기 오류:", error)
  }
}

export const fetchPosts = async (params: { limit: number; skip: number }) => {
  try {
    const [postsResponse, usersResponse] = await Promise.all([
      fetch(`/api/posts?limit=${params.limit}&skip=${params.skip}`),
      fetch("/api/users?limit=0&select=username,image"),
    ])

    const postsData: PostsData = await postsResponse.json()
    const usersData: { users: User[] } = await usersResponse.json()

    return {
      posts: postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      })),
      total: postsData.total,
    }
  } catch (error) {
    console.error("게시물 가져오기 오류:", error)
  }
}

export const searchPosts = async (query: string) => {
  try {
    const response = await fetch(`/api/posts/search?q=${query}`)
    const data = await response.json()
    return {
      posts: data.posts,
      total: data.total,
    }
  } catch (error) {
    console.error("게시물 검색 오류:", error)
  }
}

export const fetchUserDetail = async (userId: number) => {
  try {
    const response = await fetch(`/api/users/${userId}`)
    return await response.json()
  } catch (error) {
    console.error("사용자 정보 가져오기 오류:", error)
  }
}

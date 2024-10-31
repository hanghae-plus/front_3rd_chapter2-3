import { Author, NewPost, Post, TagSlug } from "@/shared/types"

// 게시물 가져오기
export const fetchPosts = async ({ limit, skip }: { limit: number; skip: number }) => {
  const [postsResponse, usersResponse] = await Promise.all([
    fetch(`/api/posts?limit=${limit}&skip=${skip}`),
    fetch("/api/users?limit=0&select=username,image"),
  ])
  const postsData = await postsResponse.json()
  const usersData = await usersResponse.json()

  const postsWithUsers = postsData.posts.map((post: Post) => ({
    ...post,
    author: usersData.users.find((user: Author) => user.id === post.userId),
  }))

  return postsWithUsers
}

// 검색된 게시물 가져오기
export const fetchSearchPosts = async (searchQuery: string) => {
  const [postsResponse, usersResponse] = await Promise.all([
    fetch(`/api/posts/search?q=${searchQuery}`),
    fetch("/api/users?limit=0&select=username,image"),
  ])
  const postsData = await postsResponse.json()
  const usersData = await usersResponse.json()

  const postsWithUsers = postsData.posts.map((post: Post) => ({
    ...post,
    author: usersData.users.find((user: Author) => user.id === post.userId),
  }))

  return postsWithUsers
}

// 태그별 게시물 가져오기
export const fetchPostsByTag = async (tag: TagSlug) => {
  const [postsResponse, usersResponse] = await Promise.all([
    fetch(`/api/posts/tag/${tag}`),
    fetch("/api/users?limit=0&select=username,image"),
  ])
  const postsData = await postsResponse.json()
  const usersData = await usersResponse.json()

  const postsWithUsers = postsData.posts.map((post: Post) => ({
    ...post,
    author: usersData.users.find((user: Author) => user.id === post.userId),
  }))

  return postsWithUsers
}

// 게시물 추가
export const fetchPostAdd = async (newPost: NewPost) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  const data = await response.json()
  const defaultPost = {
    id: 0,
    title: "",
    body: "",
    tags: ["history"],
    reactions: {
      likes: 0,
      dislikes: 0,
    },
    views: 0,
    userId: 1,
    author: {
      id: 1,
      username: "emilys",
      image: "https://dummyjson.com/icon/emilys/128",
    },
  }
  const addedPost = { ...defaultPost, ...data }
  return addedPost
}

// 게시물 수정
export const fetchPostUpdate = async (updatedPost: Post) => {
  const response = await fetch(`/api/posts/${updatedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  })
  const data = await response.json()

  return data
}

// 게시물 삭제
export const fetchPostDelete = async (postId: number) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  })
  const data = await response.json()

  return data
}

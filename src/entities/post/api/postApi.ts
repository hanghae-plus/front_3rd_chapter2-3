import { TagSlugType } from "../../tag/api/types"
import { AddPostParamsType, AddPostReturnType, PostFetchReturnType, PostType } from "./types"

export const fetchGetPost = async (limit: number = 10, skip: number = 0): Promise<PostFetchReturnType> => {
  try {
    const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    const data = await response.json()

    return data
  } catch (error) {
    console.error("게시물 가져오기 오류:", error)
    throw new Error(`게시물 가져오기 오류: ${error}`)
  }
}

export const fetchGetPostByTag = async (
  tag: TagSlugType,
  limit: number = 10,
  skip: number = 0,
): Promise<PostFetchReturnType> => {
  try {
    const response = await fetch(`/api/posts/tag/${tag}?limit=${limit}&skip=${skip}`)
    const data = response.json()

    return data
  } catch (error) {
    console.error("게시물 가져오기 오류:", error)
    throw new Error(`게시물 가져오기 오류: ${error}`)
  }
}

export const fetchAddPost = async (newPost: AddPostParamsType): Promise<AddPostReturnType> => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
    const data = await response.json()

    return data
  } catch (error) {
    console.error("게시물 추가 오류:", error)
    throw new Error(`게시물 추가 오류: ${error}`)
  }
}

export const fetchGetPostBySearch = async (searchQuery: string): Promise<PostFetchReturnType> => {
  try {
    const response = await fetch(`/api/posts/search?q=${searchQuery}`)
    const data = await response.json()

    return data
  } catch (error) {
    console.error("게시물 검색 오류:", error)
    throw new Error(`게시물 검색 오류: ${error}`)
  }
}

export const fetchUpdatePost = () => {}

export const fetchDeletePost = async (postId: PostType["id"]) => {
  try {
    const response = await fetch(`/api/posts/${postId}`)
    const data = await response.json()

    return data
  } catch (error) {
    console.error("게시물 삭제 오류:", error)
    throw new Error(`게시물 삭제 오류: ${error}`)
  }
}

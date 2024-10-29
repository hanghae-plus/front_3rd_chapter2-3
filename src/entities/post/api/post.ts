import { getResponseData } from "../../lib/service"

// 게시물 가져오기
export const fetchPosts = async (limit, skip) =>{
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  return getResponseData(response)
}
// 게시물 검색
export const searchPosts = async(searchQuery) =>{
  const response = await fetch(`/api/posts/search?q=${searchQuery}`)
  return getResponseData(response)
}

export const fetchUsers = async() =>{
  const response = await fetch("/api/users?limit=0&select=username,image")
  return getResponseData(response)
}

// 태그에 따른 게시물 가져오기
export const getTagsPost = async(tag) => {
  const response = await fetch(`/api/posts/tag/${tag}`)
  return getResponseData(response)
}

// 게시물 추가
export const addPost = async(newPost) =>{
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  return getResponseData(response);

}

// 게시물 업데이트
export const updatePost =async (selectedPost) => {
  const response = await fetch(`/api/posts/${selectedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedPost),
  })
  return getResponseData(response);
}
// 게시물 삭제
export const deletePost = async (id) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })
  return getResponseData(response);
}
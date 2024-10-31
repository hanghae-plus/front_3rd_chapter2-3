import { useState } from "react"
import { Post, PostsData } from "../model/types"
import { User } from "../../user/model/types"
import { useLocation, useNavigate } from "react-router-dom"
import { fetchComments } from "../../comment/api/commentApi"
import { Tag } from "../../tag/model/types"

const navigate = useNavigate()
const location = useLocation()
const queryParams = new URLSearchParams(location.search)

const [posts, setPosts] = useState<Post[]>([])
const [total, setTotal] = useState(0)
const [tags, setTags] = useState<Tag[]>([])
const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
const [selectedPost, setSelectedPost] = useState<Post | null>(null)
const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")
const [showAddDialog, setShowAddDialog] = useState(false)
const [showEditDialog, setShowEditDialog] = useState(false)
const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })
const [loading, setLoading] = useState(false)
const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")
const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
const [showUserModal, setShowUserModal] = useState(false)
const [selectedUser, setSelectedUser] = useState<User | null>(null)

// URL 업데이트 함수
export const updateURL = () => {
  const params = new URLSearchParams()
  if (skip) params.set("skip", skip.toString())
  if (limit) params.set("limit", limit.toString())
  if (searchQuery) params.set("search", searchQuery)
  if (sortBy) params.set("sortBy", sortBy)
  if (sortOrder) params.set("sortOrder", sortOrder)
  if (selectedTag) params.set("tag", selectedTag)
  navigate(`?${params.toString()}`)
}

// 태그 가져오기
export const fetchTags = async () => {
  try {
    const response = await fetch("/api/posts/tags")
    const data = await response.json()
    setTags(data)
  } catch (error) {
    console.error("태그 가져오기 오류:", error)
  }
}

// 태그별 게시물 가져오기
export const fetchPostsByTag = async (tag: string) => {
  if (!tag || tag === "all") {
    fetchPosts()
    return
  }
  setLoading(true)
  try {
    const [postsResponse, usersResponse] = await Promise.all([
      fetch(`/api/posts/tag/${tag}`),
      fetch("/api/users?limit=0&select=username,image"),
    ])
    const postsData = await postsResponse.json()
    const usersData = await usersResponse.json()

    const postsWithUsers = postsData.posts.map((post: Post) => ({
      ...post,
      author: usersData.users.find((user: User) => user.id === post.userId),
    }))

    setPosts(postsWithUsers)
    setTotal(postsData.total)
  } catch (error) {
    console.error("태그별 게시물 가져오기 오류:", error)
  }
  setLoading(false)
}

// 게시물 추가
export const addPost = async () => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
    const data = await response.json()
    setPosts([data, ...posts])
    setShowAddDialog(false)
    setNewPost({ title: "", body: "", userId: 1 })
  } catch (error) {
    console.error("게시물 추가 오류:", error)
  }
}

// 게시물 업데이트
export const updatePost = async () => {
  try {
    const response = await fetch(`/api/posts/${selectedPost?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPost),
    })
    const data = await response.json()
    setPosts(posts.map((post) => (post.id === data.id ? data : post)))
    setShowEditDialog(false)
  } catch (error) {
    console.error("게시물 업데이트 오류:", error)
  }
}

// 게시물 삭제
export const deletePost = async (id: number) => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
    setPosts(posts.filter((post) => post.id !== id))
  } catch (error) {
    console.error("게시물 삭제 오류:", error)
  }
}

// 게시물 가져오기
export const fetchPosts = () => {
  setLoading(true)
  let postsData: PostsData
  let usersData: User[]

  fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    .then((response) => response.json())
    .then((data) => {
      postsData = data
      return fetch("/api/users?limit=0&select=username,image")
    })
    .then((response) => response.json())
    .then((users) => {
      usersData = users.users
      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.find((user) => user.id === post.userId),
      }))
      setPosts(postsWithUsers)
      setTotal(postsData.total)
    })
    .catch((error) => {
      console.error("게시물 가져오기 오류:", error)
    })
    .finally(() => {
      setLoading(false)
    })
}

// 게시물 상세 보기
export const openPostDetail = (post: Post) => {
  setSelectedPost(post)
  fetchComments(post.id)
  setShowPostDetailDialog(true)
}

// 사용자 모달 열기
export const openUserModal = async (user: User) => {
  try {
    const response = await fetch(`/api/users/${user.id}`)
    const userData = await response.json()
    setSelectedUser(userData)
    setShowUserModal(true)
  } catch (error) {
    console.error("사용자 정보 가져오기 오류:", error)
  }
}

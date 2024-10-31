import { useState } from "react"
import { addPost, updatePost, deletePost, fetchPostsByTag, fetchPosts, searchPosts, fetchUserDetail } from "../api/post"
import type { NewPost, Post, User } from "../types"
import { useComment } from "./useComment"

interface UsePostProps {
  posts: Post[]
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  total: number
  setTotal: React.Dispatch<React.SetStateAction<number>>
  isLoading: boolean
  selectedPost: Post | null
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>
  showPostDetailDialog: boolean
  setShowPostDetailDialog: React.Dispatch<React.SetStateAction<boolean>>
  selectedUser: User | null
  showUserModal: boolean
  setShowUserModal: React.Dispatch<React.SetStateAction<boolean>>
  showAddDialog: boolean
  setShowAddDialog: React.Dispatch<React.SetStateAction<boolean>>
  showEditDialog: boolean
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>
  newPost: NewPost
  setNewPost: React.Dispatch<React.SetStateAction<NewPost>>
  openPostDetail: (post: Post) => void
  openUserModal: (user: User) => void
  handleAddPost: (newPost: NewPost) => Promise<void>
  handleUpdatePost: (post: Post) => Promise<void>
  handleDeletePost: (id: number) => Promise<void>
  handleFetchPostsByTag: (tag: string) => Promise<void>
  handleFetchPosts: (params: { limit: number; skip: number }) => Promise<void>
  handleSearchPosts: (query: string) => Promise<void>
}

export const usePost = (): UsePostProps => {
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [newPost, setNewPost] = useState<NewPost>({
    title: "",
    body: "",
    userId: 0,
  })

  const { handleFetchComments } = useComment()
  const handleAddPost = async (newPost: NewPost) => {
    const data = await addPost(newPost)
    if (data) {
      setPosts((prevPosts) => [data, ...prevPosts])
      return data
    }
  }

  const handleUpdatePost = async (post: Post) => {
    const data = await updatePost(post)
    if (data) {
      setPosts((prevPosts) => prevPosts.map((p) => (p.id === data.id ? data : p)))
      return data
    }
  }

  const handleDeletePost = async (id: number) => {
    const success = await deletePost(id)
    if (success) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
    }
  }

  const handleFetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      // fetchPosts() 함수 호출 (이 함수도 추가로 분리 필요)
      return
    }
    try {
      setIsLoading(true)
      const data = await fetchPostsByTag(tag)
      if (data) {
        setPosts(data.posts)
        setTotal(data.total)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleFetchPosts = async (params: { limit: number; skip: number }) => {
    setIsLoading(true)
    try {
      const data = await fetchPosts(params)
      if (data) {
        setPosts(data.posts)
        setTotal(data.total)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchPosts = async (query: string) => {
    if (!query) {
      handleFetchPosts({ limit: 10, skip: 0 }) // 기본값 사용
      return
    }

    setIsLoading(true)
    try {
      const data = await searchPosts(query)
      if (data) {
        setPosts(data.posts)
        setTotal(data.total)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    handleFetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  const openUserModal = async (user: User) => {
    try {
      const userData = await fetchUserDetail(user.id)
      if (userData) {
        setSelectedUser(userData)
        setShowUserModal(true)
      }
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  return {
    posts,
    setPosts,
    total,
    setTotal,
    isLoading,
    selectedPost,
    setSelectedPost,
    showPostDetailDialog,
    setShowPostDetailDialog,
    openPostDetail,
    selectedUser,
    showUserModal,
    setShowUserModal,
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog,
    newPost,
    setNewPost,
    openUserModal,
    handleAddPost,
    handleUpdatePost,
    handleDeletePost,
    handleFetchPostsByTag,
    handleFetchPosts,
    handleSearchPosts,
  }
}

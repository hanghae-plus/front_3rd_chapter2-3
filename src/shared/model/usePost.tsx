import { useEffect } from "react"
import { addPost, updatePost, deletePost, fetchPostsByTag, fetchPosts, searchPosts, fetchUserDetail } from "../api/post"
import type { NewPost, Post, URLParams, User } from "../types"
import { useComment } from "../../features/model/useComment"
import { useURLParams } from "./useURLParams"
import { atom, useAtom } from "jotai"

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

const postsAtom = atom<Post[]>([])
const totalAtom = atom<number>(0)
const isLoadingAtom = atom<boolean>(false)
const selectedPostAtom = atom<Post | null>(null)
const showPostDetailDialogAtom = atom<boolean>(false)
const selectedUserAtom = atom<User | null>(null)
const showUserModalAtom = atom<boolean>(false)
const showAddDialogAtom = atom<boolean>(false)
const showEditDialogAtom = atom<boolean>(false)
const newPostAtom = atom<NewPost>({
  title: "",
  body: "",
  userId: 0,
})

export const usePost = (): UsePostProps => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [total, setTotal] = useAtom(totalAtom)
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom)
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom)
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)
  const [newPost, setNewPost] = useAtom(newPostAtom)

  const { handleFetchComments } = useComment()
  const { params, updateURL } = useURLParams()
  const { skip = 0, limit = 10, sortBy, sortOrder, tag: selectedTag, search: searchQuery } = params as URLParams

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

  useEffect(() => {
    if (selectedTag) {
      handleFetchPostsByTag(selectedTag)
    } else {
      handleFetchPosts({ limit: limit as number, skip: skip as number })
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  // 검색 디바운싱
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        handleSearchPosts(searchQuery)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    console.log("showAddDialog", showAddDialog)
  }, [showAddDialog])

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

import { atom, useAtom } from "jotai"
import { Post } from "../../../entities/post/model/type"
import { createPostApi, deletePostApi, fetchPostsApi, searchPostsApi, updatePostApi } from "../../../entities/post/api"
import { User } from "../../../entities/user/model/type"
import { PostsData } from "./type"
import { UsersData } from "../../user/model/type"
import { useLoading } from "../../../shared/model/useLoading"
import { useSearch } from "../../../shared/model/useSearch"
import { fetchUsersApi } from "../../../entities/user/api"
import { fetchPostsByTagApi } from "../../../entities/tag/api"
import { useComment } from "../../comment/model/store"
import { useEffect } from "react"

// jotai atoms
export const postsAtom = atom<Post[]>([])
export const showAddDialogAtom = atom(false)
export const showEditDialogAtom = atom(false)
export const showPostDetailDialogAtom = atom(false)
export const newPostAtom = atom({ title: "", body: "", userId: 1 })
export const selectedPostAtom = atom<Post | null>(null)
export const totalAtom = atom(0)

export const usePost = () => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom)
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)
  const [newPost, setNewPost] = useAtom(newPostAtom)
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)
  const [total, setTotal] = useAtom(totalAtom)

  const { setLoading } = useLoading()
  const { searchQuery, limit, skip } = useSearch()
  const { fetchComments } = useComment()

  // 게시물 삭제
  const deletePost = async (id: number) => {
    await deletePostApi(id)
    setPosts((prev) => prev.filter((post: Post) => post.id !== id))
  }

  // 게시물 가져오기
  const getPosts = async (limit: number, skip: number) => {
    const postsData: PostsData = await fetchPostsApi(limit, skip)
    const usersData: UsersData = await fetchUsersApi()

    const postsWithUsers = postsData.posts.map((post: Post) => ({
      ...post,
      author: usersData.users.find((user: User) => user.id === post.userId) || null,
    }))
    setPosts(postsWithUsers)
    setTotal(postsData.total)
  }

  // 게시물 추가
  const addPost = async () => {
    const data = await createPostApi(newPost)
    setPosts((prev) => [data, ...prev])
    setShowAddDialog(false)
    setNewPost({ title: "", body: "", userId: 1 })
  }

  // 게시물 업데이트
  const updatePost = async (selectedPost: Post) => {
    const data = await updatePostApi(selectedPost)
    setPosts((prev) => prev.map((post) => (post.id === data.id ? data : post)))
    setShowEditDialog(false)
  }

  // 태그별 게시물 가져오기
  const getPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      getPosts(limit, skip)
      return
    }
    setLoading(true)
    const [postsResponse, usersResponse] = await Promise.all([fetchPostsByTagApi(tag), fetchUsersApi()])
    const postsData = await postsResponse.json()
    const usersData = await usersResponse.json()

    const postsWithUsers = postsData.posts.map((post: Post) => ({
      ...post,
      author: usersData.users.find((user: User) => user.id === post.userId),
    }))
    setPosts(postsWithUsers)
    setTotal(postsData.total)
    setLoading(false)
  }
  const searchPosts = async () => {
    if (!searchQuery) {
      getPosts(limit, skip)
      return
    }
    setLoading(true)
    const data = await searchPostsApi(searchQuery)
    setPosts(data.posts)
    setTotal(data.total)
    setLoading(false)
  }

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  return {
    posts,
    deletePost,
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog,
    getPosts,
    getPostsByTag,
    showPostDetailDialog,
    setShowPostDetailDialog,
    selectedPost,
    setSelectedPost,
    updatePost,
    newPost,
    setNewPost,
    addPost,
    total,
    searchPosts,
    setPosts,
    setTotal,
    openPostDetail,
  }
}

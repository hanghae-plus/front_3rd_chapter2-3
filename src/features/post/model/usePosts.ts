import { useState } from "react"
import { createPostApi, deletePostApi, fetchPostsApi, updatePostApi } from "../../../entities/post/api"
import { fetchUsersApi } from "../../../entities/user/api"
import { Post } from "../../../entities/post/types"
import { User } from "../../../entities/user/model/types"
import { fetchPostsByTagApi, searchPostsApi } from "../api"

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })
  const [total, setTotal] = useState(0)

  const addPost = async () => {
    const data = await createPostApi(newPost)

    setPosts([data, ...posts])
    setShowAddDialog(false)
    setNewPost({ title: "", body: "", userId: 1 })
  }

  const updatePost = async () => {
    if (!selectedPost) return

    const data = await updatePostApi(selectedPost)

    setPosts(posts.map((post) => (post.id === data.id ? data : post)))
    setShowEditDialog(false)
  }

  const deletePost = (postId: number) => {
    deletePostApi(postId)
    setPosts(posts.filter((post) => post.id !== postId))
  }

  const getPostsByTag = async (tag: string) => {
    const postsData = await fetchPostsByTagApi(tag)
    const usersData = await fetchUsersApi()

    const postsWithUsers = postsData.posts.map((post: Post) => ({
      ...post,
      author: usersData.users.find((user: User) => user.id === post.userId),
    }))

    setPosts(postsWithUsers)
    setTotal(postsData.total)
  }

  const getSearchedPosts = async (searchQuery: string) => {
    const data = await searchPostsApi(searchQuery)

    setPosts(data.posts)
    setTotal(data.total)
  }

  const getPosts = async (limit: number, skip: number, users: User[]) => {
    const postsData = await fetchPostsApi(limit, skip)

    const postsWithUsers = postsData.posts.map((post: Post) => ({
      ...post,
      author: users.find((user) => user.id === post.userId),
    }))
    setPosts(postsWithUsers)
    setTotal(postsData.total)
  }

  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  return {
    posts,
    showAddDialog,
    setShowAddDialog,
    selectedPost,
    setSelectedPost,
    showEditDialog,
    setShowEditDialog,
    newPost,
    setNewPost,
    total,

    addPost,
    updatePost,
    deletePost,
    getPostsByTag,
    getSearchedPosts,
    getPosts,

    showPostDetailDialog,
    setShowPostDetailDialog,
    openPostDetail,
  }
}

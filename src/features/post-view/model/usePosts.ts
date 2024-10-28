import { useState } from "react"
import { deletePostApi, fetchPostsApi } from "../../../entities/post/api"
import { fetchUsersApi } from "../../../entities/user/api"
import { Post } from "../../../entities/post/types"
import { User } from "../../../entities/user/model/types"
import { fetchPostsByTagApi, searchPostsApi } from "../api"

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [total, setTotal] = useState(0)

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
    setPosts,
    showAddDialog,
    setShowAddDialog,
    selectedPost,
    setSelectedPost,
    showEditDialog,
    setShowEditDialog,
    total,

    deletePost,
    getPostsByTag,
    getSearchedPosts,
    getPosts,

    showPostDetailDialog,
    setShowPostDetailDialog,
    openPostDetail,
  }
}

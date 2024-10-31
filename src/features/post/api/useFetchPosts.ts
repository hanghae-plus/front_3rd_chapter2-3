import { useState } from "react"

import { Post } from "../../../entities/post/model/types"
import { User } from "../../../entities/user/model/types"
import { postApi } from "../../../entities/post/api/postApi"
import { userApi } from "../../../entities/user/api/userApi"

interface PostWithUser extends Post {
  author?: User
}

const useFetchPosts = () => {
  const [posts, setPosts] = useState<PostWithUser[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchPosts = async ({ limit, skip }: { limit: number; skip: number }) => {
    try {
      setLoading(true)

      const [postsData, usersData] = await Promise.all([
        postApi.fetchPosts({ limit, skip }),
        userApi.fetchUsers({ limit: 0, select: "username,image" }),
      ])
      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  const searchPosts = async ({ q }: { q: string }) => {
    try {
      setLoading(true)

      const [postsData, usersData] = await Promise.all([
        postApi.searchPosts({ q }),
        userApi.fetchUsers({ limit: 0, select: "user,image" }),
      ])
      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPostsByTag = async ({ tag }: { tag: string }) => {
    try {
      setLoading(true)

      const [postsData, usersData] = await Promise.all([
        postApi.fetchPostsByTag({ tag }),
        userApi.fetchUsers({ limit: 0, select: "username,image" }),
      ])
      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  const appendLocalPost = (post: PostWithUser) => {
    setPosts([post, ...posts])
  }

  const updateLocalPost = (post: PostWithUser) => {
    setPosts(posts.map((p) => (p.id === post.id ? post : p)))
  }

  const removeLocalPost = (id: number) => {
    setPosts(posts.filter((p) => p.id !== id))
  }

  return {
    posts,
    loading,
    fetchPosts,
    total,
    searchPosts,
    fetchPostsByTag,
    appendLocalPost,
    updateLocalPost,
    removeLocalPost,
  }
}

export default useFetchPosts

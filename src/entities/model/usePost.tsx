// src/features/postsManager/hooks/usePosts.js
import { useState, useEffect } from "react"
import { fetchPosts, fetchUsers, fetchTags } from "../post/api/post"

export const usePosts = () => {
  const [posts, setPosts] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(false)

  const loadPosts = async (limit, skip) => {
    setLoading(true)
    const postsData = await fetchPosts(limit, skip)
    const usersData = await fetchUsers()
    const postsWithUsers = postsData.posts.map((post) => ({
      ...post,
      author: usersData.find((user) => user.id === post.userId),
    }))
    setPosts(postsWithUsers)
    setLoading(false)
  }

  const loadTags = async () => {
    const tags = await fetchTags()
    setTags(tags)
  }

  useEffect(() => {
    loadTags()
  }, [])

  return { posts, tags, loading, loadPosts }
}

import { Post } from "../../../../entities/Post/model/types"
import { postApi } from "../../../../entities/Post/api/postApi"
import { userApi } from "../../../../entities/User/api/userApi"
import { usePostStore } from "../stores/usePostStore"

export const usePostService = () => {
  const {
    posts,
    setPosts,
    setTotal,
    setLoading,
    newPost,
    setShowAddDialog,
    setNewPost,
    selectedPost,
    setShowEditDialog,
    searchQuery,
  } = usePostStore()

  // 게시물 조회
  const fetchPosts = async ({ skip, limit }: { skip: number; limit: number; sortBy: string; sortOrder: string }) => {
    setLoading(true)
    try {
      // limit과 skip을 파라미터에서 받은 값으로 사용
      const postsResponse = await postApi.getPosts(limit, skip)
      const users = await userApi.getUsers()

      if (!Array.isArray(postsResponse)) {
        console.error("예상치 못한 응답 형식:", postsResponse)
        return
      }

      const postsWithUsers = postsResponse.map((post: Post) => ({
        ...post,
        author: users.find((user: { id: number }) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsResponse.length)
    } catch (error) {
      console.error("게시물 조회 오류:", error)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  // 게시물 추가
  const addPost = async () => {
    try {
      const data = await postApi.createPost(newPost)
      setPosts([data, ...posts])
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  // 게시물 수정
  const editPost = async () => {
    if (!selectedPost) return
    try {
      const data = await postApi.updatePost(selectedPost.id, selectedPost)
      const updatedPosts = posts.map((post: Post) => (post.id === data.id ? data : post))
      setPosts(updatedPosts)
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 수정 오류:", error)
    }
  }

  // 게시물 삭제
  const removePost = async (id: number) => {
    try {
      await postApi.deletePost(id)
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      // 검색어가 없을 때는 현재 URL의 파라미터 값을 사용
      const urlParams = new URLSearchParams(window.location.search)
      await fetchPosts({
        skip: parseInt(urlParams.get("skip") || "0"),
        limit: parseInt(urlParams.get("limit") || "10"),
        sortBy: urlParams.get("sortBy") || "",
        sortOrder: urlParams.get("sortOrder") || "asc",
      })
      return
    }
    setLoading(true)
    try {
      const data = await postApi.searchPost(searchQuery)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }

  return {
    fetchPosts,
    addPost,
    editPost,
    removePost,
    searchPosts,
  }
}

import { useAtom } from "jotai"
import {
  newPostAtom,
  postsAtom,
  selectedPostAtom,
  showAddDialogAtom,
  showEditDialogAtom,
  showPostDetailDialogAtom,
  showUserModalAtom,
} from "./postAtoms"
import { Post } from "../../../entities/types/postType"
import { PostUpdate } from "../../../entities/api/postUpdate"
import { postCreate } from "../../../entities/api/postCreate"
import { postDelete } from "../../../entities/api/postDelete"
import { commentFetch } from "../../comment/model/commentFetch"
import { commentsAtom } from "../../comment/model/commentAtom"
import { userFetchData } from "../../../entities/model/userFetch"
import { userAtom } from "../../../entities/model/atom"

export const usePostHandler = () => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [, setShowEditDialog] = useAtom(showEditDialogAtom)
  const [, setShowAddDialog] = useAtom(showAddDialogAtom)
  const [newPost, setNewPost] = useAtom(newPostAtom)
  const [, setSelectedPost] = useAtom(selectedPostAtom)
  const [, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)
  const [, setComments] = useAtom(commentsAtom)
  const [, setUser] = useAtom(userAtom)
  const [, setShowUserModal] = useAtom(showUserModalAtom)

  // 게시물 업데이트
  const handleUpdatePost = async (selectedPost: Post | null): Promise<void> => {
    if (!selectedPost) {
      console.error("No selected post to update.")
      return
    }

    try {
      const updateResponse = await PostUpdate(selectedPost)

      if (updateResponse) {
        setPosts(posts.map((post) => (post.id === updateResponse.id ? updateResponse : post)))
        setShowEditDialog(false)
      } else {
        console.error("No update response received.")
      }
    } catch (error) {
      console.error("Failed to update post:", error)
    }
  }

  // 게시물 추가
  const handleAddPost = async (): Promise<void> => {
    const addResponse = await postCreate(newPost)
    if (!addResponse) {
      return
    }

    setPosts([addResponse, ...posts])
    setShowAddDialog(false)
    setNewPost({ title: "", body: "", userId: 1, tags: [] })
  }

  // 게시물 삭제
  const handleDeletePost = async (postId: number) => {
    try {
      const deleteResponse = await postDelete(postId)
      if (deleteResponse) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId))
        alert("삭제 완료")
      } else {
        alert("삭제 오류")
      }
    } catch (error) {
      console.error("게시글 삭제 중 오류 발생:", error)
      alert("삭제 중 오류 발생")
    }
  }

  // 게시물 수정 모달 open
  const handleOpenPostUpdate = async (selectedPost: Post): Promise<void> => {
    if (!selectedPost) {
      return
    }

    setSelectedPost(selectedPost)

    try {
      const updateResponse = await PostUpdate(selectedPost)

      // updateResponse가 null이 아닌 경우에만 상태 업데이트
      if (updateResponse) {
        setPosts((prevPosts) => prevPosts.map((post) => (post.id === updateResponse.id ? updateResponse : post)))
        setShowEditDialog(true)
      } else {
        console.error("No update response received.")
      }
    } catch (error) {
      console.error("Failed to update post:", error)
    }
  }

  // 게시물 상세보기 모달
  const handleOpenPostDetail = async (post: Post) => {
    setSelectedPost(post)
    try {
      const getComment = await commentFetch(post.id)
      console.log("getComment", getComment)
      if (!getComment) {
        return
      }

      setComments((prev) => ({ ...prev, [post.id]: getComment }))
      setShowPostDetailDialog(true)
    } catch (error) {
      console.error("댓글을 가져오는 중 오류 발생:", error)
    }
  }

  const handleOpenUserModal = async (userId: number) => {
    try {
      const userData = await userFetchData(userId)

      setUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 데이터를 가져오는 중 오류 발생:", error)
    }
  }

  return {
    handleOpenPostUpdate,
    handleUpdatePost,
    handleAddPost,
    handleDeletePost,
    handleOpenPostDetail,
    handleOpenUserModal,
  }
}

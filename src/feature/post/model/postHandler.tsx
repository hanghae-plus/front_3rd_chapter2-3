import { useAtom } from "jotai"
import { newPostAtom, postsAtom, selectedPostAtom, showAddDialogAtom, showEditDialogAtom } from "./postAtoms"
import { usePost } from "./usePost"
import { Post } from "./postType"

export const usePostHandler = () => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [, setShowEditDialog] = useAtom(showEditDialogAtom)
  const [, setShowAddDialog] = useAtom(showAddDialogAtom)
  const [newPost, setNewPost] = useAtom(newPostAtom)
  const [, setSelectedPost] = useAtom(selectedPostAtom)

  const { updatePost, addPost } = usePost() // updatePost 함수 가져오기

  // 게시물 업데이트 모달 open
  const handleOpenPostUpdate = async (selectedPost: Post): Promise<void> => {
    if (!selectedPost) {
      return
    }

    setSelectedPost(selectedPost)

    try {
      const updateResponse = await updatePost(selectedPost)

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

  // 게시물 업데이트
  const handleUpdatePost = async (selectedPost: Post): Promise<void> => {
    console.log("selectedPost >>> ", selectedPost)
    try {
      const updateResponse = await updatePost(selectedPost)

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

  const handleAddPost = async (): Promise<void> => {
    const addResponse = await addPost(newPost)
    if (!addResponse) {
      return
    }

    setPosts([addResponse, ...posts])
    setShowAddDialog(false)
    setNewPost({ title: "", body: "", userId: 1, tags: [] })
  }

  return { handleOpenPostUpdate, handleUpdatePost, handleAddPost }
}

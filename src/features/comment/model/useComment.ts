import { atom, useAtom } from "jotai"
import { Comment } from "../../../shared/type"

const commentsAtom = atom<{ [postId: number]: Comment[] }>({})
const selectedCommentAtom = atom<Comment | null>(null)
const newCommentAtom = atom<{ body: string; postId: number | null; userId: number }>({
  body: "",
  postId: null,
  userId: 1,
})

export const useComment = () => {
  const [comments, setComments] = useAtom(commentsAtom)
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)
  const [newComment, setNewComment] = useAtom(newCommentAtom)

  return {
    comments,
    setComments,
    selectedComment,
    setSelectedComment,
    newComment,
    setNewComment,
  }
}

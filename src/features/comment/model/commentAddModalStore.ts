import { atom, useAtom } from "jotai"
import { NewComment } from "../../../entities/comment/model/types"

const newCommentAtom = atom<NewComment>({ body: "", postId: null, userId: 1 })
const showAddCommentDialogAtom = atom(false)

export const useCommentAddModalStore = () => {
  const [newComment, setNewComment] = useAtom(newCommentAtom)
  const [showAddCommentModal, setShowAddCommentModal] = useAtom(showAddCommentDialogAtom)

  return {
    newComment,
    setNewComment,
    showAddCommentModal,
    setShowAddCommentModal,
  }
}

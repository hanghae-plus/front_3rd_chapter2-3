import { atom, useAtom } from "jotai"
import { CommentType, NewCommentType } from "../../../entities/Comment/model/types"

const newCommentAtom = atom<NewCommentType>({ body: "", postId: null, userId: 1 })
const selectedCommentAtom = atom<CommentType>()

export const useComment = () => {
  const [newComment, setNewComment] = useAtom(newCommentAtom)
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)

  return { newComment, setNewComment, selectedComment, setSelectedComment }
}

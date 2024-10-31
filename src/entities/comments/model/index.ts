import { atom, useAtom } from "jotai"
import { User } from "../../user/model"

// interface
export interface Comments {
  [postId: number]: Comment[]
}

export interface Comment {
  id: number
  user: User
  body: string
  likes: number
  postId: number
}

export interface NewComment {
  body: string
  postId: number | null
  userId: number
}

// Atom
const commentsAtom = atom<Comments>({})
const newCommentsAtom = atom<NewComment>({ body: "", postId: null, userId: 1 })
const showAddCommentDialogAtom = atom<boolean>(false)
const selectedCommentAtom = atom<Comment | null>(null)
const showEditCommentDialogAtom = atom<boolean>(false)

// Hook
export const useComments = () => {
  const [comments, setComments] = useAtom<Comments>(commentsAtom)
  const [newComment, setNewComment] = useAtom<NewComment>(newCommentsAtom)
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom<boolean>(showAddCommentDialogAtom)
  const [selectedComment, setSelectedComment] = useAtom<Comment | null>(selectedCommentAtom)
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)

  return new (class {
    comments = comments
    setComments = setComments
    newComment = newComment
    setNewComment = setNewComment
    showAddCommentDialog = showAddCommentDialog
    setShowAddCommentDialog = setShowAddCommentDialog
    selectedComment = selectedComment
    setSelectedComment = setSelectedComment
    showEditCommentDialog = showEditCommentDialog
    setShowEditCommentDialog = setShowEditCommentDialog
  })()
}

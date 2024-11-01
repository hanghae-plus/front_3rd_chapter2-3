import { atom, useAtom } from "jotai";
import { CommentType } from "../../../entities/comment";

const commentListAtom = atom<CommentType[]>([]);
const selectedCommentAtom = atom<CommentType | null>(null);
const showAddCommentDialogAtom = atom<boolean>(false);
const showEditCommentDialogAtom = atom<boolean>(false);
const newCommentAtom = atom<Omit<CommentType, "id">>({
  body: "",
  postId: 0,
  userId: 0,
  likes: 0,
} as Omit<CommentType, "id">);

export const useComment = () => {
  const [commentList, setCommentList] = useAtom(commentListAtom);
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom);
  const [newComment, setNewComment] = useAtom(newCommentAtom);
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom);
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom);

  return new (class {
    commentList = commentList;
    selectedComment = selectedComment;
    showAddCommentDialog = showAddCommentDialog;
    showEditCommentDialog = showEditCommentDialog;
    newComment = newComment;
    setCommentList = setCommentList;
    setSelectedComment = setSelectedComment;
    setShowAddCommentDialog = setShowAddCommentDialog;
    setShowEditCommentDialog = setShowEditCommentDialog;
    setNewComment = setNewComment;
  })();
};

import { atom, useAtom } from "jotai";
import { Comments, NewComment } from "../../../entities/comment/model/types.ts";
import { Dispatch, SetStateAction } from "react";

interface UseComment {
  comments: Record<number, Comments[]>;
  setComments: Dispatch<SetStateAction<Record<number, Comments[]>>>;
  showAddCommentDialog: boolean;
  setShowAddCommentDialog: Dispatch<SetStateAction<boolean>>;
  newComment: NewComment;
  setNewComment: Dispatch<SetStateAction<NewComment>>;
  showEditCommentDialog: boolean;
  setShowEditCommentDialog: Dispatch<SetStateAction<boolean>>;
  selectedComment: Comments | undefined;
  setSelectedComment: Dispatch<SetStateAction<Comments | undefined>>;
}

export const commentsAtom = atom<Record<number, Comments[]>>([]);
export const selectedCommentAtom = atom<Comments>();
export const newCommentAtom = atom<NewComment>({ body: "", postId: null, userId: 1 });
export const showAddCommentDialogAtom = atom<boolean>(false);
export const showEditCommentDialogAtom = atom<boolean>(false);

export const useComment = (): UseComment => {
  const [comments, setComments] = useAtom(commentsAtom);
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom);
  const [newComment, setNewComment] = useAtom(newCommentAtom);
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom);
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom);

  return {
    comments,
    setComments,
    showAddCommentDialog,
    setShowAddCommentDialog,
    newComment,
    setNewComment,
    showEditCommentDialog,
    setShowEditCommentDialog,
    selectedComment,
    setSelectedComment,
  };
};

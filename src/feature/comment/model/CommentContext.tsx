import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Comments, NewComment } from "../../../entities/comment/model/types.ts";

interface CommentContextProps {
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

const CommentContext = createContext<CommentContextProps | undefined>(undefined);

export const CommentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comments, setComments] = useState<Record<number, Comments[]>>([]);
  const [selectedComment, setSelectedComment] = useState<Comments>();
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 });

  const [showAddCommentDialog, setShowAddCommentDialog] = useState<boolean>(false);
  const [showEditCommentDialog, setShowEditCommentDialog] = useState<boolean>(false);

  return (
    <CommentContext.Provider
      value={{
        comments,
        setComments,
        showAddCommentDialog,
        setShowAddCommentDialog,
        setNewComment,
        newComment,
        showEditCommentDialog,
        setShowEditCommentDialog,
        selectedComment,
        setSelectedComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useCommentContext must be used within a PostProvider");
  }
  return context;
};

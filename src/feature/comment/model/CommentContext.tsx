import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Comments, NewComment } from "../../../temp/types.ts";
import {
  deleteExistingComment,
  getComments,
  patchLikeComment,
  postNewComment,
  putExistingComment,
} from "../../../entities/comment/api";

interface CommentContextProps {
  comments: Record<number, Comments[]>;
  setComments: Dispatch<SetStateAction<Record<number, Comments[]>>>;
  showAddCommentDialog: boolean;
  setShowAddCommentDialog: Dispatch<SetStateAction<boolean>>;
  newComment: NewComment;
  setNewComment: Dispatch<SetStateAction<NewComment>>;
  addComment: () => Promise<void>;
  showEditCommentDialog: boolean;
  setShowEditCommentDialog: Dispatch<SetStateAction<boolean>>;
  selectedComment: Comments | undefined;
  setSelectedComment: Dispatch<SetStateAction<Comments | undefined>>;
  updateComment: () => Promise<void>;
  likeComment: (id: number, postId: number) => Promise<void>;
  deleteComment: (id: number, postId: number) => Promise<void>;
  fetchComments: (postId: number) => Promise<void>;
}

const CommentContext = createContext<CommentContextProps | undefined>(undefined);

export const CommentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comments, setComments] = useState<Record<number, Comments[]>>([]);
  const [selectedComment, setSelectedComment] = useState<Comments>();
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 });
  const [showAddCommentDialog, setShowAddCommentDialog] = useState<boolean>(false);
  const [showEditCommentDialog, setShowEditCommentDialog] = useState<boolean>(false);

  const fetchComments = async (postId: number) => {
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음

    const data = await getComments(postId);

    console.log(data, "comment", postId);
    if (data) {
      setComments((prev) => ({ ...prev, [postId]: data.comments }));
      console.log(comments);
    }
  };

  useEffect(() => {
    console.log(comments, "context");
  }, [comments]);

  const addComment = async () => {
    const data = await postNewComment(newComment);

    if (data) {
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data?.postId] || []), data],
      }));
      setShowAddCommentDialog(false);
      setNewComment({ body: "", postId: null, userId: 1 });
    }
  };

  const updateComment = async () => {
    if (selectedComment) {
      const data = await putExistingComment(selectedComment.id, selectedComment.body);

      if (data) {
        setComments((prev) => ({
          ...prev,
          [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
        }));
        setShowEditCommentDialog(false);
      }
    }
  };
  const deleteComment = async (id: number, postId: number) => {
    await deleteExistingComment(id);

    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].filter((comment: Comments) => comment.id !== id),
    }));
  };

  const likeComment = async (id: number, postId: number) => {
    const comment = comments[postId]?.find((c) => c.id === id);

    if (!comment) {
      console.error("댓글을 찾을 수 없습니다.");
      return;
    }

    const data = await patchLikeComment(id, comment.likes);
    if (data) {
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment: Comments) => (comment.id === data.id ? data : comment)),
      }));
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        setComments,
        showAddCommentDialog,
        setShowAddCommentDialog,
        setNewComment,
        newComment,
        addComment,
        showEditCommentDialog,
        setShowEditCommentDialog,
        selectedComment,
        setSelectedComment,
        updateComment,
        likeComment,
        deleteComment,
        fetchComments,
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

import { postCommentApi } from "@/entities/comment/api/postCommentApi";
import { Comment } from "@/entities/comment/model/types";
import { create } from "zustand";
import { NewComment } from "./types";

type CommentStates = {
  comments: Record<number, Comment[]>;
  selectedComment: Comment | null;
  loading: boolean;
};

type CommentApiActions = {
  fetchComments: (postId: number) => void;
  addComment: (newComment: NewComment) => void;
  updateComment: (comment: Comment) => void;
  deleteComment: (postId: number, id: number) => void;
  likeComment: (comment: Comment, postId: number) => void;
};

type CommentActions = {
  handleSelectComment: (comment: Comment | null) => void;
};

type CommentStore = CommentStates & CommentActions & CommentApiActions;

const handler = async <T>(fn: () => T, onError: (error: unknown) => void) => {
  try {
    return await fn();
  } catch (error) {
    onError(error);
    throw error;
  }
};

const useCommentStore = create<CommentStore>((set, get) => ({
  comments: {},
  loading: false,
  selectedComment: null,
  handleSelectComment: (comment) => set({ selectedComment: comment }),
  fetchComments: async (postId) => {
    if (get().comments[postId]) return;

    const comments = await handler(
      () => postCommentApi.fetchComments(postId),
      (error) => console.error("댓글 가져오기 오류:", error),
    );
    console.log(postId, comments);
    set((state) => ({ comments: { ...state.comments, [postId]: comments } }));
  },
  addComment: async (newComment) => {
    const addedComment = await handler(
      () => postCommentApi.addComment(newComment),
      (error) => console.error("댓글 추가 오류:", error),
    );
    set((state) => ({
      comments: { ...state.comments, [addedComment.postId]: [...state.comments[addedComment.postId], addedComment] },
    }));
  },
  updateComment: async (comment) => {
    const updatedComment = await handler(
      () => postCommentApi.updateComment(comment),
      (error) => console.error("댓글 수정 오류:", error),
    );
    set((state) => ({
      comments: {
        ...state.comments,
        [updatedComment.postId]: [
          ...state.comments[updatedComment.postId].map((c) => (c.id === updatedComment.id ? updatedComment : c)),
        ],
      },
    }));
  },
  deleteComment: async (id, postId) => {
    await handler(
      () => postCommentApi.deleteComment(id),
      (error) => console.error("댓글 삭제 오류:", error),
    );
    set((state) => ({ comments: { ...state.comments, [postId]: state.comments[postId].filter((c) => c.id !== id) } }));
  },
  likeComment: async (comment, postId) => {
    const likedComment = await handler(
      () => postCommentApi.likeComment(comment),
      (error) => console.error("댓글 좋아요 오류:", error),
    );
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: [...state.comments[postId].map((c) => (c.id === likedComment.id ? likedComment : c))],
      },
    }));
  },
}));

export default useCommentStore;

import { commentApi } from "@/entities/comment/api/commentApi";
import { Comment } from "@/entities/comment/model/types";
import { apiHandler } from "@/shared/api/apiHandler";
import { addItemInArray, filterByID, updateByID } from "@/shared/lib/array";
import { addItemInObject } from "@/shared/lib/object";
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

const useCommentStore = create<CommentStore>((set, get) => ({
  comments: {},
  loading: false,
  selectedComment: null,
  handleSelectComment: (comment) => set({ selectedComment: comment }),
  fetchComments: async (postId) => {
    if (get().comments[postId]) return;
    const comments = await apiHandler(
      () => commentApi.fetchComments(postId),
      (error) => console.error("댓글 가져오기 오류:", error),
    );
    set((state) => ({ comments: addItemInObject(state.comments, { [postId]: comments }) }));
  },
  addComment: async (newComment) => {
    const addedComment = await apiHandler(
      () => commentApi.addComment(newComment),
      (error) => console.error("댓글 추가 오류:", error),
    );
    const postId = addedComment.postId;
    set((state) => ({
      comments: addItemInObject(state.comments, { [postId]: addItemInArray(state.comments[postId], addedComment) }),
    }));
  },
  updateComment: async (comment) => {
    const updatedComment = await apiHandler(
      () => commentApi.updateComment(comment),
      (error) => console.error("댓글 수정 오류:", error),
    );
    const postId = updatedComment.postId;
    set((state) => ({
      comments: addItemInObject(state.comments, { [postId]: updateByID(state.comments[postId], updatedComment) }),
    }));
  },
  deleteComment: async (id, postId) => {
    await apiHandler(
      () => commentApi.deleteComment(id),
      (error) => console.error("댓글 삭제 오류:", error),
    );
    set((state) => ({
      comments: addItemInObject(state.comments, { [postId]: filterByID(state.comments[postId], id) }),
    }));
  },
  likeComment: async (comment, postId) => {
    const likedComment = await apiHandler(
      () => commentApi.likeComment(comment),
      (error) => console.error("댓글 좋아요 오류:", error),
    );
    set((state) => ({
      comments: addItemInObject(state.comments, { [postId]: updateByID(state.comments[postId], likedComment) }),
    }));
  },
}));

export default useCommentStore;

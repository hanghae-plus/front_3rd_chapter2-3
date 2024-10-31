import { create } from 'zustand'
import { Comment } from './types'
import {api}  from '../../../shared/api/base';

export type CommentStore = {
comments: Record<number, Comment[]> 
  selectedComment: Comment | null
  loading: boolean
  error: string | null

  // 기본 상태 관리
  setComments: (postId: number, comments: Comment[]) => void
  setSelectedComment: (comment: Comment | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void

  // API 연동 액션
  fetchComments: (postId: number) => Promise<void>
  addComment: (comment: Omit<Comment, 'id'>) => Promise<void>
  updateComment: (comment: Comment) => Promise<void>
  deleteComment: (commentId: number, postId: number) => Promise<void>
  likeComment: (commentId: number, postId: number) => Promise<void>
}

export const useCommentStore = create<CommentStore>((set, get) => ({
    comments: {},
    selectedComment: null,
    loading: false,
    error: null,
  
    // 기본 상태 관리
    setComments: (postId, comments) => 
    set(state => ({ comments: { ...state.comments, [postId]: comments } })),
    setSelectedComment: (comment) => set({ selectedComment: comment }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    reset: () => set({ comments: {}, selectedComment: null, error: null }),
  
    // API 연동 액션
    fetchComments: async (postId) => {
        if(get().comments[postId]) return;

        try {
            const response = await api.get(`/comments/post/${postId}`);
            set((state) => ({
              comments: {
                ...state.comments,
                [postId]: response.data.comments,
              },
            }));
      } catch (error) {
        console.error(error);
    } 
    },
  
    addComment: async (comment) => {
      try {
       const response = await api.post(`/comments`, comment);
       const newComment = response.data;

       set((state) => ({
        comments: {
          ...state.comments,
          [newComment.postId]: [
            ...(state.comments[newComment.postId] || []),
            newComment,
          ],
        },
      }));
      } catch (error) {
        console.error("failed to add comment",error) 
      
      } 
    },
  
    updateComment: async (comment) => {
      try {
        const response = await api.put(`/comments/${comment.id}`, {
            body: comment.body,
          });
          const updatedComment = response.data;

       set((state) => ({
          comments: {
            ...state.comments,
            [updatedComment.postId]: state.comments[updatedComment.postId].map(
              (c) => (c.id === updatedComment.id ? updatedComment : c)
            ),
          },
        }));
      } catch (error) {
        console.error("failed to update comment",error) 
      } 
    },
  
    deleteComment: async (id, postId) => {
      try {
        await api.delete(`/comments/${id}`);
        set((state) => ({
          comments: {
            ...state.comments,
            [postId]: state.comments[postId].filter((c) => c.id !== id),
          },
        }));
      } catch (error) {
        console.error("failed to delete comment",error) 
      } 
    },
  
    likeComment: async (id, postId) => {
      try {
        const comment = get().comments[postId].find((c) => c.id === id);
        if (!comment) return;

        const response = await api.patch(`/comments/${id}`, {
          likes: comment.likes + 1,
        });
        
        set((state) => ({
          comments: {
            ...state.comments,
            [postId]: state.comments[postId].map((c) =>
              c.id === id ? response.data : c
            ),
          },
        }));
      } catch (error) {
        console.error("failed to like comment",error)
      } 
    }
    //TODO: setSelectedComment 추가
    // setSelectedComment: (comment) => {
    //     set({ selectedComment: comment });
    //   },
  }))
  
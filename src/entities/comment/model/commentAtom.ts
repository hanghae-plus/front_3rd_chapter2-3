import { atom } from 'jotai';
import {Comment} from '../api/types'
// 댓글 상태
export const commentAtom = atom<Comment | null>(null);

// 선택된 댓글 상태
export const selectedCommentAtom = atom<Comment | null>(null);

// 댓글 수정 다이얼로그 상태
export const showEditCommentDialogAtom = atom<boolean>(false);

// 댓글 추가 다이얼로그 상태
export const showAddCommentDialogAtom = atom<boolean>(false);

// 댓글 목록 상태 (postId를 키로 하는 객체)
export const commentsAtom = atom<Record<number, Comment[]>>({});

// 새 댓글 상태
export const newCommentAtom = atom<{ body: string; postId: number | null; userId: number }>({
  body: '',
  postId: null,
  userId: 1,
});
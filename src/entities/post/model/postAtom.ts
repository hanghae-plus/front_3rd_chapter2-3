import { atom } from 'jotai';
import { EnrichedPost, Post } from '../api/types';

export const skipAtom = atom(0);
export const limitAtom = atom(10);
export const searchQueryAtom = atom('');
export const sortByAtom = atom('');
export const sortOrderAtom = atom<'asc' | 'desc'>('asc');
export const showPostDetailDialogAtom = atom(false);

// 게시물 상태
export const postAtom = atom<Post | null>(null);
export const postsAtom = atom<EnrichedPost[]>([]);

// 선택된 게시물 상태
export const selectedPostAtom = atom<Post | null>(null);

// 게시물 수정 다이얼로그 상태
export const showEditDialogAtom = atom<boolean>(false);

// 게시물 추가 다이얼로그 상태
export const showAddDialogAtom = atom<boolean>(false);

// 새 게시물 상태
export const newPostAtom = atom<{ title: string; body: string; userId: number }>({
  title: '',
  body: '',
  userId: 1,
});
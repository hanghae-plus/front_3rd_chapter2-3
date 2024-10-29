import { atom } from 'jotai';

export const commentAtom = atom(null);
export const selectedCommentAtom = atom(null);
export const showEditCommentDialogAtom = atom(false);
export const showAddCommentDialogAtom = atom(false);
export const commentsAtom = atom({});
export const newCommentAtom = atom({ body: '', postId: null, userId: 1 });

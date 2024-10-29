import { atom } from 'jotai';

export const postAtom = atom(null);
export const selectedPostAtom = atom(null);
export const showEditDialogAtom = atom(false);
export const showAddDialogAtom = atom(false);
export const newPostAtom = atom({ title: '', body: '', userId: 1 });

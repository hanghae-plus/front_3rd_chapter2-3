import { atom } from 'jotai';
import type { NewPost, Post } from '@entities/home/model/types';

export const NEW_POST: NewPost = {
  title: '',
  body: '',
  userId: 1,
};

export const selectedPostAtom = atom<Post | null>(null);
export const isPostDetailDialogOpenAtom = atom<boolean>(false);
export const newPostAtom = atom<NewPost>(NEW_POST);

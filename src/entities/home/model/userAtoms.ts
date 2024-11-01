import { atom } from 'jotai';
import { User } from '@entities/home/model/types';

export const userAtom = atom<User | null>(null);
export const isPostUserDialogOpenAtom = atom<boolean>(false);

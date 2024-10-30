import { atom } from 'jotai';
import { User, UserInfo } from '../api/types';

// 사용자 상태
export const userAtom = atom<User | null>(null);

// 선택된 사용자 상태
export const selectedUserAtom = atom<UserInfo | null>(null);

// 사용자 모달 상태
export const showUserModalAtom = atom<boolean>(false);
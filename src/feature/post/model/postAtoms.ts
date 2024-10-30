// src/atoms.js
import { atom } from "jotai"
import { Post } from "./postType"

// 게시물 리스트 상태
export const postsAtom = atom<Post[]>([]) // 초기값은 빈 배열

// 새 게시물 상태
export const newPostAtom = atom<Omit<Post, "id">>({ title: "", body: "", userId: 1, tags: [] })

// 추가 다이얼로그 상태
export const showAddDialogAtom = atom<boolean>(false)

// 선택된 게시물 다이얼로그 상태
export const showEditDialogAtom = atom<boolean>(false)
export const selectedPostAtom = atom<Post | null>(null)

// 게시물 상세 보기 상태
export const showPostDetailDialogAtom = atom<boolean>(false)

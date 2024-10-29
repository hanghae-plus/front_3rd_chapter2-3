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

// 댓글 상태
export const commentsAtom = atom<Record<number, any>>({}) // 댓글을 postId로 그룹화하기 위한 예시
export const selectedCommentAtom = atom<any>(null) // 선택된 댓글
export const newCommentAtom = atom<{ body: string; postId: number | null; userId: number }>({
  body: "",
  postId: null,
  userId: 1,
})

// 댓글 다이얼로그 상태
export const showAddCommentDialogAtom = atom<boolean>(false)
export const showEditCommentDialogAtom = atom<boolean>(false)

// 게시물 상세 보기 상태
export const showPostDetailDialogAtom = atom<boolean>(false)

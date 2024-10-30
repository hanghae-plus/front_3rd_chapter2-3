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

// 게시물 검색 쿼리
const queryParams = new URLSearchParams(window.location.search) // queryParams 정의
export const searchQueryAtom = atom<string>(queryParams.get("search") || "") // URL 쿼리에서 검색어 가져오기

export const selectedTagAtom = atom<string>(queryParams.get("tag") || "") // URL 쿼리에서 검색어 가져오기

export const totalAtom = atom(0)
export const skipAtom = atom(parseInt(queryParams.get("skip") || "0"))
export const limitAtom = atom(parseInt(queryParams.get("limit") || "10"))
export const sortByAtom = atom(queryParams.get("sortBy") || "")
export const sortOrderAtom = atom(queryParams.get("sortOrder") || "asc")
export const tagsAtom = atom([])

export const showUserModalAtom = atom(false)

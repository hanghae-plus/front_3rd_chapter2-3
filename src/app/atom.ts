import { atom } from "jotai"

export interface Post {
  id: string
  title: string
  content: string
  author: string
  createdAt: Date
}

interface UserAddress {
  address: string
  city: string
  state: string
}

interface UserCompany {
  name: string
  title: string
}

interface User {
  image: string
  username: string
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  address: UserAddress
  company: UserCompany
}

// 게시물 상태
export const postsAtom = atom([])
export const loadingAtom = atom(false)
export const totalAtom = atom(0)
export const commentsAtom = atom({})
export const errorAtom = atom<string | null>(null)
export const skipAtom = atom<number>(0)
export const limitAtom = atom<number>(10)
export const searchQueryAtom = atom<string>("")
export const selectedPostAtom = atom<Post | null>(null)
export const sortByAtom = atom<string>("")
export const sortOrderAtom = atom<string>("asc")
export const showAddDialogAtom = atom<boolean>(false)
export const showEditDialogAtom = atom<boolean>(false)
export const newPostAtom = atom<{ title: string; body: string; userId: number }>({
  title: "",
  body: "",
  userId: 1,
})
export const tagsAtom = atom<string[]>([])
export const selectedTagAtom = atom<string>("")
export const selectedCommentAtom = atom<Comment | null>(null)
export const newCommentAtom = atom<{ body: string; postId: number | null; userId: number }>({
  body: "",
  postId: null,
  userId: 1,
})
export const showAddCommentDialogAtom = atom<boolean>(false)
export const showEditCommentDialogAtom = atom<boolean>(false)
export const showPostDetailDialogAtom = atom<boolean>(false)
export const showUserModalAtom = atom<boolean>(false)
export const selectedUserAtom = atom<User | null>(null)

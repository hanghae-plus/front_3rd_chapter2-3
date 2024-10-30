import { atom } from "jotai"
import { Posts, SelectedPost, Tag } from "../../../entities/posts/model/Post"

const postsAtom = atom<Posts>({
  limit: 10,
  skip: 0,
  total: 0,
  posts: [],
})
const selectedPostAtom = atom<SelectedPost | null>(null)
const newPostAtom = atom({ title: "", body: "", userId: 1 })
const tagsAtom = atom<Tag[]>([])
const selectedTagAtom = atom<string>(new URLSearchParams(location.search).get("tag") || "")
const showPostDetailDialogAtom = atom<boolean>(false)
const totalAtom = atom<number>(0)
const skipAtom = atom<number>(parseInt(new URLSearchParams(location.search).get("skip") || "0"))
const limitAtom = atom<number>(parseInt(new URLSearchParams(location.search).get("limit") || "10"))
const searchQueryAtom = atom<string>(new URLSearchParams(location.search).get("search") || "")
const sortByAtom = atom<string>(new URLSearchParams(location.search).get("sortBy") || "")
const sortOrderAtom = atom<string>(new URLSearchParams(location.search).get("sortOrder") || "asc")
const showAddDialogAtom = atom<boolean>(false)
const showEditDialogAtom = atom<boolean>(false)
const loadingAtom = atom<boolean>(false)
export {
  postsAtom,
  selectedPostAtom,
  newPostAtom,
  tagsAtom,
  selectedTagAtom,
  showPostDetailDialogAtom,
  totalAtom,
  skipAtom,
  limitAtom,
  searchQueryAtom,
  sortByAtom,
  sortOrderAtom,
  showAddDialogAtom,
  showEditDialogAtom,
  loadingAtom,
}

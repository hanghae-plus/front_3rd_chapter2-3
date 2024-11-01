import { atom, useAtom } from "jotai"
import { Post } from "../../../shared/type"

const postsAtom = atom<Post[]>([])
const selectedPostAtom = atom<Post | null>(null)
const newPostAtom = atom<Partial<Post>>({ title: "", body: "", userId: 1 })

export const usePost = () => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)
  const [newPost, setNewPost] = useAtom(newPostAtom)

  return {
    posts,
    setPosts,
    selectedPost,
    setSelectedPost,
    newPost,
    setNewPost,
  }
}

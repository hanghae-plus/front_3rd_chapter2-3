import { atom, useAtom } from "jotai"
import { Post } from "../../../entities/post/model/types"

const postsAtom = atom<Post[]>([])
const selectedPostAtom = atom<Post | null>(null)

export const usePost = () => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)

  return new (class {
    posts = posts
    setPosts = setPosts
    selectedPost = selectedPost
    setSelectedPost = setSelectedPost
  })()
}

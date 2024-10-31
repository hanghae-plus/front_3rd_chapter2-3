import { useAtom } from "jotai/react/useAtom"
import { atom } from "jotai/vanilla/atom"

const postsAtom = atom([])

export const usePostStore = () => {
  const [posts, setPosts] = useAtom(postsAtom)

  const getPosts = () => {}
}

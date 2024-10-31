// usePosts.ts

import { useAtom } from "jotai"
import { postsAtom, totalAtom } from "../../../../app/atom"

const usePosts = () => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [total, setTotal] = useAtom(totalAtom)

  return {
    posts,
    setPosts,
    total,
    setTotal,
  }
}

export default usePosts

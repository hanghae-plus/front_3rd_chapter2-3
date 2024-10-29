import { useState } from "react"
import { Post } from "./types"

export const useFetchPosts = async () => {
  const [posts, setPosts] = useState<Post[]>([])
}

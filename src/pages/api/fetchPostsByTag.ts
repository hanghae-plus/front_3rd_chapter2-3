import { fetchPostsByTagFetch } from "../../entities/post/api"
import { Post } from "../../entities/post/model/types"
import { fetchUsersFetch } from "../../entities/user/api"
import { User } from "../../entities/user/model/types"
import { fetchPosts } from "./fetchPosts"

interface Props {
  tag: string
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  limit: number
  skip: number
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  setTotal: React.Dispatch<React.SetStateAction<number>>
}

// 태그별 게시물 가져오기
export const fetchPostsByTag = async ({ tag, setLoading, limit, skip, setPosts, setTotal }: Props) => {
  if (!tag || tag === "all") {
    fetchPosts({ setLoading, limit, skip, setPosts, setTotal })
    return
  }
  setLoading(true)
  try {
    const [postsData, usersData] = await Promise.all([fetchPostsByTagFetch(tag), fetchUsersFetch()])
    const postsWithUsers = postsData.posts.map((post: Post) => ({
      ...post,
      author: usersData.users.find((user: User) => user.id === post.userId),
    }))

    setPosts(postsWithUsers)
    setTotal(postsData.total)
  } catch (error) {
    console.error("태그별 게시물 가져오기 오류:", error)
  }
  setLoading(false)
}

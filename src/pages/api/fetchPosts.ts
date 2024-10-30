import { Post } from "../../features/post/model/types"
import { User } from "../../features/user/model/types"

interface PostsData {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  limit: number
  skip: number
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  setTotal: React.Dispatch<React.SetStateAction<number>>
}

// 게시물 가져오기
export const fetchPosts = ({ setLoading, limit, skip, setPosts, setTotal }: Props) => {
  setLoading(true)
  let postsData: PostsData
  let usersData: User[]

  fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    .then((response) => response.json())
    .then((data) => {
      postsData = data
      return fetch("/api/users?limit=0&select=username,image")
    })
    .then((response) => response.json())
    .then((users) => {
      usersData = users.users
      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.find((user) => user.id === post.userId),
      }))
      setPosts(postsWithUsers)
      setTotal(postsData.total)
    })
    .catch((error) => {
      console.error("게시물 가져오기 오류:", error)
    })
    .finally(() => {
      setLoading(false)
    })
}

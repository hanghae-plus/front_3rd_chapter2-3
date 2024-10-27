import { useState } from "react"
import { deletePostApi } from "../../../entities/post/api"
import { fetchUsersApi } from "../../../entities/user/api"
import { Post } from "../../../entities/post/model/types"
import { User } from "../../../entities/user/model/types"
import { fetchPostsByTagApi } from "../api"

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)

  const deletePost = (postId: number) => {
    deletePostApi(postId)
    setPosts(posts.filter((post) => post.id !== postId))
  }

  const getPostsByTag = async (tag: string) => {
    const postsData = await fetchPostsByTagApi(tag)
    const usersData = await fetchUsersApi()

    const postsWithUsers = postsData.posts.map((post: Post) => ({
      ...post,
      author: usersData.users.find((user: User) => user.id === post.userId),
    }))

    setPosts(postsWithUsers)
    setTotal(postsData.total)
  }

  return { posts, setPosts, total, setTotal, deletePost, getPostsByTag }
}

import { Post } from "../model/Post"

interface Props {
  id: number
  posts: Post[]
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

// 게시물 삭제
export const deletePost = async ({ id, setPosts, posts }: Props) => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
    setPosts(posts.filter((post) => post.id !== id))
  } catch (error) {
    console.error("게시물 삭제 오류:", error)
  }
}

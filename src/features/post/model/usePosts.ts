import { atom, useAtom } from "jotai"
import { addPostApi, deletePostApi, updatePostApi } from "../../../entities/post/api"
import { NewPost, Post } from "../../../entities/post/model/types"

const postsAtom = atom<Post[]>([])

export const usePosts = () => {
  const [posts, setPosts] = useAtom(postsAtom)

  const addPost = async (newPost: NewPost) => {
    const postData = await addPostApi(newPost)
    setPosts([postData, ...posts])
  }

  const updatePost = async (selectedPost: Post) => {
    const data = await updatePostApi(selectedPost)

    setPosts(posts.map((post) => (post.id === data.id ? data : post)))
  }

  const deletePost = (id: number) => {
    deletePostApi(id)

    setPosts(posts.filter((post) => post.id !== id))
  }

  return {
    posts,
    addPost,
    updatePost,
    deletePost,
  }
}

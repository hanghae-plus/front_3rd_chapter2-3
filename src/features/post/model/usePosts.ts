import { atom, useAtom } from "jotai"
import { addPostApi, deletePostApi, fetchPostsApi, updatePostApi } from "../../../entities/post/api"
import { NewPost, Post } from "../../../entities/post/model/types"
import { fetchUsersApi } from "../../../entities/user/api"
import { getPostsWithUsers } from "../../../entities/post/model"
import { fetchPostsByTagApi, searchPostsApi } from "../api"

const postsAtom = atom<Post[]>([])
const totalAtom = atom(0)
const loadingAtom = atom(false)

export const usePosts = () => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [total, setTotal] = useAtom(totalAtom)
  const [loading, setLoading] = useAtom(loadingAtom)

  const getPosts = async (limit: number, skip: number, tag?: string) => {
    setLoading(true)

    const [postsData, usersData] = await Promise.all([
      tag ? fetchPostsByTagApi(tag) : fetchPostsApi(limit, skip),
      fetchUsersApi(),
    ])

    const postsWithUsers = getPostsWithUsers(postsData.posts, usersData.users)

    setPosts(postsWithUsers)
    setTotal(postsData.total)
    setLoading(false)
  }

  const searchPostsWithQuery = async (searchQuery: string) => {
    setLoading(true)

    const postsData = await searchPostsApi(searchQuery)

    setPosts(postsData.posts)
    setTotal(postsData.total)
    setLoading(false)
  }

  const fetchPostsByTag = async (tag: string, limit: number, skip: number) => {
    if (!tag || tag === "all") {
      getPosts(limit, skip)
      return
    }

    getPosts(limit, skip, tag)
  }

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
    total,
    getPosts,
    addPost,
    updatePost,
    deletePost,
    searchPostsWithQuery,
    fetchPostsByTag,
    loading,
  }
}

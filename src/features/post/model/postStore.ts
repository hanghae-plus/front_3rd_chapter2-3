import { deletePostApi, fetchPostsApi } from "../../../entities/post/api"
import { fetchUsersApi } from "../../../entities/user/api"
import { Post } from "../../../entities/post/model/types"
import { User } from "../../../entities/user/model/types"
import { fetchPostsByTagApi, searchPostsApi } from "../../post-filter/api"
import { atom, useAtom } from "jotai"

const postsAtom = atom<Post[]>([])
const showAddDialogAtom = atom(false)
const selectedPostAtom = atom<Post | null>(null)
const showEditDialogAtom = atom(false)
const totalAtom = atom(0)

const showPostDetailDialogAtom = atom(false)

export const usePosts = () => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom)
  const [selectedPost, setSelectedPost] = useAtom<Post | null>(selectedPostAtom)
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)
  const [total, setTotal] = useAtom(totalAtom)

  const deletePost = (postId: number) => {
    deletePostApi(postId)
    setPosts(posts.filter((post) => post.id !== postId))
  }

  const getPostsByTag = async (tag: string, limit: number, skip: number) => {
    const postsData = await fetchPostsByTagApi(tag)
    const usersData = await fetchUsersApi()

    const paginatedPosts = postsData.posts.slice(skip, skip + limit)
    const postsWithUsers = paginatedPosts.map((post: Post) => ({
      ...post,
      author: usersData.users.find((user: User) => user.id === post.userId),
    }))

    setPosts(postsWithUsers)
    setTotal(postsData.posts.length)
  }

  const getSearchedPosts = async (searchQuery: string) => {
    const data = await searchPostsApi(searchQuery)

    setPosts(data.posts)
    setTotal(data.total)
  }

  const getPosts = async (limit: number, skip: number, users: User[]) => {
    const postsData = await fetchPostsApi(limit, skip)

    const postsWithUsers = postsData.posts.map((post: Post) => ({
      ...post,
      author: users.find((user) => user.id === post.userId),
    }))
    setPosts(postsWithUsers)
    setTotal(postsData.total)
  }

  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  return {
    posts,
    setPosts,
    showAddDialog,
    setShowAddDialog,
    selectedPost,
    setSelectedPost,
    showEditDialog,
    setShowEditDialog,
    total,

    deletePost,
    getPostsByTag,
    getSearchedPosts,
    getPosts,

    showPostDetailDialog,
    setShowPostDetailDialog,
    openPostDetail,
  }
}

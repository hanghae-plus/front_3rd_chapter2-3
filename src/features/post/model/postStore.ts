import { NewPost, Post } from "../../../entities/post/model/types"
import { atom, useAtom } from "jotai"
import { useMutationPostAdd } from "../api/useMutationPostAdd"
import { useMutationPostDelete } from "../api/useMutationPostDelete"

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

  const { mutate: addPostMutate } = useMutationPostAdd()
  const addPost = (newPost: NewPost) => {
    addPostMutate(newPost)
    setShowAddDialog(false)
  }

  const { mutate: deletePostMutate } = useMutationPostDelete()
  const deletePost = (postId: number) => {
    deletePostMutate(postId)
  }

  // const getPostsByTag = async (tag: string, limit: number, skip: number) => {
  //   const postsData = await fetchPostsByTagApi(tag)
  //   const usersData = await fetchUsersApi()

  //   const paginatedPosts = postsData.posts.slice(skip, skip + limit)
  //   const postsWithUsers = paginatedPosts.map((post: Post) => ({
  //     ...post,
  //     author: usersData.users.find((user: User) => user.id === post.userId),
  //   }))

  //   setPosts(postsWithUsers)
  //   setTotal(postsData.posts.length)
  // }

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
    setTotal,

    addPost,
    deletePost,

    showPostDetailDialog,
    setShowPostDetailDialog,
    openPostDetail,
  }
}

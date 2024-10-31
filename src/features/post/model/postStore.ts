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

export const usePostsStore = () => {
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

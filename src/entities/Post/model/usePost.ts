import { atom, useAtom } from "jotai"
import { NewPostType, PostType } from "./types"
import { useQueryParams } from "../../../shared/model/useQueryParams"
import { usePostsQuery } from "../api/useQueryPost"
import { useMutationPost } from "../api/useMutationPost"

const postListAtom = atom<PostType[]>([])
const totalAtom = atom(0)
const newPostAtom = atom<NewPostType>({ title: "", body: "", userId: 1 })
const selectedPostAtom = atom<PostType | undefined>(undefined)

const usePost = () => {
  const [_postList, setPostList] = useAtom(postListAtom)
  const [_total, setTotal] = useAtom(totalAtom)
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)
  const [newPost, setNewPost] = useAtom(newPostAtom)

  const { limit, skip, searchQuery, selectedTag } = useQueryParams()
  const { data, isLoading, error, isError } = usePostsQuery({
    limit,
    skip,
    tag: selectedTag,
    searchQuery,
  })

  const { mutations, state: mutationState } = useMutationPost()

  return {
    postList: data?.posts ?? [],
    setPostList,
    newPost,
    setNewPost,
    selectedPost,
    setSelectedPost,
    total: data?.total ?? 0,
    setTotal,
    isLoading: isLoading || mutationState.isPending,
    isError: isError || mutationState.isError,
    error: error || mutationState.error,
    addPost: mutations.addPost,
    updatePost: mutations.updatePost,
    deletePost: mutations.deletePost,
  }
}

export default usePost

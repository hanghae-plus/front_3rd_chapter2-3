import { useAtom } from "jotai"
import { showAddDialogAtom, showEditDialogAtom, newPostAtom } from "../../../entities/model/post/atoms"
import { usePostModal } from "./usePostModal"
import { useURLParams } from "../url/useURLParams"
import { usePostQuery, usePostsByTagQuery, useSearchPostsQuery } from "../../../shared/api/usePostQuery"
import { usePostActions } from "./usePostActions"

export const usePost = () => {
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom)
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)
  const [newPost, setNewPost] = useAtom(newPostAtom)
  const actions = usePostActions()
  const modal = usePostModal()
  const { params, updateParams, updateURL } = useURLParams()
  const { skip = 0, limit = 10, tag: selectedTag, search: searchQuery } = params

  const { data: postsData, isLoading: isLoadingPosts } = usePostQuery({ limit: Number(limit), skip: Number(skip) })

  const { data: tagPostsData, isLoading: isLoadingTagPosts } = usePostsByTagQuery(selectedTag as string)

  const { data: searchPostsData, isLoading: isLoadingSearch } = useSearchPostsQuery(searchQuery as string)

  const handleSearchPosts = (value: string) => {
    updateParams({ search: value, skip: 0 })
    updateURL()
  }

  const posts = searchQuery ? searchPostsData?.posts : selectedTag ? tagPostsData?.posts : (postsData?.posts ?? [])

  const total = searchQuery ? searchPostsData?.total : selectedTag ? tagPostsData?.total : (postsData?.total ?? 0)

  const isLoading = isLoadingPosts || isLoadingTagPosts || isLoadingSearch

  return {
    posts,
    total,
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog,
    newPost,
    setNewPost,
    handleSearchPosts,
    isLoading,
    ...modal,
    ...actions,
  }
}

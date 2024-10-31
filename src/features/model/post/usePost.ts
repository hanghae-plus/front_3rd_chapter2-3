import { useEffect } from "react"
import { useAtom } from "jotai"
import {
  postsAtom,
  totalAtom,
  showAddDialogAtom,
  showEditDialogAtom,
  newPostAtom,
} from "../../../entities/model/post/atoms"
import { usePostActions } from "./usePostActions"
import { usePostModal } from "./usePostModal"
import { useURLParams } from "../../../features/model/url/useURLParams"
import type { UsePostProps } from "../../../entities/model/post/types"

export const usePost = (): UsePostProps => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [total, setTotal] = useAtom(totalAtom)
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom)
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)
  const [newPost, setNewPost] = useAtom(newPostAtom)

  const actions = usePostActions()
  const modal = usePostModal()
  const { params, updateURL } = useURLParams()
  const { skip = 0, limit = 10, sortBy, sortOrder, tag: selectedTag, search: searchQuery } = params

  useEffect(() => {
    if (selectedTag) {
      actions.handleFetchPostsByTag(selectedTag)
    } else {
      actions.handleFetchPosts({ limit: limit as number, skip: skip as number })
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        actions.handleSearchPosts(searchQuery)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  return {
    posts,
    setPosts,
    total,
    setTotal,
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog,
    newPost,
    setNewPost,
    ...actions,
    ...modal,
  }
}

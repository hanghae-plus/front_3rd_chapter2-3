import React from "react"
import { Post } from "../model/types"
import { PostTableBody } from "./PostTableBody"
import { PostTableHeader } from "./PostTableHeader"
import { Table } from "lucide-react"

export const PostTable: React.FC<{
  posts: Post[]
  searchQuery: string
  selectedTag: string
  updateURL: () => void
  setSelectedTag: (tag: string) => void
  openPostDetail: (post: Post) => void
  setSelectedPost: (post: Post) => void
  openUserModal: (userId: number) => void
  setShowEditDialog: (value: boolean) => void
  deletePost: (postId: number) => void
}> = ({
  posts,
  searchQuery,
  selectedTag,
  updateURL,
  setSelectedTag,
  openPostDetail,
  setSelectedPost,
  openUserModal,
  setShowEditDialog,
  deletePost,
}) => {
  return (
    <Table>
      <PostTableHeader />
      <PostTableBody
        posts={posts}
        searchQuery={searchQuery}
        selectedTag={selectedTag}
        updateURL={updateURL}
        setSelectedTag={setSelectedTag}
        openPostDetail={openPostDetail}
        setSelectedPost={setSelectedPost}
        openUserModal={openUserModal}
        setShowEditDialog={setShowEditDialog}
        deletePost={deletePost}
      />
    </Table>
  )
}

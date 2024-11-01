import { useUserDetailDialog } from "@features/dialog/hooks/useUserDetailDialog"
import { usePostDetailDialog } from "@features/dialog/hooks/usePostDetailDialog"
import { useEditPostDialog } from "@features/dialog/hooks/useEditPostDialog"
import { useSelectedPost } from "@entities/post/hooks/useSelectedPost"
import { PostActionCell } from "@entities/post/ui/PostActionCell"
import { PostTitleCell } from "@entities/post/ui/PostTitleCell"
import { PostUserCell } from "@entities/post/ui/PostUserCell"
import { PostLikeCell } from "@entities/post/ui/PostLikeCell"
import { User } from "@entities/user/types"
import React, { useCallback } from "react"
import { TableCell } from "@shared/ui"
import { Post } from "../types"
import { useAtom } from "jotai"
import { selectedUserAtom } from "@entities/user/model/atom"

export const PostsGridBody: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const { updateSelectedPost } = useSelectedPost()
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)

  const { openDialog: openUserDetail } = useUserDetailDialog()
  const { openDialog: openEditPost } = useEditPostDialog()
  const { openDialog: openPostDetail } = usePostDetailDialog()

  // 유저 모달 열기
  const openUserModal = useCallback(
    (user: User) => {
      setSelectedUser(user)
      openUserDetail()
    },
    [selectedUser],
  )

  // 포스트 편집 모달 열기
  const openEditDialog = useCallback(
    (post: Post) => {
      updateSelectedPost(post)
      openEditPost()
    },
    [updateSelectedPost],
  )

  // 포스트 상세 모달 열기
  const openDetailDialog = useCallback(
    (post: Post) => {
      updateSelectedPost(post)
      openPostDetail()
    },
    [updateSelectedPost],
  )
  return (
    <tbody className="border-t">
      {posts.map((post, index) => (
        <tr key={`${index}th-${post.id}-post-row`}>
          <TableCell>{post.id.toString()}</TableCell>

          <PostTitleCell title={post.title} tags={post.tags} />

          <PostUserCell userId={post.userId} openUserModal={openUserModal} />

          <PostLikeCell reactions={post.reactions} />

          <PostActionCell
            post={post}
            openEditDialog={openEditDialog}
            openPostDetail={openDetailDialog}
          />
        </tr>
      ))}
    </tbody>
  )
}
PostsGridBody.displayName = "PostsGridBody"

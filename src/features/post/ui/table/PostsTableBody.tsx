import { PostReactInfoTableCell } from "@features/post/ui/table/PostReactInfoTableCell"
import { PostTitleInfoTableCell } from "@features/post/ui/table/PostTitleInfoTableCell"
import { PostUserInfoTableCell } from "@features/post/ui/table/PostUserInfoTableCell"
import { PostLikeInfoTableCell } from "@features/post/ui/table/PostLikeInfoTableCell"
import { useQueryPostList } from "@features/post/api/useQueryPostList"
import { usePostModals } from "@features/post/hooks/usePoatModals"
import { TableCell } from "@shared/ui/table"

export const PostsTableBody = () => {
  const { posts } = useQueryPostList()
  const { openUserModal, openEditModal, openDetailModal } = usePostModals()

  const hasNotPosts = !posts.posts || posts.posts.length === 0
  if (hasNotPosts) return <div className="p-6">로딩 중...</div>

  return (
    <tbody className="border-t">
      {posts.posts.map((post, index) => (
        <tr key={`${index}th-${post.id}-post-row`}>
          <TableCell>{post.id.toString()}</TableCell>
          <PostTitleInfoTableCell title={post.title} tags={post.tags} />
          <PostUserInfoTableCell
            userId={post.userId}
            openUserModal={openUserModal}
          />
          <PostLikeInfoTableCell reactions={post.reactions} />
          <PostReactInfoTableCell
            post={post}
            openEditModal={openEditModal}
            openPostDetail={openDetailModal}
          />
        </tr>
      ))}
    </tbody>
  )
}
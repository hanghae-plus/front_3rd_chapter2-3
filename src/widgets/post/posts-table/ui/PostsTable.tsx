import { type FC } from "react"
import { useAtom } from "jotai"
import { Table, TableHeader, TableBody, TableRow, TableHead } from "@/shared/ui/layouts/table"
import { PostRow } from "@/entities/post/ui/PostRow"
import { postsManagerState } from "@/pages/posts-manager/model/store"
import { usePosts } from "@/shared/api/posts"
import { useDeletePost } from "@/features/post/post-actions/model/use-delete-post"
import type { Post } from "@/entities/post/model/types"

export const PostsTable: FC = () => {
  const [state, setState] = useAtom(postsManagerState)
  const { mutate: deletePost } = useDeletePost()

  const { data, isLoading } = usePosts({
    skip: (state.pagination.currentPage - 1) * state.pagination.itemsPerPage,
    limit: state.pagination.itemsPerPage,
    ...state.filters,
  })

  const handleEdit = (post: Post) => {
    setState((prev) => ({
      ...prev,
      selected: { ...prev.selected, post },
      dialogs: { ...prev.dialogs, editPost: true },
    }))
  }

  const handleCommentClick = (post: Post) => {
    setState((prev) => ({
      ...prev,
      selected: { ...prev.selected, post },
      dialogs: { ...prev.dialogs, postDetail: true },
    }))
  }

  const handleUserClick = (userId: number) => {
    setState((prev) => ({
      ...prev,
      selected: { ...prev.selected, userId },
      dialogs: { ...prev.dialogs, userInfo: true },
    }))
  }

  if (isLoading) {
    return <div className="flex justify-center p-4">로딩 중...</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead>작성자</TableHead>
          <TableHead>반응</TableHead>
          <TableHead>작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.posts.map((post) => (
          <PostRow
            key={post.id}
            post={post}
            searchQuery={state.filters.search}
            onEdit={handleEdit}
            onDelete={deletePost}
            onCommentClick={handleCommentClick}
            onUserClick={handleUserClick}
          />
        ))}
      </TableBody>
    </Table>
  )
}

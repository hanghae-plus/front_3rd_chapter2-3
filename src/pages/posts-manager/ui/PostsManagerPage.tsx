import { useEffect } from "react"
import { useAtom } from "jotai"
import { Plus } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/layouts/card"
import { Button } from "@/shared/ui/components/button"
import { PostsTable } from "@/widgets/post/posts-table/ui/PostsTable"
import { PostsFilters } from "@/widgets/post/posts-filters/ui/PostsFilters"
import { Pagination } from "@/widgets/post/posts-pagination/ui/Pagination"
import { CreatePostDialog } from "@/features/post/post-create/ui/CreatePostDialog"
import { EditPostDialog } from "@/features/post/post-edit/ui/EditPostDialog"
import { CreateCommentDialog } from "@/features/comment/comment-create/ui/CreateCommentDialog"
import { EditCommentDialog } from "@/features/comment/comment-edit/ui/EditCommentDialog"
import { UserInfo } from "@/entities/user/ui/UserInfo"
import { Dialog, DialogContent } from "@/shared/ui/components/dialog"
import { postsManagerState } from "../model/store"
import { useUser } from "@/shared/api/users"
import { useComments } from "@/shared/api/comments"

export const PostsManagerPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [state, setState] = useAtom(postsManagerState)

  // URL 파라미터 동기화
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setState((prev) => ({
      ...prev,
      pagination: {
        currentPage: parseInt(params.get("page") || "1"),
        itemsPerPage: parseInt(params.get("limit") || "10"),
      },
      filters: {
        search: params.get("search") || "",
        tag: params.get("tag") || "",
        sortBy: params.get("sortBy") || "",
        sortOrder: (params.get("sortOrder") || "desc") as "asc" | "desc",
      },
    }))
  }, [location.search, setState])

  // URL 업데이트
  useEffect(() => {
    const params = new URLSearchParams()
    if (state.pagination.currentPage > 1) {
      params.set("page", state.pagination.currentPage.toString())
    }
    if (state.pagination.itemsPerPage !== 10) {
      params.set("limit", state.pagination.itemsPerPage.toString())
    }
    if (state.filters.search) {
      params.set("search", state.filters.search)
    }
    if (state.filters.tag) {
      params.set("tag", state.filters.tag)
    }
    if (state.filters.sortBy) {
      params.set("sortBy", state.filters.sortBy)
    }
    if (state.filters.sortOrder !== "desc") {
      params.set("sortOrder", state.filters.sortOrder)
    }
    navigate(`?${params.toString()}`, { replace: true })
  }, [state.pagination, state.filters, navigate])

  // 선택된 사용자 정보 조회
  const { data: selectedUser } = useUser(state.selected.user?.id || 0)

  // 선택된 게시물의 댓글 조회
  const { data: commentsData } = useComments(state.selected.post?.id || 0)

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button
            onClick={() =>
              setState((prev) => ({
                ...prev,
                dialogs: { ...prev.dialogs, addPost: true },
              }))
            }
          >
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostsFilters />
          <PostsTable />
          <Pagination total={commentsData?.total || 0} />
        </div>
      </CardContent>

      {/* 게시물 추가 다이얼로그 */}
      <CreatePostDialog
        open={state.dialogs.addPost}
        onOpenChange={(open) =>
          setState((prev) => ({
            ...prev,
            dialogs: { ...prev.dialogs, addPost: open },
          }))
        }
      />

      {/* 게시물 수정 다이얼로그 */}
      <EditPostDialog
        post={state.selected.post}
        open={state.dialogs.editPost}
        onOpenChange={(open) =>
          setState((prev) => ({
            ...prev,
            dialogs: { ...prev.dialogs, editPost: open },
          }))
        }
      />

      {/* 댓글 추가 다이얼로그 */}
      <CreateCommentDialog
        postId={state.selected.post?.id || 0}
        open={state.dialogs.addComment}
        onOpenChange={(open) =>
          setState((prev) => ({
            ...prev,
            dialogs: { ...prev.dialogs, addComment: open },
          }))
        }
      />

      {/* 댓글 수정 다이얼로그 */}
      <EditCommentDialog
        comment={state.selected.comment}
        open={state.dialogs.editComment}
        onOpenChange={(open) =>
          setState((prev) => ({
            ...prev,
            dialogs: { ...prev.dialogs, editComment: open },
          }))
        }
      />

      {/* 사용자 정보 다이얼로그 */}
      <Dialog
        open={state.dialogs.userInfo}
        onOpenChange={(open) =>
          setState((prev) => ({
            ...prev,
            dialogs: { ...prev.dialogs, userInfo: open },
          }))
        }
      >
        <DialogContent>{selectedUser && <UserInfo user={selectedUser} />}</DialogContent>
      </Dialog>
    </Card>
  )
}

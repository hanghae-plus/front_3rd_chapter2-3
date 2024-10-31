// src/widgets/posts/ui/PostWidget/index.tsx
import { Plus } from "lucide-react"
import { useState } from "react"
import { Comment } from "../../../entities/comment"
import { usePostsData, usePostsStore } from "../../../entities/post"
import { CommentForm } from "../../../features/commentForm"
import { CommentsList } from "../../../features/commentList"
import { Pagination } from "../../../features/pagination"
import { PostFilters } from "../../../features/postFilters"
import { PostForm } from "../../../features/postForm"
import { PostList } from "../../../features/postList"
import { PostSearch } from "../../../features/postSearch"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../shared/ui"

export const PostWidget = () => {
  const {
    modalType,
    total,
    skip,
    limit,
    searchQuery,
    selectedPost,
    setModalType,
    setSelectedPost,
    setSkip,
    setLimit,
    setSearchQuery,
    setSelectedTag,
  } = usePostsStore()

  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [selectedComment, setSelectedComment] = useState<Comment>()

  usePostsData()

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilterChange = (tag: string) => {
    setSelectedTag(tag)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setModalType("add")}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search & Filters */}
        <div className="flex gap-4">
          <div className="flex-1">
            <PostSearch value={searchQuery} onSearch={handleSearchSubmit} />
          </div>
          <PostFilters onChange={handleFilterChange} />
        </div>

        {/* Post List */}
        <PostList
          onTagSelect={setSelectedTag}
          onEdit={(post) => {
            setSelectedPost(post)
            setModalType("edit")
          }}
          onDelete={() => {}}
          onCommentClick={(post) => {
            setSelectedPost(post)
            setModalType("comment")
          }}
          onUserClick={() => {}}
        />

        {/* Pagination */}
        <Pagination skip={skip} limit={limit} total={total} onSkipChange={setSkip} onLimitChange={setLimit} />
      </CardContent>

      {/* Add Modal */}
      <Dialog open={modalType === "add"} onOpenChange={() => setModalType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 게시물 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <PostForm onSubmit={() => setModalType(null)} onCancel={() => setModalType(null)} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={modalType === "edit"} onOpenChange={() => setModalType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <PostForm post={selectedPost} onSubmit={() => setModalType(null)} onCancel={() => setModalType(null)} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Comment Modal */}
      <Dialog open={modalType === "comment"} onOpenChange={() => setModalType(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedPost?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{selectedPost?.body}</p>
            <CommentsList
              postId={selectedPost?.id || 0}
              onAddComment={() => setShowAddCommentDialog(true)} // 새로운 state 사용
              onEdit={(comment) => {
                setSelectedComment(comment)
                setShowEditCommentDialog(true) // 새로운 state 사용
              }}
              onDelete={() => {}}
              onLike={() => {}}
            />

            {/* Nested Dialog for adding comment */}
            <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>새 댓글 추가</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <CommentForm
                    postId={selectedPost?.id || 0}
                    onSubmit={() => setShowAddCommentDialog(false)}
                    onCancel={() => setShowAddCommentDialog(false)}
                  />
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>새 댓글 추가</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <CommentForm
                    postId={selectedPost?.id || 0}
                    comment={selectedComment}
                    onSubmit={() => setShowEditCommentDialog(false)}
                    onCancel={() => setShowEditCommentDialog(false)}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

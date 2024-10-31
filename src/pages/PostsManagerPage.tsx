import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared/ui"
import { Post } from "../entities/post/model/types"
import { fetchUserApi } from "../entities/user/api"
import { fetchTagsApi } from "../entities/tag/api"
import { Tag } from "../entities/tag/model/types"
import { User } from "../entities/user/model/types"
import { PostSearch } from "../features/post/ui/PostSearch"
import { ContentSearch } from "../widgets/ui/ContentSearch"
import { ContentControls } from "../widgets/ui/ContentControls"
import { Contents } from "../widgets/ui/Contents"
import { ContentFilter } from "../widgets/ui/ContentFilter"
import { PostFilter } from "../features/post/ui/PostFilter"
import { PostTable } from "../entities/post/ui/PostTable"
import { PostAddDialog } from "../features/post/ui/PostAddDialog"
import { PostUpdateDialog } from "../features/post/ui/PostUpdateDialog"
import { Comment, NewComment } from "../entities/comment/model/types"
import { CommentAddDialog } from "../features/comment/ui/CommentAddDialog"
import { CommentUpdateDialog } from "../features/comment/ui/CommentUpdateDialog"
import { PostDetailDialog } from "../entities/post/ui/PostDetailDialog"
import { UserDetailDialog } from "../entities/user/ui/UserDetailDialog"
import {
  createCommentApi,
  deleteCommentApi,
  fetchCommentsApi,
  likeCommentApi,
  updateCommentApi,
} from "../entities/comment/api"
import { useRouterQueries } from "../features/post/model/routerStore"
import { useDialog } from "../features/post/model/dialogStore"
import {
  addToCommentsRecord,
  findInCommentsRecord,
  removeFromCommentsRecord,
  updateInCommentsMap,
} from "../entities/comment/model/utils"
import { PostPagination } from "../features/post/ui/PostPagination"

const PostsManager = () => {
  const {
    skip,
    limit,
    searchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    selectedTag,
    setSelectedTag,
    updateURL,
  } = useRouterQueries()

  const {
    setShowPostAddDialog,
    setShowPostUpdateDialog,
    setShowCommentAddDialog,
    setShowCommentUpdateDialog,
    setShowPostDetailDialog,
    setShowUserDetailDialog,
  } = useDialog()

  // 상태 관리
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [tags, setTags] = useState<Tag[]>([])
  const [comments, setComments] = useState<Record<number, Comment[]>>({})
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // 쿼리 사용

  // 태그 가져오기
  const getTags = async () => {
    const tagsData = await fetchTagsApi()
    setTags(tagsData)
  }

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return
    const commentsData = await fetchCommentsApi(postId)
    setComments((prev) => ({ ...prev, [postId]: commentsData.comments }))
  }

  // 댓글 추가
  const addComment = async (newComment: NewComment) => {
    const commentData = await createCommentApi(newComment)
    setComments((prev) => addToCommentsRecord(prev, commentData.postId, commentData))
  }

  // 댓글 업데이트
  const updateComment = async (updatingComment: Comment) => {
    const commentData = await updateCommentApi(updatingComment)
    setComments((prev) => updateInCommentsMap(prev, commentData.postId, updatingComment))
  }

  // 댓글 삭제
  const deleteComment = async (commentId: number, postId: number) => {
    await deleteCommentApi(commentId)
    setComments((prev) => removeFromCommentsRecord(prev, postId, commentId))
  }

  // 댓글 좋아요
  const likeComment = async (commentId: number, postId: number) => {
    const likedComment = findInCommentsRecord(comments, postId, commentId)
    if (!likedComment) return
    const commentData = await likeCommentApi(commentId, likedComment.likes + 1)
    setComments((prev) => updateInCommentsMap(prev, postId, commentData))
  }

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = async (userId: number) => {
    const userData = await fetchUserApi(userId)
    setSelectedUser(userData)
    setShowUserDetailDialog(true)
  }

  useEffect(() => {
    getTags()
  }, [])

  useEffect(() => {
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowPostAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Contents>
          {/* 검색 및 필터 컨트롤 */}
          <ContentControls>
            <ContentSearch>
              <PostSearch />
            </ContentSearch>
            <ContentFilter>
              <PostFilter
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
                updateURL={updateURL}
                tags={tags}
                sortBy={sortBy}
                setSortBy={setSortBy}
                setSortOrder={setSortOrder}
                sortOrder={sortOrder}
              />
            </ContentFilter>
          </ContentControls>

          {/* 게시물 테이블 */}
            <PostTable
              searchQuery={searchQuery}
              updateURL={updateURL}
              setSelectedPost={setSelectedPost}
              openUserModal={openUserModal}
              setShowPostUpdateDialog={setShowPostUpdateDialog}
              openPostDetail={openPostDetail}
            />

          {/* 페이지네이션 */}
          <PostPagination />
        </Contents>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog />

      {/* 게시물 수정 대화상자 */}
      {selectedPost && <PostUpdateDialog selectedPost={selectedPost} />}

      {/* 댓글 추가 대화상자 */}
      {selectedPost && <CommentAddDialog postId={selectedPost.id} addComment={addComment} />}

      {/* 댓글 수정 대화상자 */}
      {selectedComment && <CommentUpdateDialog selectedComment={selectedComment} updateComment={updateComment} />}

      {/* 게시물 상세 보기 대화상자 */}
      {selectedPost && (
        <PostDetailDialog
          selectedPost={selectedPost}
          searchQuery={searchQuery}
          comments={comments}
          setShowCommentAddDialog={setShowCommentAddDialog}
          setSelectedComment={setSelectedComment}
          setShowCommentUpdateDialog={setShowCommentUpdateDialog}
          likeComment={likeComment}
          deleteComment={deleteComment}
        />
      )}

      {/* 사용자 모달 */}
      {selectedUser && <UserDetailDialog selectedUser={selectedUser} />}
    </Card>
  )
}

export default PostsManager

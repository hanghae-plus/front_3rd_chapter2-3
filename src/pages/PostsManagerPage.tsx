import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared/ui"
import { NewPost, Post } from "../entities/post/model/types"
import { fetchUserApi, fetchUsersApi } from "../entities/user/api"
import {
  fecthPostsByTagApi,
  fetchPostsApi,
  searchPostsApi,
  createPostApi,
  updatePostApi,
  deletePostApi,
} from "../entities/post/api"
import { fetchTagsApi } from "../entities/tag/api"
import { Tag } from "../entities/tag/model/types"
import { addToPosts, attachAuthorsFromUsers, removeFromPosts, updateInPosts } from "../entities/post/model/utils"
import { User } from "../entities/user/model/types"
import { PostSearch } from "../features/post/ui/PostSearch"
import { ContentSearch } from "../widgets/ui/ContentSearch"
import { ContentControls } from "../widgets/ui/ContentControls"
import { Contents } from "../widgets/ui/Contents"
import { ContentFilter } from "../widgets/ui/ContentFilter"
import { PostFilter } from "../features/post/ui/PostFilter"
import { Pagination } from "../features/page/ui/Pagination"
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

const PostsManager = () => {
  const {
    skip,
    limit,
    searchQuery,
    setSearchQuery,
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
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [comments, setComments] = useState<Record<number, Comment[]>>({})
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // 게시물 가져오기
  const getPosts = async (limit = 0, skip = 0) => {
    setLoading(true)
    const usersData = await fetchUsersApi()
    const postsData = await fetchPostsApi({ limit, skip })
    const postsWithUsers = attachAuthorsFromUsers(postsData.posts, usersData.users)
    setPosts(postsWithUsers)
    setTotal(postsData.total)
    setLoading(false)
  }

  // 태그 가져오기
  const getTags = async () => {
    const tagsData = await fetchTagsApi()
    setTags(tagsData)
  }

  // 게시물 검색
  const getSearchedPosts = async (searchQuery = "") => {
    setLoading(true)
    const usersData = await fetchUsersApi()
    const postsData = await searchPostsApi(searchQuery)
    const postsWithUsers = attachAuthorsFromUsers(postsData.posts, usersData.users)
    setPosts(postsWithUsers)
    setTotal(postsData.total)
    setLoading(false)
  }

  // 태그별 게시물 가져오기
  const getTaggedPosts = async (tag = "all") => {
    if (!tag || tag === "all") {
      getPosts(limit, skip)
      return
    }
    setLoading(true)
    const usersData = await fetchUsersApi()
    const postsData = await fecthPostsByTagApi(tag)
    const postsWithUsers = attachAuthorsFromUsers(postsData.posts, usersData.users)
    setPosts(postsWithUsers)
    setTotal(postsData.total)
    setLoading(false)
  }

  // 게시물 추가
  const addPost = async (newPost: NewPost) => {
    const postData = await createPostApi(newPost)
    setPosts(addToPosts(posts, postData))
  }

  // 게시물 업데이트
  const updatePost = async (updatingPost: Post) => {
    const postData = await updatePostApi(updatingPost)
    setPosts(updateInPosts(posts, postData))
    setShowPostUpdateDialog(false)
  }

  // 게시물 삭제
  const deletePost = async (id: number) => {
    await deletePostApi(id)
    setPosts(removeFromPosts(posts, id))
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
    setComments((prev) => ({
      ...prev,
      [commentData.postId]: [...(prev[commentData.postId] || []), commentData],
    }))
  }

  // 댓글 업데이트
  const updateComment = async (updatingComment: Comment) => {
    const commentData = await updateCommentApi(updatingComment)
    setComments((prev) => ({
      ...prev,
      [commentData.postId]: prev[commentData.postId].map((comment) =>
        comment.id === commentData.id ? commentData : comment,
      ),
    }))
    setShowCommentUpdateDialog(false)
  }

  // 댓글 삭제
  const deleteComment = async (id: number, postId: number) => {
    await deleteCommentApi(id)
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].filter((comment) => comment.id !== id),
    }))
  }

  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    const likedComment = comments[postId].find((item) => item.id === id)
    if (!likedComment) return
    const commentData = await likeCommentApi(id, likedComment.likes + 1)
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].map((comment) => (comment.id === commentData.id ? commentData : comment)),
    }))
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
    if (selectedTag) {
      getTaggedPosts(selectedTag)
    } else {
      getPosts(limit, skip)
    }
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
              <PostSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                getSearchedPosts={getSearchedPosts}
              />
            </ContentSearch>
            <ContentFilter>
              <PostFilter
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
                getTaggedPosts={getTaggedPosts}
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
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              updateURL={updateURL}
              setSelectedTag={setSelectedTag}
              setSelectedPost={setSelectedPost}
              openUserModal={openUserModal}
              setShowPostUpdateDialog={setShowPostUpdateDialog}
              openPostDetail={openPostDetail}
              deletePost={deletePost}
            />
          )}

          {/* 페이지네이션 */}
          <Pagination total={total} />
        </Contents>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog addPost={addPost} />

      {/* 게시물 수정 대화상자 */}
      {selectedPost && (
        <PostUpdateDialog selectedPost={selectedPost} setSelectedPost={setSelectedPost} updatePost={updatePost} />
      )}

      {/* 댓글 추가 대화상자 */}
      {selectedPost && <CommentAddDialog postId={selectedPost.id} addComment={addComment} />}

      {/* 댓글 수정 대화상자 */}
      {selectedComment && (
        <CommentUpdateDialog
          selectedComment={selectedComment}
          setSelectedComment={setSelectedComment}
          updateComment={updateComment}
        />
      )}

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

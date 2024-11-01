import { Post, CommentsRes } from "../../shared/type"
import { Button } from "../../shared/ui"
import { Edit2, MessageSquare, Trash2 } from "lucide-react"
import { usePost } from "../../features/post/model/usePost"
import { usePostDialog } from "../../features/post/model/usePostDialog"
import { useComment } from "../../features/comment/model/useComment"

export function PostActions({ post }: { post: Post }) {
  const { posts, setSelectedPost, setPosts } = usePost()
  const { setShowEditDialog, setShowPostDetailDialog } = usePostDialog()
  const { comments, setComments } = useComment()

  // 게시물 삭제
  const deletePost = async (id: number) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }
  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const response = await fetch(`/api/comments/post/${postId}`)
      const data: CommentsRes = await response.json()
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }
  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    console.log("확인")
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
        <MessageSquare className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setSelectedPost(post)
          setShowEditDialog(true)
        }}
      >
        <Edit2 className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}

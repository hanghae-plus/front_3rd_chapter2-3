import { Post } from "../../../entities/posts/model/Post"
import { Button } from "../../../shared/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/Dialog"
import { Input } from "../../../shared/ui/Input"
import { Textarea } from "../../../shared/ui/TextArea"
import { useUpdatePost } from "../api/postFeatureApi"
import usePost from "../hooks/usePost"

const PostEditDialog = () => {
  const { showEditDialog, setShowEditDialog, selectedPost, setSelectedPost, setPosts } = usePost()
  function handleChangeSelectedPost(field: string, value: string) {
    setSelectedPost((prev) =>
      prev
        ? { ...prev, [field]: value }
        : {
            id: 0,
            title: field === "title" ? value : "",
            body: field === "body" ? value : "",
            tags: [],
            reactions: { likes: 0, dislikes: 0 },
            userId: 0,
            views: 0,
            author: { id: 0, image: "", username: "" },
          },
    )
  }

  const { mutate: updatePost } = useUpdatePost()

  function handleUpdatePost() {
    if (!selectedPost) {
      return
    }

    updatePost(selectedPost, {
      onSuccess: (data: Post) => {
        setPosts((prevPosts) => ({
          ...prevPosts,
          posts: prevPosts.posts.map((post) => (post.id === data.id ? data : post)),
        }))
        setShowEditDialog(false)
      },
      onError: (error) => {
        console.error("Failed to like comment:", error)
      },
    })
  }

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => handleChangeSelectedPost("title", e.target.value)}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => handleChangeSelectedPost("body", e.target.value)}
          />
          <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostEditDialog

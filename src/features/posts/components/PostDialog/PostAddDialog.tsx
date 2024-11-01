import { Post } from "../../../../entities/posts/model/Post"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../../shared/ui"
import { useAddPost } from "../../api/postFeatureApi"
import usePost from "../../../../shared/hooks/usePost"

const PostAddDialog = () => {
  const { showAddDialog, setShowAddDialog, newPost, setNewPost, setPosts } = usePost()
  function handleChangeNewPost(field: string, value: string | number) {
    setNewPost((prev) => ({ ...prev, [field]: value }))
  }

  const { mutate: addPost } = useAddPost()
  function handleAddPost() {
    addPost(newPost, {
      onSuccess: (data: Post) => {
        data = {
          ...data,
          reactions: { likes: 0, dislikes: 0 },
          tags: [],
        }
        setPosts((prev) => ({
          ...prev,
          posts: [data, ...prev.posts],
          total: prev.total + 1,
        }))
        setShowAddDialog(false)
        setNewPost({ title: "", body: "", userId: 1 })
      },
      onError: (error) => {
        console.error("Failed to like comment:", error)
      },
    })
  }

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => handleChangeNewPost("title", e.target.value)}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => handleChangeNewPost("body", e.target.value)}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => handleChangeNewPost("userId", Number(e.target.value))}
          />
          <Button onClick={handleAddPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostAddDialog

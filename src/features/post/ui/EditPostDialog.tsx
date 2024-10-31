import { useEffect, useState } from "react"
import { PostType } from "../../../entities/post/api/types"
import { Button } from "../../../shared/ui/button"
import { Input } from "../../../shared/ui/input"
import { Textarea } from "../../../shared/ui/textarea"
import DialogContainer from "../../../widgets/dialog/ui/DialogContainer"
import usePostStore from "../../../entities/post/model/usePostStore"

interface Props {
  isOpen: boolean
  post: PostType | null
  setOpen: (v: boolean) => void
}

const EditPostDialog: React.FC<Props> = ({ isOpen, setOpen, post }) => {
  const { editOnePost } = usePostStore()

  const [title, setTitle] = useState(post?.title || "")
  const [body, setBody] = useState(post?.body || "")

  const editPost = () => {
    if (!post) return null

    const newPost = {
      ...post,
      title,
      body,
    }

    editOnePost(newPost as PostType)
    setOpen(false)
  }

  useEffect(() => {
    setTitle(post?.title || "")
    setBody(post?.body || "")
  }, [post])

  const DialogContent = () => {
    return (
      <div className="space-y-4">
        <Input placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea rows={15} placeholder="내용" value={body} onChange={(e) => setBody(e.target.value)} />
        <Button onClick={editPost}>게시물 업데이트</Button>
      </div>
    )
  }

  return (
    <DialogContainer isOpen={isOpen} setOpen={(value: boolean) => setOpen(value)} title="게시물 수정">
      <DialogContent />
    </DialogContainer>
  )
}

export default EditPostDialog

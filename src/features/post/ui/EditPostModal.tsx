import { DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { Button, DialogHeader, Input, Textarea } from "../../../shared/ui"
import { Post } from "../../../entities/post/model/types"

interface Props {
  selectedPost: Post
  setSelectedPost: (post: Post) => void
  updatePost: () => void
}

export const EditPostModal = ({ selectedPost, setSelectedPost, updatePost }: Props) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>게시물 수정</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Input
          placeholder="제목"
          value={selectedPost?.title || ""}
          onChange={(e) => setSelectedPost({ ...selectedPost!, title: e.target.value })}
        />
        <Textarea
          rows={15}
          placeholder="내용"
          value={selectedPost?.body || ""}
          onChange={(e) => setSelectedPost({ ...selectedPost!, body: e.target.value })}
        />
        <Button onClick={updatePost}>게시물 업데이트</Button>
      </div>
    </DialogContent>
  )
}

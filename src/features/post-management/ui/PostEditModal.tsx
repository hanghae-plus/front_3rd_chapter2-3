import { PostType } from "../../../shared/type"
import { Button } from "../../../shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog"
import { Input } from "../../../shared/ui/input"
import { Textarea } from "../../../shared/ui/textarea"

interface Props {
  showEditDialog: any
  setShowEditDialog: any
  selectedPost: any
  setSelectedPost: any
  updatePost: any
}

const PostEditModal = ({ showEditDialog, setShowEditDialog, selectedPost, setSelectedPost, updatePost }: Props) => {
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSelectedPost({ ...selectedPost, title: e.target.value } as PostType)
            }
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setSelectedPost({ ...selectedPost, body: e.target.value } as PostType)
            }
          />
          <Button onClick={updatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostEditModal

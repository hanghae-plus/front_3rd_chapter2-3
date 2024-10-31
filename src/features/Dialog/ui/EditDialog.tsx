import { Dialog, DialogHeader, DialogContent, DialogTitle } from "../../../shared/ui";
import { Input, Button, Textarea } from "../../../shared/ui";
import { usePostStore } from "../../Post/model/stores/usePostStore";
import { usePostService } from "../../Post/model/services/usePostService";

export const EditDialog = () => {
  const { editPost } = usePostService()
  const {
    selectedPost,
    setSelectedPost,
    showEditDialog,
    setShowEditDialog,
  } = usePostStore()

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
            onChange={(e) => {
              if (selectedPost) {
                setSelectedPost({
                  ...selectedPost,
                  title: e.target.value,
                })
              }
            }}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              if (selectedPost) {
                setSelectedPost({
                  ...selectedPost,
                  body: e.target.value,
                })
              }
            }}
          />
          <Button onClick={editPost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

import { DialogProps } from "@radix-ui/react-dialog"
import { Post } from "../../../entities/post/model/types"
import { useUpdatePostMutation } from "../../../features/post"
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from "../../../shared/ui"

type Props = Required<Pick<DialogProps, "open" | "onOpenChange">> & {
  selectedPost: Post | null
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>
}

export const PostEditDialog = ({
  open,
  onOpenChange,
  selectedPost,
  setSelectedPost,
}: Props) => {
  const { mutate: updatePostMutate } = useUpdatePostMutation()

  const updatePost = (selectedPost: Post | null) => {
    if (!selectedPost) return

    updatePostMutate(selectedPost, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                setSelectedPost({ ...selectedPost, title: e.target.value })
              }
            }}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => {
              if (selectedPost) {
                setSelectedPost({ ...selectedPost, body: e.target.value })
              }
            }}
          />

          <Button onClick={() => updatePost(selectedPost)}>
            게시물 업데이트
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

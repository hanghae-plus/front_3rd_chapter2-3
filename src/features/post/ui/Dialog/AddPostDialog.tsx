import { Loader2 } from 'lucide-react';

import useDialogStore from '../../../../shared/lib/dialog/model/useDialogStore';
import Button from '../../../../shared/ui/atoms/Button/ui/Button';
import Input from '../../../../shared/ui/atoms/Input/ui/Input';
import Textarea from '../../../../shared/ui/atoms/Textarea/ui/Textarea';
import { Dialog } from '../../../../shared/ui/organisms/Dialog/ui/Dialog';
import {
  DialogContent,
} from '../../../../shared/ui/organisms/Dialog/ui/DialogContent';
import {
  DialogHeader,
} from '../../../../shared/ui/organisms/Dialog/ui/DialogHeader';
import {
  DialogTitle,
} from '../../../../shared/ui/organisms/Dialog/ui/DialogTitle';
import { useAddPost } from '../../hooks/useAddPost';

interface AddPostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const AddPostDialog = ({ open, onOpenChange }: AddPostDialogProps) => {
  const { isSubmitting, errors, register, handleSubmit } = useAddPost()
  const { closeDialog } = useDialogStore()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="제목"
              {...register("title", {
                required: "제목을 입력해주세요",
                maxLength: {
                  value: 100,
                  message: "제목은 100자를 넘을 수 없습니다",
                },
              })}
              disabled={isSubmitting}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Textarea
              rows={30}
              placeholder="내용"
              {...register("body", {
                required: "내용을 입력해주세요",
                maxLength: {
                  value: 5000,
                  message: "내용은 5000자를 넘을 수 없습니다",
                },
              })}
              disabled={isSubmitting}
            />
            {errors.body && <p className="text-sm text-red-500">{errors.body.message}</p>}
          </div>

          <div className="space-y-2">
            <Input
              type="number"
              placeholder="사용자 ID"
              {...register("userId", {
                required: "사용자 ID를 입력해주세요",
                min: {
                  value: 1,
                  message: "유효한 사용자 ID를 입력해주세요",
                },
                valueAsNumber: true,
              })}
              disabled={isSubmitting}
            />
            {errors.userId && <p className="text-sm text-red-500">{errors.userId.message}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => closeDialog("addPost")} disabled={isSubmitting}>
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  추가 중...
                </>
              ) : (
                "게시물 추가"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddPostDialog

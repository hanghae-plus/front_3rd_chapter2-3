import { Comment } from "../../../entities/comment/model/type"
import { ModalProps } from "../../../shared/model/type"

export interface EditCommentDialogProps extends ModalProps {
  comment: Comment
}

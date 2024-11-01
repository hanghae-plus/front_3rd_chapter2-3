import { Post } from "../../../entities/post/model/type"
import { ModalProps } from "../../../shared/model/type"

export type PostDetailDialogProps = ModalProps & {
  post: Post
}

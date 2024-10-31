import { Post } from "../../../../entities/post/model/type"
import { ModalProps } from "../../../../shared/model/type"

export interface AddPostFormData {
  title: string
  body: string
  userId: number
}

export interface AddPostDialogProps extends ModalProps {}

export interface EditPostFormData {
  title: string
  body: string
}

export interface EditPostDialogProps extends ModalProps {
  post: Post
}

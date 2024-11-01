import { useForm } from "react-hook-form"
import { Post } from "../../../../../entities/post/model/type"
import { useUpdatePost } from "../../../api/query"
import { EditPostFormData } from "../../type/form"

export const useEditPostForm = (post: Post, onSuccess: () => void) => {
  const { mutate: updatePost } = useUpdatePost()
  const { register, handleSubmit } = useForm<EditPostFormData>({
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  })

  const onSubmit = (data: EditPostFormData) => {
    updatePost(
      {
        id: post.id,
        title: data.title,
        body: data.body,
      },
      {
        onSuccess,
      },
    )
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
  }
}

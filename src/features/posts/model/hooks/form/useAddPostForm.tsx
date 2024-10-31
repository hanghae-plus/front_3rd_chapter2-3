import { useForm } from "react-hook-form"
import { useAddPost } from "../../../api/query"
import { AddPostFormData } from "../../type/form"

export const useAddPostForm = (onSuccess: () => void) => {
  const { mutate: addPost } = useAddPost()
  const { register, handleSubmit } = useForm<AddPostFormData>({
    defaultValues: {
      title: "",
      body: "",
      userId: 1,
    },
  })

  const onSubmit = (data: AddPostFormData) => {
    addPost(data, {
      onSuccess,
    })
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
  }
}

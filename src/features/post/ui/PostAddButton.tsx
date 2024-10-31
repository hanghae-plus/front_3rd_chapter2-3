import { MutateOptions } from "@tanstack/react-query"
import { NewPost, Post } from "../../../entities/post/model/types"
import { Button } from "../../../shared/ui"
import { useAddPostMutation } from "../api/useAddPostMutation"

type Props = {
  newPost: NewPost
  onAddSuccess?: MutateOptions<Post, Error, NewPost, unknown>["onSuccess"]
}

export const PostAddButton = ({ newPost, onAddSuccess: onSuccess }: Props) => {
  const { mutate: addPostMutate } = useAddPostMutation()

  const addPost = (newPost: NewPost) => {
    addPostMutate(newPost, { onSuccess })
  }

  return <Button onClick={() => addPost(newPost)}>게시물 추가</Button>
}

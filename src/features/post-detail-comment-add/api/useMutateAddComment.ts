import { useMutation } from "@tanstack/react-query"
import { addComment } from "../../../entities/comment/api/commentApi.ts"
import React, { Dispatch } from "react"
import { useCommentStore } from "../../../entities/comment/model/store.ts"

interface Props {
  setShowAddCommentDialog: Dispatch<React.SetStateAction<boolean>>
}

export const useAddCommentMutation = ({ setShowAddCommentDialog }: Props) => {
  const { postId, addComments } = useCommentStore((state) => state)

  return useMutation(addComment, {
    onSuccess: (data) => {
      addComments(postId, data)
      setShowAddCommentDialog(false)
    },
    onError: (error) => {
      console.error("댓글 추가 오류:", error)
    },
  })
}

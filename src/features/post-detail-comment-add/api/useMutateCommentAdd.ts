import { useMutation } from "@tanstack/react-query"
import { useCommentStore } from "../../comment/model/store.ts"
import { addComment } from "../../../entities/comment/api/commentApi.ts"
import React, { Dispatch } from "react"

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

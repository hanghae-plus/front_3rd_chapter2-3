import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AddCommentBody } from "../../../../entities/comment/model/types"
import { User } from "../../../../entities/user/model/types"

const addComment = async (body: AddCommentBody) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const data = await response.json()

  return data
}

export const useAddComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addComment,
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ["comments", newComment.postId] })

      const previousComments = queryClient.getQueryData(["comments", newComment.postId])
      const previousUsers = queryClient.getQueryData(["users"]) as { users: User[] }

      const user = previousUsers.users.find((user) => user.id === newComment.userId) ?? {
        id: newComment.userId,
        username: "아무개",
        fullname: "아무개입니다.",
      }

      queryClient.setQueryData(["comments", newComment.postId], (old: { comments: Comment[] }) => ({
        ...old,
        comments: [
          ...old.comments,
          {
            ...newComment,
            id: Math.floor(Math.random() * 1000),
            user,
          },
        ],
      }))

      return { previousComments }
    },
  })
}

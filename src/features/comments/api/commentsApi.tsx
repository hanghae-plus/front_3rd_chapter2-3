import { useQuery } from "@tanstack/react-query" // Ensure this import is correct
import { fetchComments } from "../../../entities/comments/api/commentsApiUrls"

export const useFetchComments = (postId: number) => {
  return useQuery(["comments", postId], () => fetchComments(postId)) // Remove options to test
}

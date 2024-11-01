import { useAuthorsQuery } from "../api/useAuthorsQuery"
import { Author, Post, PostDTO } from "./types"

const attachAuthorToPost = (post: PostDTO, authors: Author[]): Post => ({
  ...post,
  author: authors.find((user) => user.id === post.userId),
})

export const useAttachAuthorToPost = () => {
  const { data: authors = [], isLoading } = useAuthorsQuery()

  const attachAuthor = (post: PostDTO) => {
    return attachAuthorToPost(post, authors)
  }

  return { attachAuthor, isLoading }
}

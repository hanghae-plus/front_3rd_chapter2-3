import { Post } from "../../../model/types"
import { PostReactions } from "./PostReactions"

interface PostReactionsContainerProps {
  post: Post
}

export const PostReactionsContainer = ({
  post,
}: PostReactionsContainerProps) => {
  return (
    <>
      <PostReactions reactions={post.reactions} />
    </>
  )
}

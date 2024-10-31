import { Post } from "../../../../../feature/posts"

interface PostHeaderProps {
  post: Post
  reactions?: React.ReactNode
}

export const PostHeader = ({ post, reactions }: PostHeaderProps) => {
  return (
    <div className="flex items-center justify-between text-sm text-gray-500">
      <span>작성자: {post.author?.username}</span>
      {reactions}
    </div>
  )
}
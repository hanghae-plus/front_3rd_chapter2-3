import { Post } from "../model/types.ts"
import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {
  author: Post["author"]
}

const PostAuthorUser = ({ author, ...props }: Props) => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer" {...props}>
      <img src={author?.image} alt={author?.username} className="w-8 h-8 rounded-full" />
      <span>{author?.username}</span>
    </div>
  )
}

export default PostAuthorUser

import React from "react"
import { PostModel } from "./PostMoel"

interface PostProps {
  post: PostModel
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <span>By {post.author}</span>
    </div>
  )
}

export default Post

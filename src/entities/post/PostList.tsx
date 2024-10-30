import React from "react"
import Post from "./Post"
import { PostModel } from "./PostMoel"

interface PostListProps {
  posts: PostModel[]
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostList

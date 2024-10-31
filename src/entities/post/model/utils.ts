import { User } from "../../user/model/types"
import { Post } from "./types"

export function attachAuthorsFromUsers(posts: Post[], users: User[]): Post[] {
  return posts.map((post) => ({
    ...post,
    author: users.find((user) => user.id === post.userId) ?? { id: post.userId, username: "", image: "" },
  }))
}

export function attachAuthorFromUser(post: Post, user: User) {
  return {
    ...post,
    author: { id: post.userId, username: user.username, image: user.image },
  }
}

export function addToPosts(posts: Post[], newPost: Post): Post[] {
  return [{ ...newPost, views: 0 }, ...posts]
}

export function updateInPosts(posts: Post[], updatedPost: Post) {
  return posts.map((post) => (post.id === updatedPost.id ? { ...post, ...updatedPost } : post))
}

export function removeFromPosts(posts: Post[], postId: number): Post[] {
  return posts.filter((post) => post.id !== postId)
}

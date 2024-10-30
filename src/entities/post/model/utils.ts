import { User } from "../../user/model/types"
import { Post } from "./types"

export function attachAuthorsFromUsers(posts: Post[], users: User[]): Post[] {
  return posts.map((post) => ({
    ...post,
    author: users.find((user) => user.id === post.userId),
  }))
}

export function addToPosts(posts: Post[], newPost: Post): Post[] {
  return [newPost, ...posts]
}

export function updateInPosts(posts: Post[], updatedPost: Post) {
  return posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
}

export function removeFromPosts(posts: Post[], postId: number): Post[] {
  return posts.filter((post) => post.id !== postId)
}

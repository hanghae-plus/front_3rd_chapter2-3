import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { Post, Tag } from "../../../entities/post/model/post"
import { User } from "../../../entities/user/model/user"
import { postService } from "../../../entities/post/api/post"
import { userService } from "../../../entities/user/api/user"
import { commentService } from "../../../entities/comment/api/comment"
import { Comment } from "../../../entities/comment/model/comment"

// 상태 atoms
export const postsAtom = atom<Post[]>([])
export const totalAtom = atom(0)
export const tagsAtom = atom<Tag[]>([])
export const commentsAtom = atom<Record<number, Comment[]>>({})
export const loadingAtom = atom(false)
export const selectedPostAtom = atom<Post | null>(null)
export const selectedUserAtom = atom<User | null>(null)

// 필터 관련 atoms (localStorage에 저장)
export const searchQueryAtom = atomWithStorage("searchQuery", "")
export const selectedTagAtom = atomWithStorage("selectedTag", "")
export const sortByAtom = atomWithStorage("sortBy", "")
export const sortOrderAtom = atomWithStorage("sortOrder", "asc")

// 페이지네이션 atoms (localStorage에 저장)
export const limitAtom = atomWithStorage("limit", 10)
export const skipAtom = atomWithStorage("skip", 0)

// 파생 atoms
export const filteredPostsAtom = atom((get) => {
  const posts = get(postsAtom)
  const searchQuery = get(searchQueryAtom)
  const selectedTag = get(selectedTagAtom)
  const sortBy = get(sortByAtom)
  const sortOrder = get(sortOrderAtom)

  let filtered = [...posts]

  // 검색어 필터링
  if (searchQuery) {
    filtered = filtered.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  // 태그 필터링
  if (selectedTag && selectedTag !== "all") {
    filtered = filtered.filter((post) => post.tags.includes(selectedTag))
  }

  // 정렬
  if (sortBy !== "none" && sortBy) {
    filtered.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "id":
          comparison = a.id - b.id
          break
        case "title":
          comparison = a.title.localeCompare(b.title)
          break
        case "reactions":
          comparison =
            a.reactions.likes -
            a.reactions.dislikes -
            (b.reactions.likes - b.reactions.dislikes)
          break
      }
      return sortOrder === "asc" ? comparison : -comparison
    })
  }

  return filtered
})

// Action 타입 정의
type PostsAction =
  | { type: "FETCH_POSTS"; payload: { limit: number; skip: number } }
  | { type: "SEARCH_POSTS"; payload: { query: string } }
  | { type: "FETCH_POSTS_BY_TAG"; payload: { tag: string } }
  | { type: "FETCH_TAGS" }
  | { type: "CREATE_POST"; payload: { post: Omit<Post, "id"> } }
  | { type: "UPDATE_POST"; payload: { id: number; post: Partial<Post> } }
  | { type: "DELETE_POST"; payload: { id: number } }
  | { type: "FETCH_COMMENTS"; payload: { postId: number } }
  | { type: "CREATE_COMMENT"; payload: { comment: Omit<Comment, "id"> } }
  | { type: "UPDATE_COMMENT"; payload: { id: number; body: string } }
  | { type: "DELETE_COMMENT"; payload: { id: number; postId: number } }
  | { type: "FETCH_USER"; payload: { id: number } }

// 비동기 액션 atom
export const postsActionsAtom = atom(
  null,
  async (get, set, action: PostsAction) => {
    switch (action.type) {
      case "FETCH_POSTS": {
        set(loadingAtom, true)
        try {
          const [postsData, usersData] = await Promise.all([
            postService.getPosts(action.payload.limit, action.payload.skip),
            userService.getUsers(),
          ])

          const postsWithUsers = postsData.posts.map((post) => ({
            ...post,
            author: usersData.users.find((user) => user.id === post.userId),
          }))

          set(postsAtom, postsWithUsers)
          set(totalAtom, postsData.total)
        } catch (error) {
          console.error("Failed to fetch posts:", error)
        } finally {
          set(loadingAtom, false)
        }
        break
      }

      case "SEARCH_POSTS": {
        set(loadingAtom, true)
        try {
          const { posts, total } = await postService.searchPosts(
            action.payload.query,
          )
          set(postsAtom, posts)
          set(totalAtom, total)
        } catch (error) {
          console.error("Failed to search posts:", error)
        } finally {
          set(loadingAtom, false)
        }
        break
      }

      case "FETCH_POSTS_BY_TAG": {
        set(loadingAtom, true)
        try {
          const { posts, total } = await postService.getPostsByTag(
            action.payload.tag,
          )
          set(postsAtom, posts)
          set(totalAtom, total)
        } catch (error) {
          console.error("Failed to fetch posts by tag:", error)
        } finally {
          set(loadingAtom, false)
        }
        break
      }

      case "FETCH_TAGS": {
        try {
          const tags = await postService.getTags()
          set(tagsAtom, tags)
        } catch (error) {
          console.error("Failed to fetch tags:", error)
        }
        break
      }

      case "CREATE_POST": {
        try {
          const newPost = await postService.createPost(action.payload.post)
          set(postsAtom, (prev) => [newPost, ...prev])
        } catch (error) {
          console.error("Failed to create post:", error)
        }
        break
      }

      case "UPDATE_POST": {
        try {
          const updatedPost = await postService.updatePost(
            action.payload.id,
            action.payload.post,
          )
          set(postsAtom, (prev) =>
            prev.map((post) =>
              post.id === action.payload.id ? updatedPost : post,
            ),
          )
        } catch (error) {
          console.error("Failed to update post:", error)
        }
        break
      }

      case "DELETE_POST": {
        try {
          await postService.deletePost(action.payload.id)
          set(postsAtom, (prev) =>
            prev.filter((post) => post.id !== action.payload.id),
          )
        } catch (error) {
          console.error("Failed to delete post:", error)
        }
        break
      }

      case "FETCH_COMMENTS": {
        const postId = action.payload.postId
        const currentComments = get(commentsAtom)
        if (currentComments[postId]) return

        try {
          const { comments } = await commentService.getComments(postId)
          set(commentsAtom, {
            ...currentComments,
            [postId]: comments,
          } as Record<number, Comment[]>)
        } catch (error) {
          console.error("Failed to fetch comments:", error)
        }
        break
      }

      case "CREATE_COMMENT": {
        try {
          const newComment = await commentService.createComment(
            action.payload.comment,
          )
          const currentComments = get(commentsAtom)
          const postId = action.payload.comment.postId

          set(commentsAtom, {
            ...currentComments,
            [postId]: [...(currentComments[postId] || []), newComment],
          } as Record<number, Comment[]>)
        } catch (error) {
          console.error("Failed to create comment:", error)
        }
        break
      }

      case "UPDATE_COMMENT": {
        try {
          const updatedComment = await commentService.updateComment(
            action.payload.id,
            action.payload.body,
          )
          const currentComments = get(commentsAtom)

          set(commentsAtom, {
            ...currentComments,
            [updatedComment.postId]: currentComments[updatedComment.postId].map(
              (comment) =>
                comment.id === action.payload.id ? updatedComment : comment,
            ),
          } as Record<number, Comment[]>)
        } catch (error) {
          console.error("Failed to update comment:", error)
        }
        break
      }

      case "DELETE_COMMENT": {
        try {
          await commentService.deleteComment(action.payload.id)
          const currentComments = get(commentsAtom)

          set(commentsAtom, {
            ...currentComments,
            [action.payload.postId]: currentComments[
              action.payload.postId
            ].filter((comment) => comment.id !== action.payload.id),
          } as Record<number, Comment[]>)
        } catch (error) {
          console.error("Failed to delete comment:", error)
        }
        break
      }

      case "FETCH_USER": {
        try {
          const user = await userService.getUser(action.payload.id)
          set(selectedUserAtom, user)
        } catch (error) {
          console.error("Failed to fetch user:", error)
        }
        break
      }
    }
  },
)

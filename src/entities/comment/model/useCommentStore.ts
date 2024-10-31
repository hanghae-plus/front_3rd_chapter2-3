import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { PostType } from "../../post/api/types"
import { AddCommentParam, CommentType } from "../api/types"
import { fetchAddComment, fetchGetCommentByPostId, fetchLikeComment } from "../api/commentApis"

interface CommentStoreType {
  postId: PostType["id"] | null
  comments: CommentType[]
  setComments: (newComments: CommentType[]) => void
  fetchCommentByPostId: (postId: PostType["id"]) => Promise<void>
  fetchAddStore: (newComment: AddCommentParam) => Promise<void>
  fetchLikeComment: (commentId: CommentType["id"], currentLikes: CommentType["likes"]) => Promise<void>
}

const useCommentStore = create<CommentStoreType>()(
  devtools(
    (set) => ({
      postId: null,
      comments: [],
      setComments: (newComments) => set({ comments: newComments }),
      fetchCommentByPostId: async (postId) => {
        try {
          const result = await fetchGetCommentByPostId(postId)

          set({ comments: result?.comments, postId })
        } catch (error) {
          console.dir(error)
        }
      },
      fetchAddStore: async (newComment: AddCommentParam) => {
        try {
          const result = await fetchAddComment(newComment)

          if (result) {
            set((state) => ({
              comments: [...state.comments, { ...result, likes: 0 }],
            }))
          }
        } catch (error) {
          console.dir(error)
        }
      },
      fetchLikeComment: async (commentId: CommentType["id"], currentLikes: CommentType["likes"]) => {
        try {
          const result = fetchLikeComment(commentId, currentLikes)
          console.log(result)
          // set({comments: [...comment]})
        } catch (error) {
          console.dir(error)
        }
      },
    }),
    {
      name: "commentStore",
    },
  ),
)

export default useCommentStore

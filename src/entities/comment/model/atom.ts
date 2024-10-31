import { PostComments, Comment } from "@/shared/types"
import { atom } from "jotai"

export const commentsAtom = atom<PostComments>({})
export const commentAtom = atom<Comment | null>(null)

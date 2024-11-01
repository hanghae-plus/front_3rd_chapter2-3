import { DEFAULT_COMMENT } from "@entities/comment/constants"
import { Comment } from "@entities/comment/types"
import { atom } from "jotai"

export const selectedCommentAtom = atom<Comment>(DEFAULT_COMMENT)

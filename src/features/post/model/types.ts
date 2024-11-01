import { Post } from "@entities/post/model"
import { atom } from "jotai"
import { selectedPostValue } from "../config/selectedPostValue"

export const selectedPostsAtom = atom<Post>(selectedPostValue.initial) 
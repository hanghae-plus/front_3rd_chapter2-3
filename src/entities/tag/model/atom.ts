import { Tag } from "@/shared/types"
import { atom } from "jotai"

export const tagsAtom = atom<Tag[]>([])

import { atom } from "jotai"
import type { Tag } from "../../../shared/types"

export const tagsAtom = atom<Tag[]>([])

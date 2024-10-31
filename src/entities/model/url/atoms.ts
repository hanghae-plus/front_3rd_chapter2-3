import { atom } from "jotai"
import { URLParams } from "../../../shared/types"
import { getURLParams } from "../../../shared/lib/params"

export const paramsAtom = atom<URLParams>(getURLParams(new URLSearchParams(location.search)))

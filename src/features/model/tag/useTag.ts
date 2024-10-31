import { useEffect } from "react"
import { useAtom } from "jotai"
import { tagsAtom } from "../../../entities/model/tag/atoms"
import { useTagActions } from "./useTagActions"

export const useTag = () => {
  const [tags] = useAtom(tagsAtom)
  const { getTags } = useTagActions()

  useEffect(() => {
    getTags()
  }, [])

  return {
    tags,
    getTags,
  }
}

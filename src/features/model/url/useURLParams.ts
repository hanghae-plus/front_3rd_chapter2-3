import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useAtom } from "jotai"
import { paramsAtom } from "../../../entities/model/url/atoms"
import { useURLActions } from "./useURLActions"
import { getURLParams } from "../../../shared/lib/params"

export const useURLParams = () => {
  const [params] = useAtom(paramsAtom)
  const { updateParams, updateURL, setParams } = useURLActions()
  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    setParams(getURLParams(searchParams))
  }, [location.search])

  return {
    params,
    updateParams,
    updateURL,
  }
}

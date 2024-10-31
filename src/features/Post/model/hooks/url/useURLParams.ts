import { useLocation } from "react-router-dom"
import { usePostStore } from "../../stores/usePostStore"
import { usePostManagerStore } from "../../../../../pages/model/stores/usePostManagerStore"
import { useEffect } from "react"

export const useURLParams = () => {
  const location = useLocation()
  const { setSkip, setLimit, setSearchQuery } = usePostStore()
  const { setSortBy, setSortOrder, setSelectedTag } = usePostManagerStore()

  useEffect(() => {
    // URL에 파라미터가 하나도 없는 경우 (첫 로드 시)
    if (!location.search) {
      const defaultParams = new URLSearchParams()
      defaultParams.set("limit", "10")
      defaultParams.set("skip", "0")
      defaultParams.set("sortOrder", "asc")
      // URL 업데이트
      window.history.replaceState({}, "", `?${defaultParams.toString()}`)
      return
    }

    const params = new URLSearchParams(location.search)

    // 변경된 파라미터만 업데이트
    if (params.has("skip")) {
      setSkip(parseInt(params.get("skip") || "0"))
    }

    if (params.has("limit")) {
      setLimit(parseInt(params.get("limit") || "10"))
    }

    if (params.has("search")) {
      setSearchQuery(params.get("search") || "")
    }

    if (params.has("sortBy")) {
      setSortBy(params.get("sortBy") || "")
    }

    if (params.has("sortOrder")) {
      setSortOrder(params.get("sortOrder") || "asc")
    }

    if (params.has("tag")) {
      setSelectedTag(params.get("tag") || "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])
}

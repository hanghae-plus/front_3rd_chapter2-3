import { useEffect } from "react"
import { usePostService } from "../../services/usePostService"
import { usePostManagerStore } from "../../../../../pages/model/stores/usePostManagerStore"
import { useLocation } from "react-router-dom"

export const usePostData = () => {
  const location = useLocation()
  const { fetchPosts } = usePostService()
  const { selectedTag, sortBy, sortOrder } = usePostManagerStore()

  useEffect(() => {
    const params = new URLSearchParams(location.search)

    // URL에서 현재 파라미터 값들을 가져옴
    const currentSkip = parseInt(params.get("skip") || "0")
    const currentLimit = parseInt(params.get("limit") || "10")

    // 현재 URL 파라미터 값으로 데이터 조회
    fetchPosts({
      skip: currentSkip,
      limit: currentLimit,
      sortBy,
      sortOrder,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, selectedTag, sortBy, sortOrder]) // fetchPosts를 의존성 배열에 추가
}

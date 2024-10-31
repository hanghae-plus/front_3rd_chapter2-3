import { useQuery } from '@tanstack/react-query'
import { queryKeys } from "../../../lib/query/queryKeys"
import { tagsApi } from "../api"
import { queryClient } from '../../../lib/query/queryClient'

export const useTagsQuery = () => {
  return useQuery({
    queryKey: queryKeys.tags.all,
    queryFn: tagsApi.fetchAll,
    staleTime: 1000 * 60 * 5 // 태그는 자주 변경되지 않으므로 더 긴 staleTime 설정
  })
}

export const invalidateTagQueries = () => {
  queryClient.invalidateQueries(queryKeys.tags.all)
}
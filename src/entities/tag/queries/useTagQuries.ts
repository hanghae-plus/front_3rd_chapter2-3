import { useCommonQuery } from '../../../shared/lib/query/useCommonQuery';
import { postApi } from '../../post/api/postApi';

export const useTagsQuery = () => {
  return useCommonQuery({
    queryKey: ["posts", "tags"],
    queryFn: postApi.getTags,
  })
}

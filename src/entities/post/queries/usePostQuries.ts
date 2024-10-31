import { useCommonDetailQuery } from "../../../shared/lib/query/useCommonDetailQuery"
import { useCommonQuery } from "../../../shared/lib/query/useCommonQuery"
import { postApi } from "../api/postApi"
import { PostsResponse } from "../model/postTypes"
import { useSearchStore } from "../../../features/postSearch/model/useSearchStore"
import { PostSearchParams } from "../../../features/postSearch/model/searchTypes"
import { TagsResponse } from "../../tag/model/tagTypes"

export const usePostsQuery = () => {
  const searchParams = useSearchStore((state) => ({
    skip: state.skip,
    limit: state.limit,
    search: state.search,
    sortBy: state.sortBy,
    sortOrder: state.sortOrder,
    tag: state.tag,
  }))

  return useCommonQuery<PostsResponse, PostSearchParams>({
    queryKey: ["posts", searchParams],
    queryFn: (params) => postApi.getPosts(params),
    params: searchParams,
  })
}

export const usePostsByTagQuery = (tag: string) => {
  return useCommonDetailQuery<PostsResponse>({
    queryKey: ["posts", "tag"],
    queryFn: () => postApi.getPostsByTag(tag),
    id: tag,
  })
}

export const useSearchPostsQuery = (query: string) => {
  interface SearchParams {
    search: string
  }

  return useCommonQuery<PostsResponse, SearchParams>({
    queryKey: ["posts", "search"],
    queryFn: (params) => postApi.searchPosts(params.search),
    params: { search: query },
  })
}

export const useTagsQuery = () => {
  return useCommonQuery<TagsResponse>({
    queryKey: ["posts", "tags"],
    queryFn: postApi.getTags,
  })
}

/**
 * function PostList() {
  const { data } = usePostsQuery();
  const { setSearch, setLimit } = useSearchStore();

  return (
    <div>
      <input 
        onChange={e => setSearch(e.target.value)} 
        placeholder="Search posts..." 
      />
 
      </div>
    );
  }
 */

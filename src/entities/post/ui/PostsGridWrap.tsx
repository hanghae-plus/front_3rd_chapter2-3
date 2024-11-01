import { PostPagination } from "@entities/post/ui/PostPagination"
import { usePostRead } from "@entities/post/hooks/usePostRead"
import { PostSearch } from "@entities/post/ui/PostSearch"
import { PostGrid } from "@entities/post/ui/PostGrid"
import { TableWrap } from "@shared/ui"

export const PostsGridWrap: React.FC = () => {
  const { postData, isPostsLoading } = usePostRead()

  return (
    <TableWrap>
      <div className="flex flex-col gap-4">
        {/* 검색 및 필터 컨트롤 */}
        <PostSearch />

        {/* 게시물 테이블 */}
        <PostGrid isLoading={isPostsLoading} posts={postData.posts} />

        {/* 페이지네이션 */}
        <PostPagination total={postData.total} />
      </div>
    </TableWrap>
  )
}

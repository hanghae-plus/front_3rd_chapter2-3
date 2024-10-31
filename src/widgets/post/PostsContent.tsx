import { CardContent } from "../../shared/ui"

import { PostTable } from "./PostTable"
import { PostSearch } from "./PostSearch"
import { PostSelect } from "./PostSelect"
import { PostPagination } from "./PostPagination"
import { usePost } from "../../features/post/model/usePost"

const PostsContent = ({ loading }: { loading: boolean }) => {
  const { posts, total } = usePost()
  return (
    <CardContent>
      <div className="flex flex-col gap-4">
        {/* 검색 및 필터 컨트롤 */}
        <div className="flex gap-4">
          <PostSearch />
          <PostSelect />
        </div>

        {/* 게시물 테이블 */}
        {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable posts={posts} />}

        {/* 페이지네이션 */}
        <PostPagination total={total} />
      </div>
    </CardContent>
  )
}

export default PostsContent

/* 게시물 테이블 */

import { RenderPostTable, renderPostTable } from "./RenderPostTable"

export const Post = (loading, posts) => {
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")

  return loading ? (
    <div className="flex justify-center p-4">로딩 중...</div>
  ) : (
    // <div>gg</div>
    RenderPostTable({ posts, selectedTag, setSelectedTag })
  )
}

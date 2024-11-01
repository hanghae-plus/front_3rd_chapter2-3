import { useEffect } from "react"
import PostAddButton from "../../../features/posts/components/PostAddButton/PostAddButton"
import PostTable from "../table"
import PostPagination from "../pagination"
import PostSearchBar from "../searchBar"
import { CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card"
import usePost from "../../../shared/hooks/usePost"

const Search = () => {
  const { loading, updateURL } = usePost()
  useEffect(() => {}, [loading])

  useEffect(() => {
    updateURL()
  }, [location.search])
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          {/* 게시물 추가 버튼 */}
          <PostAddButton />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <PostSearchBar />
          {/* 로딩 완료 시 게시물 테이블 렌더링*/}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}

          {/* 페이지네이션 */}
          <PostPagination />
        </div>
      </CardContent>
    </>
  )
}

export default Search

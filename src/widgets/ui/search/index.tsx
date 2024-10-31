import { useEffect } from "react"
import PostAddButton from "../../../features/posts/components/PostAddButton"
import PostTable from "../../../features/posts/components/PostTable"
import PostPagination from "../pagination/PostPagination"
import PostSearchBar from "../searchBar/PostSearchBar"
import { CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card"
import usePost from "../../../features/posts/hooks/usePost"

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
          {/* 게시물 테이블 renderPostTable()은 사용되는 컴포넌트에서 useEffect안에 추가 예정*/}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}

          {/* 페이지네이션 */}
          <PostPagination />
        </div>
      </CardContent>
    </>
  )
}

export default Search

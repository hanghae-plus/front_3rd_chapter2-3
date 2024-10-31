import { useState } from "react"
import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared/ui"
import UserInfoDialog from "../entities/user/components/UserInfoDialog"
import { useUser } from "../entities/user/api/get-user"
import { useAddPost } from "../features/post/api/create-post"
import { Post } from "../entities/post/model/types"
import { useSearchPosts } from "../features/search/api/update-search"
import Pagination from "../shared/ui/Pagination"
import PostAddDialog from "../features/post/components/PostAddDialog"
import Finder from "../features/search/components/Finder"
import useSearchParams from "../features/search/libs/useSearchParams"
import PostTable from "../features/post/components/PostTable"
import { useModal } from "../shared/lib/modal"

const Main = () => {
  const [total, setTotal] = useState(0)
  const [userId, setUserId] = useState<number>(0)

  const { isOpen, openModal, closeModal, manageModal } = useModal({
    ADD: false,
    USER: false,
  })

  const {
    searchParams: { sortBy, sortOrder, tag, skip, limit, search },
    changeSeachParams,
  } = useSearchParams()

  // Post
  const { mutate: addPost } = useAddPost()

  // Search
  const { data: searchedPosts, mutate: searchPost } = useSearchPosts()

  // User
  const { data: user } = useUser({ userId })

  // 게시물 검색
  const handleSearch = () => {
    searchPost(search, {
      onSuccess: (data) => {
        setTotal(data.total)
      },
      onError: (error) => {
        console.error("게시물 검색 오류:", error)
      },
    })
  }

  // 게시물 추가
  const handleAddPost = (newPost: Pick<Post, "title" | "body" | "userId">) => {
    addPost(newPost, {
      onSuccess: () => {
        closeModal("ADD")
      },
      onError: (error) => {
        console.error("게시물 추가 오류:", error)
      },
    })
  }

  // 사용자 모달 열기
  const openUserModal = (userId: Post["userId"]) => {
    setUserId(userId)
    openModal("USER")
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => openModal("ADD")}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <Finder
            searchQuery={search}
            selectedTag={tag}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSearchChange={changeSeachParams("search")}
            onSearchSubmit={handleSearch}
            onSelectedTagChange={changeSeachParams("tag")}
            onSortByChange={changeSeachParams("sortBy")}
            onSortOrderChange={changeSeachParams("sortOrder")}
          />
          {/* 게시물 테이블 */}
          <PostTable searchedPosts={searchedPosts} onOpenUserModal={openUserModal} />

          {/* 페이지네이션 */}
          <Pagination
            limit={Number(limit)}
            skip={Number(skip)}
            total={total}
            onChange={changeSeachParams("limit")}
            onBackButton={changeSeachParams("skip")}
            onNextButton={changeSeachParams("skip")}
          />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      {isOpen("ADD") && <PostAddDialog onOpenChange={manageModal("ADD")} onSubmit={handleAddPost} />}

      {/* 사용자 모달 */}
      {isOpen("USER") && <UserInfoDialog onOpenChange={manageModal("USER")} user={user} />}
    </Card>
  )
}

export default Main

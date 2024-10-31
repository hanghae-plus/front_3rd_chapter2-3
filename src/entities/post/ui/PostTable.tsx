import { Post } from "../model/types"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../shared/ui"
import { PostTableRow } from "./PostTableRow"
import { useRouterQueries } from "../../../features/post/model/routerStore"
import { usePostsQuery } from "../../../features/post/model/postStore"
import { PostIsLoading } from "./PostIsLoading"

export const PostTable: React.FC<{
  searchQuery: string
  updateURL: () => void
  setSelectedPost: (post: Post) => void
  openUserModal: (userId: number) => void
  setShowPostUpdateDialog: (value: boolean) => void
  openPostDetail: (post: Post) => void
}> = ({
  searchQuery,
  updateURL,
  setSelectedPost,
  openUserModal,
  setShowPostUpdateDialog,
  openPostDetail,
}) => {
  const { skip, limit, sortBy, sortOrder, selectedTag, setSelectedTag } = useRouterQueries()
  const { data: postsData, isLoading } = usePostsQuery({
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
  })
  return (
    <>
      {isLoading ? (
        <PostIsLoading />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="w-[150px]">작성자</TableHead>
              <TableHead className="w-[150px]">반응</TableHead>
              <TableHead className="w-[150px]">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {postsData?.posts.map((post) => (
              <PostTableRow
                key={post.id}
                post={post}
                searchQuery={searchQuery}
                selectedTag={selectedTag}
                updateURL={updateURL}
                setSelectedTag={setSelectedTag}
                setSelectedPost={setSelectedPost}
                openUserModal={openUserModal}
                setShowPostUpdateDialog={setShowPostUpdateDialog}
                openPostDetail={openPostDetail}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}

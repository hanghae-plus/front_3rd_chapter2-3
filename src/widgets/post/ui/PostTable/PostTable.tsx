import { UpdatePostQueryParam } from "../../../../entities/post"
import { Post } from "../../../../entities/post/model/types"
import { PostDeleteButton } from "../../../../features/post"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../shared/ui"
import { PostDetailDialogButton } from "../PostDetailDialogButton"
import { PostEditDialogButton } from "../PostEditDialogButton"
import { CellAuthor } from "./CellAuthor"
import { CellPostTitle } from "./CellPostTitle"
import { CellReaction } from "./CellReaction"

type Props = {
  posts: Post[]

  searchQuery: string
  selectedTag: string
  updateQueryParam: UpdatePostQueryParam
}

export const PostTable = ({
  posts,
  searchQuery,
  selectedTag,
  updateQueryParam,
}: Props) => {
  return (
    <>
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
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>

              <TableCell>
                <CellPostTitle
                  title={post.title}
                  searchQuery={searchQuery}
                  tags={post.tags}
                  selectedTag={selectedTag}
                  updateQueryParam={updateQueryParam}
                />
              </TableCell>

              <TableCell>
                <CellAuthor author={post.author} />
              </TableCell>

              <TableCell>
                <CellReaction reactions={post.reactions} />
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <PostDetailDialogButton
                    selectedPost={post}
                    search={searchQuery}
                  />
                  <PostEditDialogButton post={post} />
                  <PostDeleteButton postId={post.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

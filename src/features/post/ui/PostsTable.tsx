import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../shared/ui/Table"
import { usePost } from "../model/usePost"
import { User } from "../../../entities/user/model/types"
import PostTableRow from "./PostTableRow"

interface Props {
  updateURL: () => void
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>
  setShowUserModal: React.Dispatch<React.SetStateAction<boolean>>
}

const PostsTable = ({ updateURL, setSelectedUser, setShowUserModal }: Props) => {
  const { posts } = usePost()

  return (
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
          <PostTableRow
            post={post}
            setSelectedUser={setSelectedUser}
            setShowUserModal={setShowUserModal}
            updateURL={updateURL}
          />
        ))}
      </TableBody>
    </Table>
  )
}

export default PostsTable

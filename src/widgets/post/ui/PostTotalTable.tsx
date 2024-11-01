import { PostsTableBody } from "@features/post/ui/table/PostsTableBody"
import { PostsTableHeader } from "./PostsTableHeader"

export const PostTotalTable: React.FC = () => {
  return (
    <div className="w-full overflow-auto">
      <table className="table-fixed w-full caption-bottom text-sm">
        <PostsTableHeader />
        <PostsTableBody />
      </table>
    </div>
  )
}

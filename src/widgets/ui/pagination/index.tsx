import PostPaginationButton from "../../../features/posts/components/postPagination/PostPaginationButton"
import PostPaginationSelectLimit from "../../../features/posts/components/postPagination/PostPaginationSelectLimit"

const PostPagination = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>표시</span>
          <PostPaginationSelectLimit />
          <span>항목</span>
        </div>
        <div className="flex gap-2">
          <PostPaginationButton />
        </div>
      </div>
    </div>
  )
}

export default PostPagination

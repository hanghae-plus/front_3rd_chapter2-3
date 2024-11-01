import usePost from "../../../shared/hooks/usePost"
import HighlightText from "../../../shared/ui/HighlightText"
import { Comments } from "../model/Comments"

interface CommentUserInfoProps {
  comment: Comments
}

const CommentUserInfo = ({ comment }: CommentUserInfoProps) => {
  const { searchQuery } = usePost()
  return (
    <div>
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">
          <HighlightText text={comment.body} highlight={searchQuery} />
        </span>
      </div>{" "}
    </div>
  )
}

export default CommentUserInfo

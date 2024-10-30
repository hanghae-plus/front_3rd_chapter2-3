import { CustomDialog } from "../../../widgets/ui/CustomDialog";
import { Post } from "../model/types";

export const PostDetailDialog : React.FC<{
  showPostDetailDialog: boolean
  setShowPostDetailDialog: (value: boolean) => void
  selectedPost: Post
  searchQuery: string
  renderComments: (postId: number) => React.ReactNode
}> = ({
  showPostDetailDialog,
  setShowPostDetailDialog,
  selectedPost,
  searchQuery,
  renderComments
}) => {
  const highlightText = (text: string, highlight: string) => {
    if (!text) return ''
    if (!highlight.trim()) {
      return <span>{text}</span>
    }
    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)
    return (
      <span>
        {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
      </span>
    )
  }

  return(
    <CustomDialog
        open={showPostDetailDialog}
        onOpenChange={setShowPostDetailDialog}
        className={"max-w-3xl"}
        title={highlightText(selectedPost.title, searchQuery)}
      >
        <>
          <p>{highlightText(selectedPost.body, searchQuery)}</p>
          {renderComments(selectedPost.id)}
        </>
      </CustomDialog>
  );
};
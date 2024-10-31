import { useDialog } from "../../../features/post/model/dialogStore"
import { usePosts } from "../../../features/post/model/postStore"
import { useRouterQueries } from "../../../features/post/model/routerStore"
import { CustomDialog } from "../../../shared/ui/CustomDialog"
import { HighlightedText } from "../../../shared/ui/HighlightedText"
import { Comments } from "../../comment/ui/Comments"

export const PostDetailDialog = () => {
  const { searchQuery } = useRouterQueries()
  const { showPostDetailDialog, setShowPostDetailDialog } = useDialog()
  const { selectedPost } = usePosts()
  return (
    <CustomDialog
      open={showPostDetailDialog}
      onOpenChange={setShowPostDetailDialog}
      className={"max-w-3xl"}
      title={selectedPost?.title ?? ""}
      highlightedText={searchQuery}
    >
      <>
        <p>
          <HighlightedText text={selectedPost?.body ?? ""} highlight={searchQuery} />
        </p>
        {
          <Comments
            postId={selectedPost?.id ?? 0}
          />
        }
      </>
    </CustomDialog>
  )
}

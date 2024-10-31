import { PostType } from "../../../entities/post/api/types"
import useTableStore from "../../table/model/useTableStore"

import DialogContainer from "../../../widgets/dialog/ui/DialogContainer"
import { HighlightText } from "../../../widgets/post/ui/HighlightText"

import CommonetInfo from "../../comment/ui/CommonetInfo"

interface Props {
  isOpen: boolean
  post: PostType | null
  setOpen: (v: boolean) => void
}

const PostDetailDialog: React.FC<Props> = ({ isOpen, setOpen, post }) => {
  const { searchQuery } = useTableStore()

  const DialogContent = () => {
    return (
      <>
        <HighlightText text={post?.body || ""} highlight={searchQuery} />
        <CommonetInfo postId={post?.id || 0} />
      </>
    )
  }

  return (
    <DialogContainer
      isOpen={isOpen}
      setOpen={(value: boolean) => setOpen(value)}
      title={<HighlightText text={post?.title || ""} highlight={searchQuery} />}
    >
      <DialogContent />
    </DialogContainer>
  )
}

export default PostDetailDialog

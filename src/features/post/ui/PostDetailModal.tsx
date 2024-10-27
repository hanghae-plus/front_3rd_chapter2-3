import { DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { DialogHeader } from "../../../shared/ui"
import { highlightText } from "../../../shared/lib/highlightText"
import { Post } from "../../../entities/post/model/types"
import { Comments } from "../../comment/ui/Comments"

interface Props {
  selectedPost: Post
  searchQuery: string
}

export const PostDetailModal = ({ selectedPost, searchQuery }: Props) => {
  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>{highlightText(selectedPost?.body, searchQuery)}</p>
        {selectedPost && <Comments postId={selectedPost.id} searchQuery={searchQuery} />}
      </div>
    </DialogContent>
  )
}

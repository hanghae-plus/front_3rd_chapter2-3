import { Post } from "../../../entities/post/model/types.ts"
import { useQueryUserInfo } from "../api/useQueryUserInfo.ts"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog/ui"
import PostAuthorUserModalContent from "../../../entities/user/ui/PostAuthorUserModalContent.tsx"

interface Props {
  post: Post
}

const PostAuthorUser = ({ post }: Props) => {
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>()

  const { data } = useQueryUserInfo(selectedUserId)

  const openUserModal = (id?: number) => {
    setSelectedUserId(id)
    setShowUserModal(true)
  }

  return (
    <>
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author?.id)}>
        <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
        <span>{post.author?.username}</span>
      </div>

      {data && (
        <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>사용자 정보</DialogTitle>
            </DialogHeader>
            <PostAuthorUserModalContent selectedUser={data} />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export default PostAuthorUser

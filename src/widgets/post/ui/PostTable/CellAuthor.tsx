import { useState } from "react"
import { Author } from "../../../../entities/post/model/types"
import { UserModal } from "../../../user"

type CellAuthorProps = {
  author: Author | undefined
}

export const CellAuthor = ({ author }: CellAuthorProps) => {
  const [showUserModal, setShowUserModal] = useState(false)

  const openUserModal = () => {
    setShowUserModal(true)
  }

  return (
    <>
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={openUserModal}
      >
        <img
          src={author?.image}
          alt={author?.username}
          className="w-8 h-8 rounded-full"
        />
        <span>{author?.username}</span>
      </div>

      {author?.id && (
        <UserModal
          open={showUserModal}
          onOpenChange={setShowUserModal}
          userId={author.id}
        />
      )}
    </>
  )
}

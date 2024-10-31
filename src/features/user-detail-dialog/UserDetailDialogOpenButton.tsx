import { showUserDetailDialogAtom } from "@/features/atom"
import { default as UserDetailDialogOpenButtonUI } from "./ui/UserDetailDialogOpenButton"
import { useAtom } from "jotai"
import { Post } from "@/shared/types"
import { useQueryUser, userAtom } from "@/entities/user"

interface Props {
  post: Post
}

const UserDetailDialogOpenButton = ({ post }: Props) => {
  const [, setOpen] = useAtom(showUserDetailDialogAtom)
  const [, setUser] = useAtom(userAtom)
  const { data } = useQueryUser(post.author?.id)

  const handleClick = () => {
    setUser(data)
    setOpen(true)
  }

  return <UserDetailDialogOpenButtonUI post={post} onClick={handleClick} />
}

export default UserDetailDialogOpenButton

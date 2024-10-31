import { Plus } from "lucide-react"
import { Button, CardHeader, CardTitle } from "../../../../../shared"
import { Dispatch, SetStateAction } from "react"

interface PostCardProps {
  setShowAddDialog: Dispatch<SetStateAction<boolean>>
}

export const PostCard = ({ setShowAddDialog }: PostCardProps) => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>게시물 관리자</span>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      </CardTitle>
    </CardHeader>
  )
}
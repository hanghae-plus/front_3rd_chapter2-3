import React from "react"
import { Plus } from "lucide-react"
import { Button } from "../../shared/ui/button/Button"
import { CardHeader, CardTitle } from "../../shared/ui/card/Card"

interface Props {
  setShowAddDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const PostsManagerHeader = ({ setShowAddDialog }: Props) => {
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

export default PostsManagerHeader

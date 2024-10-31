// src/components/PostsManager/AddPostDialog.tsx
import { CardHeader, CardTitle } from "../../shared/ui/card"
import { Plus } from "lucide-react"
import useManagePosts from "../useManagePosts"
import { Button } from "../../shared/ui/Button"

const AddPost = () => {
  const { setShowAddDialog } = useManagePosts()

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

export default AddPost

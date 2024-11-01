import { useCreatePostDialog } from "@features/dialog/hooks/useCreatePostDialog"
import { Button } from "@shared/ui/button"
import { Plus } from "lucide-react"

export const PostsHeader: React.FC = () => {
  const { openDialog } = useCreatePostDialog()
  return (
    <div className="flex flex-col space-y-1.5 p-6">
      <div className="flex items-center justify-between text-2xl font-semibold leading-none tracking-tight">
        <span>게시물 관리자</span>
        <Button onClick={() => openDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      </div>
    </div>
  )
}
PostsHeader.displayName = "CardHeader"

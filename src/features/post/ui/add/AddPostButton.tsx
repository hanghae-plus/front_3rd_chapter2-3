import { useModal } from "@features/modal/hooks"
import { Button } from "@shared/ui/button/Button"
import { Plus } from "lucide-react"

export const AddPostButton = () => {
  const { openModal } = useModal()
  
  return (
    <Button onClick={() => openModal("createPost")}>
      <Plus className="w-4 h-4 mr-2" />
      게시물 추가
    </Button>
  )
}
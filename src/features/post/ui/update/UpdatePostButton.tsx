import { Button } from "@shared/ui/button"

interface UpdatePostButtonProps {
  onSubmit: () => void
}

export const UpdatePostButton = ({ onSubmit }: UpdatePostButtonProps) => {
  return (
    <Button onClick={onSubmit}>
      게시물 업데이트
    </Button>
  )
}
import { Button, CardHeader, CardTitle } from "../../../shared/ui";
import { Plus } from "lucide-react";
import { usePostsStore } from "../store/usePostsStore";

export default function PostHeader() {
  const { setShowAddPostDialog } = usePostsStore();

  const handleClickPostAddButton = () => {
    setShowAddPostDialog(true);
  };

  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>게시물 관리자</span>
        <Button onClick={handleClickPostAddButton}>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      </CardTitle>
    </CardHeader>
  );
}

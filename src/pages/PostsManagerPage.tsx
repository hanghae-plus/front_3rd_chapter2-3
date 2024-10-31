import { Card } from "../shared/ui";
import { useAddNewUser } from "@/features/user/model/use-add-user-list";
import { useAddNewTag } from "@/features/tag/model/use-add-new-tag";
import BoardHeader from "@/widgets/board/ui/board-header";
import BoardContent from "@/widgets/board/ui/board-content";

const PostsManager = () => {
  // 시작 시 userList, tagList 상태 저장
  useAddNewUser();
  useAddNewTag();

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <BoardHeader />
      <BoardContent />
    </Card>
  );
};

export default PostsManager;

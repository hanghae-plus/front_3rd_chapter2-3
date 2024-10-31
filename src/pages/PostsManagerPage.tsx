import { Card } from "../shared/ui";
import BoardHeader from "@/widgets/board/ui/board-header";
import BoardContent from "@/widgets/board/ui/board-content";
import { useAddNewUser } from "@/features/user/model/use-add-user-list";
import { useAddNewTag } from "@/features/tag/model/use-add-new-tag";
import { useSearchPostList } from "@/features/post/model/use-search-post-list";
import { userListState } from "@/entities/user/model/user-state";
import { useEffect } from "react";

const PostsManager = () => {
  // 시작 시 userList, tagList 상태 저장
  useAddNewUser();
  useAddNewTag();
  const { userList } = userListState();
  const { searchPostList, isLoading } = useSearchPostList();

  useEffect(() => {
    if (userList.length > 0) {
      searchPostList();
    }
  }, [userList]);

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <BoardHeader />
      <BoardContent isLoading={isLoading} />
    </Card>
  );
};

export default PostsManager;

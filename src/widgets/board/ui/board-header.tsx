import { CardHeader, CardTitle } from "@/shared/ui/card/card";
import AddPostButton from "@/features/addPost/ui/post-add-button";

const BoardHeader = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>게시물 관리자</span>
        <AddPostButton />
      </CardTitle>
    </CardHeader>
  );
};

export default BoardHeader;

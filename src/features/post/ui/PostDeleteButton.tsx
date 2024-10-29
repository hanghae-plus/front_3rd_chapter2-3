import { Button } from "@/shared/ui";
import { Trash2 } from "lucide-react";
import usePostsStore from "../model/usePostsStore";

type PostDeleteButtonProps = {
  id: number;
};

const PostDeleteButton = ({ id }: PostDeleteButtonProps) => {
  const deletePost = usePostsStore((state) => state.deletePost);

  return (
    <Button variant="ghost" size="sm" onClick={() => deletePost(id)}>
      <Trash2 className="w-4 h-4" />
    </Button>
  );
};

export default PostDeleteButton;

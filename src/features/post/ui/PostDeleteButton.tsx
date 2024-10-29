import { usePostContext } from "@/entities/post/model/PostContext";
import { Button } from "@/shared/ui";
import { Trash2 } from "lucide-react";

type PostDeleteButtonProps = {
  id: number;
};

const PostDeleteButton = ({ id }: PostDeleteButtonProps) => {
  const { actions } = usePostContext();

  return (
    <Button variant="ghost" size="sm" onClick={async () => await actions.deletePost(id)}>
      <Trash2 className="w-4 h-4" />
    </Button>
  );
};

export default PostDeleteButton;

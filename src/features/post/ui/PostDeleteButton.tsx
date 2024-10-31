import { Button } from "@/shared/ui";

import { Trash2 } from "lucide-react";
import { useMutateDeletePost } from "../api/use-delete-post";

type PostDeleteButtonProps = {
  id: number;
};

const PostDeleteButton = ({ id }: PostDeleteButtonProps) => {
  const { mutate: deletePost } = useMutateDeletePost();

  return (
    <Button variant="ghost" size="sm" onClick={() => deletePost(id)}>
      <Trash2 className="w-4 h-4" />
    </Button>
  );
};

export default PostDeleteButton;

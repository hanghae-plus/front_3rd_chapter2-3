import { MessageSquare, Edit2, Trash2 } from "lucide-react";
import { Button } from "../../../shared/ui";
import { usePosts } from "../model/hook/usePosts";
import { usePostsStore } from "../store/usePostsStore";

type Props = {
  post: Post & {
    author?: User;
  };
};
export function PostButtons({ post }: Props) {
  const { id } = post;

  const { deletePost } = usePosts();
  const { setSelectedPost, setShowEditPostDialog, setShowPostDetailDialog } = usePostsStore();

  const handleClickPostDetailButton = () => {
    setSelectedPost(post);
    setShowPostDetailDialog(true);
  };

  const handleClickPostDeleteButton = async () => {
    await deletePost(id);
  };

  const handleClickPostEditButton = () => {
    setSelectedPost(post);
    setShowEditPostDialog(true);
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={handleClickPostDetailButton}>
        <MessageSquare className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={handleClickPostEditButton}>
        <Edit2 className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={handleClickPostDeleteButton}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}

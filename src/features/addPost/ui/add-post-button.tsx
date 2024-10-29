import { overlay } from "overlay-kit";
import { Button } from "@/shared/ui";
import AddPostDialog from "@/features/addPost/ui/add-post-dialog";
import { Plus } from "lucide-react";

const AddPostButton = () => {
  return (
    <Button
      onClick={() =>
        overlay.open(({ isOpen, close }) => {
          return <AddPostDialog isOpen={isOpen} close={close} />;
        })
      }
    >
      <Plus className="w-4 h-4 mr-2" />
      게시물 추가
    </Button>
  );
};

export default AddPostButton;

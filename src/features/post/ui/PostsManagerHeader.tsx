import { Plus } from 'lucide-react';

import useDialogStore from '../../../shared/lib/dialog/model/useDialogStore';
import Button from '../../../shared/ui/atoms/Button/ui/Button';
import CardHeader from '../../../shared/ui/organisms/Card/ui/CardHeader';
import CardTitle from '../../../shared/ui/organisms/Card/ui/CardTitle';

const PostsManagerHeader = () => {
  const { openDialog } = useDialogStore()

  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>게시물 관리자</span>
        <Button onClick={() => openDialog("addPost", {})}>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      </CardTitle>
    </CardHeader>
  )
}

export default PostsManagerHeader

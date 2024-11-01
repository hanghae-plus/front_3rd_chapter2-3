import { Plus } from 'lucide-react';

import { Button } from '~/shared/ui/Button';

export const PostAddButton = () => {
  return (
    <Button onClick={() => setShowAddDialog(true)}>
      <Plus className="w-4 h-4 mr-2" />
      게시물 추가
    </Button>
  );
};

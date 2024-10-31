import { useOwnSearchParams } from '~/features/search/model/useSearchParams';

import { usePostStore } from '~/entities/post/model/store';

import { HighlightText } from '~/shared/ui/HighlightText';

export const MoadlDetailPost = () => {
  const selectedPost = usePostStore.use.selectedPost();
  const { searchQuery } = useOwnSearchParams();
  return (
    <div className="space-y-4">
      <p>{HighlightText({ text: selectedPost?.body, highlight: searchQuery })}</p>
      {renderComments(selectedPost?.id)}
    </div>
  );
};

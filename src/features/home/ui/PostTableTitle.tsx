import { FC, useCallback, memo } from 'react';

import { Post } from '@entities/home/model/types';
import { usePostFilter } from '@/features/home/model/usePostFilter';

import HighlightText from '@/shared/ui/Highlight';

// 선택된 태그에 따른 클래스를 계산하는 순수 함수
const getTagClassName = (isSelected: boolean): string =>
  isSelected ? 'text-white bg-blue-500 hover:bg-blue-600' : 'text-blue-800 bg-blue-100 hover:bg-blue-200';

// 개별 태그 컴포넌트
const TableTag = memo<{ tag: string }>(({ tag }) => {
  const {
    filters: { tag: selectedTag },
    setTag: setSelectedTag,
  } = usePostFilter();

  const handleSelectTag = useCallback(() => {
    setSelectedTag(tag);
  }, [tag, setSelectedTag]);

  const isSelected = selectedTag === tag;
  const tagClassName = getTagClassName(isSelected);

  return (
    <span
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${tagClassName}`}
      onClick={handleSelectTag}
    >
      {tag}
    </span>
  );
});

TableTag.displayName = 'TableTag';

const PostTableTitle: FC<{ post: Post }> = ({ post }) => {
  const {
    filters: { search },
  } = usePostFilter();

  return (
    <div className="space-y-1">
      <HighlightText
        text={post.title}
        highlight={search}
      />

      <div className="flex flex-wrap gap-1">
        {post.tags.map((tag) => (
          <TableTag
            key={tag}
            tag={tag}
          />
        ))}
      </div>
    </div>
  );
};

PostTableTitle.displayName = 'PostTableTitle';
export default PostTableTitle;

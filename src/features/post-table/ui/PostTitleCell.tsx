import { useSearchParams } from 'react-router-dom';

import { Post } from '~/entities/post/model/types';

import { HighlightText } from '~/shared/ui/HighlightText';

export const PostTitleCell = ({ post }: { post: Post }) => {
  // URL query params
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const selectedTag = searchParams.get('tag');

  return (
    <div className="space-y-1">
      <div>
        <HighlightText text={post.title} highlight={searchQuery} />
      </div>

      <div className="flex flex-wrap gap-1">
        {post.tags?.map((tag) => {
          const isSelectedTag = tag === selectedTag;
          return (
            <PostTitleTag
              key={tag}
              tag={tag}
              isSelectedTag={isSelectedTag}
              onClick={() => {
                setSearchParams({ tag: tag });
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

interface IPostTitleTag {
  tag: string;
  isSelectedTag: boolean;
  onClick: () => void;
}
const PostTitleTag = ({ tag, isSelectedTag, onClick }: IPostTitleTag) => {
  return (
    <span
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
        isSelectedTag ? 'text-white bg-blue-500 hover:bg-blue-600' : 'text-blue-800 bg-blue-100 hover:bg-blue-200'
      }`}
      onClick={onClick}
    >
      {tag}
    </span>
  );
};

import { useSearchParams } from 'react-router-dom';

import { usePostStore } from '~/entities/post/model/store';

import { Button } from '~/shared/ui/Button';

export const PaginationButtons = () => {
  // URL query params
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = Number(searchParams.get('limit') ?? '10');
  const skip = Number(searchParams.get('skip') ?? '0');

  const total = usePostStore.use.totalPost();

  const handleClickPaginationPrevButton = () => {
    setSearchParams({ skip: `${Math.max(0, skip - limit)}` });
  };

  const handleClickPaginationNextButton = () => {
    setSearchParams({ skip: `${skip + limit}` });
  };
  return (
    <div className="flex gap-2">
      <Button disabled={skip === 0} onClick={handleClickPaginationPrevButton}>
        이전
      </Button>
      <Button disabled={skip + limit >= total} onClick={handleClickPaginationNextButton}>
        다음
      </Button>
    </div>
  );
};

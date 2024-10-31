import { PaginationButtons } from '~/features/pagination/ui/PaginationButtons';
import { PaginationLimitSelect } from '~/features/pagination/ui/PaginationLimitSelect';

export const Pagination = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <PaginationLimitSelect />
        <span>항목</span>
      </div>
      <PaginationButtons />
    </div>
  );
};

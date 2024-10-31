import { FC } from 'react';
import { Button } from '@/shared/ui/button/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select/Select';

interface PaginationProps {
  total: number;
  limit: number;
  skip: number;
  onPageChange: (skip: number) => void;
  onLimitChange: (limit: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  total,
  limit,
  skip,
  onPageChange,
  onLimitChange,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select 
          value={limit.toString()} 
          onValueChange={(value) => onLimitChange(Number(value))}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline"
          disabled={skip === 0} 
          onClick={() => onPageChange(Math.max(0, skip - limit))}
        >
          이전
        </Button>
        <Button 
          variant="outline"
          disabled={skip + limit >= total} 
          onClick={() => onPageChange(skip + limit)}
        >
          다음
        </Button>
      </div>
    </div>
  );
};
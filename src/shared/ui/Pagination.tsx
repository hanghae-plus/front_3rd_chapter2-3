import { Button } from "@/shared/ui/Button";
import { Select } from "@/shared/ui/Select";

type PaginationProps = {
  size: number;
  setSize: (size: number) => void;
  page: number;
  setPage: (page: number) => void;
  total: number;
};

const Pagination = ({ size, setSize, page, setPage, total }: PaginationProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select.Container value={size.toString()} onValueChange={(value) => setSize(Number(value))}>
          <Select.Trigger className="w-[180px]">
            <Select.Value placeholder="10" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="10">10</Select.Item>
            <Select.Item value="20">20</Select.Item>
            <Select.Item value="30">30</Select.Item>
          </Select.Content>
        </Select.Container>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={page === 0} onClick={() => setPage(Math.max(0, page - size))}>
          이전
        </Button>
        <Button disabled={page + size >= total} onClick={() => setPage(page + size)}>
          다음
        </Button>
      </div>
    </div>
  );
};

export default Pagination;

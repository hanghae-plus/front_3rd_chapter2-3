import { Button } from '../../shared/ui/Button/Button';

const Pagination = ({ skip, limit, total, onPrev, onNext }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <select
          value={limit}
          onChange={(e) => onNext(Number(e.target.value))}
          className="border p-1 rounded"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={onPrev}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
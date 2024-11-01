export interface CommonResDto<T> {
  limit: number;
  skip: number;
  total: number;
  data: T[];
}

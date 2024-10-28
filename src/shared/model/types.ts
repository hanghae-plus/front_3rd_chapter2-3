export interface ListResponse<T, K extends string> {
  K: T[]
  total: number
}

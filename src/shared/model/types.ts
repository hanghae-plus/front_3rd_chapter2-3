export type ListResponse<T, K extends string> = {
  [key in K]: T[]
} & {
  total: number
}

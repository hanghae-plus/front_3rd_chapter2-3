import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useCommonMutation = <TData, TVariables, TContext = unknown>({
  mutationFn,
  onSuccessCallback,
  options,
}: {
  mutationFn: (variables: TVariables) => Promise<TData>
  onSuccessCallback?: (data: TData, variables: TVariables, context: TContext) => void
  options?: Omit<UseMutationOptions<TData, AxiosError, TVariables, TContext>, "mutationFn" | "onSuccess" | "onError">
}) => {
  return useMutation({
    mutationFn,
    onSuccess: (data, variables, context) => {
      onSuccessCallback?.(data, variables, context)
    },
    onError: (error) => {
      console.error("Mutation failed:", error)
    },
    ...options,
  })
}

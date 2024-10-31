import { useMutation } from '@tanstack/react-query';

export const useCommonMutation = <TData, TVariables>(config: {
  mutationFn: (variables: TVariables) => Promise<TData>
  onSuccessCallback?: (data: TData, variables: TVariables) => void
}) => {
  return useMutation({
    mutationFn: config.mutationFn,
    onSuccess: config.onSuccessCallback,
  })
}

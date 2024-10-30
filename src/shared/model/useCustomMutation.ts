import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";

const useCustomMutation = <TData, TError = unknown, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TError, TVariables>,
): UseMutationResult<TData, TError, TVariables> => {
  return useMutation<TData, TError, TVariables>({
    mutationFn,
    ...options,
  });
};

export default useCustomMutation;

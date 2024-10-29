export const apiHandler = async <T>(fn: () => T, onError?: (error: unknown) => void) => {
  try {
    return await fn();
  } catch (error: unknown) {
    onError?.(error);
  }
};

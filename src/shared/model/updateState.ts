export const updateState = <T, K extends keyof T>(prev: T, key: K, value: T[K]) => {
  return { ...prev, [key]: value };
};

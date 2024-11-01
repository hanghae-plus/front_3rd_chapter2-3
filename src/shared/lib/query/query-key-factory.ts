type QueryKeyFactory = {
  readonly scope: string;
  createKey: <T extends unknown[]>(...args: T) => readonly [string, ...T];
};

export const createQueryKeyFactory = (scope: string): QueryKeyFactory => ({
  scope,
  createKey: (...args) => [scope, ...args] as const
});

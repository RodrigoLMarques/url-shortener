export type Result<T, E = Error> = [T, null] | [null, E];

export async function tryCatchAsync<T>(
  fn: () => Promise<T>,
): Promise<Result<T>> {
  try {
    const data = await fn();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}

export function tryCatchSync<T>(fn: () => T): Result<T> {
  try {
    const data = fn();
    return [data, null];
  } catch (error) {
    return [null, error as Error];
  }
}

export type Result<T, E = Error> = [T, null] | [null, E];

export async function tryCatch<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    const data = await fn();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}

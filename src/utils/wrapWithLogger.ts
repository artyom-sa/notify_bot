import { logger } from './logger.ts';

export const wrapWithLogger = <T extends (...args: any[]) => any>(
  func: T
): ((
  ...args: Parameters<T>
) => ReturnType<T> extends Promise<any>
  ? Promise<Awaited<ReturnType<T>>>
  : ReturnType<T>) => {
  return (async (...args: Parameters<T>): Promise<any> => {
    const functionName = func.name || 'anonymous';

    try {
      const result = func(...args);

      if (result instanceof Promise) {
        const awaitedResult = await result;

        logger(
          'help',
          `${functionName} success`,
          JSON.stringify(awaitedResult, null, 2)
        );

        return awaitedResult;
      }

      logger(
        'help',
        `${functionName} success`,
        JSON.stringify(result, null, 2)
      );

      return result;
    } catch (error) {
      logger(
        'error',
        `An error occurred in ${functionName}`,
        error instanceof Error ? error.message : String(error)
      );
    }
  }) as any;
};

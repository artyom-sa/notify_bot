import { logger } from './logger.ts';
import { stringifyValue } from './stringifyValue.ts';

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
          stringifyValue(awaitedResult)
        );

        return awaitedResult;
      }

      logger('help', `${functionName} success`, stringifyValue(result));

      return result;
    } catch (error) {
      logger(
        'error',
        `An error occurred in ${functionName}`,
        stringifyValue(error instanceof Error ? error.message : error)
      );
    }
  }) as any;
};

export declare const debounce: <F extends (...args: unknown[]) => unknown>(func: F, waitFor: number) => (...args: Parameters<F>) => ReturnType<F>;

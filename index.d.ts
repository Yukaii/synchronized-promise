/** Additional options */
export interface Options {
    /** Function call timeouts */
    timeouts?: number;
    /** deasync tick, default to 100 */
    tick?: number;
}

/**
 * Turn ES6 Promise into synchronize function call, a simple wrapper of deasync package
 * @param func - Promise-base function that want to be transformed
 * @param options - Additional options
 */
export default function sp<This, Args extends unknown[], Ret>(
    func: (this: This, ...args: Args) => Promise<Ret>,
    options?: Options
): (this: This, ...args: Args) => Ret;

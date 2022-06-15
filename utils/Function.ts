type TPCallReturn<T extends (...args: any) => any> = ReturnType<T> | null;
const caller = Function.prototype.call;

class Function$ {
    public static PCall<T extends ( ...args: any ) => any>(
        callingFunction: T, 
        bound: Object = window, 
        ...args: any[]
    ): TPCallReturn<T> {
        let res: TPCallReturn<T> = null;

        try {
            res = caller.call(callingFunction, bound, ...args);
        } catch ( e ) {
            console.error(e);
            return null;
        }

        return res;
    }
}

export {
    Function$ as Function
};
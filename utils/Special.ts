import { Function as Function$ } from "./Function";

export class Special {
    private static runInNextTickList: (() => void)[] = [];
    private static runInNextTickTimeoutID: Nullable<number>;

    /**
     * ? Запускает функции в следующем тике
     * 
     * ? Чтобы не плодить таймауты и не делать вечный интервал, 
     * ?    загоняем все функции из этого тика в массив потом вызываем
     */
    public static RunInNextTick(callback: Function, bound?: Object): void {
        Special.runInNextTickList.push(bound ? callback.bind(bound) : callback);
        
        if (!Special.runInNextTickTimeoutID) {
            Special.runInNextTickTimeoutID = setTimeout(() => {
                if (Special.runInNextTickList.length === 0) return;

                let currentQueue = Special.runInNextTickList;
                
                Special.runInNextTickTimeoutID = undefined;
                Special.runInNextTickList = [];

                currentQueue.forEach(Function$.PCall);
            }, 0)
        }
    }

    public static GetUUID(): string {
        var date = new Date().getTime();
        var perf = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;

            if(date > 0){
                r = (date + r)%16 | 0;
                date = Math.floor(date/16);
            } else {
                r = (perf + r)%16 | 0;
                perf = Math.floor(perf/16);
            }

            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    public static AwaitVariable<T>(check: () => T, OnCancel?: Promise<void>): Promise<NonNullable<T>> {
        return new Promise((resolve, reject) => {
            let stopSearch: boolean = false;
            if (OnCancel) {
                OnCancel.then(() => {
                    stopSearch = true;
                });
            }
                

            const runInNextTick = () => {
                if (stopSearch) return reject("AwaitVariable Stopped");;

                Special.RunInNextTick(() => {
                    let value = check();

                    if (value !== null && value !== undefined) {
                        resolve(value as NonNullable<T>);
                    } else {
                        runInNextTick();
                    }
                })
            }

            runInNextTick();
        })
    }

    public static GetCancelEventAwaitVariable(): {
        cancel: Function, 
        OnCancel: Promise<void>
    } {
        let cancel: Function = null!;
        let OnCancel = new Promise<void>((resolve) => {
            cancel = resolve;
        });

        return {
            cancel,
            OnCancel
        }
    }

    public static GetClassDeclaration(obj: any) {
        return obj?.__proto__?.constructor;
    }

    // Don't use please this function, this is bad way!
    public static GetClone<T extends Object>(value: T): Nullable<T> {
        try {
            const json = JSON.stringify(value);
            return JSON.parse(json);
        } catch(e) {
            console.error('Can not clone array');
        }
    }
}
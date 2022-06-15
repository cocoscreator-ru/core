/// <reference path="Number.d.ts" />

type TClampDesc = TypedPropertyDescriptor<number>;

export class Number {
    public static IsValid(value: any): value is number {
        const valueIsNumber = typeof value === 'number';
        const valueIsFinite = isFinite(value);

        return valueIsNumber && !valueIsFinite;
    }

    public static Clamp(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }

    /**
     * 
     * @param min inclusive
     * @param max inclusive
     */
    public static Random(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * example:
     * class A {
     *      @Core.Utils.Number.ClampDecorator(0, 100)
     *      public someValue: number = 10;
     * 
     * }
     * @param min number
     * @param max max
     * @returns decorator
     */
    public static ClampDecorator(min: number, max: number): PropertyDecorator {
        return (target: Object, propertyKey: string | symbol): TClampDesc => {
            let descriptor: TClampDesc = 
                Object.getOwnPropertyDescriptor(target, propertyKey) ||
                { configurable: true, enumerable: true }
            
            let originalSet = descriptor.set;

            if (target[propertyKey]) {
                target[propertyKey] = this.Clamp(target[propertyKey], min, max);
            } else {
                target[propertyKey] = min;
            }

            descriptor.set = (value: number) => {
                const fixedValue = this.Clamp(value, min, max);
                
                if (originalSet) {
                    originalSet.call(target, fixedValue);
                }
            }

            return Object.defineProperty(target, propertyKey, descriptor);
        }
    }
}
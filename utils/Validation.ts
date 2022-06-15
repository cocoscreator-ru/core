export class Validation {
    public static IsFunction(value: any): value is Function {
        return typeof value === 'function';
    }

    public static IsObject(value: any): value is object {
        return typeof value === "object" && value !== null;
    }
}
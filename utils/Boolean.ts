import { Number } from "./Number";

export class Boolean {
    public static Random(): boolean {
        return !!Number.Random(0, 1);
    }
}
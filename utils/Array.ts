import { Number } from "./Number";

export class Array {
    public static Rotate<T>(matrix: T[][]): T[][] {
        return matrix[0].map((_, index) => matrix.map(row => row[index]).reverse());
    }

    public static Random<T>(array: T[]): T {
        return array[Number.Random(0, array.length - 1)];
    }

    // O(N^2) а может больше хуй его знает надо сделать норм алгоритм
    public static RandomCount<T>(array: T[], requireCount: number = 1): T[] {
        const finalArray: T[] = [];
        const usedIndexes: number[] = [];

        if (array.length <= requireCount) return array;

        let overtimeWatchdog = false;

        let clearTimeoutID = setTimeout(() => {
            overtimeWatchdog = true;
            console.error("Time while watchdog for random count!");
        }, 30000);


        while(finalArray.length < requireCount && overtimeWatchdog === false) {
            const randomIndex = Number.Random(0, array.length - 1);
            if (!~~usedIndexes.indexOf(randomIndex)) continue;
            finalArray.push(array[randomIndex]);
            usedIndexes.push(randomIndex);
        }

        clearTimeout(clearTimeoutID);

        return finalArray;
    }
}
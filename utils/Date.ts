export class Date {
    public static GetTimeRemaining(time: number) {
        var seconds = Math.floor((time / 1000) % 60);
        var minutes = Math.floor((time / 1000 / 60) % 60);
        var hours = Math.floor((time / (1000 * 60 * 60)) % 24);

        return {
            time,
            hours,
            minutes,
            seconds
        };
    }
}
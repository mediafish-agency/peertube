declare function isToday(d: Date): boolean;
declare function isYesterday(d: Date): boolean;
declare function isThisWeek(d: Date): boolean;
declare function isThisMonth(d: Date): boolean;
declare function isLastMonth(d: Date): boolean;
declare function isLastWeek(d: Date): boolean;
export declare const timecodeRegexString = "(\\d+[h:])?(\\d+[m:])?\\d+s?";
declare function timeToInt(time: number | string): number;
declare function secondsToTime(options: {
    seconds: number;
    format: 'short' | 'full' | 'locale-string';
    symbol?: string;
} | number): string;
declare function millisecondsToTime(options: {
    seconds: number;
    format: 'short' | 'full' | 'locale-string';
    symbol?: string;
} | number): string;
export { isYesterday, isThisWeek, isThisMonth, isToday, isLastMonth, isLastWeek, timeToInt, secondsToTime, millisecondsToTime };
//# sourceMappingURL=date.d.ts.map
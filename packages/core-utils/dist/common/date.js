function isToday(d) {
    const today = new Date();
    return areDatesEqual(d, today);
}
function isYesterday(d) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return areDatesEqual(d, yesterday);
}
function isThisWeek(d) {
    const minDateOfThisWeek = new Date();
    minDateOfThisWeek.setHours(0, 0, 0);
    let dayOfWeek = minDateOfThisWeek.getDay() - 1;
    if (dayOfWeek < 0)
        dayOfWeek = 6;
    minDateOfThisWeek.setDate(minDateOfThisWeek.getDate() - dayOfWeek);
    return d >= minDateOfThisWeek;
}
function isThisMonth(d) {
    const thisMonth = new Date().getMonth();
    return d.getMonth() === thisMonth;
}
function isLastMonth(d) {
    const now = new Date();
    return getDaysDifferences(now, d) <= 30;
}
function isLastWeek(d) {
    const now = new Date();
    return getDaysDifferences(now, d) <= 7;
}
export const timecodeRegexString = `(\\d+[h:])?(\\d+[m:])?\\d+s?`;
function timeToInt(time) {
    if (!time)
        return 0;
    if (typeof time === 'number')
        return Math.floor(time);
    const reg = new RegExp(`^((?<hours>\\d+)h)?((?<minutes>\\d+)m)?((?<seconds>\\d+)s?)?$`);
    const matches = time.match(reg);
    if (matches) {
        const hours = parseInt(matches.groups['hours'] || '0', 10);
        const minutes = parseInt(matches.groups['minutes'] || '0', 10);
        const seconds = parseInt(matches.groups['seconds'] || '0', 10);
        return hours * 3600 + minutes * 60 + seconds;
    }
    const parts = time.split(':').reverse();
    const iMultiplier = {
        0: 1,
        1: 60,
        2: 3600
    };
    let result = 0;
    for (let i = 0; i < parts.length; i++) {
        const partInt = parseInt(parts[i], 10);
        if (isNaN(partInt))
            return 0;
        result += iMultiplier[i] * partInt;
    }
    return result;
}
function secondsToTime(options) {
    var _a;
    let seconds;
    let format = 'short';
    let symbol;
    if (typeof options === 'number') {
        seconds = options;
    }
    else {
        seconds = options.seconds;
        format = (_a = options.format) !== null && _a !== void 0 ? _a : 'short';
        symbol = options.symbol;
    }
    let time = '';
    if (seconds === 0 && format !== 'full')
        return '0s';
    const formatNumber = (value) => {
        if (format === 'locale-string')
            return value.toLocaleString();
        return value;
    };
    const hourSymbol = (symbol || 'h');
    const minuteSymbol = (symbol || 'm');
    const secondsSymbol = format === 'full' ? '' : 's';
    const hours = Math.floor(seconds / 3600);
    if (hours >= 1 && hours < 10 && format === 'full')
        time = '0' + hours + hourSymbol;
    else if (hours >= 1)
        time = formatNumber(hours) + hourSymbol;
    else if (format === 'full')
        time = '00' + hourSymbol;
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    if (minutes >= 1 && minutes < 10 && format === 'full')
        time += '0' + minutes + minuteSymbol;
    else if (minutes >= 1)
        time += formatNumber(minutes) + minuteSymbol;
    else if (format === 'full')
        time += '00' + minuteSymbol;
    seconds = Math.round(seconds) % 60;
    if (seconds >= 1 && seconds < 10 && format === 'full')
        time += '0' + seconds + secondsSymbol;
    else if (seconds >= 1)
        time += formatNumber(seconds) + secondsSymbol;
    else if (format === 'full')
        time += '00';
    return time;
}
function millisecondsToTime(options) {
    return secondsToTime(typeof options === 'number' ? options / 1000 : Object.assign(Object.assign({}, options), { seconds: options.seconds / 1000 }));
}
export { isYesterday, isThisWeek, isThisMonth, isToday, isLastMonth, isLastWeek, timeToInt, secondsToTime, millisecondsToTime };
function areDatesEqual(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}
function getDaysDifferences(d1, d2) {
    return (d1.getTime() - d2.getTime()) / (86400000);
}
//# sourceMappingURL=date.js.map
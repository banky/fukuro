export const prettySeconds = (seconds) => {
    let finalStr = '';
    let value = seconds;
    const days = Math.floor(value / 86400);
    if (days > 0) {
        finalStr += `${days}d `;
        value -= days * 86400;
    } else {
        finalStr += '0d ';
    }
    const hours = Math.floor(value / 3600);
    if (hours > 0) {
        finalStr += `${hours}h `;
        value -= hours * 3600;
    } else {
        finalStr += '0h ';
    }
    const minutes = Math.floor(value / 60);
    if (minutes > 0) {
        finalStr += `${minutes}m `;
        value -= minutes * 60;
    } else {
        finalStr += '0m ';
    }
    const secondsLeft = value;
    if (secondsLeft > 0) {
        finalStr += `${secondsLeft}s`;
    } else {
        finalStr += '0s';
    }
    return finalStr;
}
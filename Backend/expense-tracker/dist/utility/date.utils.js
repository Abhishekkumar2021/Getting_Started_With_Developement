export function dateToString(date) {
    return date.toISOString().split("T")[0];
}
export function stringToDate(dateString) {
    return new Date(dateString);
}

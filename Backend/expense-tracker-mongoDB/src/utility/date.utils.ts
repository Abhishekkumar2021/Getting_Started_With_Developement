export function dateToString(date: Date): string {
    return date.toISOString().split("T")[0]
}

export function stringToDate(dateString: string): Date {
    return new Date(dateString)
}
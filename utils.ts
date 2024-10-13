function utcToIST(utcTime: string | Date): string {
    const date: Date =
        utcTime instanceof Date ? new Date(utcTime) : new Date(utcTime);

    date.setUTCHours(date.getUTCHours() + 5);
    date.setUTCMinutes(date.getUTCMinutes() + 30);

    const hours: string = date.getUTCHours().toString().padStart(2, "0");
    const minutes: string = date.getUTCMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
}

export { utcToIST };

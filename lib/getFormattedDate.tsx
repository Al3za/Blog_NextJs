

export default function getFormattedDate(dateString: string):string {
    return new Intl.DateTimeFormat('it-IT',
        { timeZone: 'Europe/Rome',
        dateStyle: 'long' }).format(new Date(dateString));
}

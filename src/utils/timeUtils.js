export function intervalToHours(intervalString) {
    const [hours, minutes, seconds] = intervalString.split(':').map(Number);
    return hours + minutes / 60 + seconds / 3600;
}
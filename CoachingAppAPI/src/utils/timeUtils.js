export function intervalToHours(interval) {
  // Case 1: Postgres interval object (e.g. { hours: 1, minutes: 30, seconds: 0 })
  if (typeof interval === 'object' && interval !== null) {
    const h = interval.hours || 0;
    const m = interval.minutes || 0;
    const s = interval.seconds || 0;
    return h + m / 60 + s / 3600;
  }

  // Case 2: String form like "01:30:00"
  if (typeof interval === 'string' && interval.includes(':')) {
    const [h, m, s] = interval.split(':').map(Number);
    return h + m / 60 + s / 3600;
  }

  // Case 3: Numeric form (minutes)
  if (typeof interval === 'number') {
    return interval / 60;
  }

  throw new Error(`Unsupported interval format: ${JSON.stringify(interval)}`);
}

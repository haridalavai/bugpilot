export function timeAgo(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Define time intervals in seconds
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  // Calculate the appropriate time unit
  if (seconds >= intervals.year) {
    const years = Math.floor(seconds / intervals.year);
    return `${years} ${years === 1 ? 'year' : 'years'}`;
  } else if (seconds >= intervals.month) {
    const months = Math.floor(seconds / intervals.month);
    return `${months} ${months === 1 ? 'month' : 'months'}`;
  } else if (seconds >= intervals.week) {
    const weeks = Math.floor(seconds / intervals.week);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
  } else if (seconds >= intervals.day) {
    const days = Math.floor(seconds / intervals.day);
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  } else if (seconds >= intervals.hour) {
    const hours = Math.floor(seconds / intervals.hour);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  } else if (seconds >= intervals.minute) {
    const minutes = Math.floor(seconds / intervals.minute);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  } else {
    return 'just now';
  }
}

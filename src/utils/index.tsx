export function getTimeAgo(date: Date): string {
  const seconds: number = Math.floor(
    (new Date().getTime() - date.getTime()) / 1000,
  );
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };
  for (const [intervalName, intervalSeconds] of Object.entries(intervals)) {
    const count = Math.floor(seconds / intervalSeconds);
    if (count >= 1) {
      return count === 1
        ? `1 ${intervalName} ago`
        : `${count} ${intervalName}s ago`;
    }
  }

  return 'Just now';
}
// Usage example
const date = new Date(); // Replace with your actual date value
const timeAgo = getTimeAgo(date);
console.log(timeAgo);

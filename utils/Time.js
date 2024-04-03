export function compareTime(targetTime) {
  // Calculate the time difference in seconds
  const second = Math.floor(new Date().getTime() / 1000) - targetTime;

  // Check different time ranges and return the corresponding string
  if (second < 60) {
    return second + ' seconds ago';
  } else if (second < 3600) {
    return Math.floor(second / 60) + ' minutes ago';
  } else if (second < 86400) {
    return Math.floor(second / 3600) + ' hours ago';
  } else if (second < 2592000) {
    return Math.floor(second / 86400) + ' days ago';
  } else if (second < 31536000) {
    return Math.floor(second / 2592000) + ' months ago';
  } else {
    return Math.floor(second / 31536000) + ' years ago';
  }
}

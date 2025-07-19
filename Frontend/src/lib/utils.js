export function formatMessageTime(date) {
  const messageDate = new Date(date);
  const now = new Date();
  
  // Check if the date is today
  if (
    messageDate.getDate() === now.getDate() &&
    messageDate.getMonth() === now.getMonth() &&
    messageDate.getFullYear() === now.getFullYear()
  ) {
    // If today, return only time
    return messageDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } else {
    // If not today, return date + time
    return messageDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }) + ' ' + messageDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
}
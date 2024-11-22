export function formatNumber(num) {
  const format = (number, divisor, suffix) => {
    const formatted = (number / divisor).toFixed(1);
    return formatted.endsWith(".0")
      ? Math.floor(number / divisor) + suffix
      : formatted + suffix;
  };

  if (num >= 1000000000) {
    return format(num, 1000000000, "B");
  }
  if (num >= 1000000) {
    return format(num, 1000000, "M");
  }
  if (num >= 1000) {
    return format(num, 1000, "K");
  }
  return Number.isInteger(num) ? num : num.toFixed(1);
}

export function formatStringWithMiddleEllipsis(
  str,
  startLength = 5,
  endLength = 5
) {
  if (str.length <= startLength + endLength) {
    return str; // Return the original string if it's shorter than the combined lengths
  }

  const start = str.slice(0, startLength);
  const end = str.slice(-endLength);
  return `${start}...${end}`;
}

export function formatStringWithEndEllipsis(
  str,
  startLength = 5,
  middleLength = 10
) {
  if (str.length <= startLength + middleLength) {
    return str; // Return the original string if it's shorter than the combined lengths
  }

  const start = str.slice(0, startLength);
  const middle = str.slice(startLength, startLength + middleLength);
  return `${start}${middle}...`;
}

export function formatDateToMonth(dateString) {
  // Parse the year, month, and day from the input string
  const month = dateString.slice(4, 6);
  const day = parseInt(dateString.slice(6, 8), 10);

  // Month names array
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the month name based on parsed month index
  const monthName = monthNames[parseInt(month, 10) - 1];

  // Suffixes for the day
  const suffixes = ["th", "st", "nd", "rd"];
  const lastDigit = day % 10;
  const suffix =
    (day >= 11 && day <= 13) || lastDigit > 3
      ? suffixes[0]
      : suffixes[lastDigit];

  // Format the final string
  return `${day}${suffix} ${monthName}`;
}

export const getQuery = (query) => {
  const queryString = Object.keys(query)
    .filter((key) => query[key] !== undefined && query[key] !== null)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    )
    .join("&");

  return queryString ? `?${queryString}` : "";
};

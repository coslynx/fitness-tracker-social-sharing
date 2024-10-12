import { DateTime } from 'luxon'; // Import Luxon for date handling

/**
 * Formats a Date object into a user-friendly string.
 * 
 * This function leverages Luxon for efficient date parsing and formatting.
 * 
 * @param date The Date object to format.
 * @param formatString The Luxon format string to use for the output.
 * @returns The formatted date string.
 */
export const formatDate = (date: Date, formatString: string = 'MMMM dd, yyyy'): string => {
  try {
    const dateTime = DateTime.fromJSDate(date);
    return dateTime.toFormat(formatString);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date'; // Handle invalid date input gracefully
  }
};
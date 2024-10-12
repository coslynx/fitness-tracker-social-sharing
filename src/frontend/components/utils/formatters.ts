import { Goal } from '@/frontend/types/goal';
import { Progress } from '@/frontend/types/progress';

/**
 * Formats a goal's target value with its metric.
 *
 * @param goal The goal object.
 * @returns The formatted target value and metric, e.g., "10 kg", "5 miles".
 */
export const formatGoalTarget = (goal: Goal): string => {
  return `${goal.target} ${goal.metric}`;
};

/**
 * Formats a progress entry's date into a user-friendly format.
 *
 * @param progress The progress entry object.
 * @returns The formatted date string, e.g., "June 15, 2023".
 */
export const formatProgressDate = (progress: Progress): string => {
  const date = new Date(progress.date);
  return date.toLocaleDateString();
};

/**
 * Formats a progress entry's value into a more readable format.
 * 
 * @param progress The progress entry object.
 * @returns The formatted value, potentially with units if applicable, e.g., "10 kg", "5 miles", "3 hours".
 */
export const formatProgressValue = (progress: Progress): string => {
  return `${progress.value}`; // Add unit formatting if needed
};
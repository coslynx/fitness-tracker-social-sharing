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

/**
 * Validates the input for a goal name.
 * 
 * @param name The goal name to validate.
 * @returns An error message if the input is invalid, otherwise null.
 */
export const validateGoalName = (name: string): string | null => {
  if (!name) {
    return 'Goal name is required.';
  }
  if (name.length < 3) {
    return 'Goal name must be at least 3 characters long.';
  }
  return null;
};

/**
 * Validates the input for a goal target value.
 * 
 * @param target The goal target value to validate.
 * @returns An error message if the input is invalid, otherwise null.
 */
export const validateGoalTarget = (target: string): string | null => {
  if (!target) {
    return 'Target value is required.';
  }
  if (isNaN(Number(target))) {
    return 'Target value must be a number.';
  }
  return null;
};

/**
 * Validates the input for a goal metric.
 * 
 * @param metric The goal metric to validate.
 * @returns An error message if the input is invalid, otherwise null.
 */
export const validateGoalMetric = (metric: string): string | null => {
  if (!metric) {
    return 'Metric is required.';
  }
  return null;
};

/**
 * Validates the input for a progress value.
 * 
 * @param value The progress value to validate.
 * @returns An error message if the input is invalid, otherwise null.
 */
export const validateProgressValue = (value: string): string | null => {
  if (!value) {
    return 'Progress value is required.';
  }
  if (isNaN(Number(value))) {
    return 'Progress value must be a number.';
  }
  return null;
};

/**
 * Validates the input for a progress description.
 * 
 * @param description The progress description to validate.
 * @returns An error message if the input is invalid, otherwise null.
 */
export const validateProgressDescription = (description: string): string | null => {
  if (description.length > 250) {
    return 'Description must be less than 250 characters.';
  }
  return null;
};
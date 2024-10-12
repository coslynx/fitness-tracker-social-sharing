import { capitalize as _capitalize } from 'lodash';

/**
 * Capitalizes the first letter of a string.
 *
 * @param str The string to capitalize.
 * @returns The capitalized string.
 */
export const capitalize = (str: string): string => {
  if (!str) {
    return '';
  }
  return _capitalize(str);
};
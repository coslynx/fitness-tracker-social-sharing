import { Goal } from "./goal";
import { Progress } from "./progress";
import { User } from "./user";

// This file defines shared types for the Fitness Tracker for Social Sharing MVP. 
// It centralizes type definitions for common data structures and interfaces used across the application.

// Interface for a theme object, which defines color schemes and visual styles.
// This interface is used by the ThemeContext to manage the application's theme.
export interface Theme {
  mode: "light" | "dark"; // Theme mode (light or dark)
  primary: string; // Primary color for buttons, links, etc.
  secondary: string; // Secondary color for text, borders, etc.
  background: string; // Background color for the application.
  text: string; // Text color for the application.
}

// Interface for button properties, including variant, disabled state, and click handler.
// This interface is used by the Button component to customize button appearance and behavior.
export interface ButtonProps {
  variant?: "primary" | "secondary"; // Button variant (primary or secondary)
  disabled?: boolean; // Disable the button (true or false)
  onClick?: () => void; // Click handler function.
  className?: string; // Additional CSS classes to apply.
}

// Interface for input field properties, including type, placeholder, value, and error message.
// This interface is used by the Input component to customize input field behavior and appearance.
export interface InputProps {
  type: string; // Input type (text, email, password, etc.)
  placeholder?: string; // Placeholder text for the input field.
  value?: string; // The current value of the input field.
  onChange?: (value: string) => void; // Function called when the input value changes.
  error?: string; // Error message to display (if any).
  disabled?: boolean; // Disable the input field.
  className?: string; // Additional CSS classes to apply.
}

// Interface for modal properties, including isOpen, onClose, title, and children.
// This interface is used by the Modal component to control modal visibility and content.
export interface ModalProps {
  isOpen: boolean; // Controls whether the modal is open (true or false)
  onClose: () => void; // Function to close the modal.
  title: string; // Title of the modal dialog.
  children: React.ReactNode; // Content to be displayed within the modal.
}

// Interface for a login form, with properties for handling modal visibility.
export interface LoginFormProps {
  isOpen: boolean; // Controls whether the login form is open.
  onClose: () => void; // Function to close the login form.
}

// Interface for a signup form, with properties for handling modal visibility.
export interface SignupFormProps {
  isOpen: boolean; // Controls whether the signup form is open.
  onClose: () => void; // Function to close the signup form.
}

// Interface for goal form properties, including isOpen, onClose, and data for creating goals.
export interface GoalFormProps {
  isOpen: boolean; // Controls whether the goal form is open.
  onClose: () => void; // Function to close the goal form.
}

// Interface for progress log properties, including goalId to fetch progress entries.
export interface ProgressLogProps {
  goalId: number; // The ID of the goal for which to display progress entries.
}

// Interface for user profile properties, used to pass user data to the UserProfile component.
export interface UserProfileProps {
  user: User; // The current user data.
}

// Interface for card properties, including title, children, and className.
// This interface is used by the Card component to customize the appearance of cards.
export interface CardProps {
  title: string; // The title to be displayed in the card.
  children: React.ReactNode; // The content to be displayed in the card.
  className?: string; // Additional CSS classes to apply to the card.
}
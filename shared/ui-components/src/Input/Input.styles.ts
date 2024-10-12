import styled from '@emotion/styled';
import { InputProps } from '@/frontend/types/input';

// Import Tailwind CSS for styling
import 'tailwindcss/tailwind.css';

// Import any necessary custom components or shared utilities
// ...

// Define the InputStyled component using the `styled` function from `@emotion/styled`
export const InputStyled = styled.input<InputProps>`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px #007bff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.error {
    border-color: #dc3545;
  }

  &.${(props) => props.className || ''} {
    /* Apply any additional class-based styles here */
  }
`;
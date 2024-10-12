import styled from '@emotion/styled';
import { ButtonProps } from '@/frontend/types/button';

export const ButtonStyled = styled.button<ButtonProps>`
  background-color: ${(props) => (props.variant === 'primary' ? '#007bff' : '#6c757d')};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.variant === 'primary' ? '#0056b3' : '#5a6268'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.${(props) => props.className || ''} {
    /* Apply any additional class-based styles here */
  }
`;
import styled from '@emotion/styled';
import { ModalProps } from '@/frontend/types/modal';

// Import Tailwind CSS for styling
import 'tailwindcss/tailwind.css';

// Define the ModalStyled component using the `styled` function from `@emotion/styled`
export const ModalStyled = styled.div<ModalProps>`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &.${(props) => props.className || ''} {
    /* Apply any additional class-based styles here */
  }
`;

// Define the ModalTitleStyled component using the `styled` function from `@emotion/styled`
export const ModalTitleStyled = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

// Define the ModalContentStyled component using the `styled` function from `@emotion/styled`
export const ModalContentStyled = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
`;

// Define the ModalFooterStyled component using the `styled` function from `@emotion/styled`
export const ModalFooterStyled = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// Define the ModalCloseButtonStyled component using the `styled` function from `@emotion/styled`
export const ModalCloseButtonStyled = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: #ccc;
  margin-left: 16px;

  &:hover {
    color: #aaa;
  }
`;
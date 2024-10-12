import styled from '@emotion/styled';
import { CardProps } from '@/frontend/types/card';

export const CardStyled = styled.div<CardProps>`
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

export const CardTitleStyled = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const CardContentStyled = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
`;
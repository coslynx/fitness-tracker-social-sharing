import React from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { CardProps } from '@/frontend/types/card';

// Import Tailwind CSS for styling
import 'tailwindcss/tailwind.css';

// Import the CardStyled component from Card.styles.ts
import { CardStyled } from './Card.styles';

// Import the CardTitleStyled component from Card.styles.ts
import { CardTitleStyled } from './Card.styles';

// Import the CardContentStyled component from Card.styles.ts
import { CardContentStyled } from './Card.styles';

// Define the Card component as a functional component
const Card: React.FC<CardProps> = ({ title, children, className }) => {
  // Render the CardStyled component with the provided props
  return (
    <CardStyled className={className}>
      {/* Render the CardTitleStyled component with the provided title */}
      <CardTitleStyled>{title}</CardTitleStyled>

      {/* Render the CardContentStyled component with the provided children */}
      <CardContentStyled>{children}</CardContentStyled>
    </CardStyled>
  );
};

// Export the Card component
export default Card;
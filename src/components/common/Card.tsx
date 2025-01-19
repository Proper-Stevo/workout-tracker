import React, { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
}


export const Card: React.FC<CardProps> = ({ children, className }) => {
    return (
      <div
        className={clsx(
          'rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5',
          className
        )}
      >
        {children}
      </div>
    );
  };
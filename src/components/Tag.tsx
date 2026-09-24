import React from 'react';

interface TagProps {
  label: string;
  variant?: 'muted' | 'accent' | 'teal';
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ label, variant = 'muted', className = '' }) => {
  const getStyle = () => {
    switch (variant) {
      case 'accent':
        return 'text-[#E06D3B] dark:text-[#E9865A] font-semibold';
      case 'teal':
        return 'text-[#2B6E70] dark:text-[#39888B] font-medium';
      case 'muted':
      default:
        return 'text-[#6B85A6] dark:text-[#94A9C4]';
    }
  };

  return (
    <span className={`text-xs tracking-wider uppercase font-mono ${getStyle()} ${className}`}>
      {label}
    </span>
  );
};

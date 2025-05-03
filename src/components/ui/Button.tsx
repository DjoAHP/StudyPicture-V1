import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  active = false,
  disabled = false,
  title
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        px-3 py-2 rounded-md
        font-medium text-sm
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        ${active 
          ? 'bg-[#6200ee] bg-opacity-90 text-white' 
          : 'bg-[#2a2a2a] bg-opacity-70 text-gray-200 hover:bg-opacity-90 hover:text-white'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        backdrop-filter backdrop-blur-sm
        border border-[#3a3a3a]
        shadow-sm
        focus:outline-none focus:ring-2 focus:ring-[#6200ee] focus:ring-opacity-50
      `}
    >
      {children}
    </button>
  );
};

export default Button;

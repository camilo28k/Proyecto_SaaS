import React from 'react';

type ButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex
        h-12
        items-center
        justify-center
        rounded-xl
        bg-blue-600
        px-6
        text-sm
        font-bold
        text-white
        shadow-lg
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:bg-blue-700
        hover:shadow-xl
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${className}
      `}
      {...props}
    />
  );
}
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
          {
            'bg-[var(--color-bee-yellow)] text-[var(--color-bee-black)] hover:bg-[#E6BC00] shadow-sm hover:shadow-md': variant === 'primary',
            'bg-[var(--color-bee-black)] text-white hover:bg-gray-800': variant === 'secondary',
            'border-2 border-gray-200 bg-transparent text-[var(--color-bee-black)] hover:border-[var(--color-bee-black)] hover:bg-[var(--color-bee-black)] hover:text-white': variant === 'outline',
            'bg-transparent text-[var(--color-bee-black)] hover:bg-gray-100': variant === 'ghost',
            'h-9 px-4 text-sm': size === 'sm',
            'h-11 px-6 text-base': size === 'md',
            'h-14 px-8 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

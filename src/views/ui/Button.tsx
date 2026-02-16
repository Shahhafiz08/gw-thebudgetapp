/**
 * Button Component
 * View Layer - Reusable UI Component
 */

import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
        const baseStyles = 'font-semibold rounded-lg transition-all duration-200 ease-out active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';

        const variants = {
            primary: 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20',
            secondary: 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200',
            outline: 'border-2 border-primary text-primary hover:bg-primary/5',
            ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300',
        };

        const sizes = {
            sm: 'py-2 px-4 text-sm',
            md: 'py-3 px-6 text-base',
            lg: 'py-4 px-8 text-lg',
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

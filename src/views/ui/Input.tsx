import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    icon?: React.ReactNode;
    suffix?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, helperText, icon, suffix, type, ...props }, ref) => {
        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label className="block text-sm font-medium text-text-secondary ml-1">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-medium select-none pointer-events-none transition-colors group-focus-within:text-primary/70">
                            {icon}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            "w-full rounded-xl bg-background-light dark:bg-background-secondary/50 border-0 px-4 py-3.5",
                            "text-text-primary font-semibold placeholder:text-text-muted/50",
                            "transition-all duration-200 ease-in-out",
                            "focus:bg-background-white dark:focus:bg-surface-elevated-dark focus:ring-2 focus:ring-primary/20 focus:outline-none",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            icon ? "pl-12" : "",
                            suffix ? "pr-12" : "",
                            error && "bg-red-50 dark:bg-red-900/10 ring-2 ring-red-500/50 text-red-900 dark:text-red-100 placeholder:text-red-300",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {suffix && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted font-medium select-none pointer-events-none">
                            {suffix}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="text-sm font-medium text-red-500 ml-1">{error}</p>
                )}
                {helperText && !error && (
                    <p className="text-xs text-text-secondary ml-1">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

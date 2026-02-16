/**
 * Slider Component
 * View Layer - Reusable UI Component
 */

import React from 'react';
import { cn } from '@/lib/utils';

export interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
    className?: string;
}

export const Slider: React.FC<SliderProps> = ({
    label,
    value,
    min,
    max,
    step,
    onChange,
    className,
}) => {
    return (
        <div className={cn('w-full space-y-3', className)}>
            <div className="flex justify-between items-center gap-4">
                <label className="text-sm font-semibold text-text-secondary whitespace-nowrap">
                    {label}
                </label>
                <div className="relative">
                    <input
                        type="number"
                        value={value || ''}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            if (!isNaN(val)) onChange(val);
                        }}
                        className="w-15 py-1 px-2 text-sm font-bold text-text-primary bg-background-light border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs text-text-muted pointer-events-none">
                        %
                    </span>
                </div>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className={cn(
                    'w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary',
                    className
                )}
            />
        </div>
    );
};

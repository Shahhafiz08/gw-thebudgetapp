import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(value);
}

export function formatCompactCurrency(value: number): string {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
    return `₹${value.toFixed(0)}`;
}

export const formatAED = (value: number) => {
    return new Intl.NumberFormat('en-AE', {
        style: 'currency',
        currency: 'AED',
        maximumFractionDigits: 0,
    }).format(value);
};

export const formatCompactAED = (value: number) => {
    return new Intl.NumberFormat('en-AE', {
        style: 'currency',
        currency: 'AED',
        notation: 'compact',
        maximumFractionDigits: 2,
    }).format(value);
};

export function isMobile(): boolean {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
}

export function isTablet(): boolean {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 768 && window.innerWidth < 1024;
}

export function isDesktop(): boolean {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 1024;
}

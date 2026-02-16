'use client';

import * as React from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/views/ui/Button'; // Updated import

export function ThemeToggle() {
    const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

    React.useEffect(() => {
        const isDark =
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

        if (isDark) {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-10 h-10 px-0 rounded-full border border-black  backdrop-blur-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
            {theme === 'light' ? (
                <Icon icon="solar:sun-2-linear" className="h-5 w-5 text-black transition-all rotate-0 scale-100" />
            ) : (
                <Icon icon="solar:moon-linear" className="h-5 w-5 text-white transition-all rotate-0 scale-100" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}

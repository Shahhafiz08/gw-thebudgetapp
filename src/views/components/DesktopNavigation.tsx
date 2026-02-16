import { Icon } from '@iconify/react';
import { ThemeToggle } from '@/views/ui/ThemeToggle';

export const DesktopNavigation: React.FC = () => {
    return (
        <nav className="border-b border-border-color bg-background-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-[1600px] mx-auto px-6 flex items-center justify-between h-20">
                {/* Left Side */}
                <div className="flex items-center gap-12">
                    {/* Logo */}
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                            <Icon icon="solar:calculator-minimalistic-linear" className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary tracking-tight">
                            Mortgage<span className="text-primary">Pro</span>
                        </span>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-6">
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};

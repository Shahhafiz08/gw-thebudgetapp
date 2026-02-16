import React from 'react';
import { Icon } from '@iconify/react';
import { ThemeToggle } from '@/views/ui/ThemeToggle';
import { Button } from '@/views/ui/Button';

interface DesktopNavigationProps {
    isExporting?: boolean;
    onExportExcel?: () => void;
    onExportImage?: () => void;
    onShare?: () => void;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
    isExporting = false,
    onExportExcel,
    onExportImage,
    onShare,
}) => {
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
                        <span className="text-2xl font-bold text-primary tracking-tight">
                            INDEPENDENT
                        </span>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {onExportExcel && (
                        <Button onClick={onExportExcel} variant="outline" size="sm" disabled={isExporting} className="hidden sm:flex bg-background-white border-border-color text-text-primary hover:bg-background-secondary gap-2">
                            <Icon icon="solar:file-text-linear" className="w-5 h-5" />
                            <span className="hidden md:inline">Export</span>
                        </Button>
                    )}
                    {onExportImage && (
                        <Button onClick={onExportImage} variant="outline" size="sm" disabled={isExporting} className="hidden sm:flex bg-background-white border-border-color text-text-primary hover:bg-background-secondary gap-2">
                            <Icon icon="solar:gallery-download-linear" className="w-5 h-5" />
                            <span className="hidden md:inline">Image</span>
                        </Button>
                    )}
                    {onShare && (
                        <Button onClick={onShare} variant="primary" size="sm" className="shadow-lg shadow-primary/25 glow-button gap-2">
                            <Icon icon="solar:share-linear" className="w-5 h-5" />
                            <span className="hidden md:inline">Share</span>
                        </Button>
                    )}
                    <div className="h-8 w-px bg-border-color mx-2 hidden lg:block"></div>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};

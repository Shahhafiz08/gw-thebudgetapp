import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { ThemeToggle } from '@/views/ui/ThemeToggle';
import { Button } from '@/views/ui/Button';

interface DesktopNavigationProps {
    isExporting?: boolean;
    onExportExcel?: () => void;
    onExportImage?: () => void;
    onShareImage?: () => void;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
    isExporting = false,
    onExportExcel,
    onExportImage,
    onShareImage,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const shareRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleShare = () => setIsShareOpen(!isShareOpen);

    // Close share dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
                setIsShareOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [shareRef]);

    return (
        <nav className="border-b border-border-color bg-background-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-[1600px] mx-auto px-4 lg:px-6 flex items-center justify-between h-20">
                {/* Left Side */}
                <div className="flex items-center gap-12">
                    {/* Logo */}
                    {/* Logo */}
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <img
                            src="/mini-logo.png"
                            alt="Independent Mortgage Broker"
                            className="h-20 w-40 object-contain"
                        />
                    </div>
                </div>

                {/* Right Side - Desktop */}
                <div className="hidden lg:flex items-center gap-4">
                    {onExportExcel && (
                        <Button onClick={onExportExcel} variant="outline" size="sm" disabled={isExporting} className="bg-background-white border-border-color text-text-primary hover:bg-background-secondary gap-2">
                            <Icon icon="solar:file-text-linear" className="w-5 h-5" />
                            <span>Export</span>
                        </Button>
                    )}
                    {onExportImage && (
                        <Button onClick={onExportImage} variant="outline" size="sm" disabled={isExporting} className="bg-background-white border-border-color text-text-primary hover:bg-background-secondary gap-2">
                            <Icon icon="solar:gallery-download-linear" className="w-5 h-5" />
                            <span>Image</span>
                        </Button>
                    )}
                    {/* Share Dropdown */}
                    {onShareImage && (
                        <div className="relative" ref={shareRef}>
                            <Button onClick={toggleShare} variant="primary" size="sm" className="shadow-lg shadow-primary/25 glow-button gap-2">
                                <Icon icon="solar:share-linear" className="w-5 h-5" />
                                <span>Share</span>
                                <Icon icon="solar:alt-arrow-down-linear" className={`w-4 h-4 transition-transform ${isShareOpen ? 'rotate-180' : ''}`} />
                            </Button>

                            {isShareOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-background-white border border-border-color rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                    {onShareImage && (
                                        <button
                                            onClick={async () => { if (onShareImage) await onShareImage(); setIsShareOpen(false); }}
                                            className="w-full text-left px-4 py-3 hover:bg-background-light flex items-center gap-3 transition-colors text-text-primary"
                                        >
                                            <Icon icon="solar:gallery-send-linear" className="w-5 h-5 text-primary" />
                                            <span className="text-sm font-medium">Share Image</span>
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    <div className="h-8 w-px bg-border-color mx-2"></div>
                    <ThemeToggle />
                </div>

                {/* Right Side - Mobile Hamburger */}
                <div className="flex lg:hidden items-center gap-3">
                    <ThemeToggle />
                    <button
                        onClick={toggleMenu}
                        className="p-2 rounded-lg hover:bg-background-secondary text-text-primary transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <Icon icon="solar:close-circle-linear" className="w-7 h-7" />
                        ) : (
                            <Icon icon="solar:hamburger-menu-linear" className="w-7 h-7" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-background-white border-b border-border-color shadow-2xl p-4 flex flex-col gap-3 animate-in slide-in-from-top-5 duration-200">
                    <div className="grid grid-cols-2 gap-3">
                        {onShareImage && (
                            <Button
                                onClick={async () => { if (onShareImage) await onShareImage(); setIsMenuOpen(false); }}
                                variant="primary"
                                size="md"
                                className="w-full justify-center shadow-lg shadow-primary/25 glow-button gap-2"
                            >
                                <Icon icon="solar:gallery-send-linear" className="w-5 h-5" />
                                <span>Share Image</span>
                            </Button>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {onExportExcel && (
                            <Button
                                onClick={async () => { if (onExportExcel) await onExportExcel(); setIsMenuOpen(false); }}
                                variant="outline"
                                size="md"
                                disabled={isExporting}
                                className="w-full justify-center bg-background-light border-border-color text-text-primary hover:bg-background-secondary gap-2"
                            >
                                <Icon icon="solar:file-text-linear" className="w-5 h-5" />
                                <span>Export Excel</span>
                            </Button>
                        )}
                        {onExportImage && (
                            <Button
                                onClick={async () => { if (onExportImage) await onExportImage(); setIsMenuOpen(false); }}
                                variant="outline"
                                size="md"
                                disabled={isExporting}
                                className="w-full justify-center bg-background-light border-border-color text-text-primary hover:bg-background-secondary gap-2"
                            >
                                <Icon icon="solar:gallery-download-linear" className="w-5 h-5" />
                                <span>Save Image</span>
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

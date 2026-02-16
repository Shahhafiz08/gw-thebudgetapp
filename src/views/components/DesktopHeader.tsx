import React from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/views/ui/Button';

interface DesktopHeaderProps {
    isExporting: boolean;
    onExportExcel: () => void;
    onExportImage: () => void;
    onShare: () => void;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
    isExporting,
    onExportExcel,
    onExportImage,
    onShare,
}) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-text-primary tracking-tight">Mortgage Illustration</h1>
                <p className="text-text-secondary mt-2 max-w-2xl">
                    Generate comprehensive mortgage projections, stress tests, and professional client-ready reports in seconds.
                </p>
            </div>
            <div className="flex items-center gap-3">
                <Button onClick={onExportExcel} variant="outline" size="sm" disabled={isExporting} className="bg-background-white border-border-color text-text-primary hover:bg-background-secondary gap-2">
                    <Icon icon="solar:file-text-linear" className="w-5 h-5" />
                    <span className="hidden sm:inline">Export Excel</span>
                </Button>
                <Button onClick={onExportImage} variant="outline" size="sm" disabled={isExporting} className="bg-background-white border-border-color text-text-primary hover:bg-background-secondary gap-2">
                    <Icon icon="solar:gallery-download-linear" className="w-5 h-5" />
                    <span className="hidden sm:inline">Image</span>
                </Button>
                <Button onClick={onShare} variant="primary" size="sm" className="shadow-lg shadow-primary/25 glow-button gap-2">
                    <Icon icon="solar:share-linear" className="w-5 h-5" />
                    <span className="hidden sm:inline">Share</span>
                </Button>
            </div>
        </div>
    );
};

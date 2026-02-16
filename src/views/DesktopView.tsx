/**
 * Desktop View Component
 * View Layer - Single page view for desktop and tablet
 */

'use client';

import React, { useState } from 'react';
import type { MortgageCalculation, MortgageInputs } from '@/models/types/mortgage';
import { exportToExcel, exportToImage, shareViaWhatsApp, shareNative } from '@/controllers/utils/exportUtils';
import { DesktopNavigation } from './components/DesktopNavigation';
import { LoanParameters } from './components/LoanParameters';
import { MortgageResults } from './components/MortgageResults';
import { AmortizationChart } from './components/AmortizationChart';
import { FeesIllustration } from './components/FeesIllustration';

export interface DesktopViewProps {
    calculation: MortgageCalculation;
    inputs: MortgageInputs;
    onInputChange: (key: keyof MortgageInputs, value: number | string) => void;
    validation?: { isValid: boolean; errors: string[] };
}

export const DesktopView: React.FC<DesktopViewProps> = ({
    calculation,
    inputs,
    onInputChange,
    validation,
}) => {
    const [isExporting, setIsExporting] = useState(false);
    const { results, chartData } = calculation;

    const handleExportExcel = async () => {
        setIsExporting(true);
        try {
            await exportToExcel(calculation);
        } catch (error) {
            console.error('Export failed:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportImage = async () => {
        setIsExporting(true);
        try {
            await exportToImage('main-content', 'mortgage-calculation.png');
        } catch (error) {
            console.error('Export failed:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const handleShare = async () => {
        const shared = await shareNative(calculation);
        if (!shared) {
            shareViaWhatsApp(calculation);
        }
    };

    return (
        <div className="min-h-screen bg-background-light bg-grid-pattern transition-colors duration-300">
            {/* Dashboard Navigation */}
            <DesktopNavigation
                isExporting={isExporting}
                onExportExcel={handleExportExcel}
                onExportImage={handleExportImage}
                onShare={handleShare}
            />

            {/* Main Content Area */}
            <main id="main-content" className="max-w-[1600px] mx-auto px-6 py-8">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Sidebar - Sticky */}
                    <div className="lg:col-span-3 sticky top-24 h-[calc(100vh-8rem)]">
                        <LoanParameters
                            inputs={inputs}
                            onInputChange={onInputChange}
                            validation={validation}
                            className="h-full"
                        />
                    </div>

                    {/* Right Content - Scrollable */}
                    <div className="lg:col-span-9 space-y-6">
                        <MortgageResults
                            results={results}
                        />
                        <AmortizationChart data={chartData} />
                        <FeesIllustration results={results} />
                    </div>
                </div>
            </main>
        </div>
    );
};

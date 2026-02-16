/**
 * Desktop View Component
 * View Layer - Single page view for desktop and tablet
 */

'use client';

import React, { useState } from 'react';
import type { MortgageCalculation, MortgageInputs } from '@/models/types/mortgage';
import { exportToExcel, exportToImage, shareViaWhatsApp, shareNative } from '@/controllers/utils/exportUtils';
import { DesktopNavigation } from './components/DesktopNavigation';
import { DesktopHeader } from './components/DesktopHeader';
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
            await exportToImage('desktop-results', 'mortgage-calculation.png');
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
            <DesktopNavigation />

            {/* Main Content Area */}
            <main className="max-w-[1600px] mx-auto px-6 py-8">
                {/* Page Header */}
                <DesktopHeader
                    isExporting={isExporting}
                    onExportExcel={handleExportExcel}
                    onExportImage={handleExportImage}
                    onShare={handleShare}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                        <LoanParameters
                            inputs={inputs}
                            onInputChange={onInputChange}
                            validation={validation}
                        />
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <MortgageResults
                            results={results}
                        />
                        <AmortizationChart data={chartData} />

                    </div>
                </div>
                <FeesIllustration results={results} />
            </main>
        </div>
    );
};

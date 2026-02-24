/**
 * Desktop View Component
 * View Layer - Single page view for desktop and tablet
 */

'use client';

import React, { useState } from 'react';
import type { MortgageCalculation, MortgageInputs } from '@/models/types/mortgage';
import { exportToExcel, exportToImage, shareImage } from '@/controllers/utils/exportUtils';
import { DesktopNavigation } from './components/DesktopNavigation';
import { LoanParameters } from './components/LoanParameters';
import { MortgageResults } from './components/MortgageResults';

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
    const { results } = calculation;

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
            await exportToImage('main-content');
        } catch (error) {
            console.error('Export failed:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const handleShareImage = async () => {
        setIsExporting(true);
        try {
            await shareImage('main-content');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-light bg-grid-pattern transition-colors duration-300">

            <DesktopNavigation
                isExporting={isExporting}
                onExportExcel={handleExportExcel}
                onExportImage={handleExportImage}
                onShareImage={handleShareImage}
            />

            <main id="main-content" className="max-w-[1600px] mx-auto px-6 py-8">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-3 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
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

                        <FeesIllustration results={results} />
                    </div>
                </div>
            </main>
        </div>
    );
};

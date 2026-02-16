/**
 * Export Utilities
 * Controller Layer - Handle Excel and Image exports
 */

'use client';

import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import type { MortgageCalculation } from '@/models/types/mortgage';

/**
 * Export calculation to Excel
 */
export async function exportToExcel(calculation: MortgageCalculation): Promise<void> {
    const { inputs, results, amortizationSchedule } = calculation;

    // Create workbook
    const wb = XLSX.utils.book_new();

    // Summary Sheet
    const summaryData = [
        ['Mortgage Calculation Summary'],
        [''],
        ['Input Parameters'],
        ['Loan Amount', inputs.loanAmount],
        ['Interest Rate (%)', inputs.interestRate],
        ['Tenure (Years)', inputs.tenure],
        [''],
        ['Results'],
        ['Monthly EMI', results.monthlyEMI],
        ['Total Payment', results.totalPayment],
        ['Total Interest', results.totalInterest],
        ['Principal Amount', results.principalAmount],
    ];

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');

    // Amortization Schedule Sheet
    const scheduleData = [
        ['Month', 'Year', 'Principal Paid', 'Interest Paid', 'Balance', 'Cumulative Principal', 'Cumulative Interest'],
        ...amortizationSchedule.map((entry) => [
            entry.month,
            entry.year,
            Math.round(entry.principalPaid),
            Math.round(entry.interestPaid),
            Math.round(entry.balance),
            Math.round(entry.cumulativePrincipal),
            Math.round(entry.cumulativeInterest),
        ]),
    ];

    const scheduleSheet = XLSX.utils.aoa_to_sheet(scheduleData);
    XLSX.utils.book_append_sheet(wb, scheduleSheet, 'Amortization Schedule');

    // Generate file name with timestamp
    const fileName = `Mortgage_Calculation_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Download file
    XLSX.writeFile(wb, fileName);
}

/**
 * Export element to image
 */
export async function exportToImage(elementId: string, fileName: string = 'mortgage-calculation.png'): Promise<void> {
    const element = document.getElementById(elementId);

    if (!element) {
        throw new Error(`Element with id "${elementId}" not found`);
    }

    try {
        const canvas = await html2canvas(element, {
            backgroundColor: '#ffffff',
            scale: 2, // Higher quality
            logging: false,
            useCORS: true,
        });

        // Convert to blob and download
        canvas.toBlob((blob) => {
            if (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                link.click();
                URL.revokeObjectURL(url);
            }
        }, 'image/png');
    } catch (error) {
        console.error('Error exporting to image:', error);
        throw error;
    }
}

/**
 * Share via WhatsApp
 */
export function shareViaWhatsApp(calculation: MortgageCalculation, url?: string): void {
    const { inputs, results } = calculation;

    const message = `🏠 *Mortgage Calculation*

💰 Loan Amount: ₹${inputs.loanAmount?.toLocaleString('en-IN') ?? '-'}
📊 Interest Rate: ${inputs.interestRate}%
📅 Tenure: ${inputs.tenure} years

📈 *Results:*
💳 Monthly EMI: ₹${results.monthlyEMI.toLocaleString('en-IN')}
💵 Total Payment: ₹${results.totalPayment.toLocaleString('en-IN')}
💸 Total Interest: ₹${results.totalInterest.toLocaleString('en-IN')}

${url ? `\n🔗 View Details: ${url}` : ''}

Powered by FinStruct`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

/**
 * Share via Web Share API
 */
export async function shareNative(calculation: MortgageCalculation, url?: string): Promise<boolean> {
    if (!navigator.share) {
        return false;
    }

    const { inputs, results } = calculation;

    const shareData = {
        title: 'Mortgage Calculation',
        text: `Monthly EMI: ₹${results.monthlyEMI.toLocaleString('en-IN')} for ₹${inputs.loanAmount?.toLocaleString('en-IN') ?? '-'} loan`,
        url: url || window.location.href,
    };

    try {
        await navigator.share(shareData);
        return true;
    } catch (error) {
        if ((error as Error).name !== 'AbortError') {
            console.error('Error sharing:', error);
        }
        return false;
    }
}

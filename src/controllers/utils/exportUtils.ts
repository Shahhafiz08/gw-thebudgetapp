import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { toBlob } from 'html-to-image';
import type { MortgageCalculation } from '@/models/types/mortgage';

/* =========================================================
   EXPORT TO EXCEL (DOWNLOAD ONLY)
========================================================= */
export async function exportToExcel(calculation: MortgageCalculation) {
    try {
        const { inputs, results } = calculation;

        const workbook = new ExcelJS.Workbook();

        const RED = 'FFFF0000';
        const ORANGE = 'FFB45309';
        const GREEN = 'FF00B050';

        const formatNumber = (cell: ExcelJS.Cell) => {
            cell.numFmt = '"AED " #,##0';
            cell.alignment = { horizontal: 'right' };
        };

        const thickTop = (cell: ExcelJS.Cell) => {
            cell.border = { top: { style: 'thick' } };
        };

        const sheet = workbook.addWorksheet('Mortgage Illustration');
        sheet.columns = [{ width: 32 }, { width: 15 }, { width: 20 }];

        // ================= LOGO =================
        try {
            const response = await fetch('/logo-independent.png');
            const blob = await response.blob();
            const buffer = await blob.arrayBuffer();

            const imageId = workbook.addImage({
                buffer,
                extension: 'png',
            });

            sheet.addImage(imageId, {
                tl: { col: 0.95, row: 0 },
                ext: { width: 420, height: 80 },
            });
        } catch (e) {
            console.warn('Failed to load logo', e);
        }

        sheet.addRow([]);
        sheet.addRow([]);
        sheet.addRow([]);
        sheet.addRow([]);

        // ================= SECTION 1 =================

        const titleRow = sheet.addRow(['FINANCING ILLUSTRATION']);
        sheet.mergeCells(`A${titleRow.number}:C${titleRow.number}`);
        titleRow.font = { bold: true };
        titleRow.alignment = { horizontal: 'center' };

        sheet.addRow([]);

        const addFinRow = (label: string, value: any, highlight = false) => {
            const row = sheet.addRow([label, '', value]);
            row.getCell(1).alignment = { horizontal: 'left' };
            row.getCell(3).alignment = { horizontal: 'right' };

            if (typeof value === 'number') formatNumber(row.getCell(3));

            if (highlight) {
                row.getCell(1).font = { bold: true, color: { argb: RED } };
                row.getCell(3).font = { bold: true, color: { argb: RED } };
            }
        };

        addFinRow('Property Description', inputs.propertyDesc);
        addFinRow('Purchase Price', inputs.purchasePrice);
        addFinRow('Downpayment Needed', `${inputs.downPaymentPercent}%`);
        addFinRow('Mortgage LTV', `${(results.mortgageLTV * 100).toFixed(0)}%`);
        addFinRow('Mortgage Term (yrs)', inputs.tenure);
        addFinRow('Mortgage Amount', results.mortgageAmount, true);
        addFinRow('Mortgage Rate', `${inputs.interestRate}%`);
        addFinRow('Flat Rate', `${(results.flatRate).toFixed(2)}%`, true);
        addFinRow('Mortgage Rate Type', inputs.rateType, true);
        addFinRow('Mortgage EMI', results.monthlyEMI, true);
        addFinRow('Valuation ', results.valuationFee, true);
        addFinRow('Processing fee ', results.processingFee, true);


        sheet.addRow([]);

        addFinRow('Personal Loan Rate', `${inputs.plRate}%`);
        addFinRow('Personal Loan Term', `${inputs.plTerm} Years`);
        addFinRow('Personal Loan Amount', results.personalLoanAmount, true);
        addFinRow('PL Repayment', results.personalLoanEMI, true);

        // ================= SECTION 2 =================

        sheet.addRow([]);
        sheet.addRow([]);
        sheet.addRow([]);

        const title2 = sheet.addRow(['PAYMENTS ILLUSTRATION']);
        sheet.mergeCells(`A${title2.number}:C${title2.number}`);
        title2.font = { bold: true };
        title2.alignment = { horizontal: 'center' };

        sheet.addRow([]);

        const addPayRow = (
            label: string,
            rate?: string,
            amount?: number,
            color?: string,
            bold = false
        ) => {
            const row = sheet.addRow([label, rate || '', amount ?? '']);

            if (amount !== undefined) formatNumber(row.getCell(3));

            if (bold) row.getCell(3).font = { bold: true };

            if (color) {
                row.getCell(3).font = { bold: true, color: { argb: color } };
            }

            return row;
        };

        addPayRow('Property Purchase Price:', '', inputs.purchasePrice);
        addPayRow('Deposit Needed:', '', results.depositNeeded);

        const loanRow = addPayRow(
            'Loan Amount Needed:',
            '',
            results.mortgageAmount,
            undefined,
            true
        );

        loanRow.getCell(3).border = {
            top: { style: 'medium', color: { argb: GREEN } },
            bottom: { style: 'medium', color: { argb: GREEN } },
            left: { style: 'medium', color: { argb: GREEN } },
            right: { style: 'medium', color: { argb: GREEN } }
        };

        sheet.addRow([]);

        sheet.addRow(['Bank Fees']).font = { bold: true };
        addPayRow('Processing Fee:', '0.50%', results.processingFee);
        addPayRow('Valuation Fee:', '', results.valuationFee);
        addPayRow('Life Insurance:', '0.160%', results.lifeInsurance);
        addPayRow('Property Insurance:', '0.070%', results.propertyInsurance);
        addPayRow('Pre-title POA', '', results.preTitlePOA);

        const bankTotal = addPayRow('Total:', '', results.totalBankFees, RED, true);
        thickTop(bankTotal.getCell(3));

        sheet.addRow([]);

        sheet.addRow(['Property Transfer Fee']).font = { bold: true };
        addPayRow('DLD Fees (4%):', '4.00%', results.dldFees);
        addPayRow('Transfer Fee:', '', results.transferFee);
        addPayRow('Title Deed Fee:', '', results.titleDeedFee);
        addPayRow('Mortgage Reg Fee:', '0.25%', results.mortgageRegFee);

        const transferTotal = addPayRow('Total:', '', results.totalTransferFees, RED, true);
        thickTop(transferTotal.getCell(3));

        sheet.addRow([]);

        sheet.addRow(['Real Estate Fees']).font = { bold: true };
        addPayRow('Commission:', '2%', results.commission);
        addPayRow('Maintenance Fees Advance', '', results.maintenanceAdvance);
        addPayRow('NOC, HASANTUK, Other charges', '', results.nocFee);
        addPayRow('Conveyancing:', '', results.conveyancingFee);

        const reTotal = addPayRow('Total:', '', results.totalRealEstateFees, RED, true);
        thickTop(reTotal.getCell(3));

        sheet.addRow([]);

        sheet.addRow(['Mortgage Service Fees']).font = { bold: true };
        addPayRow('Service Fee', '0.00%', results.totalServiceFee);

        const serviceTotal = addPayRow('Total Paid', '', results.totalServiceFee, RED, true);
        thickTop(serviceTotal.getCell(3));

        sheet.addRow([]);

        const grandTotal = addPayRow('Grand Total Fees :', '', results.totalFees, undefined, true);
        thickTop(grandTotal.getCell(3));

        const totalRequiredValue = results.totalFees + results.depositNeeded;

        addPayRow('Total Required', '', totalRequiredValue);
        addPayRow('Less: Fee Financing', '', results.feeFinancing || 0);
        addPayRow('Less: Personal Loan', '', results.personalLoanUsed);

        const cashRequired = addPayRow(
            'Cash Required',
            '',
            totalRequiredValue -
            (results.feeFinancing || 0) -
            (results.personalLoanUsed || 0),
            ORANGE,
            true
        );

        cashRequired.getCell(3).border = {
            top: { style: 'medium' },
            bottom: { style: 'double' },
        };

        sheet.addRow([]);
        const disclaimerRow = sheet.addRow([
            "This is used for quotation purposes only by client's requests. Independent Finance has given without any liability on the company's part."
        ]);

        sheet.mergeCells(`A${disclaimerRow.number}:C${disclaimerRow.number}`);
        disclaimerRow.getCell(1).font = { color: { argb: ORANGE }, italic: true, size: 10 };

        const buffer = await workbook.xlsx.writeBuffer();

        saveAs(
            new Blob([buffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }),
            'Mortgage_Illustration.xlsx'
        );

    } catch (error) {
        console.error('Export failed:', error);
        alert(`Export failed: ${(error as Error).message}`);
    }
}

/* =========================================================
   IMAGE GENERATION HELPER
========================================================= */
async function generateImageBlob(elementId: string): Promise<Blob> {
    const element = document.getElementById(elementId);
    if (!element) throw new Error(`Element with id "${elementId}" not found`);

    const blob = await toBlob(element, { backgroundColor: '#ffffff', cacheBust: true });

    if (!blob) throw new Error('Failed to create image blob');
    return blob;
}

/* =========================================================
   EXPORT TO IMAGE (DOWNLOAD ONLY)
========================================================= */
export async function exportToImage(
    elementId: string,
    fileName: string = 'mortgage-calculation.png'
): Promise<void> {
    try {
        const blob = await generateImageBlob(elementId);

        // Force download behavior
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error exporting image:', error);
        throw error;
    }
}

/* =========================================================
   SHARE IMAGE (NATIVE SHARE OR DOWNLOAD FALLBACK)
========================================================= */
export async function shareImage(
    elementId: string,
    fileName: string = 'mortgage-calculation.png'
): Promise<void> {
    try {
        const blob = await generateImageBlob(elementId);
        const file = new File([blob], fileName, { type: 'image/png' });
        const shareData = {
            title: 'Mortgage Calculation',

            files: [file],
        };


        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
                return;
            } catch (err: any) {
                // If user aborts, do nothing
                if (err.name === 'AbortError') return;
                console.warn('Share API failed, falling back to download', err);
            }
        }

        // Fallback: Download the image + Open WhatsApp
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);



    } catch (error) {
        console.error('Error sharing image:', error);
        throw error;
    }
}

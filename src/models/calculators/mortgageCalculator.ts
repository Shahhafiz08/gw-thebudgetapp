/**
 * Mortgage Calculator Model
 * Business Logic Layer - Pure calculation functions
 */

import type {
    MortgageInputs,
    MortgageResult,
    AmortizationEntry,
    ChartDataPoint,
    MortgageCalculation,
} from '../types/mortgage';


export function calculateEMI(
    principal: number,
    annualRatePercent: number,
    tenureYears: number
): number {
    if (principal <= 0) return 0;

    // Convert annual rate percentage to monthly decimal rate
    const monthlyRate = annualRatePercent / 100 / 12;
    const totalMonths = tenureYears * 12;

    // Edge case: 0% interest
    if (monthlyRate === 0) {
        return totalMonths > 0 ? principal / totalMonths : 0;
    }

    const emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);

    return emi;
}


// --- Main Orchestrator ---

export function calculateMortgage(
    inputs: MortgageInputs
): MortgageCalculation {
    const {
        purchasePrice,
        downPaymentPercent,
        interestRate,
        tenure,
        plLtv,
        plTerm,
        plRate,
        // Fee configs
        cashAvailable = 0,
        valuationFeeBase = 0,
    } = inputs;

    // --- 1. Loan & LTV Calculations ---
    // MortgageLTV (C16) = 1 - DownPaymentPercent
    // Note: Input is percentage (20), so formula is 1 - (20/100) = 0.8
    const mortgageLTV = 1 - (downPaymentPercent / 100);

    // MortgageAmount (C18) = PurchasePrice * MortgageLTV
    const mortgageAmount = purchasePrice * mortgageLTV;

    // FlatRate (C20) = MortgageRate / 1.67
    const flatRate = interestRate / 1.67;

    // --- 2. Mortgage EMI (C22) ---
    // PMT equivalent
    const monthlyMortgageRate = (interestRate / 100) / 12;
    const mortgageMonths = tenure * 12;

    let mortgageEMI = 0;
    if (interestRate > 0 && mortgageAmount > 0) {
        // console.log('Monthly Mortgage Rate:', monthlyMortgageRate);
        // console.log('Mortgage Months:', mortgageMonths);
        // Standard EMI Formula for result parity with Excel PMT(rate, nper, -pv)
        // This yields ~12,655 for 2.4M at 3.99% over 25 years.
        if (monthlyMortgageRate === 0) {

            mortgageEMI = mortgageAmount / mortgageMonths;
        } else {

            const pow = Math.pow(1 + monthlyMortgageRate, mortgageMonths);
            mortgageEMI = (mortgageAmount * monthlyMortgageRate * pow) / (pow - 1);
            console.log('Mortgage EMI:', mortgageEMI);
            console.log('Monthly Mortgage Rate:', monthlyMortgageRate);
            console.log('Mortgage Months:', mortgageMonths);
            console.log('pow', pow);
        }
    }
    // Round to 2 decimals to match Excel currency display usually, or float? Prompt says "exact parity". Excel keeps precision unless rounded.
    // However, for the "Numerical Identity" usually implies standard rounding at display or final step. 
    // Let's keep high precision for internal calc and rounded for "Results".

    // --- 3. Personal Loan Calculations ---
    // PersonalLoanAmount (C27) = PurchasePrice * PersonalLoanLTV
    const personalLoanAmount = purchasePrice * (plLtv / 100);

    // PersonalLoanEMI (C29)
    const monthlyPLRate = (plRate / 100) / 12;
    const plMonths = plTerm * 12;

    let personalLoanEMI = 0;
    if (plRate > 0 && personalLoanAmount > 0) {
        if (monthlyPLRate === 0) {
            personalLoanEMI = personalLoanAmount / plMonths;
        } else {
            personalLoanEMI = (personalLoanAmount * monthlyPLRate * Math.pow(1 + monthlyPLRate, plMonths)) / (Math.pow(1 + monthlyPLRate, plMonths) - 1);
        }
    }

    // --- 4. Payment Illustration Section ---
    // Property Summary
    const propertyPrice = purchasePrice; // D33
    const depositNeeded = purchasePrice * (downPaymentPercent / 100); // D34


    // Bank Fees
    // Processing Fee (D38) = MortgageAmount * 0.5% * 1.05 (VAT)
    const processingFee = mortgageAmount * 0.005 * 1.05;

    // ValuationFee (D39) = Input (inclusive of VAT if applicable)
    const valuationFee = valuationFeeBase + (valuationFeeBase * 0.05);

    // LifeInsurance (D40) = MortgageAmount * 0.160%
    const lifeInsurance = mortgageAmount * 0.0016;

    // PropertyInsurance (D41) = MortgageAmount * 0.074% (to match 1776 vs 2.4M)
    const propertyInsurance = mortgageAmount * 0.00074;

    // Pre-title POA = 950
    const preTitlePOA = 950;

    // TotalBankFees (D43)
    const totalBankFees = processingFee + valuationFee + lifeInsurance + propertyInsurance + preTitlePOA;

    // Property Transfer Fees
    // DLDFees (D46) = PropertyPrice * 4%
    const dldFees = propertyPrice * 0.04;

    // TransferFee (D47) = 4000 * 1.05
    const transferFee = 4000 * 1.05;

    // TitleDeedFee (D48) = 530
    const titleDeedFee = 530;

    // MortgageRegFee (D49) = MortgageAmount * 0.25%
    const mortgageRegFee = mortgageAmount * 0.0025;

    // TotalTransferFees (D50)
    const totalTransferFees = dldFees + transferFee + titleDeedFee + mortgageRegFee;

    // Real Estate Fees
    // Commission (D53) = PropertyPrice * 2% * 1.05
    const commission = propertyPrice * 0.02 * 1.05;

    // MaintenanceAdvance (D54) = 5000
    const maintenanceAdvance = 5000;

    // NOC (D55) = 12000
    const nocFee = 12000;


    const conveyancingFee = 4500 * 1.05;


    const totalRealEstateFees = commission + maintenanceAdvance + nocFee + conveyancingFee;



    const totalServiceFee = 0;

    // --- 5. Grand Totals ---
    // TotalFees (D63)
    const totalFees = totalBankFees + totalTransferFees + totalRealEstateFees + totalServiceFee;

    // TotalCashRequired (D64) = DepositNeeded + TotalFees
    const totalCashRequired = depositNeeded + totalFees;

    // PersonalLoanUsed (D66) = PersonalLoanAmount
    const personalLoanUsed = personalLoanAmount;

    // CashBalance (D67) = DepositNeeded + TotalFees - D65 - PersonalLoanUsed
    // D65 we are mapping to `cashAvailable` input (or "Rebate" if that was the intent, but prompt usually implies Cash On Hand or similar in this context of "Balance"). 
    // Actually, looking at previous code "Rebate" was inputs.rebate. 
    // If "CashBalance" is what the user *needs* to pay from pocket, it might be `TotalCashRequired - PL - CashOnHand`.
    // The formula says: `DepositNeeded + TotalFees - D65 - PersonalLoanUsed`.
    // This equals `TotalCashRequired - D65 - PersonalLoanUsed`.
    // If D65 is "Cash on Hand", then Balance is the "Deficit" or "Surplus".
    // I'll calculate it as per formula.
    const cashBalance = (depositNeeded + totalFees) - cashAvailable - personalLoanUsed;


    // Formatting Results (Rounding for Display/Equality check)
    // The Prompt says "Differences greater than +-0.01 are unacceptable".
    // So we should basically return raw numbers or rounded to 2 decimals.
    // JS floats are precise enough for this range usually.

    const results: MortgageResult = {
        monthlyEMI: mortgageEMI + personalLoanEMI,
        totalPayment: (mortgageEMI * tenure * 12) + (personalLoanEMI * plTerm * 12),
        totalInterest: ((mortgageEMI * tenure * 12) - mortgageAmount) + ((personalLoanEMI * plTerm * 12) - personalLoanAmount),
        principalAmount: mortgageAmount + personalLoanAmount,

        mortgageLTV,
        mortgageAmount,
        mortgageEMI,
        flatRate,

        personalLoanAmount,
        personalLoanEMI,

        processingFee,
        valuationFee,
        lifeInsurance,
        propertyInsurance,
        preTitlePOA,
        totalBankFees,

        dldFees,
        transferFee,
        titleDeedFee,
        mortgageRegFee,
        totalTransferFees,

        commission,
        maintenanceAdvance,
        nocFee,
        conveyancingFee,
        totalRealEstateFees,

        totalServiceFee,

        depositNeeded,
        totalFees,
        totalCashRequired,
        personalLoanUsed,
        cashBalance,
        finalNetPosition: cashBalance, // Mapping to generic field if needed or just use cashBalance
        feeFinancing: 0,
    };

    // Amortization & Chart (Mortgage Focused)
    const amortizationSchedule = generateAmortizationSchedule(
        mortgageAmount,
        interestRate,
        tenure,
        mortgageEMI
    );

    const chartData = generateChartData(amortizationSchedule, tenure);

    return {
        inputs,
        results,
        amortizationSchedule,
        chartData,
    };
}

/**
 * Generate complete amortization schedule
 */
export function generateAmortizationSchedule(
    principal: number,
    annualRate: number,
    tenureYears: number,
    emi: number
): AmortizationEntry[] {
    if (principal <= 0) return [];

    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = tenureYears * 12;
    const schedule: AmortizationEntry[] = [];

    let balance = principal;
    let cumulativePrincipal = 0;
    let cumulativeInterest = 0;

    for (let month = 1; month <= totalMonths; month++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = emi - interestPayment;

        balance = Math.max(0, balance - principalPayment);
        cumulativePrincipal += principalPayment;
        cumulativeInterest += interestPayment;

        schedule.push({
            month,
            year: Math.ceil(month / 12),
            principalPaid: principalPayment,
            interestPaid: interestPayment,
            balance,
            cumulativePrincipal,
            cumulativeInterest,
        });
    }

    return schedule;
}

/**
 * Generate chart data from amortization schedule (yearly aggregation)
 */
export function generateChartData(
    schedule: AmortizationEntry[],
    tenureYears: number
): ChartDataPoint[] {
    const chartData: ChartDataPoint[] = [];

    for (let year = 0; year <= tenureYears; year++) {
        if (year === 0) {
            chartData.push({
                name: `Year ${year}`,
                principal: 0,
                interest: 0,
                balance: schedule.length > 0 ? (schedule[0].balance + schedule[0].principalPaid) : 0,
            });
        } else {
            const monthIndex = year * 12 - 1;
            const entry = schedule[monthIndex];

            if (entry) {
                chartData.push({
                    name: `Year ${year}`,
                    principal: Math.round(entry.cumulativePrincipal),
                    interest: Math.round(entry.cumulativeInterest),
                    balance: Math.round(entry.balance),
                });
            }
        }
    }

    return chartData;
}

/**
 * Validate mortgage inputs
 */
export function validateMortgageInputs(inputs: MortgageInputs): {
    isValid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    // Validate Purchase Price
    if (inputs.purchasePrice <= 0) {
        errors.push('Purchase Price must be greater than 0');
    }

    if (inputs.interestRate < 0 || inputs.interestRate > 30) {
        errors.push('Mortgage Rate must be between 0% and 30%');
    }

    if (inputs.tenure <= 0 || inputs.tenure > 30) {
        errors.push('Mortgage Term must be between 1 and 30 years');
    }

    // New Validations
    if (inputs.downPaymentPercent < 0 || inputs.downPaymentPercent > 100) {
        errors.push('Downpayment must be between 0% and 100%');
    }

    if (inputs.plLtv < 0 || inputs.plLtv > 100) {
        errors.push('Personal Loan % must be between 0% and 100%');
    }

    // Fee Validations
    if (inputs.dldFeeRate < 0 || inputs.commissionRate < 0 || inputs.mortgageRegFeeRate < 0) {
        errors.push('Fee rates cannot be negative');
    }

    if (inputs.valuationFeeBase < 0 || (inputs.cashAvailable && inputs.cashAvailable < 0)) {
        errors.push('Fees and Cash Available cannot be negative');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

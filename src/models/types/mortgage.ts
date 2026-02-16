/**
 * Mortgage Calculator Types
 * Model Layer - Data structures and interfaces
 */

export interface MortgageInputs {
    // User Editable (as per prompt)
    purchasePrice: number;       // C14
    downPaymentPercent: number;  // C15 (e.g., 20)
    tenure: number;              // C17 (MortgageTermYears)
    interestRate: number;        // C19 (MortgageRate)
    plLtv: number;               // C25 (PersonalLoanLTV)
    plTerm: number;              // C26 (PersonalLoanTermYears)
    plRate: number;              // C28 (PersonalLoanRate)

    // Configurable/Formula Inputs (Excel references)
    // Bank Fees
    processingFeeRate: number;    // C23 (Percentage)
    valuationFeeBase: number;     // C24 (Base Amount)

    // Property Transfer Fees
    dldFeeRate: number;           // C46
    transferFeeFixed: number;     // D47
    titleDeedFeeFixed: number;    // D48
    mortgageRegFeeRate: number;   // C49

    // Real Estate Fees
    commissionRate: number;       // C53
    maintenanceAdvance: number;   // D54
    nocFee: number;               // D55
    conveyancingFee: number;      // D56

    // Service Fees
    serviceFeeRate: number;       // C60

    // Other
    cashAvailable?: number;       // D65 (Inferred from CashBalance formula)
    propertyDesc?: string;
    rateType?: string; // Kept for UI
}

export interface MortgageResult {
    // Key Outputs
    monthlyEMI: number;
    totalPayment: number;
    totalInterest: number;
    principalAmount: number;

    // Derived Values
    mortgageLTV: number;          // C16
    mortgageAmount: number;       // C18
    mortgageEMI: number;          // C22
    flatRate: number;             // C20

    personalLoanAmount: number;   // C27
    personalLoanEMI: number;      // C29

    // Payment Illustration / Fees
    // Bank Fees
    processingFee: number;        // D38
    valuationFee: number;         // D39
    lifeInsurance: number;        // D40
    propertyInsurance: number;    // D41
    totalBankFees: number;        // D43

    // Property Transfer Fees
    dldFees: number;              // D46
    transferFee: number;          // D47
    titleDeedFee: number;         // D48
    mortgageRegFee: number;       // D49
    totalTransferFees: number;    // D50

    // Real Estate Fees
    commission: number;           // D53
    maintenanceAdvance: number;   // D54
    nocFee: number;               // D55
    conveyancingFee: number;      // D56
    totalRealEstateFees: number;  // D57

    // Service Fees
    totalServiceFee: number;      // D61

    // Grand Totals
    depositNeeded: number;        // D34
    loanNeeded: number;           // D35
    totalFees: number;            // D63
    totalCashRequired: number;    // D64
    personalLoanUsed: number;     // D66
    cashBalance: number;          // D67
    finalNetPosition: number; // calculated field alias for compatibility if needed
}

export interface AmortizationEntry {
    month: number;
    year: number;
    principalPaid: number;
    interestPaid: number;
    balance: number;
    cumulativePrincipal: number;
    cumulativeInterest: number;
}

export interface ChartDataPoint {
    name: string;
    principal: number;
    interest: number;
    balance: number;
}

export interface MortgageCalculation {
    inputs: MortgageInputs;
    results: MortgageResult;
    amortizationSchedule: AmortizationEntry[];
    chartData: ChartDataPoint[];
}

export type CalculatorStep = 'entry' | 'inputs' | 'results';

export interface ShareData {
    title: string;
    text: string;
    url: string;
}

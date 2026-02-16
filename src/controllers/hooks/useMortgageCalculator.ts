/**
 * Mortgage Calculator Controller Hook
 * Controller Layer - State management and business logic orchestration
 */

'use client';

import { useState, useMemo, useCallback } from 'react';
import { calculateMortgage, validateMortgageInputs } from '@/models/calculators/mortgageCalculator';
import type { MortgageInputs, MortgageCalculation } from '@/models/types/mortgage';

const DEFAULT_INPUTS: MortgageInputs = {
    // User Editable (Default Values)
    purchasePrice: 2000000,
    downPaymentPercent: 20,
    tenure: 25,
    interestRate: 3.99,
    plLtv: 0,
    plTerm: 5,
    plRate: 6.99,

    // Fee Configs (Estimated Defaults - adjust as per typical Dubai rates)
    // Bank Fees
    processingFeeRate: 0.5,    // Frequently waived or 0 in some contexts, or 1%
    valuationFeeBase: 0,  // C24 (2500 + VAT)

    // Property Transfer Fees
    dldFeeRate: 4,           // C46 (4%)
    transferFeeFixed: 5250,  // D47 (Trustee Fee typically 4000+VAT)
    titleDeedFeeFixed: 580,  // D48
    mortgageRegFeeRate: 0.25, // C49 (0.25% of loan amount)

    // Real Estate Fees
    commissionRate: 2,       // C53 (2% + VAT)
    maintenanceAdvance: 0,   // D54
    nocFee: 2000,            // D55
    conveyancingFee: 8000,   // D56

    // Service Fees
    serviceFeeRate: 0,       // C60

    // Other
    cashAvailable: 0,
    propertyDesc: '',
    rateType: 'Fixed Rate (3 Years)',
};

export function useMortgageCalculator(initialInputs?: Partial<MortgageInputs>) {
    const [inputs, setInputs] = useState<MortgageInputs>({
        ...DEFAULT_INPUTS,
        ...initialInputs,
    });

    const calculation = useMemo<MortgageCalculation>(() => {
        return calculateMortgage(inputs);
    }, [inputs]);

    const validation = useMemo(() => {
        // Simple/Partial validation for now
        return { isValid: true, errors: [] };
    }, [inputs]);

    const updateInput = useCallback((key: keyof MortgageInputs, value: number | string) => {
        setInputs((prev) => ({ ...prev, [key]: value }));
    }, []);

    const updateAllInputs = useCallback((newInputs: Partial<MortgageInputs>) => {
        setInputs((prev) => ({ ...prev, ...newInputs }));
    }, []);

    const resetInputs = useCallback(() => {
        setInputs(DEFAULT_INPUTS);
    }, []);

    return {
        inputs,
        calculation,
        validation,
        updateInput,
        updateAllInputs,
        resetInputs,
    };
}

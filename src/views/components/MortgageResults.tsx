import React from 'react';
import type { MortgageCalculation } from '@/models/types/mortgage';
import { formatAED, formatCompactAED } from '@/lib/utils';
import { Icon } from '@iconify/react';

interface MortgageResultsProps {
    results: MortgageCalculation['results'];
}

export const MortgageResults: React.FC<MortgageResultsProps> = ({
    results,
}) => {
    return (
        <div id="desktop-results" className="space-y-6">

            {/* Top Section: Total Monthly EMI (Full Width) */}
            <div className="relative overflow-hidden rounded-2xl p-8 bg-background-white dark:bg-linear-to-br dark:from-primary dark:to-blue-900 text-text-primary dark:text-white shadow-xl border border-border-color dark:border-transparent">
                <div className="absolute top-0 right-0 w-40 h-40 bg-background-light dark:bg-white opacity-50 dark:opacity-5 rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-background-light dark:bg-white opacity-50 dark:opacity-5 rounded-full -ml-16 -mb-16"></div>

                <div className="relative flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-primary/10 dark:bg-white/10 rounded-lg">
                                <Icon icon="solar:calendar-mark-linear" className="w-5 h-5 text-primary dark:text-white" />
                            </div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary dark:text-blue-200">
                                Total Monthly EMI
                            </p>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-4xl lg:text-6xl font-bold mb-2 text-primary dark:text-white">
                                {formatAED(results.monthlyEMI)}
                            </p>
                            <span className="text-text-secondary dark:text-blue-200 text-lg font-medium">/ month</span>
                        </div>
                    </div>

                    <div className="flex gap-8 bg-white/50 dark:bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/20 dark:border-white/5">
                        <div className="pr-8 border-r border-gray-200 dark:border-white/10">
                            <p className="text-xs text-text-secondary dark:text-blue-200 uppercase tracking-wide mb-1">Mortgage</p>
                            <p className="font-bold text-xl text-text-primary dark:text-white">{formatAED(results.mortgageEMI)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-text-secondary dark:text-blue-200 uppercase tracking-wide mb-1">Personal Loan</p>
                            <p className="font-bold text-xl text-text-primary dark:text-white">{formatAED(results.personalLoanEMI)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid of Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Payment */}
                <div className="bg-background-white border border-border-color rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                        <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                            Total Payment
                        </p>
                    </div>
                    <p className="text-2xl font-bold text-text-primary">
                        {formatAED(results.totalPayment)}
                    </p>
                    <p className="text-xs text-text-muted mt-1">(Mortgage + PL)</p>
                </div>

                {/* Total Loan Amount */}
                <div className="bg-background-white border border-border-color rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                        <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                            Total Loan Amt
                        </p>
                    </div>
                    <p className="text-2xl font-bold text-text-primary">
                        {formatCompactAED(results.principalAmount)}
                    </p>
                    <div className="mt-1 text-xs text-text-muted">
                        LTV: {(results.mortgageLTV * 100).toFixed(0)}%
                    </div>
                </div>

                {/* Final Net Position */}
                <div className="bg-background-white border border-border-color rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                        <Icon icon="solar:chart-square-linear" className="w-5 h-5 text-emerald-600 dark:text-white" />
                        <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                            Deposit needed
                        </p>
                    </div>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCompactAED(results.depositNeeded)}
                    </p>

                </div>

                {/* Total Interest */}
                <div className="bg-background-white border border-border-color rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                        <Icon icon="solar:graph-up-linear" className="w-5 h-5 text-red-600 dark:text-white" />
                        <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                            Loan amount needed
                        </p>
                    </div>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {formatCompactAED(results.loanNeeded)}
                    </p>
                </div>
            </div>

            {/* Fee Breakdown Summary */}
            <div className="bg-background-white rounded-xl p-6 shadow-md border border-border-color">
                <div className="flex items-center gap-2 mb-4">
                    <Icon icon="solar:bill-list-linear" className="w-5 h-5 text-primary dark:text-white" />
                    <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                        Fee Breakdown Summary
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                        <p className="text-base font-semibold text-text-muted mb-1">Bank Fees</p>
                        <p className="text-xl font-bold text-text-primary">{formatCompactAED(results.totalBankFees)}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-text-muted mb-1">Transfer Fees</p>
                        <p className="text-xl font-bold text-text-primary">{formatCompactAED(results.totalTransferFees)}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-text-muted mb-1">Real Estate Fees</p>
                        <p className="text-xl font-bold text-text-primary">{formatCompactAED(results.totalRealEstateFees)}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-text-muted mb-1">Valuation</p>
                        <p className="text-xl font-bold text-text-primary">{formatCompactAED(results.valuationFee)}</p>
                    </div>
                </div>
            </div>



        </div>
    );
};

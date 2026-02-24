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
                            <p className="text-xl lg:text-3xl font-bold mb-2 text-primary dark:text-white">
                                {formatAED(results.monthlyEMI)}
                            </p>
                            <span className="text-text-secondary dark:text-blue-200 text-lg font-medium">/month</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-0 bg-white/50 dark:bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/20 dark:border-white/5">
                        <div className="px-5 border-r border-gray-200 dark:border-white/10 text-center">
                            <p className="text-xs text-text-secondary dark:text-blue-200 uppercase tracking-wide mb-1">Mortgage Amount</p>
                            <p className="font-bold text-base text-text-primary dark:text-white whitespace-nowrap">{formatCompactAED(results.mortgageAmount)}</p>
                        </div>
                        <div className="px-5 border-r border-gray-200 dark:border-white/10 text-center">
                            <p className="text-xs text-text-secondary dark:text-blue-200 uppercase tracking-wide mb-1">Mortgage EMI</p>
                            <p className="font-bold text-base text-text-primary dark:text-white whitespace-nowrap">{formatAED(results.mortgageEMI)}</p>
                        </div>
                        <div className="px-5 border-r border-gray-200 dark:border-white/10 text-center">
                            <p className="text-xs text-text-secondary dark:text-blue-200 uppercase tracking-wide mb-1">Personal Loan</p>
                            <p className="font-bold text-base text-text-primary dark:text-white whitespace-nowrap">{formatAED(results.personalLoanAmount)}</p>
                        </div>
                        <div className="px-5 border-r border-gray-200 dark:border-white/10 text-center">
                            <p className="text-xs text-text-secondary dark:text-blue-200 uppercase tracking-wide mb-1">Personal Loan EMI</p>
                            <p className="font-bold text-base text-text-primary dark:text-white whitespace-nowrap">{formatAED(results.personalLoanEMI)}</p>
                        </div>
                        <div className="px-5 text-center">
                            <p className="text-xs text-orange-500 dark:text-orange-300 uppercase tracking-wide mb-1 font-semibold">Deposit Needed</p>
                            <p className="font-bold text-base text-orange-600 dark:text-orange-400 whitespace-nowrap">{formatCompactAED(results.depositNeeded)}</p>
                        </div>
                    </div>
                </div>
            </div>






        </div>
    );
};

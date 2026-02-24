import React from 'react';
import { Icon } from '@iconify/react';
import { formatAED } from '@/lib/utils';
import type { MortgageResult } from '@/models/types/mortgage';

interface FeesIllustrationProps {
    results: MortgageResult;
}

export const FeesIllustration: React.FC<FeesIllustrationProps> = ({ results }) => {
    return (
        <div>
            <div className="flex items-center gap-2 my-6">
                <h3 className="text-2xl font-bold text-text-primary">Fees Illustration</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bank Fees Card */}
                <div className="bg-background-white rounded-2xl p-6 shadow-lg border border-border-color relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Icon icon="solar:bank-note-linear" className="w-24 h-24 text-primary" />
                    </div>
                    <div className="flex items-center gap-3 mb-6 relative">
                        <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-white">
                            <Icon icon="ant-design:bank-outlined" className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-lg text-text-primary">Bank Fees</h4>
                    </div>
                    <div className="space-y-3 relative">
                        <div className="flex justify-between items-center">
                            <span className="text-text-secondary text-sm font-medium">Processing Fee (0.50%)</span>
                            <span className="text-text-primary font-semibold text-sm">{formatAED(results.processingFee)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-text-secondary text-sm font-medium">Valuation Fee</span>
                            <span className="text-text-primary font-semibold text-sm">{formatAED(results.valuationFee)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-text-secondary text-sm font-medium">Life Insurance (0.160%)</span>
                            <span className="text-text-primary font-semibold text-sm">{formatAED(results.lifeInsurance)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-text-secondary text-sm font-medium">Property Insurance (0.070%)</span>
                            <span className="text-text-primary font-semibold text-sm">{formatAED(results.propertyInsurance)}</span>
                        </div>
                        <div className="pt-3 mt-2 border-t border-border-color border-dashed flex justify-between items-center">
                            <span className="font-bold text-text-primary">Total Bank Fees</span>
                            <span className="font-bold text-text-primary">{formatAED(results.totalBankFees)}</span>
                        </div>
                    </div>
                </div>

                {/* Property Transfer Fees Card */}
                <div className="bg-background-white rounded-2xl p-6 shadow-lg border border-border-color relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Icon icon="solar:document-text-linear" className="w-24 h-24 text-primary" />
                    </div>
                    <div className="flex items-center gap-3 mb-6 relative">
                        <div className="p-2.5 bg-purple-50 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-white">
                            <Icon icon="solar:document-text-linear" className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-lg text-text-primary">Transfer Fees</h4>
                    </div>
                    <div className="space-y-3 relative">
                        <div className="flex justify-between items-center">
                            <span className="text-text-secondary text-sm font-medium">DLD Fees (4%)</span>
                            <span className="text-text-primary font-semibold text-sm">{formatAED(results.dldFees)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-text-secondary text-sm font-medium">Transfer Fee</span>
                            <span className="text-text-primary font-semibold text-sm">{formatAED(results.transferFee)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-text-secondary text-sm font-medium">Title Deed Fee</span>
                            <span className="text-text-primary font-semibold text-sm">{formatAED(results.titleDeedFee)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-text-secondary text-sm font-medium">Mortgage Reg Fee (0.25%)</span>
                            <span className="text-text-primary font-semibold text-sm">{formatAED(results.mortgageRegFee)}</span>
                        </div>
                        <div className="pt-3 mt-2 border-t border-border-color border-dashed flex justify-between items-center">
                            <span className="font-bold text-text-primary">Total Transfer Fees</span>
                            <span className="font-bold text-text-primary">{formatAED(results.totalTransferFees)}</span>
                        </div>
                    </div>
                </div>

                {/* Real Estate Fees Card */}
                <div className="bg-background-white flex flex-col justify-between rounded-2xl p-6 shadow-lg border border-border-color relative overflow-hidden group">
                    <div className=" relative flex justify-between flex-col">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Icon icon="solar:home-linear" className="w-24 h-24 text-primary" />
                        </div>
                        <div className="flex items-center gap-3 mb-6 relative">
                            <div className="p-2.5 bg-orange-50 dark:bg-orange-900/30 rounded-xl text-orange-600 dark:text-white">
                                <Icon icon="solar:home-linear" className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-lg text-text-primary">Real Estate Fees</h4>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-text-secondary text-sm font-medium">Commission (2%)</span>
                                <span className="text-text-primary font-semibold text-sm">{formatAED(results.commission)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-text-secondary text-sm font-medium">Maintenance Advance</span>
                                <span className="text-text-primary font-semibold text-sm">{formatAED(results.maintenanceAdvance)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-text-secondary text-sm font-medium">NOC, HASANTUK, Other</span>
                                <span className="text-text-primary font-semibold text-sm">{formatAED(results.nocFee)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-text-secondary text-sm font-medium">Conveyancing</span>
                                <span className="text-text-primary font-semibold text-sm">{formatAED(results.conveyancingFee)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="pt-3 mt-2 border-t border-border-color border-dashed flex justify-between items-center">
                        <span className="font-bold text-text-primary">Total Real Estate Fees</span>
                        <span className="font-bold text-text-primary">{formatAED(results.totalRealEstateFees)}</span>
                    </div>
                </div>

                {/* Grand Totals Card */}
                <div className="bg-background-white rounded-2xl p-6 shadow-lg border border-border-color relative overflow-hidden group dark:to-primary/10">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Icon icon="solar:wallet-money-linear" className="w-24 h-24 text-primary" />
                    </div>
                    <div className="flex items-center gap-3 mb-6 relative">
                        <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-white">
                            <Icon icon="solar:wallet-money-linear" className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-lg text-text-primary">Cash Required</h4>
                    </div>
                    <div className="space-y-3 relative">
                        <div className="flex justify-between items-center">
                            <span className="text-text-secondary text-sm font-medium">Grand Total Fees</span>
                            <span className="text-text-primary font-semibold text-sm">{formatAED(results.totalFees)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-text-secondary text-sm font-medium">Deposit Needed</span>
                            <span className="text-text-primary font-semibold text-sm">{formatAED(results.depositNeeded)}</span>
                        </div>
                        <div className="pt-3 mt-2 border-t border-border-color border-dashed flex justify-between items-center">
                            <span className="font-bold text-text-primary">Total Required</span>
                            <span className="font-bold text-text-primary">{formatAED(results.totalFees + results.depositNeeded)}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-lg border border-gray-200 dark:border-white/10 dark:bg-background-secondary/30">
                            <span className="text-text-secondary text-sm font-medium">Less: Personal Loan</span>
                            <span className="text-text-primary font-semibold text-sm">- {formatAED(results.personalLoanUsed)}</span>
                        </div>
                        <div className="pt-3 mt-2 border-t border-border-color border-dashed flex justify-between items-center">
                            <span className="font-bold text-text-primary">Final Cash Required</span>
                            <span className="font-bold text-text-primary">{formatAED(results.totalCashRequired - results.personalLoanUsed - (results.cashBalance < 0 ? 0 : 0))}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

import React from 'react';
import { Icon } from '@iconify/react';
import { Input } from '@/views/ui/Input';
import { Slider } from '@/views/ui/Slider';
import type { MortgageInputs } from '@/models/types/mortgage';

interface LoanParametersProps {
    inputs: MortgageInputs;
    onInputChange: (key: keyof MortgageInputs, value: number | string) => void;
    validation?: { isValid: boolean; errors: string[] };
    className?: string;
}

export const LoanParameters: React.FC<LoanParametersProps> = ({
    inputs,
    onInputChange,
    validation,
    className,
}) => {
    return (
        <div className={`bg-background-white rounded-2xl shadow-lg border border-border-color flex flex-col overflow-hidden ${className}`}>
            <div className="flex items-center gap-2 p-5 pb-2 shrink-0">
                <h2 className="text-2xl font-bold text-text-primary">
                    Loan Parameters
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-4 pt-0 pb-10 space-y-3">
                {/* Purchase Price & Description */}
                <div className="space-y-3">
                    <Input
                        label="Purchase Price (AED)"
                        icon={<Icon icon="solar:tag-price-linear" className="w-5 h-5" />}
                        type="number"
                        value={inputs.purchasePrice || ' '}
                        onChange={(e) => onInputChange('purchasePrice', Number(e.target.value))}
                        min={0}
                        step={1000}
                        className="bg-background-light border-border-color text-text-primary pl-12 h-10 ring-0 focus:ring-0"
                    />

                    <div>
                        <textarea
                            className="w-full px-3 py-2 bg-background-light border border-border-color rounded-lg text-sm text-text-primary focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-all resize-none placeholder:text-text-muted"
                            rows={6}
                            placeholder="Property Description..."
                            value={inputs.propertyDesc || ''}
                            onChange={(e) => onInputChange('propertyDesc', e.target.value)}
                        />
                    </div>
                </div>

                {/* Down Payment */}
                <Slider
                    label="Down Payment"
                    value={inputs.downPaymentPercent}
                    min={0}
                    max={80}
                    step={1}
                    onChange={(value) => onInputChange('downPaymentPercent', value)}
                />

                {/* Mortgage Rate */}
                <Slider
                    label="Mortgage Rate"
                    value={inputs.interestRate}
                    min={0}
                    max={15}
                    step={0.01}
                    onChange={(value) => onInputChange('interestRate', value)}
                />

                {/* Mortgage Term & Rate Type Side by Side */}
                <div className="grid grid-cols-2 gap-3">
                    <Input
                        label="Term (Yrs)"
                        icon={<Icon icon="solar:calendar-date-linear" className="w-4 h-4" />}
                        type="number"
                        value={inputs.tenure || ''}
                        onChange={(e) => onInputChange('tenure', Number(e.target.value))}
                        min={1}
                        max={30}
                        className="bg-background-light border-border-color text-text-primary pl-10 h-10"
                    />

                    <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1">
                            Rate Type
                        </label>
                        <select
                            className="w-full px-2 py-2.5 bg-background-light border border-border-color rounded-lg text-xs text-text-primary focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-all h-[42px]"
                            value={inputs.rateType}
                            onChange={(e) => onInputChange('rateType', e.target.value)}
                        >
                            <option>Eibor-linked</option>
                            <option>Fixed (1 Yr)</option>
                            <option>Fixed (3 Yrs)</option>
                            <option>Fixed (5 Yrs)</option>
                        </select>
                    </div>
                </div>

                {/* Valuation Fee */}
                <div>
                    <Input
                        label="Valuation (AED)"
                        icon={<Icon icon="solar:bill-list-linear" className="w-5 h-5" />}
                        type="number"
                        value={inputs.valuationFeeBase || ''}
                        onChange={(e) => onInputChange('valuationFeeBase', Number(e.target.value))}
                        min={0}
                        step={100}
                        className="bg-background-light border-border-color text-text-primary pl-12 h-10"
                    />
                </div>

                {/* Personal Loan Section */}
                <div className="pt-2 border-t border-border-color">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                            Personal Loan
                        </h3>
                    </div>

                    <div className="space-y-2">
                        <Slider
                            label="PL LTV (%)"
                            value={inputs.plLtv}
                            min={0}
                            max={50}
                            step={1}
                            onChange={(value) => onInputChange('plLtv', value)}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="PL Term (Yrs)"
                                icon={<Icon icon="solar:calendar-date-linear" className="w-4 h-4" />}
                                type="number"
                                value={inputs.plTerm || ''}
                                onChange={(e) => onInputChange('plTerm', Number(e.target.value))}
                                min={1}
                                max={10}
                                className="bg-background-light border-border-color text-text-primary pl-9 h-9"
                            />
                            <Input
                                label="PL Rate (%)"
                                icon={<Icon icon="solar:percent-linear" className="w-4 h-4" />}
                                type="number"
                                value={inputs.plRate || ''}
                                onChange={(e) => onInputChange('plRate', Number(e.target.value))}
                                step={0.01}
                                className="bg-background-light border-border-color text-text-primary pl-9 h-9"
                            />
                        </div>
                    </div>
                </div>

                {validation && !validation.isValid && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                        <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">
                            Errors:
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                            {validation.errors.map((error, index) => (
                                <li key={index} className="text-sm text-red-600 dark:text-red-300">
                                    {error}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

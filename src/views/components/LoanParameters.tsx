import React from 'react';
import { Icon } from '@iconify/react';
import { Input } from '@/views/ui/Input';
import { Slider } from '@/views/ui/Slider';
import type { MortgageInputs } from '@/models/types/mortgage';

interface LoanParametersProps {
    inputs: MortgageInputs;
    onInputChange: (key: keyof MortgageInputs, value: number | string) => void;
    validation?: { isValid: boolean; errors: string[] };
}

export const LoanParameters: React.FC<LoanParametersProps> = ({
    inputs,
    onInputChange,
    validation,
}) => {
    return (
        <div className="bg-background-white rounded-2xl p-6 shadow-lg border border-border-color">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                <h2 className="text-2xl font-bold text-text-primary">
                    Loan Parameters
                </h2>
            </div>

            <div className="space-y-5">
                {/* Purchase Price */}
                <Input
                    label="Purchase Price (AED)"
                    icon={<Icon icon="solar:tag-price-linear" className="w-5 h-5" />}
                    type="number"
                    value={inputs.purchasePrice || ' '}
                    onChange={(e) => onInputChange('purchasePrice', Number(e.target.value))}
                    min={0}
                    step={1000}
                    className="bg-background-light border-border-color text-text-primary pl-12"
                />

                {/* Property Description */}
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                        Property Description
                    </label>
                    <textarea
                        className="w-full px-3 py-2 bg-background-light border border-border-color rounded-lg text-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none placeholder:text-text-muted"
                        rows={9}
                        placeholder="Enter property details..."
                        value={inputs.propertyDesc || ''}
                        onChange={(e) => onInputChange('propertyDesc', e.target.value)}
                    />
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

                {/* Mortgage Term & Rate */}
                <div className="grid grid-cols-1 gap-4">
                    <Input
                        label="Mortgage Term (Years)"
                        icon={<Icon icon="solar:calendar-date-linear" className="w-5 h-5" />}
                        type="number"
                        value={inputs.tenure || ''}
                        onChange={(e) => onInputChange('tenure', Number(e.target.value))}
                        min={1}
                        max={30}
                        className="bg-background-light border-border-color text-text-primary pl-12"
                    />
                </div>

                {/* Rate Type */}
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                        Rate Type
                    </label>
                    <select
                        className="w-full px-3 py-2 bg-background-light border border-border-color rounded-lg text-sm text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        value={inputs.rateType}
                        onChange={(e) => onInputChange('rateType', e.target.value)}
                    >
                        <option>Eibor-linked Floating</option>
                        <option>Fixed Rate (1 Year)</option>
                        <option>Fixed Rate (3 Years)</option>
                        <option>Fixed Rate (5 Years)</option>
                    </select>
                </div>

                {/* Fees Section Removed as per request to move to illustration */}

                {/* Personal Loan Section */}
                <div className="pt-4 border-t border-border-color">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                        Personal Loan (Assist)
                    </h3>

                    <div className="space-y-4">
                        <Slider
                            label="PL LTV (%)"
                            value={inputs.plLtv}
                            min={0}
                            max={50}
                            step={1}
                            onChange={(value) => onInputChange('plLtv', value)}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="PL Term (Yrs)"
                                icon={<Icon icon="solar:calendar-date-linear" className="w-5 h-5" />}
                                type="number"
                                value={inputs.plTerm || ''}
                                onChange={(e) => onInputChange('plTerm', Number(e.target.value))}
                                min={1}
                                max={10}
                                className="bg-background-light border-border-color text-text-primary pl-12"
                            />
                            <Input
                                label="PL Rate (%)"
                                icon={<Icon icon="solar:percent-linear" className="w-5 h-5" />}
                                type="number"
                                value={inputs.plRate || ''}
                                onChange={(e) => onInputChange('plRate', Number(e.target.value))}
                                step={0.01}
                                className="bg-background-light border-border-color text-text-primary pl-12"
                            />
                        </div>
                    </div>
                </div>

                {validation && !validation.isValid && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                        <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">
                            Validation Errors:
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

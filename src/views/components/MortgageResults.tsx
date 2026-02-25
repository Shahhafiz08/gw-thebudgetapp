import React, { useRef, useState, useCallback } from 'react';
import type { MortgageCalculation } from '@/models/types/mortgage';
import { formatAED, formatCompactAED } from '@/lib/utils';
import { Icon } from '@iconify/react';

interface MortgageResultsProps {
    results: MortgageCalculation['results'];
}

// Width of one stat card step (px) when clicking the arrows
const SCROLL_STEP = 140;

export const MortgageResults: React.FC<MortgageResultsProps> = ({
    results,
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateArrows = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }, []);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' });
        setTimeout(updateArrows, 300);
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' });
        setTimeout(updateArrows, 300);
    };

    return (
        <div id="desktop-results" className="space-y-6">

            {/* Top Section: Total Monthly EMI (Full Width) */}
            <div className="relative overflow-hidden rounded-2xl p-8 bg-linear-to-br from-primary to-blue-700 dark:from-primary dark:to-blue-900 text-white shadow-xl border border-transparent">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16"></div>

                <div className="relative flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="mb-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-blue-200 mb-1">
                            Total Loan Amount
                        </p>
                        <p className="text-xl lg:text-3xl font-bold text-white">
                            {formatCompactAED(
                                results.mortgageAmount + results.personalLoanAmount
                            )}
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                                Total Monthly EMI
                            </p>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-xl lg:text-3xl font-bold mb-2 text-white">
                                {formatAED(results.monthlyEMI)}
                            </p>
                            <span className="text-blue-200 text-sm font-medium">/month</span>
                        </div>
                    </div>

                    {/* Stats row with slider arrows */}
                    <div className="flex items-center gap-2 min-w-0">

                        {/* Left arrow */}
                        <button
                            onClick={scrollLeft}
                            disabled={!canScrollLeft}
                            aria-label="Scroll left"
                            className={[
                                'flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200',
                                'bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/10',
                                'hover:bg-white/90 dark:hover:bg-white/20 active:scale-90',
                                canScrollLeft
                                    ? 'opacity-100 cursor-pointer shadow-sm'
                                    : 'opacity-30 cursor-not-allowed',
                            ].join(' ')}
                        >
                            <Icon icon="mdi:chevron-left" className="w-4 h-4 text-text-primary dark:text-white" />
                        </button>

                        {/* Scrollable cards */}
                        <div
                            ref={scrollRef}
                            onScroll={updateArrows}
                            className="overflow-x-auto min-w-0 rounded-xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        >
                            <div className="flex items-center gap-0 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/20 min-w-max">
                                <div className="px-5 border-r border-white/20 text-center">
                                    <p className="text-xs text-blue-200 uppercase tracking-wide mb-1">Mortgage Amount</p>
                                    <p className="font-bold text-base text-white whitespace-nowrap">{formatCompactAED(results.mortgageAmount)}</p>
                                </div>
                                <div className="px-5 border-r border-white/20 text-center">
                                    <p className="text-xs text-blue-200 uppercase tracking-wide mb-1">Mortgage EMI</p>
                                    <p className="font-bold text-base text-white whitespace-nowrap">{formatAED(results.mortgageEMI)}</p>
                                </div>
                                <div className="px-5 border-r border-white/20 text-center">
                                    <p className="text-xs text-blue-200 uppercase tracking-wide mb-1">Personal Loan</p>
                                    <p className="font-bold text-base text-white whitespace-nowrap">{formatAED(results.personalLoanAmount)}</p>
                                </div>
                                <div className="px-5 border-r border-white/20 text-center">
                                    <p className="text-xs text-blue-200 uppercase tracking-wide mb-1">Personal Loan EMI</p>
                                    <p className="font-bold text-base text-white whitespace-nowrap">{formatAED(results.personalLoanEMI)}</p>
                                </div>
                                <div className="px-5 text-center">
                                    <p className="text-xs text-orange-400 uppercase tracking-wide mb-1 font-semibold">Deposit Needed</p>
                                    <p className="font-bold text-base text-orange-400 whitespace-nowrap">{formatCompactAED(results.depositNeeded)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right arrow */}
                        <button
                            onClick={scrollRight}
                            disabled={!canScrollRight}
                            aria-label="Scroll right"
                            className={[
                                'flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200',
                                'bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/10',
                                'hover:bg-white/90 dark:hover:bg-white/20 active:scale-90',
                                canScrollRight
                                    ? 'opacity-100 cursor-pointer shadow-sm'
                                    : 'opacity-30 cursor-not-allowed',
                            ].join(' ')}
                        >
                            <Icon icon="mdi:chevron-right" className="w-4 h-4 text-text-primary dark:text-white" />
                        </button>

                    </div>
                </div>




            </div>
        </div>
    );
};

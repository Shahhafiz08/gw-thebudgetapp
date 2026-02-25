import React, { useRef, useState, useCallback } from 'react';
import type { MortgageCalculation } from '@/models/types/mortgage';
import { formatAED, formatCompactAED } from '@/lib/utils';
import { Icon } from '@iconify/react';

interface MortgageResultsProps {
    results: MortgageCalculation['results'];
}

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

    // Stat cards data — single source of truth for both mobile + desktop
    const stats = [
        { label: 'Mortgage Amount', value: formatCompactAED(results.mortgageAmount), orange: false },
        { label: 'Mortgage EMI', value: formatAED(results.mortgageEMI), orange: false },
        { label: 'Personal Loan', value: formatAED(results.personalLoanAmount), orange: false },
        { label: 'Personal Loan EMI', value: formatAED(results.personalLoanEMI), orange: false },
        { label: 'Deposit Needed', value: formatCompactAED(results.depositNeeded), orange: true },
    ];

    return (
        <div id="desktop-results" className="space-y-6">

            {/* Top Card */}
            <div className="relative rounded-2xl bg-linear-to-br from-primary to-blue-700 dark:from-primary dark:to-blue-900 text-white shadow-xl border border-transparent overflow-hidden">

                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16 pointer-events-none" />

                {/* ── Main info row ─────────────────────────────────── */}
                <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 px-8 pt-8 pb-4 md:pb-8">

                    {/* Total Loan Amount */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-blue-200 mb-1">
                            Total Loan Amount
                        </p>
                        <p className="text-xl lg:text-3xl font-bold text-white">
                            {formatCompactAED(results.mortgageAmount + results.personalLoanAmount)}
                        </p>
                    </div>

                    {/* Total Monthly EMI */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                            Total Monthly EMI
                        </p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-xl lg:text-3xl font-bold text-white">
                                {formatAED(results.monthlyEMI)}
                            </p>
                            <span className="text-blue-200 text-sm font-medium">/month</span>
                        </div>
                    </div>

                    {/* ── Desktop stats strip (with arrows) — hidden on mobile ── */}
                    <div className="hidden md:flex items-center gap-2 min-w-0">
                        {/* Left arrow */}
                        <button
                            onClick={scrollLeft}
                            disabled={!canScrollLeft}
                            aria-label="Scroll left"
                            className={[
                                'flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200',
                                'bg-white/20 backdrop-blur-sm border border-white/30',
                                'hover:bg-white/30 active:scale-90',
                                canScrollLeft ? 'opacity-100 cursor-pointer shadow-sm' : 'opacity-30 cursor-not-allowed',
                            ].join(' ')}
                        >
                            <Icon icon="mdi:chevron-left" className="w-4 h-4 text-white" />
                        </button>

                        {/* Scroll container */}
                        <div
                            ref={scrollRef}
                            onScroll={updateArrows}
                            className="overflow-x-auto min-w-0 rounded-xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        >
                            <div className="flex items-stretch bg-white/5 rounded-xl border border-white/20" style={{ minWidth: 'max-content' }}>
                                {stats.map((s, i) => (
                                    <div
                                        key={s.label}
                                        className={`px-5 py-4 text-center flex flex-col justify-center ${i < stats.length - 1 ? 'border-r border-white/20' : ''}`}
                                    >
                                        <p className={`text-xs uppercase tracking-wide mb-1 font-semibold ${s.orange ? 'text-orange-400' : 'text-blue-200'}`}>{s.label}</p>
                                        <p className={`font-bold text-base whitespace-nowrap ${s.orange ? 'text-orange-400' : 'text-white'}`}>{s.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right arrow */}
                        <button
                            onClick={scrollRight}
                            disabled={!canScrollRight}
                            aria-label="Scroll right"
                            className={[
                                'flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200',
                                'bg-white/20 backdrop-blur-sm border border-white/30',
                                'hover:bg-white/30 active:scale-90',
                                canScrollRight ? 'opacity-100 cursor-pointer shadow-sm' : 'opacity-30 cursor-not-allowed',
                            ].join(' ')}
                        >
                            <Icon icon="mdi:chevron-right" className="w-4 h-4 text-white" />
                        </button>
                    </div>

                </div>

                {/* ── Mobile swipe strip — full-bleed, below card padding ── */}
                {/* Breaks out of card padding with -mx so overflow-hidden doesn't block scroll */}
                <div className="md:hidden border-t border-white/10">
                    <div
                        className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        style={{
                            scrollSnapType: 'x mandatory',
                            WebkitOverflowScrolling: 'touch',
                            touchAction: 'pan-x',
                        }}
                    >
                        <div className="flex" style={{ width: 'max-content' }}>
                            {stats.map((s, i) => (
                                <div
                                    key={s.label}
                                    className={`flex-shrink-0 px-6 py-4 text-center flex flex-col justify-center ${i < stats.length - 1 ? 'border-r border-white/20' : ''}`}
                                    style={{ scrollSnapAlign: 'start', width: 'calc(100vw - 4rem)' }}
                                >
                                    <p className={`text-xs uppercase tracking-wide mb-1 font-semibold ${s.orange ? 'text-orange-400' : 'text-blue-200'}`}>{s.label}</p>
                                    <p className={`font-bold text-lg whitespace-nowrap ${s.orange ? 'text-orange-400' : 'text-white'}`}>{s.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Swipe hint dots */}
                    <div className="flex justify-center gap-1 pb-3 pt-1">
                        {stats.map((s) => (
                            <span key={s.label} className="w-1.5 h-1.5 rounded-full bg-white/30" />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

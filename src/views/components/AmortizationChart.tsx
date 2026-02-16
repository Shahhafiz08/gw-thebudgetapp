import React from 'react';
import { Icon } from '@iconify/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { MortgageCalculation } from '@/models/types/mortgage';
import { formatAED, formatCompactAED } from '@/lib/utils';

interface AmortizationChartProps {
    data: MortgageCalculation['chartData'];
}

export const AmortizationChart: React.FC<AmortizationChartProps> = ({ data }) => {
    return (
        <div className="bg-background-white border border-border-color rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon icon="solar:chart-2-linear" className="w-6 h-6 text-primary dark:text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">
                    Mortgage Amortization Schedule
                </h3>
            </div>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 12, fill: 'var(--text-secondary)', fontWeight: 600 }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            tickFormatter={(value) => formatCompactAED(value)}
                            tick={{ fontSize: 12, fill: 'var(--text-secondary)', fontWeight: 600 }}
                            tickLine={false}
                            axisLine={false}
                            width={70}
                        />
                        <Tooltip
                            formatter={(value: number | undefined) => value !== undefined ? [formatAED(value), ''] : ['N/A', '']}
                            contentStyle={{
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'var(--background-white)',
                                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                                color: 'var(--text-primary)'
                            }}
                        />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="principal"
                            name="Principal Paid"
                            stroke="var(--primary)"
                            fillOpacity={1}
                            fill="url(#colorPrincipal)"
                            strokeWidth={3}
                        />
                        <Area
                            type="monotone"
                            dataKey="interest"
                            name="Interest Paid"
                            stroke="#ef4444"
                            fillOpacity={1}
                            fill="url(#colorInterest)"
                            strokeWidth={3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

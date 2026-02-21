import React, { useState } from 'react';
import { SubscriptionDetails } from '../services/analyticsApi';

interface SubscriptionManagementProps {
    subscriptions: SubscriptionDetails[];
    loading: boolean;
}

const DUMMY_SUBS: SubscriptionDetails[] = [
    {
        id: 's1',
        userId: '2',
        planName: 'Premium Monthly',
        status: 'active',
        startDate: new Date(Date.now() - 86400000 * 5).toISOString(),
        endDate: new Date(Date.now() + 86400000 * 25).toISOString(),
        amount: '29.99',
        currency: 'USD',
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        User: { fullName: 'Michael Chen', email: 'm.chen@gmail.com' }
    },
    {
        id: 's2',
        userId: '4',
        planName: 'Basic Yearly',
        status: 'expired',
        startDate: new Date(Date.now() - 86400000 * 365).toISOString(),
        endDate: new Date(Date.now() - 86400000 * 1).toISOString(),
        amount: '199.99',
        currency: 'USD',
        created_at: new Date(Date.now() - 86400000 * 365).toISOString(),
        User: { fullName: 'Emma Davis', email: 'emma.d@yahoo.com' }
    },
    {
        id: 's3',
        userId: '10',
        planName: 'Premium Monthly',
        status: 'pending',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 86400000 * 30).toISOString(),
        amount: '29.99',
        currency: 'USD',
        created_at: new Date().toISOString(),
        User: { fullName: 'James Wilson', email: 'j.wilson@outlook.com' }
    }
];

export const SubscriptionManagement: React.FC<SubscriptionManagementProps> = ({ subscriptions, loading }) => {
    const [filter, setFilter] = useState('all');
release/v1.0.0
    const displaySubs = (subscriptions && subscriptions.length > 0) ? subscriptions : DUMMY_SUBS;

    const displaySubs = subscriptions && subscriptions.length > 0 ? subscriptions : DUMMY_SUBS;
 main

    const filteredSubscriptions = displaySubs.filter(sub =>
        filter === 'all' ? true : sub.status === filter
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl font-semibold text-calm-blue">Subscription Management</h2>
                <select
                    className="px-4 py-2 border border-calm-lightBlue/30 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-calm-blue bg-white"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="expired">Expired</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <div className="overflow-hidden rounded-2xl border border-calm-lightBlue/20 bg-white/60 backdrop-blur-sm shadow-sm">
                <table className="min-w-full divide-y divide-calm-lightBlue/10">
                    <thead className="bg-calm-lightBlue/5">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-calm-blue uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-calm-blue uppercase tracking-wider">Plan</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-calm-blue uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-calm-blue uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-calm-blue uppercase tracking-wider">Period</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-calm-lightBlue/10">
                        {loading && filteredSubscriptions.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">Loading subscriptions...</td></tr>
                        ) : filteredSubscriptions.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">No subscriptions found</td></tr>
                        ) : (
                            filteredSubscriptions.map((sub) => (
                                <tr key={sub.id} className="hover:bg-calm-lightBlue/5 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-calm-text">{sub.User?.fullName || 'Unknown User'}</div>
                                        <div className="text-xs text-gray-500">{sub.User?.email || ''}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-700 font-medium">{sub.planName}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${sub.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                                            sub.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                                                'bg-rose-100 text-rose-800'
                                            }`}>
                                            {sub.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-calm-text font-bold">
                                        {sub.amount} {sub.currency}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                        <div>From: {new Date(sub.startDate).toLocaleDateString()}</div>
                                        <div>To: {new Date(sub.endDate).toLocaleDateString()}</div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

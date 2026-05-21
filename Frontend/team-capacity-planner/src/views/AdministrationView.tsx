import { useState } from 'react';
import { cn } from '@/src/lib/utils';
import { FileText, Settings } from 'lucide-react';

export const AdministrationView = () => {
    const [activeTab, setActiveTab] = useState('Teams');
    const tabs = ['Users', 'Teams', 'Roles & Permissions', 'Settings', 'Integrations', 'Audit Logs'];
    const teams = [
        { name: 'Platform', dept: 'Engineering', lead: 'John Doe', capacity: '10.0' },
        { name: 'Mobile', dept: 'Engineering', lead: 'Sarah Lee', capacity: '8.0' },
        { name: 'Data', dept: 'Engineering', lead: 'Michael Chen', capacity: '8.0' },
        { name: 'AI/ML', dept: 'Engineering', lead: 'Priya Shah', capacity: '8.0' },
        { name: 'Security', dept: 'Engineering', lead: 'David Kim', capacity: '6.0' },
        { name: 'DevOps', dept: 'Engineering', lead: 'Alex Turner', capacity: '6.0' },
        { name: 'UX/UI', dept: 'Product', lead: 'Emily Davis', capacity: '5.0' },
    ];

    return (
        <div className="flex flex-col h-full animate-in fade-in duration-500">
            <div className="flex gap-8 mb-8 text-sm font-medium border-b border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-hide">
                {tabs.map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "pb-4 border-b-2 transition-colors px-2 focus:outline-none",
                            activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 font-normal"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">{activeTab}</h2>
                {activeTab === 'Teams' && (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2 shadow-sm transition-all active:scale-95">
                        <span className="text-lg">+</span> Add Team
                    </button>
                )}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
                <table className="w-full text-sm min-w-[600px]">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left font-semibold text-gray-600">Team Name</th>
                            <th className="px-6 py-4 text-left font-semibold text-gray-600">Department</th>
                            <th className="px-6 py-4 text-left font-semibold text-gray-600">Team Lead</th>
                            <th className="px-6 py-4 text-center font-semibold text-gray-600">Capacity (FTE)</th>
                            <th className="px-6 py-4 text-right font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {teams.map((team, i) => (
                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{team.name}</td>
                                <td className="px-6 py-4 text-gray-600">{team.dept}</td>
                                <td className="px-6 py-4 text-gray-600">{team.lead}</td>
                                <td className="px-6 py-4 text-center font-mono text-gray-700">{team.capacity}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-3">
                                        <button className="text-gray-400 hover:text-blue-600 transition-colors">
                                            <FileText className="w-4 h-4" />
                                        </button>
                                        <button className="text-gray-400 hover:text-red-600 transition-colors">
                                            <Settings className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

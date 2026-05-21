import { useState } from 'react';
import { cn } from '@/src/lib/utils';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const ReportsView = () => {
  const [activeTab, setActiveTab] = useState('prebuilt');
  const [selectedReport, setSelectedReport] = useState('Team Utilization Report');

  const reports = [
    { title: 'Quarterly Roadmap', desc: 'High level roadmap of all initiatives by quarter.' },
    { title: 'Team Utilization Report', desc: 'Detailed team allocation and utilization.' },
    { title: 'Capacity Risk Summary', desc: 'Overview of risks and overallocated teams.' },
    { title: 'Initiative Status Report', desc: 'Status of initiatives and forecast confidence.' },
    { title: 'Scenario Comparison Report', desc: 'Compare baseline with selected scenario.' },
  ];

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Reports</h1>
      </header>

      <div className="flex gap-8 mb-6 text-sm font-medium border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('prebuilt')}
          className={cn("pb-2 border-b-2 transition-colors focus:outline-none", activeTab === 'prebuilt' ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500")}
        >
          Prebuilt Reports
        </button>
        <button 
          onClick={() => setActiveTab('custom')}
          className={cn("pb-2 border-b-2 transition-colors focus:outline-none", activeTab === 'custom' ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500")}
        >
          Custom Reports
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6 flex-1">
        {/* Reports List */}
        <div className="col-span-5 space-y-4">
          {reports.map((report) => (
            <div 
              key={report.title} 
              onClick={() => setSelectedReport(report.title)}
              className={cn(
                "p-4 rounded-xl border transition-all cursor-pointer group",
                selectedReport === report.title 
                  ? "bg-blue-50/50 border-blue-200 shadow-sm" 
                  : "bg-white border-gray-100 hover:border-gray-200"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors uppercase tracking-tight">{report.title}</h4>
                <div className="flex gap-2">
                   <button className="text-[10px] font-bold text-blue-600 border border-blue-200 px-2.5 py-1 rounded hover:bg-blue-50 transition-colors">View</button>
                   <button className="text-[10px] font-bold text-blue-600 border border-blue-200 px-2.5 py-1 rounded hover:bg-blue-50 transition-colors">PDF</button>
                   <button className={cn(
                     "text-[10px] font-bold px-2.5 py-1 rounded border transition-colors",
                     selectedReport === report.title ? "bg-blue-600 text-white border-blue-600" : "text-blue-600 border-blue-200 hover:bg-blue-50"
                   )}>Excel</button>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{report.desc}</p>
            </div>
          ))}
        </div>

        {/* Report Preview */}
        <div className="col-span-7 bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Report Preview</h3>
              <p className="text-xs font-bold text-gray-900 mt-1">{selectedReport} - Q2 2034</p>
            </div>
          </div>

          <div className="flex-1">
             <div className="overflow-hidden border border-gray-50 rounded-lg mb-6">
                <table className="w-full text-[11px]">
                  <thead className="bg-gray-50 text-gray-400 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-2.5 text-left">Team</th>
                      <th className="px-4 py-2.5 text-center">Utilization</th>
                      <th className="px-4 py-2.5 text-center">Allocated (FTE)</th>
                      <th className="px-4 py-2.5 text-center">Available (FTE)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 font-medium text-gray-700">
                    {[
                      { t: 'Platform', u: '110%', a: '11.0', v: '1.0' },
                      { t: 'Mobile', u: '95%', a: '7.6', v: '0.4' },
                      { t: 'Data', u: '130%', a: '10.4', v: '-2.4' },
                      { t: 'AI/ML', u: '105%', a: '8.4', v: '-0.4' },
                      { t: 'Security', u: '80%', a: '4.8', v: '1.2' },
                      { t: 'DevOps', u: '90%', a: '5.4', v: '0.6' },
                      { t: 'UX/UI', u: '70%', a: '3.5', v: '1.5' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2 font-semibold text-gray-900">{row.t}</td>
                        <td className="px-4 py-2 text-center tabular-nums">{row.u}</td>
                        <td className="px-4 py-2 text-center tabular-nums text-gray-500">{row.a}</td>
                        <td className={cn("px-4 py-2 text-center tabular-nums font-bold", parseFloat(row.v) < 0 ? "text-red-500" : "text-green-600")}>{row.v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>

             <div className="h-[180px] w-full pt-4 text-[10px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Platform', val: 85, fill: '#3b82f6' },
                    { name: 'Mobile', val: 65, fill: '#ef4444' },
                    { name: 'Data', val: 45, fill: '#3b82f6' },
                    { name: 'AI/ML', val: 75, fill: '#10b981' },
                    { name: 'Security', val: 90, fill: '#8b5cf6' },
                    { name: 'DevOps', val: 55, fill: '#f59e0b' },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" hide />
                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                    <Bar dataKey="val" radius={[3, 3, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

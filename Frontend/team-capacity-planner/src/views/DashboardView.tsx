import { Settings } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const DashboardView = () => (
  <div>
    <header className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Portfolio Dashboard</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Timeframe</span>
          <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold text-gray-600 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option>FY 2034</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest invisible">Period</span>
          <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold text-gray-600 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option>Quarterly</option>
          </select>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-1.5 rounded-lg text-xs font-bold text-gray-500 shadow-sm hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            Filters
          </div>
        </button>
        <div className="flex items-center gap-2 ml-2 pl-4 border-l border-gray-100">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100">
            <img src="https://avatar.iran.liara.run/public/33" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>

    <div className="grid grid-cols-5 gap-6 mb-8">
      {[
        { label: 'Active Initiatives', value: '24' },
        { label: 'Planned Initiatives', value: '16' },
        { label: 'Teams at Risk', value: '5', className: 'text-red-500' },
        { label: 'Total Allocated Capacity', value: '87%' },
        { label: 'Forecast Confidence', value: '72%', className: 'text-blue-500' },
      ].map((stat) => (
        <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{stat.label}</p>
          <p className={cn("text-3xl font-bold", stat.className)}>{stat.value}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
        <h3 className="font-semibold text-gray-900 mb-4">Capacity by Team (Next 4 Quarters)</h3>
        <div className="border border-gray-100 rounded-lg overflow-hidden flex-1">
          <table className="w-full text-[11px]">
            <thead className="bg-gray-50 uppercase text-[10px] text-gray-500 font-bold border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Team</th>
                <th className="px-4 py-3 text-center border-l border-gray-100">Q1 2034</th>
                <th className="px-4 py-3 text-center border-l border-gray-100">Q2 2034</th>
                <th className="px-4 py-3 text-center border-l border-gray-100">Q3 2034</th>
                <th className="px-4 py-3 text-center border-l border-gray-100">Q4 2034</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: 'Platform', data: ['50%', '95%', '110%', '100%'] },
                { name: 'Mobile', data: ['70%', '85%', '90%', '105%'] },
                { name: 'Data', data: ['130%', '130%', '100%', '80%'] },
                { name: 'AI/ML', data: ['60%', '70%', '85%', '70%'] },
                { name: 'Security', data: ['80%', '100%', '85%', '110%'] },
                { name: 'DevOps', data: ['70%', '85%', '65%', '55%'] },
                { name: 'UI/UX', data: ['85%', '90%', '100%', '85%'] },
              ].map(row => (
                <tr key={row.name}>
                  <td className="px-4 py-2.5 font-semibold text-gray-700">{row.name}</td>
                  {row.data.map((val, i) => {
                    const num = parseInt(val);
                    const cellColor = num > 100 ? 'bg-red-100 text-red-700' : 
                                    num >= 70 ? 'bg-green-100 text-green-700' : 
                                    'bg-emerald-50 text-emerald-700';
                    return (
                      <td key={i} className={cn("px-4 py-2.5 text-center border-l border-gray-100 font-bold", cellColor)}>{val}</td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm bg-emerald-100" />
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Underutilized ({'<'}70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm bg-green-100" />
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Optimal (70-100%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm bg-red-100" />
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Overallocated ({'>'}100%)</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Initiative Roadmap (Timeline)</h3>
        <div className="relative">
          <div className="flex mb-4 ml-[35%] border-b border-gray-100 pb-2">
            {['Q1 2034', 'Q2 2034', 'Q3 2034', 'Q4 2034'].map(q => (
              <div key={q} className="flex-1 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">{q}</div>
            ))}
          </div>
          
          <div className="space-y-4">
            {[
              { name: 'Customer Portal Revamp', start: 0, width: 35, color: 'bg-blue-500' },
              { name: 'Data Platform Modernization', start: 10, width: 45, color: 'bg-indigo-500' },
              { name: 'AI Analytics Platform', start: 15, width: 60, color: 'bg-purple-500' },
              { name: 'Mobile App Expansion', start: 40, width: 50, color: 'bg-emerald-500' },
              { name: 'Security Enhancement', start: 20, width: 30, color: 'bg-orange-400' },
              { name: 'Operational Excellence', start: 30, width: 40, color: 'bg-red-400' },
              { name: 'New Market Expansion', start: 60, width: 35, color: 'bg-red-500' },
            ].map((init) => (
              <div key={init.name} className="flex items-center gap-4 group">
                <div className="w-[35%] text-[11px] font-medium text-gray-600 truncate group-hover:text-blue-600 transition-colors">{init.name}</div>
                <div className="flex-1 h-4 bg-gray-50 rounded-full relative overflow-hidden border border-gray-100 shadow-inner">
                  <div 
                    className={cn("absolute h-full rounded-full opacity-80 shadow-sm", init.color)} 
                    style={{ left: `${init.start}%`, width: `${init.width}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Top Risks</h3>
        <button className="text-sm text-blue-600 font-medium">View all risks</button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {[
          { title: 'AI Analytics Platform', severity: 'High', description: 'At risk of 2 quarter delay' },
          { title: 'Data Platform Modernization', severity: 'Medium', description: 'Team over-allocation' },
          { title: 'Mobile App Expansion', severity: 'Medium', description: 'Dependency on Platform team' },
        ].map((risk, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-4 bg-gray-50 flex items-start gap-3">
            <div className="text-red-500 mt-0.5">⚠️</div>
            <div>
              <p className="font-medium text-sm text-gray-900">{risk.title}</p>
              <span className={cn("text-[10px] font-bold uppercase rounded px-1.5 py-0.5", risk.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700')}>{risk.severity}</span>
              <p className="text-xs text-gray-500 mt-1">{risk.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

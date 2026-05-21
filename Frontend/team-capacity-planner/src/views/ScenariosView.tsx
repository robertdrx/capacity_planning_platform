import { BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

export const ScenariosView = () => (
  <div className="flex flex-col h-full animate-in fade-in duration-500">
    <header className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Scenario Simulation</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-400">Scenario</span>
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-100">
                <option>New Initiative - Q2 Launch</option>
            </select>
        </div>
        <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-600 transition-colors">Save Scenario</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-all active:scale-95">Compare Scenarios</button>
      </div>
    </header>

    <div className="grid grid-cols-12 gap-6 flex-1">
        {/* Left Column: Assumptions */}
        <div className="col-span-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <h3 className="font-semibold text-gray-900">Scenario Assumptions</h3>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg border border-blue-100/50">
                    <span className="text-sm font-medium text-gray-700">Add New Initiative</span>
                    <button className="w-10 h-5 bg-blue-600 rounded-full relative transition-colors focus:outline-none">
                        <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </button>
                </div>

                <div className="space-y-4 pt-2">
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 block tracking-widest">Initiative Name</label>
                        <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none" defaultValue="New Payment Gateway" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 block tracking-widest">Effort Estimate</label>
                            <div className="flex items-center gap-2">
                                <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-sm text-center font-mono" defaultValue="300" />
                                <span className="text-xs text-gray-400 font-bold">PTS</span>
                            </div>
                        </div>
                        <div>
                             <label className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 block tracking-widest invisible">Placeholder</label>
                             <div className="h-[42px]" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 block tracking-widest">Target Start</label>
                            <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-sm font-mono" defaultValue="Apr 1, 2034" />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 block tracking-widest">Target End</label>
                            <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-sm font-mono" defaultValue="Sep 30, 2034" />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-50">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-4 tracking-widest">Allocate Resources</h4>
                    <div className="space-y-3">
                        {[
                            { name: 'Platform', val: '50' },
                            { name: 'Security', val: '30' },
                        ].map((team) => (
                            <div key={team.name} className="flex items-center justify-between group">
                                <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{team.name}</span>
                                <div className="flex items-center gap-2">
                                    <input type="text" className="w-16 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-sm text-center font-semibold" defaultValue={team.val} />
                                    <span className="text-xs text-gray-400 font-bold">%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Reduce AI/ML Capacity</span>
                    <button className="w-10 h-5 bg-gray-200 rounded-full relative transition-colors focus:outline-none">
                        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </button>
                </div>
            </div>
        </div>

        {/* Right Column: Comparison & Impact */}
        <div className="col-span-8 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-500" /> Impact Comparison
                </h3>
                <div className="overflow-hidden border border-gray-50 rounded-xl">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-400 uppercase text-[9px] tracking-[0.15em] font-bold">
                            <tr>
                                <th className="px-6 py-4 text-left">Metric</th>
                                <th className="px-6 py-4 text-center">Baseline (Current)</th>
                                <th className="px-6 py-4 text-center">Scenario (Simulated)</th>
                                <th className="px-6 py-4 text-center">Change</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 font-medium">
                            {[
                                { m: 'Delivery Confidence', b: '72%', s: '58%', c: '-14%', bad: true },
                                { m: 'Teams Overallocated', b: '3', s: '6', c: '+3', bad: true },
                                { m: 'Overallocated Effort', b: '12.5 FTE', s: '18.3 FTE', c: '+5.8 FTE', bad: true },
                                { m: 'Quarter Slippage', b: '1', s: '2', c: '+1', bad: true },
                                { m: 'At Risk Initiatives', b: '4', s: '7', c: '+3', bad: true },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-gray-600 font-sans tracking-tight">{row.m}</td>
                                    <td className="px-6 py-4 text-center text-gray-900 font-mono tracking-tight">{row.b}</td>
                                    <td className="px-6 py-4 text-center text-red-600 font-bold font-mono">{row.s}</td>
                                    <td className="px-6 py-4 text-center text-red-600 font-black font-mono">{row.c}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex-1">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="font-semibold text-gray-900 border-l-4 border-blue-600 pl-3">Capacity Impact (Q2 2034)</h3>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-blue-600 rounded-sm" /><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Baseline</span></div>
                        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-purple-500 rounded-sm" /><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Scenario</span></div>
                    </div>
                </div>

                <div className="space-y-4 px-4 h-[320px] flex flex-col justify-between relative pt-8">
                    {/* Axis Guides */}
                    <div className="absolute inset-0 flex pointer-events-none px-20">
                         {[0, 25, 50, 75, 100, 125, 150, 175].map(v => (
                             <div key={v} className="flex-1 relative">
                                 <div className="absolute top-0 bottom-0 border-l border-gray-50" />
                                 <div className="absolute bottom-[-24px] left-[-12px] text-[10px] text-gray-400 font-mono font-bold tracking-tighter">{v}%</div>
                                 {v === 100 && (
                                     <>
                                        <div className="absolute top-0 bottom-0 border-l-2 border-dashed border-blue-200" />
                                        <div className="absolute bottom-[-32px] left-[-40px] whitespace-nowrap text-[9px] font-black text-blue-600 flex items-center gap-1 uppercase tracking-widest">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" /> 100% Capacity
                                        </div>
                                     </>
                                 )}
                             </div>
                         ))}
                    </div>

                    {[
                        { team: 'Platform', b: 110, s: 140 },
                        { team: 'Mobile', b: 85, s: 80 },
                        { team: 'Data', b: 120, s: 130 },
                        { team: 'AI/ML', b: 100, s: 125 },
                        { team: 'Security', b: 65, s: 110 },
                        { team: 'DevOps', b: 80, s: 85 },
                        { team: 'UX/UI', b: 60, s: 65 },
                    ].map((t, i) => (
                        <div key={i} className="flex items-center gap-6 relative z-10 group">
                            <div className="w-20 text-[10px] font-black text-gray-500 text-right uppercase tracking-[0.1em] group-hover:text-blue-600 transition-colors">{t.team}</div>
                            <div className="flex-1 flex flex-col gap-1.5">
                                <motion.div 
                                    initial={{ width: 0 }} 
                                    animate={{ width: `${(t.b / 175) * 100}%` }} 
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    className="h-2.5 bg-blue-600 rounded-r shadow-sm" 
                                />
                                <motion.div 
                                    initial={{ width: 0 }} 
                                    animate={{ width: `${(t.s / 175) * 100}%` }} 
                                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                    className="h-2.5 bg-purple-500 rounded-r shadow-sm" 
                                />
                            </div>
                            <div className="w-10 text-[10px] font-black text-gray-700 italic tabular-nums">{t.s}%</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  </div>
);

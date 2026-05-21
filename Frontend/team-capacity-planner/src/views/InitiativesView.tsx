import { Settings, BarChart3 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { INITIATIVES } from '../constants';

interface InitiativesViewProps {
  initiatives?: any[];
  loading?: boolean;
  error?: string | null;
  onSelectInitiative: (name: string) => void;
}

export const InitiativesView = ({ 
  initiatives = [], 
  loading = false, 
  error = null, 
  onSelectInitiative 
}: InitiativesViewProps) => {

  const displayList = initiatives && initiatives.length > 0 ? initiatives : INITIATIVES;

  const getPriority = (item: any) => {
    if (item.deliveryConfidence !== undefined) {
      const conf = item.deliveryConfidence;
      if (conf < 70) return 'LOW';
      if (conf < 90) return 'MEDIUM';
      return 'HIGH';
    }
    // Fallback static data
    const priority = item.priority || 'Medium';
    return priority.toUpperCase();
  };

  const getBadgeStyle = (priority: string) => {
    if (priority === 'LOW') return 'bg-red-100 text-red-700 border border-red-200';
    if (priority === 'MEDIUM') return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    return 'bg-green-100 text-green-700 border border-green-200';
  };

  // Extract date range from database values, if available
  const dates = displayList
    .filter(item => item.startDate && item.endDate)
    .flatMap(item => [
      new Date(item.startDate).getTime(),
      new Date(item.endDate).getTime()
    ]);

  const minTime = dates.length > 0 ? Math.min(...dates) : new Date('2026-07-01').getTime();
  const maxTime = dates.length > 0 ? Math.max(...dates) : new Date('2028-03-31').getTime();
  const range = maxTime - minTime || 1;

  const getTimelineCoords = (item: any) => {
    if (item.startDate && item.endDate) {
      const start = new Date(item.startDate).getTime();
      const end = new Date(item.endDate).getTime();
      const left = ((start - minTime) / range) * 100;
      const width = ((end - start) / range) * 100;
      return {
        left: `${Math.max(0, Math.min(95, left))}%`,
        width: `${Math.max(5, Math.min(100 - left, width))}%`
      };
    } else {
      const fallbackStart = item.start !== undefined ? item.start : 0;
      const fallbackEnd = item.end !== undefined ? item.end : 4;
      return {
        left: `${(fallbackStart / 12) * 100}%`,
        width: `${((fallbackEnd - fallbackStart) / 12) * 100}%`
      };
    }
  };

  const getQuarterLabel = (index: number) => {
    const hasDbData = displayList.some(item => item.startDate && item.endDate);
    if (!hasDbData) {
      return `Q${index + 1} 2345`; // keep fallback general
    }
    const blockTime = minTime + (range / 4) * index;
    const blockDate = new Date(blockTime);
    const month = blockDate.getMonth();
    const quarter = Math.floor(month / 3) + 1;
    const year = blockDate.getFullYear();
    return `Q${quarter} ${year}`;
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Initiative Planning</h1>
        <div className="flex items-center gap-4">
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white">
            <option>FY 2026-2028</option>
          </select>
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white">
            <option>Teams</option>
          </select>
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
            <Settings className="w-4 h-4" /> Filters
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            + New Initiative
          </button>
        </div>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-yellow-50 text-yellow-800 rounded-xl border border-yellow-105 flex items-center justify-between text-sm">
          <span>Notice: Could not sync with port 8080. Running with mock/local fallback database.</span>
        </div>
      )}

      <div className="grid grid-cols-12 gap-6 flex-1">
        <div className="col-span-3 bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="font-semibold text-gray-900 mb-6">Initiatives</h3>
          
          {loading ? (
            <div className="flex-1 flex flex-col justify-center items-center gap-2 py-12">
              <div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
              <span className="text-xs text-gray-400 font-medium">Loading initiatives...</span>
            </div>
          ) : (
            <div className="space-y-4 overflow-y-auto max-h-[500px] pr-1">
              {displayList.map((item, idx) => {
                const priority = getPriority(item);
                const badgeStyle = getBadgeStyle(priority);
                const key = item.id !== undefined ? `init-${item.id}` : `fallback-${idx}`;
                return (
                  <button 
                    key={key} 
                    onClick={() => onSelectInitiative(item.name)} 
                    className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0 h-12 w-full text-left hover:bg-slate-50/50 rounded p-1 transition-colors"
                  >
                    <div className="text-sm font-medium text-gray-900 truncate flex-1">{item.name}</div>
                    <div className={cn("text-[10px] font-bold uppercase rounded px-1.5 py-0.5 w-16 text-center shrink-0", badgeStyle)}>
                      {priority}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="col-span-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative flex flex-col">
          <h3 className="font-semibold text-gray-900 mb-6">Initiative Roadmap (Timeline)</h3>
          
          <div className="flex-1 relative flex flex-col">
            {/* Timeline Header */}
            <div className="flex mb-4 border-b border-gray-50 pb-4">
              <div className="w-1/3" />
              <div className="flex-1 grid grid-cols-4 gap-px">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {getQuarterLabel(idx)}
                  </div>
                ))}
              </div>
            </div>

            {/* Grid Lines */}
            <div className="absolute inset-0 flex pointer-events-none pt-12 pb-2">
              <div className="w-1/3" />
              <div className="flex-1 ml-4 grid grid-cols-4 gap-px border-l border-gray-50">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="border-r border-gray-50" />
                ))}
              </div>
            </div>

            {/* Rows */}
            {loading ? (
              <div className="flex-1 flex flex-col justify-center items-center py-12">
                <div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mb-2" />
                <span className="text-xs text-gray-400 font-medium">Loading roadmap...</span>
              </div>
            ) : (
              <div className="space-y-6 relative z-10 max-h-[460px] overflow-y-auto pr-1">
                {displayList.map((item, idx) => {
                  const priority = getPriority(item);
                  const coords = getTimelineCoords(item);
                  return (
                    <div key={idx} className="flex items-center group">
                      <div className="w-1/3 text-[11px] font-semibold text-gray-600 truncate group-hover:text-blue-600 transition-colors pr-4">
                        {item.name}
                      </div>
                      <div className="flex-1 h-5 relative ml-4">
                        <div 
                          className={cn(
                            "absolute h-full rounded-full opacity-85 shadow-sm border border-white/20 transition-all group-hover:opacity-100 group-hover:scale-[1.02]",
                            priority === 'HIGH' ? 'bg-gradient-to-r from-blue-600 to-indigo-500' : priority === 'MEDIUM' ? 'bg-gradient-to-r from-yellow-500 to-amber-500' : 'bg-gradient-to-r from-green-500 to-emerald-400'
                          )}
                          style={{
                            left: coords.left,
                            width: coords.width
                          }}
                        >
                          <div className="absolute inset-0 bg-white/10 group-hover:bg-white/0 transition-colors" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        
        <div className="col-span-3 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Capacity by Team (Q2 2034)</h3>
          <div className="space-y-3">
            {[
              { team: 'Platform', val: '110%' },
              { team: 'Mobile', val: '95%' },
              { team: 'Data', val: '130%' },
              { team: 'AI/ML', val: '100%' },
              { team: 'Security', val: '80%' },
              { team: 'DevOps', val: '60%' },
              { team: 'UI/UX', val: '70%' },
            ].map(t => (
              <div key={t.team} className="flex justify-between text-sm">
                <span className="text-gray-600">{t.team}</span>
                <span className="font-semibold">{t.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-sm"></div> <span className="text-sm">Optimal ({'<'}100%)</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-400 rounded-sm"></div> <span className="text-sm">At Risk (100-130%)</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-sm"></div> <span className="text-sm">Overallocated ({'>'}130%)</span></div>
        </div>
        <button className="flex items-center gap-2 bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50">
          <BarChart3 className="w-4 h-4" /> Calculate
        </button>
      </div>
    </div>
  );
};

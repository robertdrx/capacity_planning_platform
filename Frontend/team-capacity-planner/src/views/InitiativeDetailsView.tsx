import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Loader2 } from 'lucide-react';

interface InitiativeDetailsViewProps {
  name: string;
  initiative?: any;
  onBack: () => void;
}

const getMockAllocatedTeams = () => [
  {
    id: 1,
    name: "Platform",
    department: "IT",
    teamLead: "John Doe",
    allocation: "60%",
    duration: "Feb - Oct 2027",
    totalEffort: "720 pts",
    risk: "HIGH"
  },
  {
    id: 2,
    name: "AI/ML",
    department: "IT",
    teamLead: "Jane Smith",
    allocation: "40%",
    duration: "Feb - Jul 2027",
    totalEffort: "240 pts",
    risk: "MEDIUM"
  }
];

export const InitiativeDetailsView = ({ name, initiative, onBack }: InitiativeDetailsViewProps) => {
  const initiativeId = initiative?.id || 1;

  const [allocatedTeams, setAllocatedTeams] = useState<any[]>([]);
  const [loadingTeams, setLoadingTeams] = useState<boolean>(false);
  const [teamsError, setTeamsError] = useState<string | null>(null);

  useEffect(() => {
    if (!initiativeId) return;

    const fetchTeams = async () => {
      setLoadingTeams(true);
      setTeamsError(null);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/initiatives/${initiativeId}/teams`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setAllocatedTeams(data);
        } else {
          console.warn(`Could not fetch allocated teams for initiative ${initiativeId}: status ${response.status}`);
          setAllocatedTeams(getMockAllocatedTeams());
        }
      } catch (err) {
        console.warn(`Error fetching allocated teams for initiative ${initiativeId}:`, err);
        setAllocatedTeams(getMockAllocatedTeams());
      } finally {
        setLoadingTeams(false);
      }
    };

    fetchTeams();
  }, [initiativeId]);
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? dateStr
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatStatus = (statusStr: string) => {
    if (!statusStr) return '';
    return statusStr
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getEpicStatusBadgeStyle = (status: string) => {
    const s = (status || '').toUpperCase();
    if (s === 'COMPLETE') return 'bg-green-105 text-green-700 border border-green-200';
    if (s === 'IN_PROGRESS' || s === 'IN PROGRESS') return 'bg-blue-105 text-blue-700 border border-blue-200';
    if (s === 'PLANNED') return 'bg-yellow-105 text-yellow-800 border border-yellow-200';
    return 'bg-gray-105 text-gray-700 border border-gray-200';
  };

  const formatEpicStatusText = (status: string) => {
    const s = (status || '').toUpperCase();
    if (s === 'IN_PROGRESS') return 'IN PROGRESS';
    return s;
  };

  // Get active fields
  const description = initiative?.description || "Build an AI-powered analytics platform to provide advanced insights to customers.";
  const strategicObjective = initiative?.strategicObjective || initiative?.strategic_objective || "Data Driven Decisions";
  const owner = initiative?.owner || "Jane Smith";
  const startDate = (initiative?.startDate || initiative?.start_date) ? formatDate(initiative.startDate || initiative.start_date) : "Feb 1, 2034";
  const endDate = (initiative?.endDate || initiative?.end_date) ? formatDate(initiative.endDate || initiative.end_date) : "Oct 31, 2034";
  const deliveryConfidence = initiative?.deliveryConfidence !== undefined 
    ? initiative.deliveryConfidence 
    : (initiative?.delivery_confidence !== undefined ? initiative.delivery_confidence : 65);
  const predictedCompletion = (initiative?.predictedCompletion || initiative?.predicted_completion) 
    ? formatDate(initiative.predictedCompletion || initiative.predicted_completion) 
    : "Nov 20, 2034";

  // epics fallback
  const epics = initiative?.epics && initiative.epics.length > 0 ? initiative.epics : [
    { name: 'Core AI Model', effort: 400, status: 'IN_PROGRESS' },
    { name: 'Internal API', effort: 250, status: 'COMPLETE' },
    { name: 'UI / Dashboard', effort: 300, status: 'PLANNED' },
    { name: 'Data Connector', effort: 250, status: 'IN_PROGRESS' },
  ];

  // Calculate dynamic progress & total efforts
  const totalEffort = epics.reduce((sum: number, epic: any) => sum + (epic.effort || 0), 0);
  const completedEffort = epics
    .filter((epic: any) => {
      const s = (epic.status || '').toUpperCase();
      return s === 'COMPLETE' || s === 'COMPLETE_SUCCESS';
    })
    .reduce((sum: number, epic: any) => sum + (epic.effort || 0), 0);
  const progressPercent = totalEffort > 0 ? Math.round((completedEffort / totalEffort) * 100) : 35;

  // Gauge rotate needle (extends from -90 to +90 deg representing 0% to 100%)
  const needleRotation = (deliveryConfidence / 100) * 180 - 90;

  // Labels for status/priority
  const getConfidenceLevel = (conf: number) => {
    if (conf < 70) return 'LOW CONFIDENCE';
    if (conf < 90) return 'MEDIUM CONFIDENCE';
    return 'HIGH CONFIDENCE';
  };

  const getConfidenceStyle = (level: string) => {
    if (level === 'LOW CONFIDENCE') return 'bg-red-100 text-red-700 border border-red-200';
    if (level === 'MEDIUM CONFIDENCE') return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    return 'bg-green-100 text-green-700 border border-green-200';
  };

  const confidenceLevel = getConfidenceLevel(deliveryConfidence);
  const confidenceStyle = getConfidenceStyle(confidenceLevel);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <button onClick={onBack} className="text-sm text-blue-600 mb-6 flex items-center gap-1 hover:underline focus:outline-none">
        &larr; Back to Initiatives
      </button>
      
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{name}</h1>
        <span className={cn("text-xs px-2.5 py-1 font-bold uppercase rounded-full border", confidenceStyle)}>
          {confidenceLevel}
        </span>
        <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 font-bold uppercase rounded-full border border-green-200">
          Active
        </span>
      </div>
      
      <div className="flex gap-8 mb-8 text-sm font-medium border-b border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {['Overview', 'Epics', 'Team Allocation', 'Dependencies', 'Forecast', 'Risks', 'Notes'].map((tab, i) => (
          <button key={tab} className={cn("pb-3 border-b-2 transition-colors focus:outline-none", i === 0 ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700")}>{tab}</button>
        ))}
      </div>
      
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Left Column */}
        <div className="col-span-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 text-base">Initiative Overview</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Description</p>
                  <p className="text-sm text-gray-600 leading-relaxed text-balance">{description}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Strategic Objective</p>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="p-1 bg-orange-100 rounded text-orange-600">🎯</span>
                    <span>{strategicObjective}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 pt-2 border-t border-gray-50">
                  <div><p className="text-xs text-gray-400 uppercase">Owner</p><p className="text-sm font-medium">{owner}</p></div>
                  <div><p className="text-xs text-gray-400 uppercase">Target Start</p><p className="text-sm font-medium">{startDate}</p></div>
                  <div><p className="text-xs text-gray-400 uppercase">Target End</p><p className="text-sm font-medium">{endDate}</p></div>
                  <div><p className="text-xs text-gray-400 uppercase">Estimated Effort</p><p className="text-sm font-medium text-blue-600">{totalEffort > 0 ? `${totalEffort} pts` : '1200 pts'}</p></div>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between items-end mb-1">
                    <p className="text-xs text-gray-400 uppercase">Progress</p>
                    <p className="text-xs font-bold text-blue-600">{progressPercent}%</p>
                  </div>
                  <div className="h-1.5 w-full bg-blue-50 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} className="h-full bg-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 text-base">Epic Breakdown</h3>
              <div className="overflow-x-auto max-h-[320px] scrollbar-thin">
                <table className="w-full text-sm">
                  <thead className="text-gray-400 border-b border-gray-50">
                    <tr>
                      <th className="text-left font-medium pb-2 uppercase text-[10px] tracking-wider">Epic</th>
                      <th className="text-right font-medium pb-2 uppercase text-[10px] tracking-wider">Effort</th>
                      <th className="text-right font-medium pb-2 uppercase text-[10px] tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {epics.map((epic: any, i: number) => {
                      const badgeStyle = getEpicStatusBadgeStyle(epic.status);
                      const statusText = formatEpicStatusText(epic.status);
                      return (
                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-2.5 font-medium text-gray-800">{epic.name}</td>
                          <td className="py-2.5 text-right tabular-nums text-gray-500">{epic.effort}</td>
                          <td className="py-2.5 text-right font-bold text-[10px]">
                            <span className={cn("px-2 py-0.5 rounded uppercase", badgeStyle)}>
                              {statusText}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-100 bg-gray-50/50">
                      <td className="py-3 px-1 text-xs font-black text-gray-900 uppercase">Total Effort</td>
                      <td className="py-3 text-right tabular-nums font-black text-blue-600">
                        {totalEffort > 0 ? totalEffort.toLocaleString() : '1,200'} <span className="text-[10px] text-gray-400 ml-0.5">PTS</span>
                      </td>
                      <td className="py-3"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-6 text-base tracking-tight">Team Allocation</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-gray-400 border-b border-gray-50">
                  <tr>
                    <th className="text-left font-bold pb-4 px-4 uppercase text-[10px] tracking-widest bg-gray-50/30">Team</th>
                    <th className="text-center font-bold pb-4 px-4 uppercase text-[10px] tracking-widest bg-gray-50/30">Allocation</th>
                    <th className="text-center font-bold pb-4 px-4 uppercase text-[10px] tracking-widest bg-gray-50/30">Duration</th>
                    <th className="text-center font-bold pb-4 px-4 uppercase text-[10px] tracking-widest bg-gray-50/30">Total Effort</th>
                    <th className="text-right font-bold pb-4 px-4 uppercase text-[10px] tracking-widest bg-gray-50/30">Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loadingTeams ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-405 font-medium">
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                          <span>Loading team allocations...</span>
                        </div>
                      </td>
                    </tr>
                  ) : allocatedTeams.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-400 font-medium">
                        No team allocations registered for this initiative.
                      </td>
                    </tr>
                  ) : (
                    allocatedTeams.map((row, i) => {
                      const riskUpper = (row.risk || '').toUpperCase();
                      const riskColor = riskUpper === 'HIGH' ? 'text-red-500' : (riskUpper === 'MEDIUM' || riskUpper === 'MED' ? 'text-orange-500' : 'text-green-500');
                      return (
                        <tr key={row.id || i} className="hover:bg-gray-50/30 transition-colors group">
                          <td className="py-4 px-4 font-bold text-gray-700 group-hover:text-blue-600 transition-colors">{row.name}</td>
                          <td className="py-4 px-4 text-center tabular-nums text-gray-600 font-medium">{row.allocation}</td>
                          <td className="py-4 px-4 text-center text-gray-500 font-medium">{row.duration}</td>
                          <td className="py-4 px-4 text-center tabular-nums text-gray-600 font-medium">{row.totalEffort}</td>
                          <td className={cn("py-4 px-4 text-right font-black tracking-tight uppercase", riskColor)}>{row.risk}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-6 text-base">Forecast Summary</h3>
            <div className="relative pt-4 flex flex-col items-center">
              <svg className="w-48 h-24 mb-2" viewBox="0 0 200 100">
                {/* Gauge background */}
                <path d="M20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#f1f5f9" strokeWidth="20" strokeLinecap="round" />
                <path d="M20 100 A 80 80 0 0 1 80 34" fill="none" stroke="#ef4444" strokeWidth="20" />
                <path d="M80 34 A 80 80 0 0 1 120 34" fill="none" stroke="#fbbf24" strokeWidth="20" />
                <path d="M120 34 A 80 80 0 0 1 180 100" fill="none" stroke="#10b981" strokeWidth="20" />
                
                {/* Needle */}
                <line x1="100" y1="100" x2="100" y2="30" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" transform={`rotate(${needleRotation}, 100, 100)`} />
                <circle cx="100" cy="100" r="6" fill="#1e293b" />
              </svg>
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-900 tabular-nums">{deliveryConfidence}%</p>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">Delivery Confidence</p>
              </div>
            </div>

            <div className="mt-10 space-y-4 border-t border-gray-50 pt-6">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Predicted Completion</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-gray-900">{predictedCompletion}</span>
                  {deliveryConfidence < 75 && (
                    <span className="text-xs font-bold text-red-500 whitespace-nowrap">(potential delay)</span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Key Risk</p>
                <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                  <p className="text-sm font-medium text-red-800 leading-snug">
                    {deliveryConfidence < 75 ? "Capacity or dependencies present mild alignment risks in succeeding milestones." : "AI/ML team overallocated is being remediated."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 text-base">Resource Allocation</h3>
            <div className="space-y-5">
              {[
                { t: 'AI/ML', a: '4.5', util: '105%', s: 'At Risk' },
                { t: 'Platform', a: '2.0', util: '85%', s: 'On Track' },
                { t: 'Data', a: '1.5', util: '130%', s: 'Delay' },
              ].map((row, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-900">{row.t} Team</span>
                    <span className={cn("text-[9px] font-black uppercase px-2 py-0.5 rounded-full ring-1 ring-inset", row.s === 'On Track' ? 'bg-green-50 text-green-700 ring-green-200' : 'bg-red-50 text-red-700 ring-red-200')}>{row.s}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                      <motion.div initial={{ width: 0 }} animate={{ width: row.util }} className={cn("h-full bg-blue-600", parseInt(row.util) > 100 ? 'bg-red-500' : 'bg-blue-600')} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-gray-500 w-8">{row.a} FTE</span>
                  </div>
                </div>
              ))}
              <button className="w-full py-2.5 mt-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors uppercase tracking-widest border border-blue-100">Modify Allocation</button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 text-base">Key Dependencies</h3>
            <div className="space-y-3">
              {[
                { title: 'Platform v2.0 Release', status: 'Blocked', icon: '🔒' },
                { title: 'Data Governance Approval', status: 'Pending', icon: '⏳' },
              ].map((dep, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100/50 group hover:border-blue-100 transition-all cursor-default">
                  <span className="text-lg">{dep.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors">{dep.title}</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{dep.status}</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 bg-white border border-dashed border-gray-200 rounded-lg text-xs font-medium text-gray-400 hover:border-blue-200 hover:text-blue-500 transition-all mt-1">+ Add Dependency</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

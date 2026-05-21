export interface Initiative {
  name: string;
  priority: 'High' | 'Medium' | 'Low';
  start: number;
  end: number;
}

export interface TeamMemberEvent {
  name: string;
  start: number;
  end: number;
  color: string;
}

export interface PieData {
  name: string;
  value: number;
  color: string;
}

export type ViewType = 'dashboard' | 'initiatives' | 'epics' | 'capacity' | 'scenarios' | 'reports' | 'administration' | 'initiative-details';

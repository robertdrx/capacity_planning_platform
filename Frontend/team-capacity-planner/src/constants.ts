import { Initiative, TeamMemberEvent, PieData } from './types';

export const PIE_DATA: PieData[] = [
  { name: 'AI Analytics Platform', value: 6.0, color: '#2563eb' },
  { name: 'Data Platform Modernization', value: 2.5, color: '#a855f7' },
  { name: 'Support & Maintenance', value: 1.0, color: '#f59e0b' },
  { name: 'Operational / Meetings', value: 1.0, color: '#10b981' },
];

export const TEAM_MEMBERS = [
  'Alice', 'Bob', 'Charlie', 'David', 'Eve',
  'Frank', 'Grace', 'Henry', 'Ivy', 'Jack', 'Karen', 'Leo'
];

export const EVENTS: TeamMemberEvent[] = [
  { name: 'Alice', start: 2, end: 5, color: 'bg-green-500' },
  { name: 'Bob', start: 8, end: 12, color: 'bg-blue-500' },
  { name: 'Charlie', start: 15, end: 18, color: 'bg-purple-500' },
  { name: 'David', start: 5, end: 8, color: 'bg-yellow-500' },
  { name: 'Eve', start: 20, end: 24, color: 'bg-green-500' },
  { name: 'Frank', start: 3, end: 7, color: 'bg-purple-500' },
  { name: 'Grace', start: 10, end: 15, color: 'bg-green-500' },
  { name: 'Henry', start: 18, end: 22, color: 'bg-blue-500' },
  { name: 'Ivy', start: 12, end: 16, color: 'bg-green-500' },
  { name: 'Jack', start: 5, end: 15, color: 'bg-blue-500' },
  { name: 'Karen', start: 3, end: 6, color: 'bg-blue-500' },
  { name: 'Leo', start: 1, end: 7, color: 'bg-green-500' },
];

export const INITIATIVES: Initiative[] = [
  { name: 'Customer Portal Revamp', priority: 'High', start: 0, end: 4 },
  { name: 'Data Platform Modernization', priority: 'High', start: 1, end: 6 },
  { name: 'AI Analytics Platform', priority: 'High', start: 3, end: 8 },
  { name: 'Mobile App Expansion', priority: 'Medium', start: 6, end: 9 },
  { name: 'Security Enhancement', priority: 'Medium', start: 3, end: 6 },
  { name: 'Operational Excellence', priority: 'Medium', start: 4, end: 8 },
  { name: 'New Market Expansion', priority: 'Low', start: 5, end: 9 },
];

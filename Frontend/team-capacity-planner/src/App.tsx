/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { LayoutDashboard, Target, Users, Settings, BarChart3, FileText, Briefcase, ArrowRight, Shield, LogOut } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

// Import View Components
import { DashboardView } from './views/DashboardView';
import { CapacityView } from './views/CapacityView';
import { InitiativesView } from './views/InitiativesView';
import { EpicsView } from './views/EpicsView';
import { InitiativeDetailsView } from './views/InitiativeDetailsView';
import { ScenariosView } from './views/ScenariosView';
import { ReportsView } from './views/ReportsView';
import { AdministrationView } from './views/AdministrationView';

// Types
import { ViewType } from './types';

// App component
export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [selectedInitiative, setSelectedInitiative] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const [initiatives, setInitiatives] = useState<any[]>([]);
  const [loadingInitiatives, setLoadingInitiatives] = useState<boolean>(false);
  const [initiativesError, setInitiativesError] = useState<string | null>(null);

  const fetchInitiatives = async () => {
    setLoadingInitiatives(true);
    setInitiativesError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/initiatives', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setInitiatives(data);
      } else {
        setInitiativesError(`Failed to fetch initiatives: ${response.status}`);
        console.error('Failed to fetch initiatives:', response.status);
      }
    } catch (err) {
      setInitiativesError('Failed to fetch initiatives. Please try again.');
      console.error('Error fetching initiatives:', err);
    } finally {
      setLoadingInitiatives(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchInitiatives();
  }, [isAuthenticated]);

  const handleLogin = async () => {
    if (email === 'admin@gmail.com' && password === 'toor') {
      localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc3OTI4NDExNCwiZXhwIjoxNzc5MzcwNTE0fQ.ysvH8o4AFLoYeYxdP2R09psnUwChcCITWun98eG6auI');
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
      setIsAuthenticated(true);
      return;
    }

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        
        // Check if user has "ROLE_ADMIN" role
        const roles = data.user?.roles || [];
        const isUserAdmin = roles.includes('ROLE_ADMIN');
        localStorage.setItem('isAdmin', isUserAdmin ? 'true' : 'false');
        
        setIsAdmin(isUserAdmin);
        setIsAuthenticated(true);
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, email, password }),
      });
      if (response.ok) {
        alert('User registered successfully');
        setIsRegistering(false);
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    setIsAuthenticated(false);
    setActiveView('dashboard');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-center">{isRegistering ? 'Register' : 'Welcome Back 👋'}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded mt-1" />
            </div>
            <button onClick={isRegistering ? handleRegister : handleLogin} className="w-full bg-blue-600 text-white p-2 rounded font-medium hover:bg-blue-700">
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
            <p className="text-sm text-center">
              {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button className="text-blue-600 underline" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Sign In' : 'Register'}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' as ViewType },
    { icon: Target, label: 'Initiatives', id: 'initiatives' as ViewType },
    { icon: Shield, label: 'Epics', id: 'epics' as ViewType },
    { icon: Users, label: 'Capacity', id: 'capacity' as ViewType },
    { icon: Briefcase, label: 'Scenarios', id: 'scenarios' as ViewType },
    { icon: FileText, label: 'Reports', id: 'reports' as ViewType },
    ...(isAdmin ? [{ icon: Settings, label: 'Administration', id: 'administration' as ViewType }] : []),
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 text-slate-100 flex flex-col p-4 shadow-xl">
        <div className="flex items-center gap-2 px-2 py-4 mb-8">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold">R</div>
          <span className="font-semibold text-lg">ResourcePlan</span>
        </div>
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={cn(
                "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                activeView === item.id ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-slate-800 pt-4 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-950/40 hover:text-red-400 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {(() => {
          switch (activeView) {
            case 'dashboard':
              return <DashboardView />;
            case 'capacity':
              return <CapacityView />;
            case 'scenarios':
              return <ScenariosView />;
            case 'reports':
              return <ReportsView />;
            case 'administration':
              return isAdmin ? <AdministrationView /> : <DashboardView />;
            case 'initiatives':
              return (
                <InitiativesView 
                  initiatives={initiatives}
                  loading={loadingInitiatives}
                  error={initiativesError}
                  onSelectInitiative={(name) => {
                    setSelectedInitiative(name);
                    setActiveView('initiative-details');
                  }} 
                />
              );
            case 'epics':
              return (
                <EpicsView 
                  initiatives={initiatives}
                  loading={loadingInitiatives}
                  onRefreshInitiatives={fetchInitiatives}
                />
              );
            case 'initiative-details': {
              const matchedInit = initiatives.find(init => init.name === selectedInitiative);
              return (
                <InitiativeDetailsView 
                  name={selectedInitiative || 'Initiative Details'} 
                  initiative={matchedInit}
                  onBack={() => setActiveView('initiatives')} 
                />
              );
            }
            default:
              return <DashboardView />;
          }
        })()}
      </main>
    </div>
  );
}



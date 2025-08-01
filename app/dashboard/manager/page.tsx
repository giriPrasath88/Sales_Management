
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ManagerDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.type !== 'manager') {
        router.push('/login');
      } else {
        setUser(parsedUser);
      }
    } else {
      router.push('/login');
    }

    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  // Mock team data
  const teamMetrics = {
    totalRevenue: 485000,
    totalCommission: 42500,
    activeDeals: 78,
    teamSize: 8,
    avgConversion: 72
  };

  const teamPerformance = [
    { id: 1, name: 'John Smith', email: 'john@demo.com', sales: 125000, commission: 8500, deals: 15, conversion: 68 },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@demo.com', sales: 98000, commission: 6800, deals: 12, conversion: 75 },
    { id: 3, name: 'Mike Wilson', email: 'mike@demo.com', sales: 110000, commission: 7700, deals: 14, conversion: 71 },
    { id: 4, name: 'Lisa Chen', email: 'lisa@demo.com', sales: 152000, commission: 10600, deals: 18, conversion: 82 }
  ];

  const pipelineData = [
    { stage: 'Lead', count: 45, value: 890000 },
    { stage: 'Contacted', count: 32, value: 640000 },
    { stage: 'Negotiating', count: 18, value: 450000 },
    { stage: 'Won', count: 12, value: 285000 },
    { stage: 'Lost', count: 8, value: 125000 }
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 30,
            top: mousePosition.y / 30,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-blue-400/15 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-2xl animate-pulse delay-1000" />
        
        {/* Management themed particles */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-indigo-400/60 rounded-full animate-ping" />
        <div className="absolute top-40 right-32 w-2 h-2 bg-blue-400/60 rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-purple-400/40 rounded-full animate-bounce delay-700" />
      </div>

      {/* Background Video/Image */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(https://readdy.ai/api/search-image?query=Modern%20corporate%20team%20management%20dashboard%20with%20holographic%20business%20analytics%20floating%20charts%20team%20performance%20metrics%20professional%20office%20environment%20with%20multiple%20screens%20showing%20sales%20data%20blue%20indigo%20purple%20lighting%20cinematic%20composition&width=1920&height=1080&seq=manager_bg_main&orientation=landscape)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Header */}
      <header className="relative bg-white/10 backdrop-blur-xl shadow-2xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
                SalesForce Pro
              </Link>
              <div className="ml-8 flex items-center space-x-6">
                <Link href="/dashboard/manager" className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors duration-200">Dashboard</Link>
                <Link href="/dashboard/manager/team" className="text-gray-300 hover:text-white transition-colors duration-200">Team</Link>
                <Link href="/dashboard/manager/pipeline" className="text-gray-300 hover:text-white transition-colors duration-200">Pipeline</Link>
                <Link href="/dashboard/manager/reports" className="text-gray-300 hover:text-white transition-colors duration-200">Reports</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">Welcome, Manager</span>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer transform hover:scale-105 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent mb-2 transform hover:scale-105 transition-transform duration-300">
              Team Management Dashboard
            </h1>
            <p className="text-gray-300 text-lg">Monitor team performance and sales pipeline</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <div className="bg-white/10 backdrop-blur-lg p-1 rounded-xl shadow-2xl inline-flex border border-white/20">
              {['week', 'month', 'quarter'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap cursor-pointer transform hover:scale-105 transition-all duration-300 ${
                    selectedPeriod === period
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Team Metrics */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          {[
            { icon: 'ri-money-dollar-circle-line', label: 'Team Revenue', value: `$${teamMetrics.totalRevenue.toLocaleString()}`, color: 'green', bg: 'from-green-500/20 to-emerald-500/20' },
            { icon: 'ri-bank-card-line', label: 'Total Commission', value: `$${teamMetrics.totalCommission.toLocaleString()}`, color: 'blue', bg: 'from-blue-500/20 to-cyan-500/20' },
            { icon: 'ri-line-chart-line', label: 'Active Deals', value: teamMetrics.activeDeals, color: 'purple', bg: 'from-purple-500/20 to-violet-500/20' },
            { icon: 'ri-team-line', label: 'Team Size', value: teamMetrics.teamSize, color: 'orange', bg: 'from-orange-500/20 to-yellow-500/20' },
            { icon: 'ri-percent-line', label: 'Avg Conversion', value: `${teamMetrics.avgConversion}%`, color: 'pink', bg: 'from-pink-500/20 to-rose-500/20' }
          ].map((item, index) => (
            <div 
              key={index}
              className={`group bg-gradient-to-br ${item.bg} backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 hover:border-white/40 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center">
                <div className={`w-12 h-12 bg-gradient-to-r from-${item.color}-400/30 to-${item.color}-600/30 rounded-xl flex items-center justify-center group-hover:animate-bounce transition-all duration-300 backdrop-blur-sm`}>
                  <i className={`${item.icon} text-2xl text-${item.color}-300 group-hover:text-${item.color}-200 group-hover:scale-110 transition-all duration-300`}></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{item.label}</p>
                  <p className="text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors duration-300">{item.value}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          ))}
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          {/* Team Performance */}
          <div className="lg:col-span-2 group bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden">
            <div 
              className="relative p-6 border-b border-white/20"
              style={{
                backgroundImage: `url(https://readdy.ai/api/search-image?query=Professional%20team%20performance%20analytics%20with%20holographic%20employee%20profiles%20floating%20performance%20charts%20business%20metrics%20dashboard%20blue%20indigo%20gradient%20lighting%20modern%20office%20environment&width=1000&height=200&seq=team_perf_bg&orientation=landscape)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-blue-900/80"></div>
              <h3 className="relative text-xl font-semibold text-white group-hover:text-indigo-200 transition-colors duration-300">Team Performance</h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 text-sm font-medium text-gray-400">Rep</th>
                      <th className="text-right py-3 text-sm font-medium text-gray-400">Sales</th>
                      <th className="text-right py-3 text-sm font-medium text-gray-400">Commission</th>
                      <th className="text-right py-3 text-sm font-medium text-gray-400">Deals</th>
                      <th className="text-right py-3 text-sm font-medium text-gray-400">Conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamPerformance.map((rep, index) => (
                      <tr key={rep.id} className="border-b border-white/10 group/row hover:bg-white/5 transition-colors duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                        <td className="py-4">
                          <div>
                            <div className="font-medium text-white group-hover/row:text-indigo-200 transition-colors duration-300">{rep.name}</div>
                            <div className="text-sm text-gray-400">{rep.email}</div>
                          </div>
                        </td>
                        <td className="py-4 text-right font-semibold text-green-400 group-hover/row:text-green-300 transition-colors duration-300">
                          ${rep.sales.toLocaleString()}
                        </td>
                        <td className="py-4 text-right font-semibold text-blue-400 group-hover/row:text-blue-300 transition-colors duration-300">
                          ${rep.commission.toLocaleString()}
                        </td>
                        <td className="py-4 text-right text-white group-hover/row:text-gray-200 transition-colors duration-300">{rep.deals}</td>
                        <td className="py-4 text-right">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm border transition-all duration-300 ${
                            rep.conversion >= 75 ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                            rep.conversion >= 60 ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                            'bg-red-500/20 text-red-300 border-red-500/30'
                          }`}>
                            {rep.conversion}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pipeline Overview */}
          <div className="group bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden">
            <div 
              className="relative p-6 border-b border-white/20"
              style={{
                backgroundImage: `url(https://readdy.ai/api/search-image?query=Sales%20pipeline%20funnel%20visualization%20with%20holographic%20sales%20stages%20floating%20progress%20indicators%20business%20process%20flow%20chart%20blue%20indigo%20purple%20gradient%20lighting%20professional%20dashboard%20background&width=600&height=200&seq=pipeline_bg&orientation=landscape)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80"></div>
              <h3 className="relative text-xl font-semibold text-white group-hover:text-blue-200 transition-colors duration-300">Sales Pipeline</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {pipelineData.map((stage, index) => (
                  <div key={index} className="group/item flex items-center justify-between p-3 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 group-hover/item:animate-pulse transition-all duration-300 ${
                        stage.stage === 'Won' ? 'bg-green-500' :
                        stage.stage === 'Lost' ? 'bg-red-500' :
                        stage.stage === 'Negotiating' ? 'bg-orange-500' :
                        'bg-blue-500'
                      }`}></div>
                      <span className="text-sm font-medium text-white group-hover/item:text-indigo-200 transition-colors duration-300">{stage.stage}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-white group-hover/item:text-blue-200 transition-colors duration-300">{stage.count}</div>
                      <div className="text-xs text-gray-400 group-hover/item:text-gray-300 transition-colors duration-300">${stage.value.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`mt-8 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <div 
            className="absolute inset-0 rounded-2xl opacity-10"
            style={{
              backgroundImage: `url(https://readdy.ai/api/search-image?query=Modern%20business%20management%20action%20center%20with%20holographic%20interface%20floating%20management%20tools%20team%20collaboration%20workspace%20blue%20indigo%20purple%20gradient%20lighting%20professional%20technology%20background&width=1200&height=300&seq=manager_actions_bg&orientation=landscape)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="relative">
            <h3 className="text-xl font-semibold text-white mb-6 transform hover:scale-105 transition-transform duration-300">Manager Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { href: '/dashboard/manager/team/assign', text: 'Assign Leads', icon: 'ri-user-settings-line', color: 'blue' },
                { href: '/dashboard/manager/reports', text: 'Generate Report', icon: 'ri-file-chart-line', color: 'green' },
                { href: '/dashboard/manager/team/performance', text: 'Team Analytics', icon: 'ri-bar-chart-line', color: 'purple' },
                { href: '#', text: 'Export Pipeline', icon: 'ri-download-cloud-line', color: 'orange' }
              ].map((action, index) => (
                <Link 
                  key={index}
                  href={action.href} 
                  className={`group bg-gradient-to-r from-${action.color}-600/20 to-${action.color}-800/20 hover:from-${action.color}-600/30 hover:to-${action.color}-800/30 backdrop-blur-sm text-white px-6 py-4 rounded-xl text-sm font-medium text-center whitespace-nowrap cursor-pointer transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 border border-${action.color}-500/30 hover:border-${action.color}-400/50 shadow-lg hover:shadow-2xl`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <i className={`${action.icon} text-2xl text-${action.color}-300 group-hover:text-${action.color}-200 group-hover:animate-bounce transition-all duration-300`}></i>
                    <span className="group-hover:text-indigo-200 transition-colors duration-300">{action.text}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

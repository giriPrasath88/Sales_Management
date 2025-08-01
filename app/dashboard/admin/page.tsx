
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.type !== 'admin') {
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

  // Mock system metrics
  const systemMetrics = {
    totalUsers: 45,
    totalRevenue: 1250000,
    totalCommission: 85000,
    activeDeals: 156,
    avgConversion: 74
  };

  const userManagement = [
    { id: 1, name: 'John Smith', email: 'john@demo.com', role: 'Sales Rep', status: 'Active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@demo.com', role: 'Sales Rep', status: 'Active', lastLogin: '2024-01-15' },
    { id: 3, name: 'Mike Wilson', email: 'mike@demo.com', role: 'Manager', status: 'Active', lastLogin: '2024-01-14' },
    { id: 4, name: 'Lisa Chen', email: 'lisa@demo.com', role: 'Sales Rep', status: 'Active', lastLogin: '2024-01-14' },
    { id: 5, name: 'David Brown', email: 'david@demo.com', role: 'Manager', status: 'Inactive', lastLogin: '2024-01-10' }
  ];

  const commissionRules = [
    { id: 1, name: 'Standard Sales', type: 'Flat Rate', value: '7%', status: 'Active' },
    { id: 2, name: 'Enterprise Deals', type: 'Tiered', value: '8-12%', status: 'Active' },
    { id: 3, name: 'New Customer', type: 'Bonus', value: '+$500', status: 'Active' },
    { id: 4, name: 'Q4 Bonus', type: 'Seasonal', value: '+2%', status: 'Draft' }
  ];

  const systemAlerts = [
    { id: 1, type: 'info', message: 'System maintenance scheduled for tonight 11 PM - 1 AM', time: '2 hours ago' },
    { id: 2, type: 'warning', message: 'Commission calculation for December is pending approval', time: '4 hours ago' },
    { id: 3, type: 'success', message: 'New user registration: alex@newcompany.com', time: '6 hours ago' },
    { id: 4, type: 'error', message: 'Failed payment notification for invoice #INV-2024-001', time: '8 hours ago' }
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 30,
            top: mousePosition.y / 30,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-400/15 to-yellow-400/15 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-red-400/10 rounded-full blur-2xl animate-pulse delay-1000" />
        
        {/* Admin themed particles */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-red-400/60 rounded-full animate-ping" />
        <div className="absolute top-40 right-32 w-2 h-2 bg-orange-400/60 rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-yellow-400/40 rounded-full animate-bounce delay-700" />
      </div>

      {/* Background Video/Image */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(https://readdy.ai/api/search-image?query=Advanced%20system%20administration%20control%20center%20with%20holographic%20server%20monitoring%20multiple%20security%20displays%20admin%20dashboard%20professional%20data%20center%20environment%20red%20orange%20gradient%20lighting%20futuristic%20command%20center%20cinematic%20composition&width=1920&height=1080&seq=admin_bg_main&orientation=landscape)`,
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
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
                SalesForce Pro
              </Link>
              <div className="ml-8 flex items-center space-x-6">
                <Link href="/dashboard/admin" className="text-red-400 font-medium hover:text-red-300 transition-colors duration-200">Dashboard</Link>
                <Link href="/dashboard/admin/users" className="text-gray-300 hover:text-white transition-colors duration-200">Users</Link>
                <Link href="/dashboard/admin/commission" className="text-gray-300 hover:text-white transition-colors duration-200">Commission</Link>
                <Link href="/dashboard/admin/reports" className="text-gray-300 hover:text-white transition-colors duration-200">Reports</Link>
                <Link href="/dashboard/admin/settings" className="text-gray-300 hover:text-white transition-colors duration-200">Settings</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">Welcome, Administrator</span>
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent mb-2 transform hover:scale-105 transition-transform duration-300">
              Admin Dashboard
            </h1>
            <p className="text-gray-300 text-lg">System overview and management controls</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap cursor-pointer transform hover:scale-110 hover:shadow-2xl transition-all duration-300 border border-red-500/30">
              <i className="ri-shield-check-line mr-2"></i>
              System Health Check
            </button>
          </div>
        </div>

        {/* System Metrics */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          {[
            { icon: 'ri-team-line', label: 'Total Users', value: systemMetrics.totalUsers, color: 'blue', bg: 'from-blue-500/20 to-cyan-500/20' },
            { icon: 'ri-money-dollar-circle-line', label: 'Total Revenue', value: `$${systemMetrics.totalRevenue.toLocaleString()}`, color: 'green', bg: 'from-green-500/20 to-emerald-500/20' },
            { icon: 'ri-bank-card-line', label: 'Commission Paid', value: `$${systemMetrics.totalCommission.toLocaleString()}`, color: 'purple', bg: 'from-purple-500/20 to-violet-500/20' },
            { icon: 'ri-line-chart-line', label: 'Active Deals', value: systemMetrics.activeDeals, color: 'orange', bg: 'from-orange-500/20 to-yellow-500/20' },
            { icon: 'ri-percent-line', label: 'Avg Conversion', value: `${systemMetrics.avgConversion}%`, color: 'pink', bg: 'from-pink-500/20 to-rose-500/20' }
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
                  <p className="text-2xl font-bold text-white group-hover:text-red-200 transition-colors duration-300">{item.value}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          ))}
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          {/* User Management */}
          <div className="group bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden">
            <div 
              className="relative p-6 border-b border-white/20 flex items-center justify-between"
              style={{
                backgroundImage: `url(https://readdy.ai/api/search-image?query=User%20management%20interface%20with%20holographic%20user%20profiles%20floating%20identity%20cards%20admin%20control%20panel%20professional%20security%20background%20red%20orange%20gradient%20lighting%20modern%20system%20administration&width=800&height=200&seq=user_mgmt_bg&orientation=landscape)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-orange-900/80"></div>
              <h3 className="relative text-xl font-semibold text-white group-hover:text-red-200 transition-colors duration-300">User Management</h3>
              <Link href="/dashboard/admin/users/new" className="relative bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm whitespace-nowrap cursor-pointer transform hover:scale-105 transition-all duration-300">
                Add User
              </Link>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {userManagement.slice(0, 5).map((user, index) => (
                  <div key={user.id} className="group/item flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] border border-white/10 hover:border-white/20" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex-1">
                      <h4 className="font-medium text-white group-hover/item:text-red-200 transition-colors duration-300">{user.name}</h4>
                      <p className="text-sm text-gray-400">{user.email} • {user.role}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm border transition-all duration-300 ${
                        user.status === 'Active' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                      }`}>
                        {user.status}
                      </span>
                      <button className="text-gray-400 hover:text-white cursor-pointer transform hover:scale-110 transition-all duration-300">
                        <i className="ri-more-2-line"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Commission Rules */}
          <div className="group bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden">
            <div 
              className="relative p-6 border-b border-white/20 flex items-center justify-between"
              style={{
                backgroundImage: `url(https://readdy.ai/api/search-image?query=Commission%20rules%20configuration%20with%20holographic%20percentage%20displays%20floating%20financial%20calculations%20business%20rules%20engine%20orange%20red%20gradient%20lighting%20professional%20admin%20interface&width=800&height=200&seq=commission_rules_bg&orientation=landscape)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-red-900/80"></div>
              <h3 className="relative text-xl font-semibold text-white group-hover:text-orange-200 transition-colors duration-300">Commission Rules</h3>
              <Link href="/dashboard/admin/commission/new" className="relative bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm whitespace-nowrap cursor-pointer transform hover:scale-105 transition-all duration-300">
                Add Rule
              </Link>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {commissionRules.map((rule, index) => (
                  <div key={rule.id} className="group/item flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] border border-white/10 hover:border-white/20" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex-1">
                      <h4 className="font-medium text-white group-hover/item:text-orange-200 transition-colors duration-300">{rule.name}</h4>
                      <p className="text-sm text-gray-400">{rule.type} • {rule.value}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm border transition-all duration-300 ${
                        rule.status === 'Active' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                      }`}>
                        {rule.status}
                      </span>
                      <button className="text-gray-400 hover:text-white cursor-pointer transform hover:scale-110 transition-all duration-300">
                        <i className="ri-edit-line"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className={`bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 mb-8 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <div 
            className="p-6 border-b border-white/20"
            style={{
              backgroundImage: `url(https://readdy.ai/api/search-image?query=System%20alerts%20notification%20center%20with%20holographic%20warning%20displays%20security%20monitoring%20dashboard%20red%20orange%20alert%20indicators%20professional%20admin%20interface%20futuristic%20control%20panel&width=1200&height=150&seq=alerts_bg&orientation=landscape)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/60 to-orange-900/60 rounded-t-2xl"></div>
            <h3 className="relative text-xl font-semibold text-white">System Alerts</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {systemAlerts.map((alert, index) => (
                <div key={alert.id} className="group flex items-start space-x-3 p-4 rounded-xl border-l-4 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300" style={{
                  borderLeftColor: 
                    alert.type === 'error' ? '#ef4444' :
                    alert.type === 'warning' ? '#f59e0b' :
                    alert.type === 'success' ? '#10b981' : '#3b82f6',
                  animationDelay: `${index * 100}ms`
                }}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 backdrop-blur-sm ${
                    alert.type === 'error' ? 'bg-red-500/20 border border-red-500/30' :
                    alert.type === 'warning' ? 'bg-yellow-500/20 border border-yellow-500/30' :
                    alert.type === 'success' ? 'bg-green-500/20 border border-green-500/30' : 'bg-blue-500/20 border border-blue-500/30'
                  }`}>
                    <i className={`text-sm ${
                      alert.type === 'error' ? 'ri-error-warning-line text-red-400' :
                      alert.type === 'warning' ? 'ri-alert-line text-yellow-400' :
                      alert.type === 'success' ? 'ri-check-line text-green-400' : 
                      'ri-information-line text-blue-400'
                    }`}></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white group-hover:text-gray-200 transition-colors duration-300">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                  <button className="text-gray-400 hover:text-white cursor-pointer transform hover:scale-110 transition-all duration-300">
                    <i className="ri-close-line"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className={`bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <div 
            className="absolute inset-0 rounded-2xl opacity-10"
            style={{
              backgroundImage: `url(https://readdy.ai/api/search-image?query=Administrator%20action%20center%20with%20holographic%20admin%20tools%20floating%20control%20panels%20system%20management%20interface%20red%20orange%20gradient%20lighting%20professional%20technology%20background&width=1200&height=300&seq=admin_actions_bg&orientation=landscape)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="relative">
            <h3 className="text-xl font-semibold text-white mb-6 transform hover:scale-105 transition-transform duration-300">Admin Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { href: '/dashboard/admin/users', text: 'Manage Users', icon: 'ri-user-settings-line', color: 'blue' },
                { href: '/dashboard/admin/commission', text: 'Commission Rules', icon: 'ri-money-dollar-circle-line', color: 'green' },
                { href: '/dashboard/admin/reports', text: 'System Reports', icon: 'ri-file-chart-line', color: 'purple' },
                { href: '#', text: 'Export Data', icon: 'ri-database-line', color: 'orange' }
              ].map((action, index) => (
                <Link 
                  key={index}
                  href={action.href} 
                  className={`group bg-gradient-to-r from-${action.color}-600/20 to-${action.color}-800/20 hover:from-${action.color}-600/30 hover:to-${action.color}-800/30 backdrop-blur-sm text-white px-6 py-4 rounded-xl text-sm font-medium text-center whitespace-nowrap cursor-pointer transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 border border-${action.color}-500/30 hover:border-${action.color}-400/50 shadow-lg hover:shadow-2xl`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <i className={`${action.icon} text-2xl text-${action.color}-300 group-hover:text-${action.color}-200 group-hover:animate-bounce transition-all duration-300`}></i>
                    <span className="group-hover:text-red-200 transition-colors duration-300">{action.text}</span>
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

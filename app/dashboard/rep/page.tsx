
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SalesRepDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
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

  // Mock data
  const salesData = {
    totalSales: 125000,
    monthlyCommission: 8500,
    closedDeals: 15,
    activePipeline: 32,
    conversionRate: 68
  };

  const recentDeals = [
    { id: 1, company: 'Tech Solutions Inc', value: 15000, status: 'Won', date: '2024-01-15' },
    { id: 2, company: 'Digital Marketing Co', value: 8500, status: 'Negotiating', date: '2024-01-14' },
    { id: 3, company: 'Global Services Ltd', value: 22000, status: 'Won', date: '2024-01-13' },
    { id: 4, company: 'Innovation Hub', value: 12000, status: 'Contacted', date: '2024-01-12' },
    { id: 5, company: 'StartupXYZ', value: 6800, status: 'Lead', date: '2024-01-11' }
  ];

  const commissionHistory = [
    { month: 'January 2024', amount: 8500, deals: 15 },
    { month: 'December 2023', amount: 7200, deals: 12 },
    { month: 'November 2023', amount: 9100, deals: 18 },
    { month: 'October 2023', amount: 6800, deals: 11 }
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 30,
            top: mousePosition.y / 30,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse delay-1000" />
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/60 rounded-full animate-ping" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400/60 rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-pink-400/40 rounded-full animate-bounce delay-700" />
      </div>

      {/* Background Video/Image Hero Section */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(https://readdy.ai/api/search-image?query=Modern%20futuristic%20sales%20analytics%20dashboard%20holographic%20interface%20with%20floating%20data%20visualization%20charts%20graphs%20financial%20metrics%20digital%20workspace%20neon%20blue%20purple%20lighting%20effects%20professional%20business%20technology%20background%20cinematic%20composition&width=1920&height=1080&seq=sales_bg_video&orientation=landscape)`,
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
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
                SalesForce Pro
              </Link>
              <div className="ml-8 flex items-center space-x-6">
                <Link href="/dashboard/rep" className="text-blue-400 font-medium hover:text-blue-300 transition-colors duration-200">Dashboard</Link>
                <Link href="/dashboard/rep/leads" className="text-gray-300 hover:text-white transition-colors duration-200">Leads</Link>
                <Link href="/dashboard/rep/deals" className="text-gray-300 hover:text-white transition-colors duration-200">Deals</Link>
                <Link href="/dashboard/rep/commission" className="text-gray-300 hover:text-white transition-colors duration-200">Commission</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">Welcome, Sales Rep</span>
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
        <div className={`mb-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2 transform hover:scale-105 transition-transform duration-300">
            Sales Dashboard
          </h1>
          <p className="text-gray-300 text-lg">Track your sales performance and commission earnings</p>
        </div>

        {/* Period Selector */}
        <div className={`mb-6 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <div className="bg-white/10 backdrop-blur-lg p-1 rounded-xl shadow-2xl inline-flex border border-white/20">
            {['week', 'month', 'quarter'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-6 py-3 rounded-lg text-sm font-medium capitalize whitespace-nowrap cursor-pointer transform hover:scale-105 transition-all duration-300 ${
                  selectedPeriod === period
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                This {period}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          {[
            { icon: 'ri-money-dollar-circle-line', label: 'Total Sales', value: `$${salesData.totalSales.toLocaleString()}`, color: 'green', bg: 'from-green-500/20 to-emerald-500/20' },
            { icon: 'ri-bank-card-line', label: 'Commission', value: `$${salesData.monthlyCommission.toLocaleString()}`, color: 'blue', bg: 'from-blue-500/20 to-cyan-500/20' },
            { icon: 'ri-trophy-line', label: 'Closed Deals', value: salesData.closedDeals, color: 'purple', bg: 'from-purple-500/20 to-violet-500/20' },
            { icon: 'ri-line-chart-line', label: 'Pipeline', value: salesData.activePipeline, color: 'orange', bg: 'from-orange-500/20 to-yellow-500/20' },
            { icon: 'ri-percent-line', label: 'Conversion', value: `${salesData.conversionRate}%`, color: 'pink', bg: 'from-pink-500/20 to-rose-500/20' }
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
                  <p className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">{item.value}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          ))}
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          {/* Recent Deals */}
          <div className="group bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden">
            <div 
              className="relative p-6 border-b border-white/20"
              style={{
                backgroundImage: `url(https://readdy.ai/api/search-image?query=Abstract%20business%20data%20visualization%20with%20holographic%20charts%20floating%20numbers%20financial%20graphs%20blue%20purple%20neon%20lighting%20modern%20digital%20interface%20background%20professional%20sales%20analytics&width=800&height=200&seq=deals_header_bg&orientation=landscape)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
              <h3 className="relative text-xl font-semibold text-white group-hover:text-blue-200 transition-colors duration-300">Recent Deals</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentDeals.map((deal, index) => (
                  <div 
                    key={deal.id} 
                    className="group/item flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] border border-white/10 hover:border-white/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-white group-hover/item:text-blue-200 transition-colors duration-300">{deal.company}</h4>
                      <p className="text-sm text-gray-400">{deal.date}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold text-green-300 group-hover/item:text-green-200 transition-colors duration-300">${deal.value.toLocaleString()}</span>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm border transition-all duration-300 ${
                        deal.status === 'Won' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                        deal.status === 'Negotiating' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                        deal.status === 'Contacted' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                        'bg-gray-500/20 text-gray-300 border-gray-500/30'
                      }`}>
                        {deal.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Commission History */}
          <div className="group bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden">
            <div 
              className="relative p-6 border-b border-white/20"
              style={{
                backgroundImage: `url(https://readdy.ai/api/search-image?query=Commission%20earnings%20money%20flow%20financial%20charts%20golden%20coins%20floating%20digital%20currency%20holographic%20display%20professional%20business%20background%20with%20blue%20purple%20gradient%20lighting%20effects&width=800&height=200&seq=commission_header_bg&orientation=landscape)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80"></div>
              <h3 className="relative text-xl font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">Commission History</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {commissionHistory.map((record, index) => (
                  <div 
                    key={index} 
                    className="group/item flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] border border-white/10 hover:border-white/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div>
                      <h4 className="font-medium text-white group-hover/item:text-purple-200 transition-colors duration-300">{record.month}</h4>
                      <p className="text-sm text-gray-400">{record.deals} deals closed</p>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-green-300 group-hover/item:text-green-200 transition-colors duration-300 text-lg">${record.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`mt-8 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <div 
            className="absolute inset-0 rounded-2xl opacity-10"
            style={{
              backgroundImage: `url(https://readdy.ai/api/search-image?query=Modern%20business%20workspace%20with%20holographic%20interface%20floating%20action%20buttons%20digital%20productivity%20tools%20futuristic%20office%20environment%20blue%20purple%20neon%20lighting%20professional%20technology%20background&width=1200&height=300&seq=actions_bg&orientation=landscape)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="relative">
            <h3 className="text-xl font-semibold text-white mb-6 transform hover:scale-105 transition-transform duration-300">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { href: '/dashboard/rep/leads/new', text: 'Add New Lead', icon: 'ri-user-add-line', color: 'blue' },
                { href: '/dashboard/rep/deals/new', text: 'Create Deal', icon: 'ri-briefcase-line', color: 'green' },
                { href: '/dashboard/rep/commission', text: 'View Commission', icon: 'ri-money-dollar-circle-line', color: 'purple' },
                { href: '#', text: 'Export Report', icon: 'ri-download-line', color: 'orange' }
              ].map((action, index) => (
                <Link 
                  key={index}
                  href={action.href} 
                  className={`group bg-gradient-to-r from-${action.color}-600/20 to-${action.color}-800/20 hover:from-${action.color}-600/30 hover:to-${action.color}-800/30 backdrop-blur-sm text-white px-6 py-4 rounded-xl text-sm font-medium text-center whitespace-nowrap cursor-pointer transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 border border-${action.color}-500/30 hover:border-${action.color}-400/50 shadow-lg hover:shadow-2xl`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <i className={`${action.icon} text-2xl text-${action.color}-300 group-hover:text-${action.color}-200 group-hover:animate-bounce transition-all duration-300`}></i>
                    <span className="group-hover:text-blue-200 transition-colors duration-300">{action.text}</span>
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

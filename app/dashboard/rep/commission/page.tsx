'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CommissionPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('current');
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

  // Mock commission data
  const commissionData = {
    current: {
      month: 'January 2024',
      earned: 8500,
      pending: 2300,
      paid: 6200,
      deals: 15,
      target: 10000,
      rate: 7.5
    },
    ytd: {
      earned: 8500,
      paid: 6200,
      pending: 2300,
      deals: 15
    }
  };

  const commissionHistory = [
    { id: 1, month: 'January 2024', deals: 15, sales: 125000, commission: 8500, rate: 7.5, status: 'Pending', date: '2024-01-31' },
    { id: 2, month: 'December 2023', deals: 12, sales: 98000, commission: 7200, rate: 7.5, status: 'Paid', date: '2023-12-31' },
    { id: 3, month: 'November 2023', deals: 18, sales: 142000, commission: 9100, rate: 7.5, status: 'Paid', date: '2023-11-30' },
    { id: 4, month: 'October 2023', deals: 11, sales: 89000, commission: 6800, rate: 7.5, status: 'Paid', date: '2023-10-31' },
    { id: 5, month: 'September 2023', deals: 16, sales: 118000, commission: 8850, rate: 7.5, status: 'Paid', date: '2023-09-30' },
  ];

  const dealBreakdown = [
    { id: 1, title: 'Enterprise Software License', company: 'TechCorp Solutions', value: 85000, commission: 6375, rate: 7.5, date: '2024-01-20', status: 'Won' },
    { id: 2, title: 'Cloud Migration Services', company: 'Digital Innovations', value: 45000, commission: 3375, rate: 7.5, date: '2024-01-15', status: 'Won' },
    { id: 3, title: 'Annual Support Contract', company: 'Global Enterprises', value: 120000, commission: 9000, rate: 7.5, date: '2024-01-10', status: 'Won' },
    { id: 4, title: 'Training Package', company: 'StartupXYZ', value: 15000, commission: 1125, rate: 7.5, date: '2024-01-08', status: 'Won' },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-yellow-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 30,
            top: mousePosition.y / 30,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-400/15 to-yellow-400/15 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-amber-400/10 to-yellow-400/10 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <header className="relative bg-white/10 backdrop-blur-xl shadow-2xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
                SalesForce Pro
              </Link>
              <div className="ml-8 flex items-center space-x-6">
                <Link href="/dashboard/rep" className="text-gray-300 hover:text-white transition-colors duration-200">Dashboard</Link>
                <Link href="/dashboard/rep/leads" className="text-gray-300 hover:text-white transition-colors duration-200">Leads</Link>
                <Link href="/dashboard/rep/deals" className="text-gray-300 hover:text-white transition-colors duration-200">Deals</Link>
                <Link href="/dashboard/rep/commission" className="text-yellow-400 font-medium hover:text-yellow-300 transition-colors duration-200">Commission</Link>
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
        {/* Page Header */}
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent mb-2 transform hover:scale-105 transition-transform duration-300">
              Commission Tracking
            </h1>
            <p className="text-gray-300 text-lg">Monitor your earnings and commission structure</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="bg-white/10 backdrop-blur-lg p-1 rounded-xl shadow-2xl inline-flex border border-white/20">
              {['current', 'ytd', 'history'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap cursor-pointer transform hover:scale-105 transition-all duration-300 ${
                    selectedPeriod === period
                      ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {period === 'ytd' ? 'Year to Date' : period}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Commission Overview Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          {[
            { 
              icon: 'ri-money-dollar-circle-line', 
              label: 'Total Earned', 
              value: `$${commissionData.current.earned.toLocaleString()}`, 
              color: 'green',
              bg: 'from-green-500/20 to-emerald-500/20',
              change: '+12%'
            },
            { 
              icon: 'ri-time-line', 
              label: 'Pending', 
              value: `$${commissionData.current.pending.toLocaleString()}`, 
              color: 'yellow',
              bg: 'from-yellow-500/20 to-orange-500/20',
              change: '+5%'
            },
            { 
              icon: 'ri-check-double-line', 
              label: 'Paid Out', 
              value: `$${commissionData.current.paid.toLocaleString()}`, 
              color: 'blue',
              bg: 'from-blue-500/20 to-cyan-500/20',
              change: '+8%'
            },
            { 
              icon: 'ri-percent-line', 
              label: 'Commission Rate', 
              value: `${commissionData.current.rate}%`, 
              color: 'purple',
              bg: 'from-purple-500/20 to-pink-500/20',
              change: 'Fixed'
            }
          ].map((item, index) => (
            <div 
              key={index}
              className={`group bg-gradient-to-br ${item.bg} backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 hover:border-white/40 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r from-${item.color}-400/30 to-${item.color}-600/30 rounded-xl flex items-center justify-center group-hover:animate-bounce transition-all duration-300 backdrop-blur-sm`}>
                  <i className={`${item.icon} text-2xl text-${item.color}-300 group-hover:text-${item.color}-200 group-hover:scale-110 transition-all duration-300`}></i>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  item.change.startsWith('+') ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'
                }`}>
                  {item.change}
                </span>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-1">{item.label}</p>
                <p className="text-2xl font-bold text-white group-hover:text-yellow-200 transition-colors duration-300">{item.value}</p>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          ))}
        </div>

        {/* Commission Progress */}
        <div className={`bg-white/5 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/20 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Monthly Target Progress</h3>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-400">
                ${commissionData.current.earned.toLocaleString()} / ${commissionData.current.target.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">
                {Math.round((commissionData.current.earned / commissionData.current.target) * 100)}% of target achieved
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-4 rounded-full relative overflow-hidden transition-all duration-1000"
                style={{ width: `${Math.min((commissionData.current.earned / commissionData.current.target) * 100, 100)}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>$0</span>
              <span>${commissionData.current.target.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Commission History */}
          <div className={`group bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}>
            <div className="p-6 border-b border-white/20">
              <h3 className="text-xl font-semibold text-white group-hover:text-yellow-200 transition-colors duration-300">
                Commission History
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {commissionHistory.slice(0, 5).map((record, index) => (
                  <div 
                    key={record.id} 
                    className="group/item flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] border border-white/10 hover:border-white/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-white group-hover/item:text-yellow-200 transition-colors duration-300">
                        {record.month}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {record.deals} deals • ${record.sales.toLocaleString()} sales
                      </p>
                    </div>
                    <div className="text-right mr-4">
                      <span className="font-semibold text-green-400 group-hover/item:text-green-300 transition-colors duration-300 text-lg">
                        ${record.commission.toLocaleString()}
                      </span>
                      <div className="text-xs text-gray-500">{record.rate}% rate</div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm border ${
                      record.status === 'Paid' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                    }`}>
                      {record.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Deal Breakdown */}
          <div className={`group bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}>
            <div className="p-6 border-b border-white/20">
              <h3 className="text-xl font-semibold text-white group-hover:text-yellow-200 transition-colors duration-300">
                Current Month Deals
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dealBreakdown.map((deal, index) => (
                  <div 
                    key={deal.id} 
                    className="group/item p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] border border-white/10 hover:border-white/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-white group-hover/item:text-yellow-200 transition-colors duration-300 text-sm">
                          {deal.title}
                        </h4>
                        <p className="text-xs text-gray-400">{deal.company}</p>
                      </div>
                      <span className="bg-green-500/20 text-green-300 border-green-500/30 px-2 py-1 text-xs font-medium rounded-full border backdrop-blur-sm">
                        {deal.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-gray-400">Deal: </span>
                        <span className="text-white">${deal.value.toLocaleString()}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-yellow-400">${deal.commission.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{deal.rate}% commission</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Commission Rules */}
        <div className={`mt-8 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <h3 className="text-xl font-semibold text-white mb-6 transform hover:scale-105 transition-transform duration-300">
            Commission Structure
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: 'Standard Rate', 
                rate: '7.5%', 
                description: 'Base commission on all closed deals',
                icon: 'ri-percent-line',
                color: 'blue'
              },
              { 
                title: 'Enterprise Bonus', 
                rate: '+2%', 
                description: 'Additional commission for deals over $50K',
                icon: 'ri-building-line',
                color: 'green'
              },
              { 
                title: 'New Customer', 
                rate: '+$500', 
                description: 'Flat bonus for first-time customers',
                icon: 'ri-user-add-line',
                color: 'purple'
              }
            ].map((rule, index) => (
              <div key={index} className="group p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transform hover:scale-105 transition-all duration-300">
                <div className={`w-12 h-12 bg-gradient-to-r from-${rule.color}-500/20 to-${rule.color}-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:animate-bounce`}>
                  <i className={`${rule.icon} text-2xl text-${rule.color}-400`}></i>
                </div>
                <h4 className="font-semibold text-white mb-2 group-hover:text-yellow-200 transition-colors duration-300">
                  {rule.title}
                </h4>
                <div className="text-2xl font-bold text-yellow-400 mb-2">{rule.rate}</div>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {rule.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
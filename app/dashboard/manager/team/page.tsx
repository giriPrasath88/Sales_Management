'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TeamManagementPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
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
  const teamMembers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@demo.com',
      role: 'Senior Sales Rep',
      status: 'Active',
      performance: 125,
      sales: 125000,
      commission: 8500,
      deals: 15,
      conversion: 68,
      lastActivity: '2024-01-15',
      joinDate: '2023-03-15',
      avatar: 'JS'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@demo.com',
      role: 'Sales Rep',
      status: 'Active',
      performance: 98,
      sales: 98000,
      commission: 6800,
      deals: 12,
      conversion: 75,
      lastActivity: '2024-01-14',
      joinDate: '2023-05-20',
      avatar: 'SJ'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike@demo.com',
      role: 'Sales Rep',
      status: 'Active',
      performance: 110,
      sales: 110000,
      commission: 7700,
      deals: 14,
      conversion: 71,
      lastActivity: '2024-01-15',
      joinDate: '2023-01-10',
      avatar: 'MW'
    },
    {
      id: 4,
      name: 'Lisa Chen',
      email: 'lisa@demo.com',
      role: 'Senior Sales Rep',
      status: 'Active',
      performance: 152,
      sales: 152000,
      commission: 10600,
      deals: 18,
      conversion: 82,
      lastActivity: '2024-01-15',
      joinDate: '2022-11-05',
      avatar: 'LC'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david@demo.com',
      role: 'Junior Sales Rep',
      status: 'Training',
      performance: 45,
      sales: 45000,
      commission: 3200,
      deals: 6,
      conversion: 52,
      lastActivity: '2024-01-12',
      joinDate: '2024-01-01',
      avatar: 'DB'
    }
  ];

  const teamStats = {
    total: teamMembers.length,
    active: teamMembers.filter(m => m.status === 'Active').length,
    training: teamMembers.filter(m => m.status === 'Training').length,
    totalSales: teamMembers.reduce((sum, m) => sum + m.sales, 0),
    totalCommission: teamMembers.reduce((sum, m) => sum + m.commission, 0),
    avgConversion: Math.round(teamMembers.reduce((sum, m) => sum + m.conversion, 0) / teamMembers.length)
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesFilter = selectedFilter === 'all' || member.status.toLowerCase() === selectedFilter;
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
      </div>

      {/* Header */}
      <header className="relative bg-white/10 backdrop-blur-xl shadow-2xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
                SalesForce Pro
              </Link>
              <div className="ml-8 flex items-center space-x-6">
                <Link href="/dashboard/manager" className="text-gray-300 hover:text-white transition-colors duration-200">Dashboard</Link>
                <Link href="/dashboard/manager/team" className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors duration-200">Team</Link>
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
        {/* Page Header */}
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent mb-2 transform hover:scale-105 transition-transform duration-300">
              Team Management
            </h1>
            <p className="text-gray-300 text-lg">Monitor and manage your sales team performance</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link href="/dashboard/manager/team/add" className="group bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium whitespace-nowrap cursor-pointer transform hover:scale-110 hover:shadow-2xl transition-all duration-300 border border-indigo-500/30">
              <i className="ri-user-add-line mr-2 group-hover:animate-bounce"></i>
              Add Team Member
            </Link>
          </div>
        </div>

        {/* Team Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          {[
            { icon: 'ri-team-line', label: 'Total Members', value: teamStats.total, color: 'blue', bg: 'from-blue-500/20 to-cyan-500/20' },
            { icon: 'ri-user-line', label: 'Active', value: teamStats.active, color: 'green', bg: 'from-green-500/20 to-emerald-500/20' },
            { icon: 'ri-graduation-cap-line', label: 'Training', value: teamStats.training, color: 'yellow', bg: 'from-yellow-500/20 to-orange-500/20' },
            { icon: 'ri-money-dollar-circle-line', label: 'Total Sales', value: `$${(teamStats.totalSales/1000).toFixed(0)}K`, color: 'purple', bg: 'from-purple-500/20 to-violet-500/20' },
            { icon: 'ri-bank-card-line', label: 'Commission', value: `$${(teamStats.totalCommission/1000).toFixed(0)}K`, color: 'pink', bg: 'from-pink-500/20 to-rose-500/20' },
            { icon: 'ri-percent-line', label: 'Avg Conversion', value: `${teamStats.avgConversion}%`, color: 'indigo', bg: 'from-indigo-500/20 to-purple-500/20' }
          ].map((item, index) => (
            <div 
              key={index}
              className={`group bg-gradient-to-br ${item.bg} backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20 hover:border-white/40 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center">
                <div className={`w-10 h-10 bg-gradient-to-r from-${item.color}-400/30 to-${item.color}-600/30 rounded-xl flex items-center justify-center group-hover:animate-bounce transition-all duration-300 backdrop-blur-sm`}>
                  <i className={`${item.icon} text-lg text-${item.color}-300 group-hover:text-${item.color}-200 group-hover:scale-110 transition-all duration-300`}></i>
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{item.label}</p>
                  <p className="text-lg font-bold text-white group-hover:text-indigo-200 transition-colors duration-300">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className={`bg-white/5 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/20 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search team members by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {['all', 'active', 'training'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-3 rounded-xl font-medium cursor-pointer transition-all duration-300 border whitespace-nowrap ${
                    selectedFilter === filter
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {filter === 'all' ? 'All Members' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          {filteredMembers.map((member, index) => (
            <div
              key={member.id}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                {/* Member Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4 group-hover:animate-bounce">
                      {member.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-indigo-200 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
                    member.status === 'Active' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                  }`}>
                    {member.status}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/5 rounded-xl p-3">
                    <div className="text-2xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">
                      ${(member.sales/1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-gray-500">Total Sales</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <div className="text-2xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                      {member.deals}
                    </div>
                    <div className="text-xs text-gray-500">Deals Closed</div>
                  </div>
                </div>

                {/* Performance Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Performance Score</span>
                    <span>{member.performance}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        member.performance >= 100 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                        member.performance >= 75 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                        'bg-gradient-to-r from-yellow-500 to-orange-500'
                      }`}
                      style={{ width: `${Math.min(member.performance, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    <i className="ri-mail-line mr-2 text-blue-400 text-sm"></i>
                    <span className="text-sm">{member.email}</span>
                  </div>
                  <div className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    <i className="ri-calendar-line mr-2 text-green-400 text-sm"></i>
                    <span className="text-sm">Last Active: {member.lastActivity}</span>
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-400">${(member.commission/1000).toFixed(1)}K</div>
                    <div className="text-xs text-gray-500">Commission</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-400">{member.conversion}%</div>
                    <div className="text-xs text-gray-500">Conversion</div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="w-8 h-8 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 hover:text-indigo-300 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-indigo-500/30">
                      <i className="ri-user-line text-sm"></i>
                    </button>
                    <button className="w-8 h-8 bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-green-500/30">
                      <i className="ri-chat-1-line text-sm"></i>
                    </button>
                    <button className="w-8 h-8 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 hover:text-purple-300 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-purple-500/30">
                      <i className="ri-more-2-line text-sm"></i>
                    </button>
                  </div>
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-team-line text-4xl text-gray-400"></i>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No team members found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
            <Link href="/dashboard/manager/team/add" className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium cursor-pointer transform hover:scale-105 transition-all duration-300">
              Add Team Member
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DealsPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [selectedStage, setSelectedStage] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
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

  // Mock deals data
  const deals = [
    {
      id: 1,
      title: 'Enterprise Software License',
      company: 'TechCorp Solutions',
      contact: 'John Smith',
      value: 85000,
      stage: 'Negotiating',
      probability: 75,
      expectedClose: '2024-02-15',
      source: 'Referral',
      priority: 'High',
      description: 'Complete software licensing solution for enterprise-level deployment.'
    },
    {
      id: 2,
      title: 'Cloud Migration Services',
      company: 'Digital Innovations',
      contact: 'Sarah Johnson',
      value: 45000,
      stage: 'Proposal',
      probability: 60,
      expectedClose: '2024-02-28',
      source: 'Website',
      priority: 'Medium',
      description: 'Full cloud infrastructure migration and setup services.'
    },
    {
      id: 3,
      title: 'Annual Support Contract',
      company: 'Global Enterprises',
      contact: 'Mike Chen',
      value: 120000,
      stage: 'Won',
      probability: 100,
      expectedClose: '2024-01-20',
      source: 'LinkedIn',
      priority: 'High',
      description: 'Comprehensive annual support and maintenance contract.'
    },
    {
      id: 4,
      title: 'Training Package',
      company: 'StartupXYZ',
      contact: 'Emma Wilson',
      value: 15000,
      stage: 'Qualified',
      probability: 40,
      expectedClose: '2024-03-10',
      source: 'Cold Call',
      priority: 'Low',
      description: 'Staff training and onboarding package for new system implementation.'
    },
    {
      id: 5,
      title: 'Custom Development',
      company: 'Future Systems',
      contact: 'David Brown',
      value: 95000,
      stage: 'Lost',
      probability: 0,
      expectedClose: '2024-01-30',
      source: 'Trade Show',
      priority: 'Medium',
      description: 'Custom software development for specific business requirements.'
    }
  ];

  const stages = ['Qualified', 'Proposal', 'Negotiating', 'Won', 'Lost'];
  const stageCounts = {
    all: deals.length,
    ...stages.reduce((acc, stage) => {
      acc[stage] = deals.filter(d => d.stage === stage).length;
      return acc;
    }, {} as Record<string, number>)
  };

  const filteredDeals = deals.filter(deal => {
    const matchesStage = selectedStage === 'all' || deal.stage === selectedStage;
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.contact.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStage && matchesSearch;
  });

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 30,
            top: mousePosition.y / 30,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/15 to-teal-400/15 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-teal-400/10 to-green-400/10 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <header className="relative bg-white/10 backdrop-blur-xl shadow-2xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
                SalesForce Pro
              </Link>
              <div className="ml-8 flex items-center space-x-6">
                <Link href="/dashboard/rep" className="text-gray-300 hover:text-white transition-colors duration-200">Dashboard</Link>
                <Link href="/dashboard/rep/leads" className="text-gray-300 hover:text-white transition-colors duration-200">Leads</Link>
                <Link href="/dashboard/rep/deals" className="text-green-400 font-medium hover:text-green-300 transition-colors duration-200">Deals</Link>
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
        {/* Page Header */}
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mb-2 transform hover:scale-105 transition-transform duration-300">
              Deal Management
            </h1>
            <p className="text-gray-300 text-lg">Track and manage your sales opportunities</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link href="/dashboard/rep/deals/new" className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-medium whitespace-nowrap cursor-pointer transform hover:scale-110 hover:shadow-2xl transition-all duration-300 border border-green-500/30">
              <i className="ri-briefcase-line mr-2 group-hover:animate-bounce"></i>
              Create New Deal
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          {Object.entries(stageCounts).map(([stage, count], index) => (
            <button
              key={stage}
              onClick={() => setSelectedStage(stage)}
              className={`group p-4 rounded-xl backdrop-blur-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border ${
                selectedStage === stage
                  ? 'bg-gradient-to-r from-green-600/30 to-emerald-600/30 border-green-500/50 shadow-lg'
                  : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white group-hover:text-green-200 transition-colors duration-300">
                  {count}
                </div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 capitalize">
                  {stage === 'all' ? 'Total' : stage}
                </div>
              </div>
            </button>
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
                  placeholder="Search deals by title, company, or contact..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl font-medium cursor-pointer transition-all duration-300 border border-white/20 hover:border-white/30 whitespace-nowrap">
                <i className="ri-filter-line mr-2"></i>
                Filter
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl font-medium cursor-pointer transition-all duration-300 border border-white/20 hover:border-white/30 whitespace-nowrap">
                <i className="ri-download-line mr-2"></i>
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          {filteredDeals.map((deal, index) => (
            <div
              key={deal.id}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                {/* Deal Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-200 transition-colors duration-300 mb-1">
                      {deal.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm">
                      {deal.company} • {deal.contact}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
                    deal.priority === 'High' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                    deal.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                    'bg-green-500/20 text-green-300 border-green-500/30'
                  }`}>
                    {deal.priority}
                  </div>
                </div>

                {/* Deal Value */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">
                      ${deal.value.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Deal Value</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                      {deal.probability}%
                    </div>
                    <div className="text-xs text-gray-500">Probability</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{deal.probability}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500 group-hover:from-green-400 group-hover:to-emerald-400"
                      style={{ width: `${deal.probability}%` }}
                    ></div>
                  </div>
                </div>

                {/* Deal Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    <i className="ri-calendar-line mr-2 text-blue-400"></i>
                    <span className="text-sm">Expected Close: {deal.expectedClose}</span>
                  </div>
                  <div className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    <i className="ri-links-line mr-2 text-purple-400"></i>
                    <span className="text-sm">Source: {deal.source}</span>
                  </div>
                  <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300 line-clamp-2">
                    {deal.description}
                  </p>
                </div>

                {/* Status and Actions */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
                    deal.stage === 'Won' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                    deal.stage === 'Lost' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                    deal.stage === 'Negotiating' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                    deal.stage === 'Proposal' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                    'bg-gray-500/20 text-gray-300 border-gray-500/30'
                  }`}>
                    {deal.stage}
                  </span>
                  <div className="flex space-x-2">
                    <button className="w-8 h-8 bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-green-500/30">
                      <i className="ri-edit-line text-sm"></i>
                    </button>
                    <button className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-blue-500/30">
                      <i className="ri-eye-line text-sm"></i>
                    </button>
                    <button className="w-8 h-8 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 hover:text-purple-300 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-purple-500/30">
                      <i className="ri-share-line text-sm"></i>
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
        {filteredDeals.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-briefcase-line text-4xl text-gray-400"></i>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No deals found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
            <Link href="/dashboard/rep/deals/new" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-medium cursor-pointer transform hover:scale-105 transition-all duration-300">
              Create Your First Deal
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LeadsPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState('all');
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

  // Mock leads data
  const leads = [
    {
      id: 1,
      name: 'John Smith',
      company: 'TechCorp Solutions',
      email: 'john@techcorp.com',
      phone: '+1 (555) 123-4567',
      status: 'Lead',
      value: 25000,
      source: 'Website',
      date: '2024-01-15',
      priority: 'High'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      company: 'Digital Innovations',
      email: 'sarah@digitalinno.com',
      phone: '+1 (555) 234-5678',
      status: 'Contacted',
      value: 18000,
      source: 'Referral',
      date: '2024-01-14',
      priority: 'Medium'
    },
    {
      id: 3,
      name: 'Mike Chen',
      company: 'Global Enterprises',
      email: 'mike@global.com',
      phone: '+1 (555) 345-6789',
      status: 'Negotiating',
      value: 45000,
      source: 'LinkedIn',
      date: '2024-01-13',
      priority: 'High'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      company: 'StartupXYZ',
      email: 'emma@startupxyz.com',
      phone: '+1 (555) 456-7890',
      status: 'Won',
      value: 12000,
      source: 'Cold Email',
      date: '2024-01-12',
      priority: 'Low'
    },
    {
      id: 5,
      name: 'David Brown',
      company: 'Future Systems',
      email: 'david@futuresys.com',
      phone: '+1 (555) 567-8901',
      status: 'Lost',
      value: 35000,
      source: 'Trade Show',
      date: '2024-01-11',
      priority: 'Medium'
    },
    {
      id: 6,
      name: 'Lisa Martinez',
      company: 'Innovation Hub',
      email: 'lisa@innovhub.com',
      phone: '+1 (555) 678-9012',
      status: 'Lead',
      value: 28000,
      source: 'Google Ads',
      date: '2024-01-10',
      priority: 'High'
    }
  ];

  const statusCounts = {
    all: leads.length,
    Lead: leads.filter(l => l.status === 'Lead').length,
    Contacted: leads.filter(l => l.status === 'Contacted').length,
    Negotiating: leads.filter(l => l.status === 'Negotiating').length,
    Won: leads.filter(l => l.status === 'Won').length,
    Lost: leads.filter(l => l.status === 'Lost').length
  };

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
      </div>

      {/* Background Video/Image */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(https://readdy.ai/api/search-image?query=Modern%20business%20leads%20management%20interface%20with%20holographic%20contact%20cards%20floating%20digital%20profiles%20customer%20relationship%20management%20futuristic%20CRM%20dashboard%20with%20blue%20purple%20neon%20lighting%20professional%20technology%20background&width=1920&height=1080&seq=leads_bg_main&orientation=landscape)`,
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
                <Link href="/dashboard/rep" className="text-gray-300 hover:text-white transition-colors duration-200">Dashboard</Link>
                <Link href="/dashboard/rep/leads" className="text-blue-400 font-medium hover:text-blue-300 transition-colors duration-200">Leads</Link>
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
        {/* Page Header */}
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2 transform hover:scale-105 transition-transform duration-300">
              Lead Management
            </h1>
            <p className="text-gray-300 text-lg">Track and manage your sales leads</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link href="/dashboard/rep/leads/new" className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium whitespace-nowrap cursor-pointer transform hover:scale-110 hover:shadow-2xl transition-all duration-300 border border-blue-500/30">
              <i className="ri-user-add-line mr-2 group-hover:animate-bounce"></i>
              Add New Lead
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          {Object.entries(statusCounts).map(([status, count], index) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`group p-4 rounded-xl backdrop-blur-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border ${
                selectedStatus === status
                  ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-blue-500/50 shadow-lg'
                  : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">
                  {count}
                </div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 capitalize">
                  {status === 'all' ? 'Total' : status}
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
                  placeholder="Search leads by name, company, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
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

        {/* Leads Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          {filteredLeads.map((lead, index) => (
            <div
              key={lead.id}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Background */}
              <div 
                className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                style={{
                  backgroundImage: `url(https://readdy.ai/api/search-image?query=Professional%20business%20card%20design%20holographic%20pattern%20with%20digital%20circuit%20board%20elements%20futuristic%20networking%20background%20blue%20purple%20gradient%20abstract%20technology%20pattern&width=400&height=300&seq=lead_card_${lead.id}&orientation=landscape)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              
              <div className="relative">
                {/* Lead Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors duration-300 mb-1">
                      {lead.name}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {lead.company}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
                    lead.priority === 'High' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                    lead.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                    'bg-green-500/20 text-green-300 border-green-500/30'
                  }`}>
                    {lead.priority}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    <i className="ri-mail-line mr-2 text-blue-400"></i>
                    <span className="text-sm">{lead.email}</span>
                  </div>
                  <div className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    <i className="ri-phone-line mr-2 text-green-400"></i>
                    <span className="text-sm">{lead.phone}</span>
                  </div>
                </div>

                {/* Lead Details */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">
                      ${lead.value.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Potential Value</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {lead.source}
                    </div>
                    <div className="text-xs text-gray-500">{lead.date}</div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
                    lead.status === 'Won' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                    lead.status === 'Lost' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                    lead.status === 'Negotiating' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                    lead.status === 'Contacted' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                    'bg-gray-500/20 text-gray-300 border-gray-500/30'
                  }`}>
                    {lead.status}
                  </span>
                  <div className="flex space-x-2">
                    <button className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-blue-500/30">
                      <i className="ri-edit-line text-sm"></i>
                    </button>
                    <button className="w-8 h-8 bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-green-500/30">
                      <i className="ri-phone-line text-sm"></i>
                    </button>
                    <button className="w-8 h-8 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 hover:text-purple-300 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-purple-500/30">
                      <i className="ri-mail-line text-sm"></i>
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
        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-user-search-line text-4xl text-gray-400"></i>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No leads found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
            <Link href="/dashboard/rep/leads/new" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium cursor-pointer transform hover:scale-105 transition-all duration-300">
              Add Your First Lead
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

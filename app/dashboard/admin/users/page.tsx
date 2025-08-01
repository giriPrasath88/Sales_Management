'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserManagementPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
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

  // Mock users data
  const users = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@demo.com',
      role: 'Sales Rep',
      status: 'Active',
      lastLogin: '2024-01-15 14:30',
      joinDate: '2023-03-15',
      performance: 125,
      sales: 125000,
      permissions: ['view_leads', 'manage_deals'],
      avatar: 'JS',
      department: 'Sales'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@demo.com',
      role: 'Sales Rep',
      status: 'Active',
      lastLogin: '2024-01-15 16:45',
      joinDate: '2023-05-20',
      performance: 98,
      sales: 98000,
      permissions: ['view_leads', 'manage_deals'],
      avatar: 'SJ',
      department: 'Sales'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike@demo.com',
      role: 'Manager',
      status: 'Active',
      lastLogin: '2024-01-15 09:15',
      joinDate: '2023-01-10',
      performance: 110,
      sales: 0,
      permissions: ['manage_team', 'view_pipeline', 'generate_reports'],
      avatar: 'MW',
      department: 'Sales'
    },
    {
      id: 4,
      name: 'Lisa Chen',
      email: 'lisa@demo.com',
      role: 'Sales Rep',
      status: 'Active',
      lastLogin: '2024-01-15 11:20',
      joinDate: '2022-11-05',
      performance: 152,
      sales: 152000,
      permissions: ['view_leads', 'manage_deals'],
      avatar: 'LC',
      department: 'Sales'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david@demo.com',
      role: 'Manager',
      status: 'Inactive',
      lastLogin: '2024-01-10 17:30',
      joinDate: '2022-08-15',
      performance: 95,
      sales: 0,
      permissions: ['manage_team', 'view_pipeline'],
      avatar: 'DB',
      department: 'Sales'
    },
    {
      id: 6,
      name: 'Emma Thompson',
      email: 'emma@demo.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2024-01-15 08:00',
      joinDate: '2022-01-01',
      performance: 100,
      sales: 0,
      permissions: ['manage_users', 'system_config', 'all_access'],
      avatar: 'ET',
      department: 'IT'
    }
  ];

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'Active').length,
    inactive: users.filter(u => u.status === 'Inactive').length,
    salesReps: users.filter(u => u.role === 'Sales Rep').length,
    managers: users.filter(u => u.role === 'Manager').length,
    admins: users.filter(u => u.role === 'Admin').length
  };

  const filteredUsers = users.filter(user => {
    const matchesRole = selectedRole === 'all' || user.role.toLowerCase().replace(' ', '_') === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status.toLowerCase() === selectedStatus;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });

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
      </div>

      {/* Header */}
      <header className="relative bg-white/10 backdrop-blur-xl shadow-2xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
                SalesForce Pro
              </Link>
              <div className="ml-8 flex items-center space-x-6">
                <Link href="/dashboard/admin" className="text-gray-300 hover:text-white transition-colors duration-200">Dashboard</Link>
                <Link href="/dashboard/admin/users" className="text-red-400 font-medium hover:text-red-300 transition-colors duration-200">Users</Link>
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
        {/* Page Header */}
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent mb-2 transform hover:scale-105 transition-transform duration-300">
              User Management
            </h1>
            <p className="text-gray-300 text-lg">Manage system users and their permissions</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Link href="/dashboard/admin/users/new" className="group bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-medium whitespace-nowrap cursor-pointer transform hover:scale-110 hover:shadow-2xl transition-all duration-300 border border-red-500/30">
              <i className="ri-user-add-line mr-2 group-hover:animate-bounce"></i>
              Add User
            </Link>
            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl font-medium cursor-pointer transition-all duration-300 border border-white/20 hover:border-white/30 whitespace-nowrap">
              <i className="ri-download-line mr-2"></i>
              Export
            </button>
          </div>
        </div>

        {/* User Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          {[
            { icon: 'ri-team-line', label: 'Total Users', value: userStats.total, color: 'blue', bg: 'from-blue-500/20 to-cyan-500/20' },
            { icon: 'ri-check-line', label: 'Active', value: userStats.active, color: 'green', bg: 'from-green-500/20 to-emerald-500/20' },
            { icon: 'ri-close-line', label: 'Inactive', value: userStats.inactive, color: 'red', bg: 'from-red-500/20 to-pink-500/20' },
            { icon: 'ri-user-line', label: 'Sales Reps', value: userStats.salesReps, color: 'purple', bg: 'from-purple-500/20 to-violet-500/20' },
            { icon: 'ri-group-line', label: 'Managers', value: userStats.managers, color: 'orange', bg: 'from-orange-500/20 to-yellow-500/20' },
            { icon: 'ri-admin-line', label: 'Admins', value: userStats.admins, color: 'pink', bg: 'from-pink-500/20 to-rose-500/20' }
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
                  <p className="text-lg font-bold text-white group-hover:text-red-200 transition-colors duration-300">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className={`bg-white/5 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/20 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search users by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="appearance-none bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/50 pr-8"
                >
                  <option value="all" className="bg-gray-800">All Roles</option>
                  <option value="sales_rep" className="bg-gray-800">Sales Rep</option>
                  <option value="manager" className="bg-gray-800">Manager</option>
                  <option value="admin" className="bg-gray-800">Admin</option>
                </select>
                <i className="ri-arrow-down-s-line absolute right-2 top-3 text-gray-400 pointer-events-none"></i>
              </div>
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/50 pr-8"
                >
                  <option value="all" className="bg-gray-800">All Status</option>
                  <option value="active" className="bg-gray-800">Active</option>
                  <option value="inactive" className="bg-gray-800">Inactive</option>
                </select>
                <i className="ri-arrow-down-s-line absolute right-2 top-3 text-gray-400 pointer-events-none"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className={`bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">User</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Role</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Performance</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Last Login</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id} className="border-b border-white/10 group hover:bg-white/5 transition-colors duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3 group-hover:animate-pulse">
                          {user.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-white group-hover:text-red-200 transition-colors duration-300">{user.name}</div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
                          user.role === 'Admin' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                          user.role === 'Manager' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                          'bg-blue-500/20 text-blue-300 border-blue-500/30'
                        }`}>
                          {user.role}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">{user.department}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
                        user.status === 'Active' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="w-24">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>{user.performance}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              user.performance >= 100 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                              user.performance >= 75 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                              'bg-gradient-to-r from-yellow-500 to-orange-500'
                            }`}
                            style={{ width: `${Math.min(user.performance, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-white group-hover:text-gray-200 transition-colors duration-300">
                        {user.lastLogin}
                      </div>
                      <div className="text-xs text-gray-500">
                        Joined: {user.joinDate}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end space-x-2">
                        <button className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-blue-500/30">
                          <i className="ri-eye-line text-sm"></i>
                        </button>
                        <button className="w-8 h-8 bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-green-500/30">
                          <i className="ri-edit-line text-sm"></i>
                        </button>
                        <button className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-red-500/30">
                          <i className="ri-settings-line text-sm"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-user-search-line text-4xl text-gray-400"></i>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No users found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
            <Link href="/dashboard/admin/users/new" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-medium cursor-pointer transform hover:scale-105 transition-all duration-300">
              Add First User
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
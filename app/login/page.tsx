
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('sales_rep');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate login process
    setTimeout(() => {
      // Demo credentials with enhanced role-based routing
      const validCredentials = [
        { 
          email: 'rep@demo.com', 
          password: 'demo123', 
          type: 'sales_rep', 
          redirect: '/dashboard/rep',
          name: 'Sales Representative',
          permissions: ['view_leads', 'manage_deals', 'track_commission']
        },
        { 
          email: 'manager@demo.com', 
          password: 'demo123', 
          type: 'manager', 
          redirect: '/dashboard/manager',
          name: 'Sales Manager',
          permissions: ['manage_team', 'view_pipeline', 'generate_reports', 'assign_leads']
        },
        { 
          email: 'admin@demo.com', 
          password: 'demo123', 
          type: 'admin', 
          redirect: '/dashboard/admin',
          name: 'System Administrator',
          permissions: ['manage_users', 'system_config', 'commission_rules', 'all_access']
        }
      ];

      const user = validCredentials.find(cred => 
        cred.email === email && cred.password === password && cred.type === userType
      );

      if (user) {
        // Store comprehensive user data
        const userData = {
          email: user.email,
          type: user.type,
          name: user.name,
          permissions: user.permissions,
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('user', JSON.stringify(userData));
        router.push(user.redirect);
      } else {
        setError('Invalid credentials. Please check your email, password, and selected role.');
      }
      setLoading(false);
    }, 1000);
  };

  // Auto-fill demo credentials based on selected role
  const handleUserTypeChange = (newType: string) => {
    setUserType(newType);
    switch (newType) {
      case 'sales_rep':
        setEmail('rep@demo.com');
        break;
      case 'manager':
        setEmail('manager@demo.com');
        break;
      case 'admin':
        setEmail('admin@demo.com');
        break;
    }
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse top-1/4 left-1/4"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-r from-purple-300/8 to-pink-300/8 rounded-full blur-2xl animate-float bottom-1/4 right-1/4"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg transform hover:scale-110 transition-transform duration-300">
              <i className="ri-line-chart-line text-white text-2xl"></i>
            </div>
            <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer">
              SalesTracker Pro
            </Link>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative">
        <div className="bg-white/80 backdrop-blur-xl py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/20">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm animate-bounce">
              <div className="flex items-center">
                <i className="ri-error-warning-line mr-2"></i>
                {error}
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Role
              </label>
              <div className="mt-1">
                <div className="relative">
                  <select
                    id="userType"
                    name="userType"
                    value={userType}
                    onChange={(e) => handleUserTypeChange(e.target.value)}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8 bg-white/50 text-gray-900 cursor-pointer"
                  >
                    <option value="sales_rep">🎯 Sales Representative</option>
                    <option value="manager">👥 Sales Manager</option>
                    <option value="admin">⚙️ System Administrator</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <i className="ri-arrow-down-s-line text-gray-400"></i>
                  </div>
                </div>
                
                {/* Role Description */}
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-xs text-blue-800">
                    {userType === 'sales_rep' && (
                      <div>
                        <strong>Sales Representative Access:</strong>
                        <br />• Personal lead management
                        <br />• Commission tracking
                        <br />• Deal status updates
                        <br />• Performance metrics
                      </div>
                    )}
                    {userType === 'manager' && (
                      <div>
                        <strong>Manager Access:</strong>
                        <br />• Team oversight & management
                        <br />• Pipeline management
                        <br />• Performance reports
                        <br />• Lead assignment
                      </div>
                    )}
                    {userType === 'admin' && (
                      <div>
                        <strong>Administrator Access:</strong>
                        <br />• Complete system control
                        <br />• User management
                        <br />• Commission rule configuration
                        <br />• Advanced analytics
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white/50"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white/50"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/help" className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                  Need help?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {loading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin -ml-1 mr-2 h-4 w-4"></i>
                    Signing in...
                  </>
                ) : (
                  <>
                    <i className="ri-login-box-line mr-2"></i>
                    Sign in
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Quick Demo Access</span>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200 transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-blue-900 flex items-center">
                      <i className="ri-user-line mr-2"></i>
                      Sales Representative
                    </p>
                    <p className="text-blue-700 text-xs">Email: rep@demo.com | Password: demo123</p>
                  </div>
                  <button 
                    onClick={() => handleUserTypeChange('sales_rep')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs cursor-pointer whitespace-nowrap"
                  >
                    Use This
                  </button>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-green-900 flex items-center">
                      <i className="ri-group-line mr-2"></i>
                      Sales Manager
                    </p>
                    <p className="text-green-700 text-xs">Email: manager@demo.com | Password: demo123</p>
                  </div>
                  <button 
                    onClick={() => handleUserTypeChange('manager')}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-xs cursor-pointer whitespace-nowrap"
                  >
                    Use This
                  </button>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200 transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-purple-900 flex items-center">
                      <i className="ri-admin-line mr-2"></i>
                      System Administrator
                    </p>
                    <p className="text-purple-700 text-xs">Email: admin@demo.com | Password: demo123</p>
                  </div>
                  <button 
                    onClick={() => handleUserTypeChange('admin')}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-xs cursor-pointer whitespace-nowrap"
                  >
                    Use This
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

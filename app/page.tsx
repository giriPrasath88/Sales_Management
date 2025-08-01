
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: 'ri-user-line', title: 'Role-Based Access', color: 'blue', description: 'Secure authentication with different access levels for sales reps, managers, and administrators.' },
    { icon: 'ri-pie-chart-line', title: 'Sales Attribution', color: 'green', description: 'Track and assign deals to individual reps with complete lead lifecycle management.' },
    { icon: 'ri-money-dollar-circle-line', title: 'Commission Calculator', color: 'purple', description: 'Automated commission calculations with customizable structures and real-time updates.' },
    { icon: 'ri-dashboard-line', title: 'Real-Time Dashboard', color: 'orange', description: 'Live performance tracking with interactive charts and exportable reports.' },
    { icon: 'ri-smartphone-line', title: 'Mobile Optimized', color: 'pink', description: 'Fully responsive design that works seamlessly across all devices.' },
    { icon: 'ri-file-download-line', title: 'Export Reports', color: 'indigo', description: 'Generate and export detailed reports in CSV and PDF formats for analysis.' }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Sales Reps', icon: 'ri-team-line' },
    { number: '$2.5B+', label: 'Revenue Tracked', icon: 'ri-money-dollar-circle-line' },
    { number: '99.9%', label: 'Uptime Guarantee', icon: 'ri-shield-check-line' },
    { number: '24/7', label: 'Expert Support', icon: 'ri-customer-service-line' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Advanced Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Main gradient orb */}
        <div 
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 15,
            top: mousePosition.y / 15 + scrollY / 10,
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        {/* Secondary orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/8 to-pink-300/8 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-r from-green-300/6 to-blue-300/6 rounded-full blur-3xl animate-float-delayed" />
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-full animate-float-particle-${i % 3}`}
            style={{
              left: `${10 + i * 8}%`,
              top: `${5 + i * 7}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.2}s`
            }}
          />
        ))}
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/70 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center transform hover:scale-105 transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <i className="ri-line-chart-line text-white text-xl"></i>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-['Inter']">
                SalesTracker Pro
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105">Features</Link>
              <Link href="/solutions" className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105">Solutions</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105">Pricing</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105">Contact</Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-blue-50">
                Sign In
              </Link>
              <Link href="/register" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold whitespace-nowrap cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
            }`}>
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6 animate-bounce-subtle">
                <i className="ri-shield-check-line mr-2"></i>
                Laravel-Powered CRM Platform
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Advanced Sales{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                  Management
                </span>{' '}
                System
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Professional Laravel-based CRM with real-time commission tracking, advanced analytics, and mobile-responsive design. Built for enterprise sales teams who demand excellence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/register" className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold whitespace-nowrap cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-lg">
                  <span className="inline-block group-hover:animate-pulse">Start Free Trial</span>
                  <i className="ri-arrow-right-line ml-3 group-hover:translate-x-2 transition-transform duration-300"></i>
                </Link>
                <button className="group bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-blue-300 px-8 py-4 rounded-xl text-lg font-semibold whitespace-nowrap cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-lg">
                  <i className="ri-play-circle-line mr-3 group-hover:animate-pulse text-blue-600"></i>
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="text-center group"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                      <i className={`${stat.icon} text-xl text-blue-600`}></i>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
            }`}>
              <div className="relative">
                {/* Floating elements around dashboard */}
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center shadow-xl animate-float z-10">
                  <i className="ri-trending-up-line text-2xl text-white"></i>
                </div>
                <div className="absolute -top-4 -right-12 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-xl animate-float-delayed z-10">
                  <i className="ri-money-dollar-circle-line text-2xl text-white"></i>
                </div>
                <div className="absolute -bottom-8 -left-12 w-14 h-14 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl flex items-center justify-center shadow-xl animate-float z-10">
                  <i className="ri-team-line text-xl text-white"></i>
                </div>
                
                {/* Main dashboard image */}
                <div className="relative bg-white rounded-3xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-500 border border-gray-100">
                  <img 
                    src="https://readdy.ai/api/search-image?query=Modern%20advanced%20sales%20management%20dashboard%20interface%20with%20beautiful%20blue%20purple%20gradient%20design%20charts%20graphs%20analytics%20commission%20tracking%20professional%20CRM%20system%20clean%20UI%20design%20business%20application%20screen%20with%20statistics%20metrics&width=800&height=600&seq=hero_dashboard_new&orientation=landscape"
                    alt="Advanced Sales Management Dashboard"
                    className="w-full h-auto rounded-2xl shadow-lg object-cover"
                  />
                  
                  {/* Overlay elements */}
                  <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg animate-bounce-subtle">
                    <div className="text-xs text-gray-500 mb-1">Monthly Revenue</div>
                    <div className="text-lg font-bold text-green-600">$127,500</div>
                    <div className="flex items-center text-xs text-green-600">
                      <i className="ri-arrow-up-line mr-1"></i>
                      +24%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-50 border border-purple-200 rounded-full text-purple-700 text-sm font-medium mb-6">
              <i className="ri-star-line mr-2"></i>
              Everything You Need
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for Modern Sales Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed for sales representatives, managers, and administrators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-100 overflow-hidden ${
                  activeFeature === index ? 'ring-2 ring-blue-500 shadow-2xl scale-105 -translate-y-2' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-50 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce-subtle transition-all duration-300 shadow-lg`}>
                    <i className={`${feature.icon} text-2xl text-white`}></i>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              See Your Data Come to Life
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Real-time analytics and insights that drive smarter sales decisions
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <img 
                src="https://readdy.ai/api/search-image?query=Advanced%20sales%20analytics%20dashboard%20with%20beautiful%20charts%20graphs%20commission%20tracking%20team%20performance%20metrics%20real-time%20data%20visualization%20professional%20business%20intelligence%20interface%20modern%20design&width=1200&height=700&seq=analytics_dashboard_preview&orientation=landscape"
                alt="Advanced Analytics Dashboard"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Floating metric cards */}
            <div className="absolute -top-8 -left-8 bg-white rounded-2xl p-4 shadow-xl animate-float">
              <div className="text-sm text-gray-500">Total Sales</div>
              <div className="text-2xl font-bold text-gray-900">$2.4M</div>
              <div className="text-xs text-green-600 flex items-center">
                <i className="ri-arrow-up-line mr-1"></i>
                +18.2%
              </div>
            </div>
            
            <div className="absolute -top-4 -right-12 bg-white rounded-2xl p-4 shadow-xl animate-float-delayed">
              <div className="text-sm text-gray-500">Active Deals</div>
              <div className="text-2xl font-bold text-gray-900">127</div>
              <div className="text-xs text-blue-600 flex items-center">
                <i className="ri-arrow-up-line mr-1"></i>
                +5.3%
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Built for Every Role
            </h2>
            <p className="text-xl text-gray-600">
              Tailored experiences that fit your team's unique needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              { 
                icon: 'ri-user-line', 
                title: 'Sales Representatives', 
                color: 'blue',
                features: ['Personal lead management', 'Commission tracking', 'Deal status updates', 'Performance metrics'],
                gradient: 'from-blue-500 to-cyan-500'
              },
              { 
                icon: 'ri-group-line', 
                title: 'Sales Managers', 
                color: 'green',
                features: ['Team oversight', 'Pipeline management', 'Performance reports', 'Goal tracking'],
                gradient: 'from-green-500 to-emerald-500'
              },
              { 
                icon: 'ri-admin-line', 
                title: 'Administrators', 
                color: 'purple',
                features: ['System configuration', 'User management', 'Commission rules', 'Analytics'],
                gradient: 'from-purple-500 to-pink-500'
              }
            ].map((role, index) => (
              <div key={index} className="group text-center transform hover:scale-105 transition-all duration-500">
                <div className={`bg-gradient-to-r ${role.gradient} w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:animate-bounce-subtle`}>
                  <i className={`${role.icon} text-4xl text-white`}></i>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors duration-300">
                  {role.title}
                </h3>
                
                <div className="bg-gray-50 rounded-2xl p-6 group-hover:bg-blue-50 transition-colors duration-300">
                  <ul className="space-y-3">
                    {role.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center space-x-3">
                        <div className={`w-6 h-6 bg-gradient-to-r ${role.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <i className="ri-check-line text-white text-sm"></i>
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl animate-float-delayed"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Sales Process?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of sales teams who have already streamlined their operations with SalesTracker Pro
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/register" className="group bg-white hover:bg-gray-100 text-blue-600 px-10 py-5 rounded-xl text-lg font-bold whitespace-nowrap cursor-pointer transform hover:scale-110 hover:shadow-2xl transition-all duration-300 shadow-xl">
              <span className="group-hover:animate-pulse">Start Your Free Trial</span>
              <i className="ri-rocket-line ml-3 group-hover:animate-bounce"></i>
            </Link>
            <Link href="/contact" className="group bg-blue-800/50 hover:bg-blue-800/70 text-white border-2 border-blue-400/50 px-10 py-5 rounded-xl text-lg font-bold whitespace-nowrap cursor-pointer backdrop-blur-sm transform hover:scale-110 hover:shadow-2xl transition-all duration-300">
              <i className="ri-customer-service-line mr-3 group-hover:animate-spin"></i>
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                  <i className="ri-line-chart-line text-white text-xl"></i>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SalesTracker Pro
                </h3>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed">
                The complete sales management solution for modern teams. Built with Laravel for enterprise-grade performance and security.
              </p>
            </div>
            
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Demo', 'API'] },
              { title: 'Support', links: ['Help Center', 'Contact', 'Documentation', 'Status'] }
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4 text-lg">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <Link href={`/${link.toLowerCase()}`} className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-200 inline-block">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 SalesTracker Pro. All rights reserved. Built with Laravel & Next.js.
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes float-particle-0 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-20px) translateX(-5px); }
          75% { transform: translateY(-10px) translateX(3px); }
        }
        
        @keyframes float-particle-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-15px) translateX(-8px); }
          66% { transform: translateY(-25px) translateX(8px); }
        }
        
        @keyframes float-particle-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-18px) translateX(-3px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 3s ease-in-out infinite; }
        .animate-float-particle-0 { animation: float-particle-0 4s ease-in-out infinite; }
        .animate-float-particle-1 { animation: float-particle-1 5s ease-in-out infinite; }
        .animate-float-particle-2 { animation: float-particle-2 6s ease-in-out infinite; }
        .animate-gradient { background-size: 400% 400%; animation: gradient 3s ease infinite; }
        
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}
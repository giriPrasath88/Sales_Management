'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function SolutionsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const solutions = [
    {
      id: 'enterprise',
      title: 'Enterprise Sales Teams',
      description: 'Comprehensive sales management for large organizations',
      icon: 'ri-building-line',
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600',
      features: [
        'Advanced role-based permissions',
        'Multi-department management',
        'Custom commission structures',
        'Enterprise-grade security',
        'API integrations',
        'Dedicated support'
      ],
      benefits: [
        'Scale sales operations efficiently',
        'Maintain data security and compliance',
        'Integrate with existing systems',
        'Get dedicated enterprise support'
      ],
      image: 'https://readdy.ai/api/search-image?query=Professional%20enterprise%20sales%20team%20meeting%20in%20modern%20office%20with%20multiple%20screens%20displaying%20analytics%20charts%20and%20business%20data%20corporate%20environment%20with%20people%20collaborating%20business%20intelligence&width=600&height=400&seq=enterprise_solution&orientation=landscape'
    },
    {
      id: 'smb',
      title: 'Small & Medium Business',
      description: 'Affordable, powerful solutions for growing teams',
      icon: 'ri-store-line',
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      features: [
        'Quick setup and onboarding',
        'Essential sales tracking',
        'Basic commission management',
        'Mobile-first design',
        'Standard integrations',
        'Email support'
      ],
      benefits: [
        'Start selling faster',
        'Keep costs predictable',
        'Scale as you grow',
        'Access from anywhere'
      ],
      image: 'https://readdy.ai/api/search-image?query=Small%20business%20team%20working%20together%20on%20sales%20planning%20with%20laptops%20tablets%20and%20documents%20collaborative%20workspace%20modern%20office%20environment%20startup%20atmosphere%20friendly%20professional&width=600&height=400&seq=smb_solution&orientation=landscape'
    },
    {
      id: 'startup',
      title: 'Fast-Growing Startups',
      description: 'Agile solutions that scale with your growth',
      icon: 'ri-rocket-line',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-600',
      features: [
        'Rapid deployment',
        'Flexible configuration',
        'Growth-focused metrics',
        'Investor reporting',
        'Team collaboration',
        'Community support'
      ],
      benefits: [
        'Launch sales processes quickly',
        'Adapt to changing needs',
        'Track key growth metrics',
        'Prepare for investment rounds'
      ],
      image: 'https://readdy.ai/api/search-image?query=Dynamic%20startup%20office%20with%20young%20entrepreneurs%20working%20on%20laptops%20with%20charts%20graphs%20on%20wall%20innovative%20workspace%20creative%20environment%20modern%20tech%20startup%20atmosphere%20energetic%20team&width=600&height=400&seq=startup_solution&orientation=landscape'
    }
  ];

  const industries = [
    { name: 'Technology', icon: 'ri-computer-line', stats: '2,500+ companies' },
    { name: 'Healthcare', icon: 'ri-health-book-line', stats: '1,800+ organizations' },
    { name: 'Financial Services', icon: 'ri-bank-line', stats: '1,200+ firms' },
    { name: 'Manufacturing', icon: 'ri-settings-line', stats: '950+ manufacturers' },
    { name: 'Real Estate', icon: 'ri-home-line', stats: '800+ agencies' },
    { name: 'Retail', icon: 'ri-shopping-bag-line', stats: '650+ retailers' }
  ];

  const caseStudies = [
    {
      company: 'TechCorp Solutions',
      industry: 'Technology',
      challenge: 'Managing 200+ sales reps across 15 regions',
      solution: 'Enterprise-grade commission tracking and regional reporting',
      results: [
        '40% increase in sales productivity',
        '60% reduction in commission disputes',
        '25% improvement in forecast accuracy'
      ],
      image: 'https://readdy.ai/api/search-image?query=Modern%20technology%20company%20office%20with%20large%20screens%20showing%20sales%20data%20analytics%20professional%20corporate%20environment%20blue%20color%20scheme%20business%20intelligence%20dashboard&width=500&height=300&seq=techcorp_case&orientation=landscape'
    },
    {
      company: 'HealthFirst Medical',
      industry: 'Healthcare',
      challenge: 'Complex commission structures for medical device sales',
      solution: 'Custom commission rules and compliance reporting',
      results: [
        '50% faster commission calculations',
        '99.9% compliance rate achieved',
        '30% reduction in administrative overhead'
      ],
      image: 'https://readdy.ai/api/search-image?query=Healthcare%20medical%20facility%20with%20professionals%20using%20tablets%20and%20computers%20modern%20clean%20environment%20medical%20technology%20green%20color%20accents%20professional%20healthcare%20setting&width=500&height=300&seq=healthfirst_case&orientation=landscape'
    },
    {
      company: 'GrowthStartup Inc',
      industry: 'SaaS Startup',
      challenge: 'Rapid scaling from 5 to 50 sales team members',
      solution: 'Flexible role management and growth-focused analytics',
      results: [
        '300% team growth without chaos',
        '45% improvement in onboarding speed',
        '80% increase in deal velocity'
      ],
      image: 'https://readdy.ai/api/search-image?query=Dynamic%20startup%20office%20with%20young%20team%20members%20collaborating%20on%20laptops%20modern%20workspace%20creative%20environment%20purple%20color%20scheme%20innovative%20atmosphere%20growth%20mindset&width=500&height=300&seq=growthstartup_case&orientation=landscape'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Advanced Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 15,
            top: mousePosition.y / 15,
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-300/8 to-blue-300/8 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-r from-purple-300/6 to-pink-300/6 rounded-full blur-3xl animate-float-delayed" />
        
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400/40 to-blue-400/40 rounded-full animate-float-particle"
            style={{
              left: `${10 + i * 8}%`,
              top: `${5 + i * 7}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative bg-white/70 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center transform hover:scale-105 transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <i className="ri-line-chart-line text-white text-xl"></i>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-['Inter']">
                SalesTracker Pro
              </h1>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105">Features</Link>
              <Link href="/solutions" className="text-blue-600 font-medium">Solutions</Link>
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
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}>
            <div className="inline-flex items-center px-4 py-2 bg-purple-50 border border-purple-200 rounded-full text-purple-700 text-sm font-medium mb-6 animate-bounce-subtle">
              <i className="ri-lightbulb-line mr-2"></i>
              Tailored Solutions
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Solutions for Every{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Sales Team
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              From fast-growing startups to enterprise organizations, we have the perfect solution to accelerate your sales success
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div 
                key={solution.id}
                className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-white/50"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Header */}
                <div className="mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${solution.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce-subtle transition-all duration-300 shadow-lg`}>
                    <i className={`${solution.icon} text-2xl text-white`}></i>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {solution.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {solution.description}
                  </p>
                </div>

                {/* Image */}
                <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features:</h4>
                  <ul className="space-y-3">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <div className={`w-5 h-5 bg-gradient-to-r ${solution.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <i className="ri-check-line text-white text-xs"></i>
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Benefits:</h4>
                  <ul className="space-y-2">
                    {solution.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <i className={`ri-arrow-right-circle-line text-${solution.color}-500 mt-1`}></i>
                        <span className="text-gray-600 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link href="/contact" className={`block w-full bg-gradient-to-r ${solution.gradient} hover:shadow-lg text-white px-6 py-3 rounded-xl text-center font-semibold whitespace-nowrap cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-md`}>
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted Across Industries
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Leading companies across diverse sectors rely on our solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div 
                key={index}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:animate-bounce-subtle">
                    <i className={`${industry.icon} text-xl text-white`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-200 transition-colors duration-300">
                      {industry.name}
                    </h3>
                    <p className="text-blue-200 text-sm">{industry.stats}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-medium mb-6">
              <i className="ri-trophy-line mr-2"></i>
              Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Real Results from Real Companies
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how organizations like yours have transformed their sales operations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Image */}
                <div className="mb-6 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={study.image}
                    alt={study.company}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Company Info */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {study.company}
                  </h3>
                  <p className="text-blue-600 text-sm font-medium">{study.industry}</p>
                </div>

                {/* Challenge */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Challenge:</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{study.challenge}</p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Solution:</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{study.solution}</p>
                </div>

                {/* Results */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Results:</h4>
                  <ul className="space-y-2">
                    {study.results.map((result, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <i className="ri-check-line text-white text-xs"></i>
                        </div>
                        <span className="text-gray-700 text-sm font-medium">{result}</span>
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
      <section className="relative py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl animate-float-delayed"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Find Your Perfect Solution
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let us help you choose the right solution for your unique needs and goals
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="group bg-white hover:bg-gray-100 text-blue-600 px-10 py-5 rounded-xl text-lg font-bold whitespace-nowrap cursor-pointer transform hover:scale-110 hover:shadow-2xl transition-all duration-300 shadow-xl">
              <span className="group-hover:animate-pulse">Schedule Consultation</span>
              <i className="ri-calendar-line ml-3 group-hover:animate-bounce"></i>
            </Link>
            <Link href="/register" className="group bg-blue-800/50 hover:bg-blue-800/70 text-white border-2 border-blue-400/50 px-10 py-5 rounded-xl text-lg font-bold whitespace-nowrap cursor-pointer backdrop-blur-sm transform hover:scale-110 hover:shadow-2xl transition-all duration-300">
              <i className="ri-rocket-line mr-3 group-hover:animate-spin"></i>
              Start Free Trial
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
              <Link href="/" className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                  <i className="ri-line-chart-line text-white text-xl"></i>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SalesTracker Pro
                </h3>
              </Link>
              <p className="text-gray-400 max-w-md leading-relaxed">
                The complete sales management solution for modern teams. Built with Laravel for enterprise-grade performance and security.
              </p>
            </div>
            
            {[
              { title: 'Product', links: ['Features', 'Solutions', 'Pricing', 'Demo'] },
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
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-20px) translateX(-5px); }
          75% { transform: translateY(-10px) translateX(3px); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 3s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
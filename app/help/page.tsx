'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HelpCenterPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const categories = [
    { id: 'all', name: 'All Topics', icon: 'ri-apps-line', count: 45 },
    { id: 'getting-started', name: 'Getting Started', icon: 'ri-rocket-line', count: 8 },
    { id: 'account', name: 'Account & Billing', icon: 'ri-user-settings-line', count: 12 },
    { id: 'features', name: 'Features & Tools', icon: 'ri-tools-line', count: 15 },
    { id: 'integrations', name: 'Integrations', icon: 'ri-links-line', count: 6 },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: 'ri-bug-line', count: 4 }
  ];

  const popularArticles = [
    {
      title: 'How to Set Up Your First Sales Team',
      category: 'getting-started',
      views: 1250,
      icon: 'ri-team-line',
      description: 'Complete guide to creating and configuring your sales team structure',
      readTime: '5 min read'
    },
    {
      title: 'Understanding Commission Calculations',
      category: 'features',
      views: 980,
      icon: 'ri-calculator-line',
      description: 'Learn how commission rules work and how to customize them',
      readTime: '7 min read'
    },
    {
      title: 'Managing User Roles and Permissions',
      category: 'account',
      views: 875,
      icon: 'ri-shield-user-line',
      description: 'Set up proper access controls for different user types',
      readTime: '4 min read'
    },
    {
      title: 'Connecting Third-Party CRM Systems',
      category: 'integrations',
      views: 720,
      icon: 'ri-plug-line',
      description: 'Step-by-step integration with Salesforce, HubSpot, and more',
      readTime: '8 min read'
    },
    {
      title: 'Advanced Reporting and Analytics',
      category: 'features',
      views: 650,
      icon: 'ri-bar-chart-line',
      description: 'Create custom reports and understand your sales metrics',
      readTime: '10 min read'
    },
    {
      title: 'Mobile App Setup Guide',
      category: 'getting-started',
      views: 540,
      icon: 'ri-smartphone-line',
      description: 'Get started with our mobile application for iOS and Android',
      readTime: '3 min read'
    }
  ];

  const faqs = [
    {
      category: 'getting-started',
      question: 'How do I create my first sales team?',
      answer: 'To create your first sales team, go to Settings > Team Management > Add New Team. Enter your team name, select team members, and configure permissions. You can assign team leads and set specific goals for each team.'
    },
    {
      category: 'account',
      question: 'How do I upgrade my subscription plan?',
      answer: 'You can upgrade your plan anytime by going to Settings > Billing > Change Plan. Select your desired plan and payment will be prorated automatically. Upgrades take effect immediately.'
    },
    {
      category: 'features',
      question: 'Can I customize commission structures?',
      answer: 'Yes! Our platform supports complex commission structures including tiered rates, bonuses, team splits, and custom rules. Go to Settings > Commission Rules to configure your structure.'
    },
    {
      category: 'integrations',
      question: 'Which CRM systems do you integrate with?',
      answer: 'We integrate with major CRM platforms including Salesforce, HubSpot, Pipedrive, Zoho, and many more. Check our Integrations page for the complete list and setup instructions.'
    },
    {
      category: 'troubleshooting',
      question: 'Why are my commission calculations incorrect?',
      answer: 'Commission calculation issues are usually due to incorrect date ranges, missing deal data, or rule conflicts. Check your commission rules and ensure all deal information is properly entered.'
    },
    {
      category: 'account',
      question: 'How do I add new team members?',
      answer: 'Go to Settings > Team Management > Invite Members. Enter their email addresses and select their roles (Sales Rep, Manager, or Admin). They will receive an invitation email to join your team.'
    },
    {
      category: 'features',
      question: 'Can I export my sales data?',
      answer: 'Yes, you can export data in CSV or PDF formats. Go to Reports > Export Data and select your date range and data types. Exports are processed and emailed to you within minutes.'
    },
    {
      category: 'getting-started',
      question: 'Is there a mobile app available?',
      answer: 'Yes! Our mobile apps are available for both iOS and Android. Download from the App Store or Google Play Store and log in with your existing credentials.'
    }
  ];

  const quickActions = [
    {
      title: 'Contact Support',
      description: 'Get help from our expert team',
      icon: 'ri-customer-service-line',
      color: 'blue',
      href: '/contact'
    },
    {
      title: 'Schedule Demo',
      description: 'See our platform in action',
      icon: 'ri-video-line',
      color: 'green',
      href: '/demo'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users',
      icon: 'ri-discuss-line',
      color: 'purple',
      href: '/community'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      icon: 'ri-play-circle-line',
      color: 'orange',
      href: '/tutorials'
    }
  ];

  const filteredArticles = popularArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Advanced Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 20,
            top: mousePosition.y / 20,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-300/10 to-blue-300/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-300/8 to-pink-300/8 rounded-full blur-2xl animate-float-delayed" />
        
        {/* Floating particles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full animate-float-particle"
            style={{
              left: `${15 + i * 8}%`,
              top: `${10 + i * 7}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`
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
              <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105">
                Home
              </Link>
              <Link href="/features" className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105">
                Pricing
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105">
                Contact
              </Link>
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
      <section className={`relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6 animate-bounce-subtle">
            <i className="ri-question-answer-line mr-2"></i>
            24/7 Support Available
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Help{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Center
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Find answers, get support, and learn how to make the most of SalesTracker Pro
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles, guides, or FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 bg-white/80 backdrop-blur-sm shadow-lg pl-14"
              />
              <i className="ri-search-line absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold whitespace-nowrap cursor-pointer transition-all duration-300 shadow-md">
                Search
              </button>
            </div>
          </div>

          {/* Popular searches */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="text-sm text-gray-500 mr-2">Popular:</span>
            {['Commission Setup', 'Team Management', 'API Integration', 'Mobile App'].map((term, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(term)}
                className="text-sm bg-white/60 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-3 py-1 rounded-full border border-gray-200 hover:border-blue-300 transition-all duration-200 cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className={`group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/50 cursor-pointer`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 bg-gradient-to-r from-${action.color}-500 to-${action.color}-600 rounded-2xl flex items-center justify-center mb-4 group-hover:animate-bounce-subtle shadow-lg`}>
                  <i className={`${action.icon} text-2xl text-white`}></i>
                </div>
                <h3 className={`text-lg font-semibold text-gray-900 mb-2 group-hover:text-${action.color}-600 transition-colors duration-300`}>
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {action.description}
                </p>
                <i className={`ri-arrow-right-line text-${action.color}-500 group-hover:translate-x-2 transition-transform duration-300 mt-3 inline-block`}></i>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="relative py-16 bg-gradient-to-r from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600">
              Find help articles organized by topic
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group flex items-center space-x-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white/70 text-gray-700 hover:bg-blue-50 border border-gray-200 hover:border-blue-300'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  selectedCategory === category.id ? 'bg-white/20' : 'bg-blue-100'
                }`}>
                  <i className={`${category.icon} text-lg ${
                    selectedCategory === category.id ? 'text-white' : 'text-blue-600'
                  }`}></i>
                </div>
                <span>{category.name}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  selectedCategory === category.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Popular Articles
              </h2>
              <p className="text-lg text-gray-600">
                Most viewed help articles and guides
              </p>
            </div>
            <Link href="/help/articles" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold whitespace-nowrap cursor-pointer transform hover:scale-105 hover:shadow-lg transition-all duration-300">
              View All Articles
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/50 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:animate-bounce-subtle shadow-md">
                    <i className={`${article.icon} text-xl text-white`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                      <span className="text-xs text-gray-500">{article.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                      {article.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {article.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-500 text-sm">
                    <i className="ri-eye-line"></i>
                    <span>{article.views.toLocaleString()} views</span>
                  </div>
                  <i className="ri-arrow-right-line text-blue-500 group-hover:translate-x-2 transition-transform duration-300"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-blue-50/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <i className="ri-question-line text-white text-sm"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                  </div>
                  <i className={`ri-arrow-down-s-line text-gray-500 text-xl transform transition-transform duration-300 ${
                    expandedFaq === index ? 'rotate-180' : ''
                  }`}></i>
                </button>
                
                {expandedFaq === index && (
                  <div className="px-8 pb-6">
                    <div className="pl-12">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl animate-float-delayed"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Still Need Help?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Our support team is here to help you succeed. Get personalized assistance from our experts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="group bg-white hover:bg-gray-100 text-blue-600 px-10 py-5 rounded-xl text-lg font-bold whitespace-nowrap cursor-pointer transform hover:scale-110 hover:shadow-2xl transition-all duration-300 shadow-xl">
              <span className="group-hover:animate-pulse">Contact Support</span>
              <i className="ri-customer-service-line ml-3 group-hover:animate-bounce"></i>
            </Link>
            <Link href="/demo" className="group bg-blue-800/50 hover:bg-blue-800/70 text-white border-2 border-blue-400/50 px-10 py-5 rounded-xl text-lg font-bold whitespace-nowrap cursor-pointer backdrop-blur-sm transform hover:scale-110 hover:shadow-2xl transition-all duration-300">
              <i className="ri-video-line mr-3 group-hover:animate-spin"></i>
              Book a Demo
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-blue-100 text-sm">
              Average response time: 2 hours • 24/7 support available • 99% satisfaction rate
            </p>
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
                The complete sales management solution for modern teams. Get help and support whenever you need it.
              </p>
            </div>
            
            {[
              { title: 'Support', links: ['Help Center', 'Contact', 'Community', 'Tutorials'] },
              { title: 'Resources', links: ['Documentation', 'API Guide', 'Best Practices', 'Webinars'] }
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4 text-lg">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <Link href={`/${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-200 inline-block">
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
              &copy; 2024 SalesTracker Pro. All rights reserved. Here to help you succeed.
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
          50% { transform: translateY(-8px); }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-15px) translateX(10px); }
          50% { transform: translateY(-30px) translateX(-5px); }
          75% { transform: translateY(-10px) translateX(5px); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 3s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function PricingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState('');

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

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small teams getting started',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        'Up to 5 sales reps',
        'Basic lead management',
        'Simple commission tracking',
        'Standard reporting',
        'Email support',
        'Mobile app access'
      ],
      limitations: [
        'Limited to 1,000 leads/month',
        'Basic integrations only',
        'Standard templates'
      ],
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600',
      popular: false,
      icon: 'ri-seedling-line'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Advanced features for growing businesses',
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        'Up to 25 sales reps',
        'Advanced lead scoring',
        'Custom commission rules',
        'Advanced analytics',
        'Priority support',
        'API access',
        'Custom workflows',
        'Team management',
        'Export capabilities'
      ],
      limitations: [
        'Up to 10,000 leads/month',
        'Standard integrations'
      ],
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      popular: true,
      icon: 'ri-rocket-line'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Complete solution for large organizations',
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        'Unlimited sales reps',
        'Enterprise-grade security',
        'Custom integrations',
        'Advanced reporting suite',
        '24/7 dedicated support',
        'Custom onboarding',
        'Multi-region support',
        'Advanced permissions',
        'Custom branding',
        'SLA guarantee',
        'Data migration included'
      ],
      limitations: [],
      color: 'purple',
      gradient: 'from-purple-500 to-pink-600',
      popular: false,
      icon: 'ri-building-line'
    }
  ];

  const addons = [
    { name: 'Advanced Analytics Dashboard', price: 19, icon: 'ri-bar-chart-line', description: 'Deep insights with custom metrics and KPIs' },
    { name: 'SMS & WhatsApp Integration', price: 15, icon: 'ri-message-line', description: 'Reach leads through multiple channels' },
    { name: 'Advanced CRM Integration', price: 25, icon: 'ri-links-line', description: 'Connect with Salesforce, HubSpot, and more' },
    { name: 'Custom Training Program', price: 49, icon: 'ri-graduation-cap-line', description: 'Personalized training for your team' }
  ];

  const faqs = [
    {
      question: 'Can I change plans at any time?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing adjustments.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express) and bank transfers for enterprise customers.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes! We offer a 14-day free trial with full access to Professional features. No credit card required to start.'
    },
    {
      question: 'Do you offer discounts for non-profits?',
      answer: 'Yes, we offer special pricing for qualified non-profit organizations. Contact our sales team for more information.'
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'You can export all your data at any time. After cancellation, we retain your data for 90 days before permanent deletion.'
    },
    {
      question: 'Is technical support included?',
      answer: 'Yes! All plans include technical support. Professional and Enterprise plans receive priority support with faster response times.'
    }
  ];

  const getCurrentPrice = (plan: any) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan: any) => {
    const monthlyTotal = plan.monthlyPrice * 12;
    const yearlySavings = monthlyTotal - plan.yearlyPrice;
    return Math.round((yearlySavings / monthlyTotal) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Advanced Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 15,
            top: mousePosition.y / 15,
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/8 to-green-300/8 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-r from-blue-300/6 to-purple-300/6 rounded-full blur-3xl animate-float-delayed" />
        
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-green-400/40 to-blue-400/40 rounded-full animate-float-particle"
            style={{
              left: `${10 + i * 6}%`,
              top: `${5 + i * 6}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + i * 0.2}s`
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
              <Link href="/solutions" className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105">Solutions</Link>
              <Link href="/pricing" className="text-blue-600 font-medium">Pricing</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105">Contact</Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-blue-50">
                Sign In
              </Link>
              <Link href="/register" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold whitespace-nowrap cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg">
                Start Free Trial
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
            <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-medium mb-6 animate-bounce-subtle">
              <i className="ri-money-dollar-circle-line mr-2"></i>
              Simple, Transparent Pricing
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Start free, scale as you grow. No hidden fees, no surprises. Just powerful sales management tools at transparent prices.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/50">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                      billingCycle === 'monthly'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('yearly')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap relative ${
                      billingCycle === 'yearly'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Yearly
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Save 17%
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={plan.id}
                className={`group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/50 ${
                  plan.popular ? 'ring-2 ring-green-500 scale-105' : ''
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce-subtle">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce-subtle transition-all duration-300 shadow-lg`}>
                    <i className={`${plan.icon} text-2xl text-white`}></i>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {plan.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-5xl font-bold text-gray-900">
                        ${getCurrentPrice(plan)}
                      </span>
                      <span className="text-gray-500 ml-2">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="text-sm text-green-600 font-medium">
                        Save {getSavings(plan)}% with yearly billing
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className={`w-5 h-5 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <i className="ri-check-line text-white text-xs"></i>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <i className="ri-information-line text-gray-400 mt-1"></i>
                          <span className="text-gray-500 text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full bg-gradient-to-r ${plan.gradient} hover:shadow-lg text-white px-8 py-4 rounded-xl text-lg font-semibold whitespace-nowrap cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-md ${
                    selectedPlan === plan.id ? 'animate-pulse' : ''
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected!' : 'Choose Plan'}
                </button>

                {plan.popular && (
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">
                      Start with 14-day free trial
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Custom Enterprise */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
              <div className="relative">
                <h3 className="text-3xl font-bold mb-4">Need a Custom Solution?</h3>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  For organizations with unique requirements, we offer fully customized solutions with dedicated support.
                </p>
                <Link href="/contact" className="inline-flex items-center bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-xl text-lg font-bold whitespace-nowrap cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg">
                  Contact Enterprise Sales
                  <i className="ri-arrow-right-line ml-3"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="relative py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-50 border border-purple-200 rounded-full text-purple-700 text-sm font-medium mb-6">
              <i className="ri-add-circle-line mr-2"></i>
              Optional Add-ons
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Enhance Your Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Boost your sales capabilities with these powerful optional features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addons.map((addon, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:animate-bounce-subtle">
                  <i className={`${addon.icon} text-xl text-white`}></i>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {addon.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {addon.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">
                    ${addon.price}/mo
                  </span>
                  <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap">
                    Add to Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing and plans
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Still have questions? We're here to help.
            </p>
            <Link href="/contact" className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold whitespace-nowrap cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg">
              Contact Support
              <i className="ri-customer-service-line ml-3"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl animate-float-delayed"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of sales teams who have transformed their operations with SalesTracker Pro
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/register" className="group bg-white hover:bg-gray-100 text-blue-600 px-10 py-5 rounded-xl text-lg font-bold whitespace-nowrap cursor-pointer transform hover:scale-110 hover:shadow-2xl transition-all duration-300 shadow-xl">
              <span className="group-hover:animate-pulse">Start 14-Day Free Trial</span>
              <i className="ri-rocket-line ml-3 group-hover:animate-bounce"></i>
            </Link>
            <Link href="/contact" className="group bg-blue-800/50 hover:bg-blue-800/70 text-white border-2 border-blue-400/50 px-10 py-5 rounded-xl text-lg font-bold whitespace-nowrap cursor-pointer backdrop-blur-sm transform hover:scale-110 hover:shadow-2xl transition-all duration-300">
              <i className="ri-customer-service-line mr-3 group-hover:animate-spin"></i>
              Talk to Sales
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-blue-100 text-sm">
              No credit card required • Cancel anytime • Setup in minutes
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
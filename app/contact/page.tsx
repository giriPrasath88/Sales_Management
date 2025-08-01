
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: 'Sales Rep',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        role: 'Sales Rep',
        subject: '',
        message: ''
      });
    }, 2000);
  };

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
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/10 to-pink-300/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-green-300/8 to-blue-300/8 rounded-full blur-2xl animate-float-delayed" />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full animate-float-particle`}
            style={{
              left: `${15 + i * 10}%`,
              top: `${10 + i * 8}%`,
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer font-['Inter']">
                SalesTracker Pro
              </h1>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105 cursor-pointer">
                Home
              </Link>
              <Link href="/features" className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105 cursor-pointer">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105 cursor-pointer">
                Pricing
              </Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-blue-50 cursor-pointer">
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
            <i className="ri-customer-service-2-line mr-2"></i>
            24/7 Expert Support
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Let's Build Something{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Amazing
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Ready to transform your sales process? Our team is here to help you get started with SalesTracker Pro and unlock your team's potential.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl"></div>
                
                <div className="relative">
                  <div className="mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
                      <i className="ri-mail-send-line text-2xl text-white"></i>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Send Us a Message
                    </h2>
                    <p className="text-gray-600">
                      Fill out the form below and we'll get back to you within 24 hours
                    </p>
                  </div>

                  {submitted ? (
                    <div className="text-center py-12 animate-bounce">
                      <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                        <i className="ri-check-line text-3xl text-white"></i>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent Successfully!</h3>
                      <p className="text-gray-600 mb-6">Thank you for contacting us. Our team will be in touch soon.</p>
                      <button 
                        onClick={() => setSubmitted(false)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold whitespace-nowrap cursor-pointer transform hover:scale-105 hover:shadow-lg transition-all duration-300"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="transform hover:scale-105 transition-transform duration-200">
                          <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="transform hover:scale-105 transition-transform duration-200">
                          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="transform hover:scale-105 transition-transform duration-200">
                          <label htmlFor="company" className="block text-sm font-bold text-gray-700 mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                            placeholder="Your Company"
                          />
                        </div>
                        <div className="transform hover:scale-105 transition-transform duration-200">
                          <label htmlFor="role" className="block text-sm font-bold text-gray-700 mb-2">
                            Role
                          </label>
                          <div className="relative">
                            <select
                              id="role"
                              name="role"
                              value={formData.role}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer transition-all duration-300 hover:border-blue-300 pr-8 bg-white/50 backdrop-blur-sm"
                            >
                              <option value="Sales Rep">Sales Representative</option>
                              <option value="Manager">Manager</option>
                              <option value="Admin">Administrator</option>
                              <option value="Other">Other</option>
                            </select>
                            <i className="ri-arrow-down-s-line absolute right-3 top-3 text-gray-400 pointer-events-none"></i>
                          </div>
                        </div>
                      </div>

                      <div className="transform hover:scale-105 transition-transform duration-200">
                        <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                          placeholder="How can we help you?"
                        />
                      </div>

                      <div className="transform hover:scale-105 transition-transform duration-200">
                        <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          maxLength={500}
                          rows={5}
                          className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-300 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                          placeholder="Tell us about your sales management needs..."
                        />
                        <p className="text-xs text-gray-500 mt-2">{formData.message.length}/500 characters</p>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting || formData.message.length > 500}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl text-lg font-bold whitespace-nowrap cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:scale-100 disabled:shadow-none shadow-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <i className="ri-loader-4-line animate-spin mr-3"></i>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <i className="ri-send-plane-line mr-3"></i>
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 transform hover:scale-105 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 rounded-3xl"></div>
                
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                    <i className="ri-contacts-line text-2xl text-white"></i>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Get in Touch
                  </h3>
                  
                  <div className="space-y-6">
                    {[
                      {
                        icon: 'ri-mail-line',
                        title: 'Email',
                        value: 'hello@salestrakerpro.com',
                        color: 'blue',
                        gradient: 'from-blue-500 to-cyan-500'
                      },
                      {
                        icon: 'ri-phone-line',
                        title: 'Phone',
                        value: '+1 (555) 123-4567',
                        color: 'green',
                        gradient: 'from-green-500 to-emerald-500'
                      },
                      {
                        icon: 'ri-map-pin-line',
                        title: 'Address',
                        value: '123 Business Ave, Suite 100\nSan Francisco, CA 94105',
                        color: 'purple',
                        gradient: 'from-purple-500 to-pink-500'
                      },
                      {
                        icon: 'ri-time-line',
                        title: 'Business Hours',
                        value: 'Mon - Fri: 9:00 AM - 6:00 PM PST\nSat - Sun: Closed',
                        color: 'orange',
                        gradient: 'from-orange-500 to-red-500'
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 group transform hover:scale-105 transition-transform duration-300 p-4 rounded-2xl hover:bg-white/30">
                        <div className={`w-14 h-14 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center group-hover:animate-bounce-subtle transition-all duration-300 shadow-lg`}>
                          <i className={`${item.icon} text-xl text-white`}></i>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1 text-lg">{item.title}</h4>
                          <p className="text-gray-600 whitespace-pre-line">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 transform hover:scale-105 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-blue-50/50 rounded-3xl"></div>
                
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                    <i className="ri-links-line text-2xl text-white"></i>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Quick Resources
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: 'ri-book-line', title: 'Documentation', href: '/docs', color: 'blue' },
                      { icon: 'ri-question-line', title: 'FAQ', href: '/faq', color: 'green' },
                      { icon: 'ri-customer-service-line', title: 'Support Center', href: '/support', color: 'purple' },
                      { icon: 'ri-calendar-line', title: 'Schedule Demo', href: '/demo', color: 'orange' }
                    ].map((link, index) => (
                      <Link 
                        key={index}
                        href={link.href}
                        className={`group flex items-center space-x-3 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-${link.color}-50 hover:from-${link.color}-100 hover:to-${link.color}-200 border-2 border-gray-200 hover:border-${link.color}-300 transform hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg`}
                      >
                        <div className={`w-10 h-10 bg-gradient-to-r from-${link.color}-500 to-${link.color}-600 rounded-xl flex items-center justify-center group-hover:animate-bounce-subtle shadow-md`}>
                          <i className={`${link.icon} text-white`}></i>
                        </div>
                        <span className={`font-semibold text-gray-700 group-hover:text-${link.color}-700 transition-colors duration-300`}>
                          {link.title}
                        </span>
                        <i className={`ri-arrow-right-s-line text-gray-400 group-hover:text-${link.color}-600 group-hover:translate-x-1 transition-all duration-300 ml-auto`}></i>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative py-24 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-medium mb-6">
              <i className="ri-map-pin-line mr-2"></i>
              Visit Our Office
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Come See Us in Person
            </h2>
            <p className="text-xl text-gray-600">
              Located in the heart of San Francisco's thriving business district
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0158883537834!2d-122.4196734847743!3d37.77598797975829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sSalesforce%20Tower!5e0!3m2!1sen!2sus!4v1635959847839!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>
            
            {/* Floating address card */}
            <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 max-w-sm">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-3">
                  <i className="ri-building-line text-white"></i>
                </div>
                <h4 className="font-bold text-gray-900">Our Office</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                123 Business Ave, Suite 100<br />
                San Francisco, CA 94105<br />
                United States
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                  <i className="ri-line-chart-line text-white text-xl"></i>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SalesTracker Pro
                </h3>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed">
                The complete sales management solution for modern teams. Built with Laravel for enterprise-grade performance.
              </p>
            </div>
            
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Demo', 'API'] },
              { title: 'Support', links: ['Help Center', 'Contact', 'Documentation', 'Status'] }
            ].map((section, index) => (
              <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                <h4 className="font-semibold mb-4 text-lg">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <Link href={`/${link.toLowerCase()}`} className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-200 inline-block cursor-pointer">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 transform hover:scale-105 transition-transform duration-300">
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
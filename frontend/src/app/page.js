'use client';

import React, { useState } from 'react';
import { Code, Play, Copy, ExternalLink, Zap, Shield, Globe, CheckCircle } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.devexcuse.com';

const DevExcuseLanding = () => {
  const [activeEndpoint, setActiveEndpoint] = useState('/excuse');
  const [apiResponse, setApiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Function to handle endpoint change and reset response
  const handleEndpointChange = (endpoint) => {
    setActiveEndpoint(endpoint);
    setApiResponse(''); // Reset response when endpoint changes
  };

  // Input states for API parameters
  const [count, setCount] = useState('1');
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'AI',
    'backend',
    'blame',
    'classic',
    'database',
    'devil',
    'devops',
    'frontend',
    'hardware',
    'misc',
    'network',
    'testing'
  ];

  const endpoints = [
    {
      path: '/excuse',
      description: 'Get a random developer excuse',
      example: 'GET /excuse'
    },
    {
      path: '/excuse?count=3',
      description: 'Get multiple excuses at once',
      example: 'GET /excuse?count=3'
    },
    {
      path: '/excuse?category=AI',
      description: 'Get excuses from specific category',
      example: 'GET /excuse?category=AI'
    },
    {
      path: '/excuse?count=3&category=backend',
      description: 'Combine parameters for specific results',
      example: 'GET /excuse?count=3&category=backend'
    },
    {
      path: '/excuse/devil',
      description: 'Get the ultimate developer excuse',
      example: 'GET /excuse/devil'
    },
    {
      path: '/categories',
      description: 'List all available categories',
      example: 'GET /categories'
    },
    {
      path: '/search',
      description: 'Search excuses by keyword',
      example: 'GET /search?q=cache'
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Sub-millisecond response times for all your excuse needs"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Reliable & Stable",
      description: "99.9% uptime guarantee with robust error handling"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global CDN",
      description: "Distributed worldwide for optimal performance"
    }
  ];

  const buildEndpointUrl = (basePath) => {
    switch (basePath) {
      case '/excuse':
        return '/excuse';
      case '/excuse?count=3':
        return count ? `/excuse?count=${count}` : '/excuse?count=3';
      case '/excuse?category=AI':
        return category ? `/excuse?category=${category}` : '/excuse?category=AI';
      case '/excuse?count=3&category=backend':
        const params = new URLSearchParams();
        params.append('count', count || '3');
        params.append('category', category || 'backend');
        return `/excuse?${params.toString()}`;
      case '/search':
        return searchQuery ? `/search?q=${encodeURIComponent(searchQuery)}` : '/search?q=cache';
      default:
        return basePath;
    }
  };


  const callRealApi = async (endpoint) => {
    setLoading(true);
    setApiResponse('');

    // Build the actual endpoint URL with current parameters
    const actualEndpoint = buildEndpointUrl(endpoint);

    try {
      // Determine the actual API URL based on endpoint
      let apiUrl = '';

      if (actualEndpoint.startsWith('/excuse/devil')) {
        apiUrl = 'http://localhost:5500/excuse/devil';
      } else if (actualEndpoint.startsWith('/excuse')) {
        apiUrl = `http://localhost:5500${actualEndpoint}`;
      } else if (actualEndpoint.startsWith('/categories')) {
        apiUrl = 'http://localhost:5500/categories';
      } else if (actualEndpoint.startsWith('/search')) {
        apiUrl = `http://localhost:5500${actualEndpoint}`;
      } else {
        apiUrl = `http://localhost:5500${actualEndpoint}`;
      }

      console.log('Calling API:', apiUrl);

      const response = await fetch(`${baseUrl}${actualEndpoint}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 429) {
          // Rate limit exceeded
          setApiResponse(JSON.stringify({
            error: "Rate limit exceeded",
            message: errorData.error || "Too many requests from this IP",
            retryAfter: errorData.retryAfter || "15 minutes",
            limit: errorData.limit || "100 requests per 15 minutes",
            note: "Please wait before making more requests"
          }, null, 2));
        } else if (response.status === 404 && actualEndpoint.startsWith('/search')) {
          // Search with no results - treat as normal response, not error
          setApiResponse(JSON.stringify(errorData, null, 2));
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return;
      }

      const data = await response.json();
      setApiResponse(JSON.stringify(data, null, 2));

    } catch (error) {
      console.error('API call failed:', error);
      setApiResponse(JSON.stringify({
        error: "Failed to fetch from API",
        message: error.message,
        note: "This might be due to CORS restrictions or API unavailability"
      }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeExamples = {
    javascript: `// JavaScript/Node.js
const response = await fetch('${baseUrl}${buildEndpointUrl(activeEndpoint)}');
const data = await response.json();
console.log(data);`,
    python: `# Python
import requests

response = requests.get('${baseUrl}${buildEndpointUrl(activeEndpoint)}')
data = response.json()
print(data)`,
    curl: `# cURL
curl -X GET "${baseUrl}${buildEndpointUrl(activeEndpoint)}" \\
  -H "Accept: application/json"`
  };

  const shouldShowParameters = () => {
    return activeEndpoint === '/excuse?count=3' ||
      activeEndpoint === '/excuse?category=AI' ||
      activeEndpoint === '/excuse?count=3&category=backend' ||
      activeEndpoint === '/search';
  };

  const shouldShowCountInput = () => {
    return activeEndpoint === '/excuse?count=3' ||
      activeEndpoint === '/excuse?count=3&category=backend';
  };

  const shouldShowCategoryDropdown = () => {
    return activeEndpoint === '/excuse?category=AI' ||
      activeEndpoint === '/excuse?count=3&category=backend';
  };

  const shouldShowSearchInput = () => {
    return activeEndpoint === '/search';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">DevExcuse API</h1>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <a
                href="/docs"
                className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors"
              >
                Documentation
              </a>
            </div>
          </nav>
        </header>


        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              The Ultimate
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent block sm:inline"> Developer Excuse </span>
              API
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Never run out of creative excuses again. Our API provides 100+ developer-tested excuses
              for every situation, categorized and searchable.
            </p>
            <div className="flex justify-center">
              <a
                href="/docs"
                className="px-6 sm:px-8 py-3 border border-gray-600 text-gray-300 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-block text-sm sm:text-base"
              >
                View Documentation
              </a>
            </div>

          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700">
                <div className="text-purple-400 mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* API Explorer */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Interactive API Explorer</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Endpoints */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700">
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Available Endpoints</h4>
                <div className="space-y-2 sm:space-y-3">
                  {endpoints.map((endpoint, index) => (
                    <div
                      key={index}
                      className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all ${activeEndpoint === endpoint.path
                        ? 'bg-purple-600/20 border-purple-500'
                        : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
                        }`}
                      onClick={() => handleEndpointChange(endpoint.path)}
                    >
                      <div className="flex items-center justify-between">
                        <code className="text-purple-300 font-mono text-xs sm:text-sm break-all">{endpoint.example}</code>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            callRealApi(endpoint.path);
                          }}
                          className="text-green-400 hover:text-green-300 transition-colors flex-shrink-0 ml-2"
                        >
                          <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                      <p className="text-gray-300 text-xs sm:text-sm mt-1">{endpoint.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Parameters and Response */}
              <div className="space-y-4 sm:space-y-6">
                {/* Parameter Controls */}
                {shouldShowParameters() && (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700">
                    <h5 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Parameters</h5>

                    <div className="space-y-3 sm:space-y-4">
                      {/* Count Input */}
                      {shouldShowCountInput() && (
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                            Count (1-10)
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            placeholder="Enter count"
                          />
                        </div>
                      )}

                      {/* Category Dropdown */}
                      {shouldShowCategoryDropdown() && (
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                            Category
                          </label>
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                          >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Search Input */}
                      {shouldShowSearchInput() && (
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                            Search Query
                          </label>
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            placeholder="Enter search term"
                          />
                        </div>
                      )}

                      {/* Current URL Preview */}
                      <div className="bg-gray-900 rounded-lg p-2 sm:p-3">
                        <p className="text-xs text-gray-400 mb-1">Current URL:</p>
                        <code className="text-green-400 text-xs sm:text-sm font-mono break-all">
                          {baseUrl}{buildEndpointUrl(activeEndpoint)}
                        </code>
                      </div>
                    </div>
                  </div>
                )}

                {/* Response */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                    <h4 className="text-lg sm:text-xl font-semibold text-white">API Response</h4>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      {apiResponse && (
                        <button
                          onClick={() => copyToClipboard(apiResponse)}
                          className="flex items-center space-x-1 sm:space-x-2 text-gray-300 hover:text-white transition-colors"
                        >
                          {copied ? <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" /> : <Copy className="w-3 h-3 sm:w-4 sm:h-4" />}
                          <span className="text-xs sm:text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                        </button>
                      )}
                      <button
                        onClick={() => callRealApi(activeEndpoint)}
                        disabled={loading}
                        className="px-3 sm:px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                      >
                        <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{loading ? 'Loading...' : 'Test Endpoint'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-3 sm:p-4 min-h-[150px] sm:min-h-[200px]">
                    {loading ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-purple-400"></div>
                      </div>
                    ) : apiResponse ? (
                      <pre className="text-green-400 font-mono text-xs sm:text-sm overflow-auto">
                        {apiResponse}
                      </pre>
                    ) : (
                      <div className="text-gray-500 text-center py-6 sm:py-8 text-sm">
                        Select an endpoint and click the play button to see the response
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 border-t border-gray-700 mt-12 sm:mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Left - Logo & Name */}
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 md:mb-0">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-sm sm:text-base text-gray-300">DevExcuse API</span>
            </div>

            {/* Right - Contact Us */}
            <div className="flex space-x-6 text-gray-400">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <a href="/docs" className="text-purple-400 font-semibold">Documentation</a>
              <a href="https://sourav-portfolio-psi.vercel.app/contact" className="hover:text-white transition-colors" target="_blank">Contact Us</a>
              <a href="https://sourav-portfolio-psi.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-semibold hover:text-purple-600 transition-colors">About the Creator</a>
            </div>
          </div>

          <div className="text-center text-gray-500 mt-6 sm:mt-8 text-sm">
            © 2025 DevExcuse API.
          </div>
        </footer>


      </div>
    </div>
  );
};

export default DevExcuseLanding;
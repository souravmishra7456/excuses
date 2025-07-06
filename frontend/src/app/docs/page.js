'use client';

import React, { useState } from 'react';
import { Code, Copy, CheckCircle, ExternalLink, ArrowRight, Info, AlertCircle, Terminal, Shield } from 'lucide-react';

const ApiDocumentation = () => {
    const [copied, setCopied] = useState({});
    const [activeTab, setActiveTab] = useState('overview');
    const [activeEndpointTab, setActiveEndpointTab] = useState('get-random-excuse');

    const copyToClipboard = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopied(prev => ({ ...prev, [key]: true }));
        setTimeout(() => setCopied(prev => ({ ...prev, [key]: false })), 2000);
    };

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.devexcuse.com';

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Info },
        { id: 'endpoints', label: 'Endpoints', icon: Code },
        { id: 'categories', label: 'Categories', icon: Terminal },
        { id: 'examples', label: 'Code Examples', icon: ExternalLink },
        { id: 'errors', label: 'Error Handling', icon: AlertCircle }
    ];

    const endpoints = [
        {
            id: 'get-random-excuse',
            method: 'GET',
            path: '/excuse',
            title: 'Get Random Excuse',
            description: 'Retrieve a random developer excuse from any category.',
            parameters: [],
            examples: [
                {
                    title: 'Basic Request',
                    curl: `curl -X GET "${baseUrl}/excuse" \\
  -H "Accept: application/json"`,
                    response: {
                        "excuse": "I can't test my code because I don't have any data.",
                        "category": "testing"
                    }
                }
            ]
        },
        {
            id: 'get-multiple-excuses',
            method: 'GET',
            path: '/excuse?count=<COUNT>',
            title: 'Get Multiple Excuses',
            description: 'Retrieve multiple random excuses at once.',
            parameters: [
                {
                    name: 'count',
                    type: 'integer',
                    required: false,
                    default: '1',
                    min: 1,
                    max: 10,
                    description: 'Number of excuses to return (1-10)'
                }
            ],
            examples: [
                {
                    title: 'Get 3 Excuses',
                    curl: `curl -X GET "${baseUrl}/excuse?count=3" \\
  -H "Accept: application/json"`,
                    response: {
                        "excuses": [
                            "I can't test my code because I don't have any data.",
                            "The code was working yesterday.",
                            "It works on my machine."
                        ],
                        "count": 3
                    }
                },
                {
                    title: 'Get 5 Excuses',
                    curl: `curl -X GET "${baseUrl}/excuse?count=5" \\
  -H "Accept: application/json"`,
                    response: {
                        "excuses": [
                            "I can't test my code because I don't have any data.",
                            "The code was working yesterday.",
                            "It works on my machine.",
                            "That's not a bug, that's a feature.",
                            "The documentation is wrong."
                        ],
                        "count": 5
                    }
                }
            ]
        },
        {
            id: 'get-category-excuses',
            method: 'GET',
            path: '/excuse?category=<CATEGORY>',
            title: 'Get Excuses by Category',
            description: 'Retrieve random excuses from a specific category.',
            parameters: [
                {
                    name: 'category',
                    type: 'string',
                    required: false,
                    description: 'Category of excuses to return',
                    options: ['AI', 'backend', 'blame', 'classic', 'database', 'devil', 'devops', 'frontend', 'hardware', 'misc', 'network', 'testing']
                }
            ],
            examples: [
                {
                    title: 'Get AI Excuses',
                    curl: `curl -X GET "${baseUrl}/excuse?category=AI" \\
  -H "Accept: application/json"`,
                    response: {
                        "excuse": "The AI model needs more training data.",
                        "category": "AI"
                    }
                },
                {
                    title: 'Get Backend Excuses',
                    curl: `curl -X GET "${baseUrl}/excuse?category=backend" \\
  -H "Accept: application/json"`,
                    response: {
                        "excuse": "The server is under heavy load.",
                        "category": "backend"
                    }
                }
            ]
        },
        {
            id: 'get-multiple-category-excuses',
            method: 'GET',
            path: '/excuse',
            title: 'Get Multiple Excuses by Category',
            description: 'Retrieve multiple random excuses from a specific category.',
            parameters: [
                {
                    name: 'count',
                    type: 'integer',
                    required: false,
                    default: '1',
                    min: 1,
                    max: 10,
                    description: 'Number of excuses to return (1-10)'
                },
                {
                    name: 'category',
                    type: 'string',
                    required: false,
                    description: 'Category of excuses to return',
                    options: ['AI', 'backend', 'blame', 'classic', 'database', 'devil', 'devops', 'frontend', 'hardware', 'misc', 'network', 'testing']
                }
            ],
            examples: [
                {
                    title: 'Get 3 Testing Excuses',
                    curl: `curl -X GET "${baseUrl}/excuse?count=3&category=testing" \\
  -H "Accept: application/json"`,
                    response: {
                        "excuses": [
                            "I can't test my code because I don't have any data.",
                            "The test environment is down.",
                            "The QA team didn't catch this bug."
                        ],
                        "count": 3,
                        "category": "testing"
                    }
                }
            ]
        },
        {
            id: 'get-devil-excuse',
            method: 'GET',
            path: '/excuse/devil',
            title: 'Get Devil Excuse',
            description: 'Retrieve the ultimate developer excuse - the devil made me do it.',
            parameters: [],
            examples: [
                {
                    title: 'Get Devil Excuse',
                    curl: `curl -X GET "${baseUrl}/excuse/devil" \\
  -H "Accept: application/json"`,
                    response: {
                        "excuse": "The devil made me do it.",
                        "category": "devil"
                    }
                }
            ]
        },
        {
            id: 'get-categories',
            method: 'GET',
            path: '/categories',
            title: 'Get All Categories',
            description: 'Retrieve a list of all available excuse categories.',
            parameters: [],
            examples: [
                {
                    title: 'Get Categories',
                    curl: `curl -X GET "${baseUrl}/categories" \\
  -H "Accept: application/json"`,
                    response: {
                        "categories": [
                            "AI",
                            "backend",
                            "blame",
                            "classic",
                            "database",
                            "devil",
                            "devops",
                            "frontend",
                            "hardware",
                            "misc",
                            "network",
                            "testing"
                        ]
                    }
                }
            ]
        },
        {
            id: 'search-excuses',
            method: 'GET',
            path: '/search',
            title: 'Search Excuses',
            description: 'Search for excuses containing specific keywords.',
            parameters: [
                {
                    name: 'q',
                    type: 'string',
                    required: true,
                    description: 'Search query to find matching excuses'
                }
            ],
            examples: [
                {
                    title: 'Search for "cache"',
                    curl: `curl -X GET "${baseUrl}/search?q=cache" \\
  -H "Accept: application/json"`,
                    response: {
                        "excuses": [
                            {
                                "excuse": "The cache is corrupted.",
                                "category": "database"
                            },
                            {
                                "excuse": "The cache needs to be cleared.",
                                "category": "backend"
                            }
                        ],
                        "count": 2,
                        "query": "cache",
                        "message": "Found 2 excuse(s) containing \"cache\""
                    }
                },
                {
                    title: 'Search for "server"',
                    curl: `curl -X GET "${baseUrl}/search?q=server" \\
  -H "Accept: application/json"`,
                    response: {
                        "excuses": [
                            {
                                "excuse": "The server is under heavy load.",
                                "category": "backend"
                            },
                            {
                                "excuse": "The server crashed.",
                                "category": "hardware"
                            }
                        ],
                        "count": 2,
                        "query": "server",
                        "message": "Found 2 excuse(s) containing \"server\""
                    }
                },
                {
                    title: 'Search with no results',
                    curl: `curl -X GET "${baseUrl}/search?q=nonexistent" \\
  -H "Accept: application/json"`,
                    response: {
                        "results": [],
                        "message": "No excuses found containing \"nonexistent\". Try a different search term.",
                        "query": "nonexistent",
                        "count": 0
                    }
                }
            ]
        },
        {
            id: 'health-check',
            method: 'GET',
            path: '/health',
            title: 'Health Check',
            description: 'Check the API status and get rate limit information.',
            parameters: [],
            examples: [
                {
                    title: 'Health Check',
                    curl: `curl -X GET "${baseUrl}/health" \\
  -H "Accept: application/json"`,
                    response: {
                        "status": "healthy",
                        "timestamp": "2024-01-01T00:00:00.000Z",
                        "uptime": 1234.567,
                        "rateLimit": {
                            "general": "100 requests per 15 minutes",
                            "search": "30 requests per 15 minutes"
                        }
                    }
                }
            ]
        }
    ];

    const categories = [
        { name: 'AI', description: 'Artificial Intelligence and machine learning related excuses' },
        { name: 'backend', description: 'Server-side and backend development excuses' },
        { name: 'blame', description: 'Excuses that shift responsibility to others' },
        { name: 'classic', description: 'Timeless developer excuses that never get old' },
        { name: 'database', description: 'Database and data-related excuses' },
        { name: 'devil', description: 'The ultimate excuse - the devil made me do it' },
        { name: 'devops', description: 'DevOps and deployment related excuses' },
        { name: 'frontend', description: 'Client-side and frontend development excuses' },
        { name: 'hardware', description: 'Hardware and infrastructure related excuses' },
        { name: 'misc', description: 'Miscellaneous excuses that don\'t fit other categories' },
        { name: 'network', description: 'Network and connectivity related excuses' },
        { name: 'testing', description: 'Testing and quality assurance related excuses' }
    ];

    const codeExamples = {
        javascript: `// JavaScript/Node.js
const response = await fetch('${baseUrl}/excuse');
const data = await response.json();
console.log(data.excuse);`,
        python: `# Python
import requests

response = requests.get('${baseUrl}/excuse')
data = response.json()
print(data['excuse'])`,
        php: `<?php
// PHP
$response = file_get_contents('${baseUrl}/excuse');
$data = json_decode($response, true);
echo $data['excuse'];
?>`,
        ruby: `# Ruby
require 'net/http'
require 'json'

uri = URI('${baseUrl}/excuse')
response = Net::HTTP.get(uri)
data = JSON.parse(response)
puts data['excuse']`,
        go: `// Go
package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
)

func main() {
    resp, _ := http.Get("${baseUrl}/excuse")
    body, _ := ioutil.ReadAll(resp.Body)
    
    var data map[string]interface{}
    json.Unmarshal(body, &data)
    fmt.Println(data["excuse"])
}`,
        csharp: `// C#
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class Program
{
    public static async Task Main()
    {
        using var client = new HttpClient();
        var response = await client.GetStringAsync("${baseUrl}/excuse");
        var data = JsonConvert.DeserializeObject<dynamic>(response);
        Console.WriteLine(data.excuse);
    }
}`
    };

    const renderEndpointContent = (endpoint) => {
        return (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
                {/* Endpoint Header */}
                <div className="p-3 sm:p-6 border-b border-gray-700">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${endpoint.method === 'GET' ? 'bg-green-900/50 text-green-400 border border-green-700' :
                                endpoint.method === 'POST' ? 'bg-blue-900/50 text-blue-400 border border-blue-700' :
                                    'bg-gray-900/50 text-gray-400 border border-gray-700'}`}>
                                {endpoint.method}
                            </span>
                            <code className="text-purple-300 font-mono text-base sm:text-lg break-all">{endpoint.path}</code>
                        </div>
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">{endpoint.title}</h4>
                    <p className="text-gray-300 text-sm sm:text-base">{endpoint.description}</p>
                </div>

                {/* Parameters */}
                {endpoint.parameters.length > 0 && (
                    <div className="p-3 sm:p-6 border-b border-gray-700">
                        <h5 className="text-lg font-semibold text-white mb-4">Parameters</h5>
                        <div className="space-y-3">
                            {endpoint.parameters.map((param, paramIndex) => (
                                <div key={paramIndex} className="bg-gray-900/50 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <code className="text-purple-300 font-mono">{param.name}</code>
                                        <div className="flex items-center space-x-2">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${param.required ? 'bg-red-900/50 text-red-400 border border-red-700' : 'bg-gray-700 text-gray-300 border border-gray-600'
                                                }`}>
                                                {param.required ? 'Required' : 'Optional'}
                                            </span>
                                            <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-900/50 text-blue-400 border border-blue-700">
                                                {param.type}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm mb-2">{param.description}</p>
                                    {param.default && (
                                        <p className="text-gray-400 text-sm">Default: <code className="text-purple-300">{param.default}</code></p>
                                    )}
                                    {param.min && param.max && (
                                        <p className="text-gray-400 text-sm">Range: {param.min} - {param.max}</p>
                                    )}
                                    {param.options && (
                                        <div className="mt-2">
                                            <p className="text-gray-400 text-sm mb-1">Available options:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {param.options.map((option, optionIndex) => (
                                                    <span key={optionIndex} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
                                                        {option}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Examples */}
                <div className="p-3 sm:p-6">
                    <h5 className="text-lg font-semibold text-white mb-4">Examples</h5>
                    <div className="space-y-6">
                        {endpoint.examples.map((example, exampleIndex) => (
                            <div key={exampleIndex} className="space-y-4">
                                <h6 className="text-md font-semibold text-gray-300">{example.title}</h6>

                                {/* cURL Example */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-400">cURL</span>
                                        <button
                                            onClick={() => copyToClipboard(example.curl, `${endpoint.id}-curl-${exampleIndex}`)}
                                            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                                        >
                                            {copied[`${endpoint.id}-curl-${exampleIndex}`] ? (
                                                <CheckCircle className="w-4 h-4" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                            <span className="text-sm">{copied[`${endpoint.id}-curl-${exampleIndex}`] ? 'Copied!' : 'Copy'}</span>
                                        </button>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                                        <pre className="text-green-400 font-mono text-xs sm:text-sm">{example.curl}</pre>
                                    </div>
                                </div>

                                {/* Response Example */}
                                <div>
                                    <span className="text-sm font-medium text-gray-400 mb-2 block">Response</span>
                                    <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                                        <pre className="text-green-400 font-mono text-xs sm:text-sm">
                                            {JSON.stringify(example.response, null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="space-y-8">
                        {/* Introduction Section */}
                        <section>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 flex items-center">
                                <Info className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-purple-400" />
                                What is DevExcuse API?
                            </h3>

                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-6 border border-gray-700 mb-6 sm:mb-8">
                                <p className="text-gray-300 text-base sm:text-lg mb-4 leading-relaxed">
                                    The DevExcuse API is a fun and free service that provides developers with creative excuses for when things go wrong in their projects.
                                    Whether you need to explain why a bug slipped through, why a feature isn't working, or why the deployment failed,
                                    we've got you covered with humorous and relatable developer excuses.
                                </p>
                                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                                    Perfect for adding humor to your development team chats, creating fun error messages, or just having a laugh when debugging gets tough.
                                    All excuses are categorized and can be filtered by type, making it easy to find the perfect excuse for any situation.
                                </p>
                            </div>
                        </section>

                        {/* Features Section */}
                        <section>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 flex items-center">
                                <Code className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-purple-400" />
                                Features
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 bg-green-900/50 rounded-lg flex items-center justify-center mr-3">
                                            <span className="text-green-400 font-semibold text-sm">✓</span>
                                        </div>
                                        <h4 className="text-lg font-semibold text-white">Random Excuses</h4>
                                    </div>
                                    <p className="text-gray-300 text-sm">Get random developer excuses from any category or specific categories</p>
                                </div>

                                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 bg-green-900/50 rounded-lg flex items-center justify-center mr-3">
                                            <span className="text-green-400 font-semibold text-sm">✓</span>
                                        </div>
                                        <h4 className="text-lg font-semibold text-white">Multiple Excuses</h4>
                                    </div>
                                    <p className="text-gray-300 text-sm">Request multiple excuses at once (up to 10 per request)</p>
                                </div>

                                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 bg-green-900/50 rounded-lg flex items-center justify-center mr-3">
                                            <span className="text-green-400 font-semibold text-sm">✓</span>
                                        </div>
                                        <h4 className="text-lg font-semibold text-white">Categorized Content</h4>
                                    </div>
                                    <p className="text-gray-300 text-sm">12 different categories including AI, backend, frontend, testing, and more</p>
                                </div>

                                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 bg-green-900/50 rounded-lg flex items-center justify-center mr-3">
                                            <span className="text-green-400 font-semibold text-sm">✓</span>
                                        </div>
                                        <h4 className="text-lg font-semibold text-white">Search Functionality</h4>
                                    </div>
                                    <p className="text-gray-300 text-sm">Search through all excuses to find specific keywords or topics</p>
                                </div>

                                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 bg-green-900/50 rounded-lg flex items-center justify-center mr-3">
                                            <span className="text-green-400 font-semibold text-sm">✓</span>
                                        </div>
                                        <h4 className="text-lg font-semibold text-white">No Authentication</h4>
                                    </div>
                                    <p className="text-gray-300 text-sm">Free to use with no API keys or authentication required</p>
                                </div>

                                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 bg-green-900/50 rounded-lg flex items-center justify-center mr-3">
                                            <span className="text-green-400 font-semibold text-sm">✓</span>
                                        </div>
                                        <h4 className="text-lg font-semibold text-white">JSON Responses</h4>
                                    </div>
                                    <p className="text-gray-300 text-sm">Clean JSON responses with excuse text and category information</p>
                                </div>
                            </div>
                        </section>

                        {/* Quick Start */}
                        <section>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Quick Start</h3>

                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-6 border border-gray-700 mb-6 sm:mb-8">
                                <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4 flex items-center">
                                    <Terminal className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                                    Base URL
                                </h4>
                                <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                                    <code className="text-green-400 font-mono text-base sm:text-lg">{baseUrl}</code>
                                </div>
                            </div>

                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-6 border border-gray-700 mb-6 sm:mb-8">
                                <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4">Authentication</h4>
                                <p className="text-gray-300 mb-2 sm:mb-4">The DevExcuse API is free to use and doesn't require authentication.</p>
                                <div className="bg-green-900/20 border border-green-700 rounded-lg p-3 sm:p-4">
                                    <div className="flex flex-col sm:flex-row items-start">
                                        <Info className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-1 sm:mr-2 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-green-300 font-semibold mb-1">No API Key Required</p>
                                            <p className="text-green-200 text-xs sm:text-sm">Simply make HTTP requests to the endpoints. Rate limiting is applied per IP address.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-6 border border-gray-700">
                                <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4">Response Format</h4>
                                <p className="text-gray-300 mb-2 sm:mb-4">All API responses are returned in JSON format with the following structure:</p>
                                <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                                    <pre className="text-green-400 font-mono text-xs sm:text-sm">
                                        {`{\n  "excuse": "The excuse text",\n  "category": "category_name"\n}`}
                                    </pre>
                                </div>
                            </div>
                        </section>

                        {/* Rate Limiting Section */}
                        <section>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 flex items-center">
                                <Shield className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-purple-400" />
                                Rate Limiting
                            </h3>

                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-6 border border-gray-700 mb-6 sm:mb-8">
                                <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4">Rate Limits</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="bg-gray-900/50 rounded-lg p-4">
                                        <h5 className="text-lg font-semibold text-white mb-2">General Endpoints</h5>
                                        <p className="text-gray-300 mb-2">100 requests per 15 minutes</p>
                                        <p className="text-sm text-gray-400">Applies to: /excuse, /categories, /excuse/devil</p>
                                    </div>
                                    <div className="bg-gray-900/50 rounded-lg p-4">
                                        <h5 className="text-lg font-semibold text-white mb-2">Search Endpoint</h5>
                                        <p className="text-gray-300 mb-2">30 requests per 15 minutes</p>
                                        <p className="text-sm text-gray-400">Applies to: /search (more resource-intensive)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden md:block bg-yellow-900/20 border border-yellow-700 rounded-lg p-3 sm:p-6">
                                <div className="flex flex-col sm:flex-row items-start">
                                    <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-base sm:text-lg font-semibold text-yellow-300 mb-1 sm:mb-2">Rate Limit Exceeded</h4>
                                        <p className="text-yellow-200 mb-2 sm:mb-3">When you exceed the rate limit, you'll receive a 429 status code with the following response:</p>
                                        <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                                            <pre className="text-yellow-300 font-mono text-xs sm:text-sm">
                                                {`{\n  "error": "Too many requests from this IP, please try again later.",\n  "retryAfter": "15 minutes",\n  "limit": 100,\n  "windowMs": "15 minutes"\n}`}
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                );

            case 'endpoints':
                const currentEndpoint = endpoints.find(endpoint => endpoint.id === activeEndpointTab);
                return (
                    <div>
                        {/* Endpoint Sub-tabs */}
                        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-700 overflow-x-auto">
                            {endpoints.map((endpoint) => (
                                <button
                                    key={endpoint.id}
                                    onClick={() => setActiveEndpointTab(endpoint.id)}
                                    className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg font-medium transition-all duration-200 whitespace-nowrap ${activeEndpointTab === endpoint.id
                                        ? 'bg-purple-600 text-white border-b-2 border-purple-400'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                        }`}
                                >
                                    <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${endpoint.method === 'GET' ? 'bg-green-900/50 text-green-400 border border-green-700' :
                                        endpoint.method === 'POST' ? 'bg-blue-900/50 text-blue-400 border border-blue-700' :
                                            'bg-gray-900/50 text-gray-400 border border-gray-700'
                                        }`}>
                                        {endpoint.method}
                                    </span>
                                    <span>{endpoint.title}</span>
                                </button>
                            ))}
                        </div>

                        {/* Endpoint Content */}
                        <div className="min-h-[600px]">
                            {currentEndpoint && renderEndpointContent(currentEndpoint)}
                        </div>
                    </div>
                );

            case 'categories':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {categories.map((category, index) => (
                            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                                <h4 className="text-lg font-semibold text-white mb-2">{category.name}</h4>
                                <p className="text-gray-300 text-sm">{category.description}</p>
                            </div>
                        ))}
                    </div>
                );

            case 'examples':
                return (
                    <div className="space-y-4 sm:space-y-6">
                        {Object.entries(codeExamples).map(([language, code]) => (
                            <div key={language}>
                                <div className="p-3 sm:p-6 border-b border-gray-700">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                        <h4 className="text-base sm:text-lg font-semibold text-white capitalize">{language}</h4>
                                        <button
                                            onClick={() => copyToClipboard(code, language)}
                                            className="flex items-center space-x-1 sm:space-x-2 text-gray-300 hover:text-white transition-colors mt-2 sm:mt-0">
                                            {copied[language] ? (
                                                <CheckCircle className="w-4 h-4" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                            <span className="text-sm">{copied[language] ? 'Copied!' : 'Copy'}</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-3 sm:p-6">
                                    <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                                        <pre className="text-green-400 font-mono text-xs sm:text-sm">{code}</pre>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'errors':
                return (
                    <div className="space-y-6">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-6 border border-gray-700 mb-4 sm:mb-6">
                            <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4">HTTP Status Codes</h4>
                            <div className="space-y-2 sm:space-y-4">
                                <div className="flex items-center space-x-4">
                                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-900/50 text-green-400 border border-green-700">200</span>
                                    <span className="text-gray-300">Success - Request completed successfully</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-900/50 text-red-400 border border-red-700">400</span>
                                    <span className="text-gray-300">Bad Request - Invalid parameters or request format</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-900/50 text-red-400 border border-red-700">404</span>
                                    <span className="text-gray-300">Not Found - Endpoint or resource not found</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-900/50 text-yellow-400 border border-yellow-700">429</span>
                                    <span className="text-gray-300">Too Many Requests - Rate limit exceeded</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-900/50 text-red-400 border border-red-700">500</span>
                                    <span className="text-gray-300">Internal Server Error - Something went wrong on our end</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-6 border border-gray-700 mb-4 sm:mb-6">
                            <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4">Error Response Format</h4>
                            <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                                <pre className="text-red-400 font-mono text-xs sm:text-sm">
                                    {`{
  "error": "Error message",
  "status": 400,
  "timestamp": "2024-01-01T00:00:00Z"
}`}
                                </pre>
                            </div>
                        </div>

                        <div className="hidden lg:block bg-blue-900/20 border border-blue-700 rounded-lg p-3 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start">
                                <Info className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="text-base sm:text-lg font-semibold text-blue-300 mb-1 sm:mb-2">Search Endpoint Special Case</h4>
                                    <p className="text-blue-200 mb-2 sm:mb-3">When the search endpoint returns no results, it will return a 404 status code with a helpful message instead of an empty array:</p>
                                    <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                                        <pre className="text-blue-300 font-mono text-xs sm:text-sm">
                                            {`{
  "results": [],
  "message": "No excuses found containing "nonexistent". Try a different search term.",
  "query": "nonexistent",
  "count": 0
}`}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
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
                <header className="container mx-auto px-3 sm:px-6 py-6 sm:py-8">
                    <nav className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                                <Code className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-white">DevExcuse API</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a
                                href="/"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                Home
                            </a>
                            <a
                                href="/docs"
                                className="text-purple-400 font-semibold"
                            >
                                Documentation
                            </a>
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="container mx-auto px-3 sm:px-6 py-10 sm:py-16 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
                            API
                            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Documentation </span>
                        </h2>
                        <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
                            Complete documentation for the DevExcuse API. Learn how to integrate excuses into your applications with detailed examples and code snippets.
                        </p>
                    </div>
                </section>

                {/* Tabs Navigation */}
                <section className="container mx-auto px-3 sm:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-700">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg font-medium transition-all duration-200 ${activeTab === tab.id
                                            ? 'bg-purple-600 text-white border-b-2 border-purple-400'
                                            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[600px]">
                            {renderTabContent()}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="container mx-auto px-3 sm:px-6 py-8 sm:py-12 border-t border-gray-700 mt-10 sm:mt-16">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-3 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                                <Code className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-gray-300">DevExcuse API</span>
                        </div>
                        <div className="flex space-x-6 text-gray-400">
                            <a href="/" className="hover:text-white transition-colors">Home</a>
                            <a href="/docs" className="text-purple-400 font-semibold">Documentation</a>
                            <a href="https://sourav-portfolio-psi.vercel.app/contact"
                                target="_blank" className="hover:text-white transition-colors">Contact Us</a>
                            <a href="https://sourav-portfolio-psi.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-semibold hover:text-purple-600 transition-colors">About the Creator</a>
                        </div>
                    </div>
                    <div className="text-center text-gray-500 mt-6 sm:mt-8">
                        © 2025 DevExcuse API.
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default ApiDocumentation; 
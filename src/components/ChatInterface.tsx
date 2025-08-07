import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Code, Database, Globe, Zap, ExternalLink, Copy, Download } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  tools?: string[];
  status?: 'processing' | 'completed' | 'error';
  artifacts?: DeploymentArtifact[];
}

interface DeploymentArtifact {
  type: 'url' | 'config' | 'code' | 'documentation';
  title: string;
  content: string;
  description?: string;
}

interface ChatInterfaceProps {
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  authStatus: any;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isProcessing, setIsProcessing, authStatus }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'NexusAI Agent initialized. Welcome John! Ready to assist with procurement analysis, marketplace data, and enterprise integrations.',
      timestamp: new Date(),
      status: 'completed'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAgentResponse = (userMessage: string) => {
    setIsProcessing(true);
    
    // Add processing message
    const processingMessage: Message = {
      id: Date.now().toString(),
      type: 'agent',
      content: 'Processing your request...',
      timestamp: new Date(),
      status: 'processing',
      tools: ['code-executor', 'api-client', 'database']
    };
    
    setMessages(prev => [...prev, processingMessage]);

    // Simulate processing time
    setTimeout(() => {
      const responses = [
        {
          content: `I've analyzed your BTP account and set up the backend connection. Here are your generated endpoints and configuration:`,
          tools: ['sap-btp-api', 'backend-analyzer', 'api-gateway', 'oauth2-service'],
          artifacts: [
            {
              type: 'url',
              title: 'API Gateway Endpoint',
              content: 'https://api-gateway-acme.cfapps.eu10.hana.ondemand.com',
              description: 'Main API gateway for your web app'
            },
            {
              type: 'url',
              title: 'OAuth2 Token Endpoint',
              content: 'https://auth-acme.authentication.eu10.hana.ondemand.com/oauth/token',
              description: 'Authentication endpoint for JWT tokens'
            },
            {
              type: 'config',
              title: 'Frontend Configuration',
              content: `const API_CONFIG = {
  baseURL: 'https://api-gateway-acme.cfapps.eu10.hana.ondemand.com',
  authURL: 'https://auth-acme.authentication.eu10.hana.ondemand.com',
  clientId: 'webapp-client-12345',
  scopes: ['read', 'write', 'admin']
};`,
              description: 'Add this to your React app configuration'
            },
            {
              type: 'code',
              title: 'API Client Code',
              content: `// React API Client
import axios from 'axios';

const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

export default apiClient;`,
              description: 'Ready-to-use API client for your React app'
            }
          ]
        },
        {
          content: 'I\'ve deployed your Cloud Foundry microservices and configured the database connections. Here are your deployment artifacts:',
          tools: ['cloud-foundry', 'sap-hana', 'endpoint-deployer'],
          artifacts: [
            {
              type: 'url',
              title: 'Microservice - User Management',
              content: 'https://user-service-acme.cfapps.eu10.hana.ondemand.com',
              description: 'User CRUD operations and authentication'
            },
            {
              type: 'url',
              title: 'Microservice - Data Analytics',
              content: 'https://analytics-service-acme.cfapps.eu10.hana.ondemand.com',
              description: 'Business intelligence and reporting'
            },
            {
              type: 'documentation',
              title: 'API Documentation',
              content: 'https://api-docs-acme.cfapps.eu10.hana.ondemand.com/swagger-ui',
              description: 'Interactive API documentation with Swagger UI'
            },
            {
              type: 'config',
              title: 'Database Connection',
              content: `{
  "hana": {
    "host": "acme-hana-db.hana.ondemand.com",
    "port": 443,
    "database": "ACME_PROD",
    "schema": "WEBAPP_DATA",
    "ssl": true,
    "poolSize": 10
  }
}`,
              description: 'SAP HANA database configuration'
            }
          ]
        },
        {
          content: 'Backend connection established! I\'ve set up WebSocket connections and real-time sync. Your web app can now communicate seamlessly with the backend.',
          tools: ['websocket-bridge', 'real-time-sync', 'load-balancer'],
          artifacts: [
            {
              type: 'url',
              title: 'WebSocket Endpoint',
              content: 'wss://websocket-acme.cfapps.eu10.hana.ondemand.com',
              description: 'Real-time bidirectional communication'
            },
            {
              type: 'url',
              title: 'Health Check Endpoint',
              content: 'https://health-acme.cfapps.eu10.hana.ondemand.com/status',
              description: 'Monitor backend service health'
            },
            {
              type: 'code',
              title: 'WebSocket Client',
              content: `// WebSocket connection for real-time updates
const ws = new WebSocket('wss://websocket-acme.cfapps.eu10.hana.ondemand.com');

ws.onopen = () => {
  console.log('Connected to backend');
  ws.send(JSON.stringify({ type: 'auth', token: getAuthToken() }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Handle real-time updates
  updateUI(data);
};`,
              description: 'WebSocket client for real-time features'
            },
            {
              type: 'documentation',
              title: 'Integration Guide',
              content: 'https://docs-acme.cfapps.eu10.hana.ondemand.com/integration-guide',
              description: 'Complete integration documentation'
            }
          ]
        }
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => prev.map(msg => 
        msg.id === processingMessage.id 
          ? { ...msg, content: randomResponse.content, status: 'completed', tools: randomResponse.tools, artifacts: randomResponse.artifacts }
          : msg
      ));
      
      setIsProcessing(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      status: 'completed'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Simulate agent response
    setTimeout(() => simulateAgentResponse(inputMessage), 500);
  };

  const getToolIcon = (tool: string) => {
    switch (tool) {
      case 'sap-btp-api': return <Database className="w-3 h-3" />;
      case 'backend-analyzer': return <Code className="w-3 h-3" />;
      case 'api-generator': return <Zap className="w-3 h-3" />;
      case 'auth-service': return <Globe className="w-3 h-3" />;
      case 'api-gateway': return <Globe className="w-3 h-3" />;
      case 'database-connector': return <Database className="w-3 h-3" />;
      case 'endpoint-deployer': return <Code className="w-3 h-3" />;
      case 'oauth2-service': return <Globe className="w-3 h-3" />;
      case 'sap-hana': return <Database className="w-3 h-3" />;
      case 'cloud-foundry': return <Zap className="w-3 h-3" />;
      case 'websocket-bridge': return <MessageCircle className="w-3 h-3" />;
      case 'real-time-sync': return <Zap className="w-3 h-3" />;
      case 'load-balancer': return <Globe className="w-3 h-3" />;
      default: return <Zap className="w-3 h-3" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getArtifactIcon = (type: string) => {
    switch (type) {
      case 'url': return <ExternalLink className="w-4 h-4" />;
      case 'config': return <Code className="w-4 h-4" />;
      case 'code': return <Code className="w-4 h-4" />;
      case 'documentation': return <Database className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  const getArtifactColor = (type: string) => {
    switch (type) {
      case 'url': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'config': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'code': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'documentation': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gray-700/50 px-6 py-4 border-b border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">BTP Integration Assistant</h3>
              <p className="text-sm text-gray-400">Backend connectivity & API orchestration</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
              message.type === 'user'
                ? 'bg-blue-600 text-white'
                : message.type === 'system'
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-700 text-white'
            }`}>
              <div className="flex items-start space-x-2">
                {message.type !== 'user' && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm">{message.content}</p>
                  
                  {message.tools && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {message.tools.map((tool, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-600/50 rounded text-xs text-gray-300"
                        >
                          {getToolIcon(tool)}
                          <span>{tool}</span>
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {message.status === 'processing' && (
                    <div className="mt-2 flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-xs text-gray-400">Processing...</span>
                    </div>
                  )}
                  
                  {/* Deployment Artifacts */}
                  {message.artifacts && message.artifacts.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="text-sm font-medium text-white">Generated Artifacts:</h4>
                      {message.artifacts.map((artifact, index) => (
                        <div key={index} className={`p-3 rounded-lg border ${getArtifactColor(artifact.type)}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getArtifactIcon(artifact.type)}
                              <span className="text-sm font-medium">{artifact.title}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {artifact.type === 'url' && (
                                <button
                                  onClick={() => window.open(artifact.content, '_blank')}
                                  className="p-1 hover:bg-white/10 rounded transition-colors duration-200"
                                  title="Open URL"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </button>
                              )}
                              <button
                                onClick={() => copyToClipboard(artifact.content)}
                                className="p-1 hover:bg-white/10 rounded transition-colors duration-200"
                                title="Copy to clipboard"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          {artifact.description && (
                            <p className="text-xs opacity-80 mb-2">{artifact.description}</p>
                          )}
                          <div className="bg-black/20 rounded p-2 font-mono text-xs overflow-x-auto">
                            {artifact.type === 'code' || artifact.type === 'config' ? (
                              <pre className="whitespace-pre-wrap">{artifact.content}</pre>
                            ) : (
                              <span>{artifact.content}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-600 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Try: 'I want my web app to be able to talk with my backend' or 'Set up API gateway for my React app'"
            className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={isProcessing || !inputMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            'I want my web app to be able to talk with my backend',
            'Set up API gateway and authentication for my React application',
            'Create REST endpoints for my SAP HANA database with OAuth2',
            'Deploy Cloud Foundry microservices with auto-scaling configuration',
            'Set up WebSocket connection for real-time data sync',
            'Generate Swagger documentation for my APIs'
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(suggestion)}
              className="text-xs bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 px-3 py-2 rounded-lg transition-colors duration-200 max-w-xs text-left"
              disabled={isProcessing}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
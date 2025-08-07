import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Code, Database, Globe, Zap } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  tools?: string[];
  status?: 'processing' | 'completed' | 'error';
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
         content: `I'll help you with that. Let me connect to Ariba and eBay to process your request: "${userMessage}"`,
         tools: ['ariba-api', 'ebay-api']
        },
        {
         content: 'I\'ve queried Google Cloud Vision and updated our internal CRM system. Here are the results:',
         tools: ['google-vision', 'internal-crm']
        },
        {
         content: 'Based on Cloudflare analytics and Salesforce data, I\'ve coordinated with specialist agents. Task completed successfully.',
         tools: ['cloudflare-analytics', 'salesforce-integration']
        }
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => prev.map(msg => 
        msg.id === processingMessage.id 
          ? { ...msg, content: randomResponse.content, status: 'completed', tools: randomResponse.tools }
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
      case 'ariba-api': return <Database className="w-3 h-3" />;
      case 'ebay-api': return <Globe className="w-3 h-3" />;
      case 'google-vision': return <Globe className="w-3 h-3" />;
      case 'internal-crm': return <Database className="w-3 h-3" />;
      case 'cloudflare-analytics': return <Zap className="w-3 h-3" />;
      case 'salesforce-integration': return <Zap className="w-3 h-3" />;
      case 'aws-lambda': return <Code className="w-3 h-3" />;
      case 'stripe-api': return <Globe className="w-3 h-3" />;
      default: return <Zap className="w-3 h-3" />;
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
              <h3 className="text-lg font-medium text-white">AI Agent Assistant</h3>
              <p className="text-sm text-gray-400">Multi-tool execution & API integration</p>
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
            placeholder="Try: 'Execute Ariba and eBay analysis then generate report' or 'Create a new Shopify integration tool'"
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
            'Execute Ariba procurement analysis and eBay price comparison, then update Salesforce',
            'Create a new Shopify inventory sync tool with real-time updates',
            'Run Google Vision analysis on product images and generate quality report',
            'Deploy AWS Lambda function for automated invoice processing'
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
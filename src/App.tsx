import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Bot, 
  Code, 
  Database, 
  Key, 
  Users, 
  Zap, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Network
} from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import ToolExecution from './components/ToolExecution';
import AuthStatus from './components/AuthStatus';
import AgentNetwork from './components/AgentNetwork';
import FlowVisualization from './components/FlowVisualization';
import UserProfile from './components/UserProfile';

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [isProcessing, setIsProcessing] = useState(false);
  const [authStatus, setAuthStatus] = useState({
    isAuthenticated: true,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiam9obi5zbWl0aCIsInJvbGUiOiJzZW5pb3ItYW5hbHlzdCIsImNvbXBhbnkiOiJhY21lLWNvcnAiLCJwZXJtaXNzaW9ucyI6WyJ0b29sczpleGVjdXRlIiwiYWdlbnRzOmNvbW11bmljYXRlIiwiYXBpczphY2Nlc3MiLCJ0b29sczpjcmVhdGUiXX0...',
    expiresIn: 3540,
    user: {
      name: 'John Smith',
      email: 'john.smith@acme-corp.com',
      role: 'Senior Business Analyst',
      department: 'Operations',
      company: 'ACME Corporation',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    permissions: ['tools:execute', 'agents:communicate', 'apis:access', 'tools:create', 'data:read', 'reports:generate']
  });

  const tabs = [
    { id: 'chat', label: 'Agent Chat', icon: MessageCircle },
    { id: 'tools', label: 'Tool Execution', icon: Code },
    { id: 'auth', label: 'Authentication', icon: Key },
    { id: 'profile', label: 'User Profile', icon: Users },
    { id: 'network', label: 'Agent Network', icon: Network },
    { id: 'flow', label: 'Process Flow', icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">NexusAI Platform</h1>
                <p className="text-sm text-gray-400">by Quantum Dynamics Corp • Enterprise AI Solutions</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={authStatus.user.avatar} 
                  alt={authStatus.user.name}
                  className="w-8 h-8 rounded-full border-2 border-blue-400"
                />
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{authStatus.user.name}</p>
                  <p className="text-xs text-gray-400">{authStatus.user.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">System Online</span>
              </div>
              <div className="text-sm text-gray-400">
                Tokens: <span className="text-blue-400 font-mono">1,247</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800/60 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'chat' && (
          <ChatInterface 
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
            authStatus={authStatus}
          />
        )}
        {activeTab === 'tools' && (
          <ToolExecution 
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
          />
        )}
        {activeTab === 'auth' && (
          <AuthStatus 
            authStatus={authStatus}
            setAuthStatus={setAuthStatus}
          />
        )}
        {activeTab === 'profile' && (
          <UserProfile 
            authStatus={authStatus}
          />
        )}
        {activeTab === 'network' && (
          <AgentNetwork />
        )}
        {activeTab === 'flow' && (
          <FlowVisualization />
        )}
      </div>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { Bot, Users, MessageCircle, Zap, Activity, ArrowRight, Network } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  type: 'coordinator' | 'specialist' | 'executor';
  status: 'online' | 'busy' | 'offline';
  specializations: string[];
  connections: string[];
  messagesProcessed: number;
  responseTime: number;
}

const AgentNetwork: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'BTP Integration Coordinator',
      type: 'coordinator',
      status: 'online',
      specializations: ['API Orchestration', 'Service Discovery', 'Load Balancing'],
      connections: ['2', '3', '4', '5'],
      messagesProcessed: 1247,
      responseTime: 120
    },
    {
      id: '2',
      name: 'SAP Backend Specialist',
      type: 'specialist',
      status: 'busy',
      specializations: ['SAP HANA', 'BTP Services', 'Database Connections'],
      connections: ['1', '3'],
      messagesProcessed: 432,
      responseTime: 340
    },
    {
      id: '3',
      name: 'API Gateway Manager',
      type: 'executor',
      status: 'online',
      specializations: ['REST APIs', 'GraphQL', 'WebSocket Connections'],
      connections: ['1', '2', '4'],
      messagesProcessed: 891,
      responseTime: 85
    },
    {
      id: '4',
      name: 'Cloud Foundry Manager',
      type: 'executor',
      status: 'online',
      specializations: ['Microservices', 'Container Orchestration', 'Auto-scaling'],
      connections: ['1', '3', '5'],
      messagesProcessed: 567,
      responseTime: 200
    },
    {
      id: '5',
      name: 'Authentication & Security',
      type: 'specialist',
      status: 'online',
      specializations: ['OAuth2', 'JWT Tokens', 'API Security'],
      connections: ['1', '4'],
      messagesProcessed: 324,
      responseTime: 150
    }
  ]);

  const [selectedAgent, setSelectedAgent] = useState<string | null>('1');
  const [networkActivity, setNetworkActivity] = useState<Array<{ from: string; to: string; message: string; timestamp: Date }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate network activity
      const fromAgent = agents[Math.floor(Math.random() * agents.length)];
      const connectedAgents = agents.filter(a => fromAgent.connections.includes(a.id));
      const toAgent = connectedAgents[Math.floor(Math.random() * connectedAgents.length)];

      if (toAgent) {
        const messages = [
          'API Gateway: Generated REST endpoints for web app backend communication',
          'SAP HANA: Database connection established, 247 tables discovered',
          'OAuth2: Authentication service configured, tokens issued',
          'Cloud Foundry: Microservices deployed, auto-scaling active',
          'Backend Analyzer: API routes mapped, 89 endpoints documented',
          'WebSocket Bridge: Real-time connection established for frontend',
          'BTP Services: Account analysis complete, 12 services integrated'
        ];

        const newActivity = {
          from: fromAgent.name,
          to: toAgent.name,
          message: messages[Math.floor(Math.random() * messages.length)],
          timestamp: new Date()
        };

        setNetworkActivity(prev => [newActivity, ...prev.slice(0, 9)]);

        // Update message counts
        setAgents(prev => prev.map(agent => 
          agent.id === fromAgent.id 
            ? { ...agent, messagesProcessed: agent.messagesProcessed + 1 }
            : agent.id === toAgent.id
            ? { ...agent, messagesProcessed: agent.messagesProcessed + 1 }
            : agent
        ));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [agents]);

  const getAgentColor = (type: string) => {
    switch (type) {
      case 'coordinator': return 'from-blue-500 to-cyan-500';
      case 'specialist': return 'from-green-500 to-emerald-500';
      case 'executor': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'busy': return 'bg-yellow-400';
      case 'offline': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Network Overview */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Agent Network Status</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400">Network Active</span>
            </div>
            <div className="text-sm text-gray-400">
              Total Messages: <span className="text-blue-400 font-mono">
                {agents.reduce((sum, agent) => sum + agent.messagesProcessed, 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Network Visualization */}
        <div className="relative bg-gray-900/50 rounded-lg p-8 mb-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-green-500/5"></div>
          
          <div className="relative grid grid-cols-3 gap-8 items-center">
            {/* Coordinator (Center) */}
            <div className="col-start-2 flex justify-center">
              <div className="relative">
                <div className={`w-16 h-16 bg-gradient-to-r ${getAgentColor('coordinator')} rounded-full flex items-center justify-center shadow-lg`}>
                  <Network className="w-8 h-8 text-white" />
                </div>
                <div className={`absolute -top-1 -right-1 w-4 h-4 ${getStatusColor('online')} rounded-full border-2 border-gray-900`}></div>
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center">
                  <p className="text-sm font-medium text-white">Master</p>
                  <p className="text-xs text-gray-400">Coordinator</p>
                </div>
              </div>
            </div>

            {/* Specialists & Executors arranged around coordinator */}
            {agents.slice(1).map((agent, index) => {
              const positions = [
                'col-start-1 row-start-1', // Top left
                'col-start-3 row-start-1', // Top right
                'col-start-1 row-start-2', // Bottom left
                'col-start-3 row-start-2'  // Bottom right
              ];
              
              return (
                <div key={agent.id} className={positions[index] || ''}>
                  <div className="relative flex justify-center">
                    <div className={`w-12 h-12 bg-gradient-to-r ${getAgentColor(agent.type)} rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-110`}
                         onClick={() => setSelectedAgent(agent.id)}>
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className={`absolute -top-1 -right-1 w-3 h-3 ${getStatusColor(agent.status)} rounded-full border-2 border-gray-900`}></div>
                    <div className="absolute top-14 left-1/2 transform -translate-x-1/2 text-center">
                      <p className="text-xs font-medium text-white">{agent.name.split(' ')[0]}</p>
                    </div>
                  </div>
                  
                  {/* Connection lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full">
                      <line
                        x1="50%"
                        y1="50%"
                        x2="50%"
                        y2="50%"
                        stroke="#374151"
                        strokeWidth="1"
                        opacity="0.5"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Agent Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className={`bg-gray-700/50 rounded-lg p-3 border border-gray-600 cursor-pointer transition-all duration-200 hover:border-blue-500 ${
                selectedAgent === agent.id ? 'border-blue-500 bg-blue-500/10' : ''
              }`}
              onClick={() => setSelectedAgent(agent.id)}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className={`w-6 h-6 bg-gradient-to-r ${getAgentColor(agent.type)} rounded-full flex items-center justify-center`}>
                  <Bot className="w-3 h-3 text-white" />
                </div>
                <div className={`w-2 h-2 ${getStatusColor(agent.status)} rounded-full`}></div>
              </div>
              <h3 className="text-sm font-medium text-white mb-1">{agent.name}</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Messages</span>
                  <span className="text-blue-400 font-mono">{agent.messagesProcessed}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Avg Response</span>
                  <span className="text-green-400 font-mono">{agent.responseTime}ms</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Agent Details */}
      {selectedAgent && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          {(() => {
            const agent = agents.find(a => a.id === selectedAgent);
            if (!agent) return null;
            
            return (
              <>
                <h3 className="text-lg font-medium text-white mb-4">Agent Details: {agent.name}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Specializations</h4>
                    <div className="space-y-1">
                      {agent.specializations.map((spec, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded mr-1 mb-1"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-400">Status</span>
                        <span className={`text-xs font-medium ${
                          agent.status === 'online' ? 'text-green-400' :
                          agent.status === 'busy' ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-400">Messages Processed</span>
                        <span className="text-xs text-blue-400 font-mono">{agent.messagesProcessed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-400">Avg Response Time</span>
                        <span className="text-xs text-green-400 font-mono">{agent.responseTime}ms</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Connections</h4>
                    <div className="space-y-1">
                      {agent.connections.map(connId => {
                        const connectedAgent = agents.find(a => a.id === connId);
                        return connectedAgent ? (
                          <div key={connId} className="flex items-center space-x-2 text-xs">
                            <div className={`w-2 h-2 bg-gradient-to-r ${getAgentColor(connectedAgent.type)} rounded-full`}></div>
                            <span className="text-gray-300">{connectedAgent.name}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Real-time Activity */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-medium text-white mb-4">Network Activity</h3>
        
        <div className="bg-gray-900/50 rounded-lg p-4 max-h-64 overflow-y-auto">
          {networkActivity.length === 0 ? (
            <p className="text-gray-400 text-sm">Monitoring network activity...</p>
          ) : (
            <div className="space-y-3">
              {networkActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-2 bg-gray-800/50 rounded">
                  <div className="flex items-center space-x-2 flex-1">
                    <span className="text-sm text-blue-400 font-medium">{activity.from}</span>
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                    <span className="text-sm text-green-400 font-medium">{activity.to}</span>
                  </div>
                  <div className="flex-2">
                    <p className="text-xs text-gray-300">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentNetwork;
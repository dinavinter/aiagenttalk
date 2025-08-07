import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Code, Database, Globe, Zap, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  type: 'code' | 'api' | 'database' | 'integration';
  status: 'idle' | 'running' | 'completed' | 'error';
  progress: number;
  duration: number;
  output?: string;
  icon: React.ReactNode;
}

interface ToolExecutionProps {
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

const ToolExecution: React.FC<ToolExecutionProps> = ({ isProcessing, setIsProcessing }) => {
  const [tools, setTools] = useState<Tool[]>([
    {
      id: '1',
      name: 'SAP BTP Account API',
      type: 'code',
      status: 'idle',
      progress: 0,
      duration: 0,
      icon: <Database className="w-5 h-5" />
    },
    {
      id: '2',
      name: 'Backend Connection Analyzer',
      type: 'api',
      status: 'idle',
      progress: 0,
      duration: 0,
      icon: <Code className="w-5 h-5" />
    },
    {
      id: '3',
      name: 'API Gateway Generator',
      type: 'api',
      status: 'idle',
      progress: 0,
      duration: 0,
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: '4',
      name: 'OAuth2 Authentication Service',
      type: 'integration',
      status: 'idle',
      progress: 0,
      duration: 0,
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: '5',
      name: 'SAP HANA Database Connector',
      type: 'database',
      status: 'idle',
      progress: 0,
      duration: 0,
      icon: <Database className="w-5 h-5" />
    },
    {
      id: '6',
      name: 'Cloud Foundry Deployment',
      type: 'integration',
      status: 'idle',
      progress: 0,
      duration: 0,
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: '7',
      name: 'REST API Endpoint Builder',
      type: 'code',
      status: 'idle',
      progress: 0,
      duration: 0,
      icon: <Code className="w-5 h-5" />
    },
    {
      id: '8',
      name: 'Frontend-Backend Bridge',
      type: 'api',
      status: 'idle',
      progress: 0,
      duration: 0,
      icon: <Globe className="w-5 h-5" />
    }
  ]);

  const [executionLog, setExecutionLog] = useState<string[]>([]);

  const executeTool = async (toolId: string) => {
    setIsProcessing(true);
    
    setTools(prev => prev.map(tool => 
      tool.id === toolId 
        ? { ...tool, status: 'running', progress: 0 }
        : tool
    ));

    // Simulate execution with progress updates
    const progressInterval = setInterval(() => {
      setTools(prev => prev.map(tool => {
        if (tool.id === toolId && tool.status === 'running') {
          const newProgress = Math.min(tool.progress + Math.random() * 20, 100);
          const newDuration = tool.duration + 100;
          
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setIsProcessing(false);
            
            const outputs = [
              'BTP API: Connected to 3 SAP services, 247 active endpoints discovered',
              'Backend Analyzer: Found 12 microservices, mapped 89 API routes',
              'API Gateway: Generated 15 REST endpoints with OpenAPI spec',
              'OAuth2: Configured authentication, issued 156 access tokens',
              'HANA Connector: Connected to database, 73 tables mapped',
              'Cloud Foundry: Deployed 5 microservices, auto-scaling enabled',
              'REST Builder: Created 8 endpoints, response time <200ms',
              'Frontend Bridge: WebSocket connection established, real-time sync active'
            ];
            
            const toolIndex = parseInt(toolId) - 1;
            const randomOutput = outputs[toolIndex] || outputs[Math.floor(Math.random() * outputs.length)];
            
            setExecutionLog(prev => [...prev, `${tool.name}: ${randomOutput}`]);
            
            return {
              ...tool,
              status: 'completed',
              progress: 100,
              duration: newDuration,
              output: randomOutput
            };
          }
          
          return { ...tool, progress: newProgress, duration: newDuration };
        }
        return tool;
      }));
    }, 100);
  };

  const resetTool = (toolId: string) => {
    setTools(prev => prev.map(tool => 
      tool.id === toolId 
        ? { ...tool, status: 'idle', progress: 0, duration: 0, output: undefined }
        : tool
    ));
  };

  const executeAllTools = async () => {
    setIsProcessing(true);
    setExecutionLog([]);
    
    for (const tool of tools) {
      if (tool.status !== 'running') {
        await new Promise(resolve => {
          executeTool(tool.id);
          const checkCompletion = setInterval(() => {
            setTools(current => {
              const currentTool = current.find(t => t.id === tool.id);
              if (currentTool?.status === 'completed') {
                clearInterval(checkCompletion);
                resolve(undefined);
              }
              return current;
            });
          }, 100);
        });
        
        // Wait between tools
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    setIsProcessing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-blue-400';
      case 'completed': return 'text-green-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Tool Execution Center</h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={executeAllTools}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <Play className="w-4 h-4" />
              <span>Execute All</span>
            </button>
            <button
              onClick={() => setTools(prev => prev.map(tool => ({ ...tool, status: 'idle', progress: 0, duration: 0, output: undefined })))}
              disabled={isProcessing}
              className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All</span>
            </button>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <div key={tool.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    tool.type === 'code' ? 'bg-purple-500/20 text-purple-400' :
                    tool.type === 'api' ? 'bg-green-500/20 text-green-400' :
                    tool.type === 'database' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">{tool.name}</h3>
                    <p className="text-xs text-gray-400 capitalize">
                      {tool.type === 'api' ? 'External API' : 
                       tool.type === 'database' ? 'Database' :
                       tool.type === 'code' ? 'Code Execution' : 'Integration'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(tool.status)}
                  <span className={`text-xs font-medium ${getStatusColor(tool.status)}`}>
                    {tool.status.charAt(0).toUpperCase() + tool.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{Math.round(tool.progress)}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      tool.status === 'running' ? 'bg-blue-500' :
                      tool.status === 'completed' ? 'bg-green-500' :
                      tool.status === 'error' ? 'bg-red-500' :
                      'bg-gray-500'
                    }`}
                    style={{ width: `${tool.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Duration */}
              <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
                <span>Duration: {(tool.duration / 1000).toFixed(1)}s</span>
                <span>{tool.type}</span>
              </div>

              {/* Output */}
              {tool.output && (
                <div className="bg-gray-800/50 rounded p-2 mb-3">
                  <p className="text-xs text-gray-300">{tool.output}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => executeTool(tool.id)}
                  disabled={tool.status === 'running' || isProcessing}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-colors duration-200"
                >
                  Execute
                </button>
                <button
                  onClick={() => resetTool(tool.id)}
                  disabled={tool.status === 'running'}
                  className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-700 text-white px-3 py-1 rounded text-xs transition-colors duration-200"
                >
                  Reset
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Execution Log */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-medium text-white mb-4">Execution Log</h3>
        <div className="bg-gray-900/50 rounded-lg p-4 max-h-64 overflow-y-auto">
          {executionLog.length === 0 ? (
            <p className="text-gray-400 text-sm">No executions yet. Run tools to see output here.</p>
          ) : (
            <div className="space-y-2">
              {executionLog.map((log, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-300 font-mono">{log}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolExecution;
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Bot, 
  Code, 
  Database, 
  Globe, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  Pause, 
  RotateCcw,
  MessageCircle,
  Zap,
  Shield
} from 'lucide-react';

interface FlowStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'active' | 'completed' | 'error';
  duration: number;
  details: string[];
}

const FlowVisualization: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [flowSteps, setFlowSteps] = useState<FlowStep[]>([
    {
      id: '1',
      title: 'User Request',
      description: 'User submits query to AI agent',
      icon: <User className="w-5 h-5" />,
      status: 'pending',
      duration: 500,
      details: ['Query parsing', 'Intent recognition', 'Parameter extraction']
    },
    {
      id: '2',
      title: 'Authentication',
      description: 'Validate user tokens and permissions',
      icon: <Shield className="w-5 h-5" />,
      status: 'pending',
      duration: 800,
      details: ['Token validation', 'Permission check', 'Rate limiting']
    },
    {
      id: '3',
      title: 'Agent Processing',
      description: 'AI agent analyzes request and plans execution',
      icon: <Bot className="w-5 h-5" />,
      status: 'pending',
      duration: 1200,
      details: ['Request analysis', 'Tool selection', 'Execution planning']
    },
    {
      id: '4',
     title: 'System Selection',
     description: 'Choose appropriate systems (Ariba, eBay, Google, etc.)',
      icon: <Zap className="w-5 h-5" />,
      status: 'pending',
      duration: 600,
     details: ['System matching', 'API availability check', 'Resource allocation']
    },
    {
      id: '5',
     title: 'AWS Lambda Execution',
     description: 'Execute serverless functions and code',
      icon: <Code className="w-5 h-5" />,
      status: 'pending',
      duration: 2000,
     details: ['Lambda preparation', 'Environment setup', 'Function execution']
    },
    {
      id: '6',
     title: 'External API Calls',
     description: 'Connect to eBay, Google, Stripe, Cloudflare APIs',
      icon: <Globe className="w-5 h-5" />,
      status: 'pending',
      duration: 1500,
     details: ['API endpoint routing', 'Request formatting', 'Response parsing']
    },
    {
      id: '7',
     title: 'CRM & Database Sync',
     description: 'Update Salesforce CRM and internal databases',
      icon: <Database className="w-5 h-5" />,
      status: 'pending',
      duration: 1000,
     details: ['Salesforce sync', 'CRM updates', 'Data validation']
    },
    {
      id: '8',
     title: 'Multi-System Coordination',
     description: 'Coordinate between Ariba, eBay, and internal systems',
      icon: <MessageCircle className="w-5 h-5" />,
      status: 'pending',
      duration: 1800,
     details: ['System discovery', 'Data routing', 'Result aggregation']
    },
    {
      id: '9',
      title: 'Response Formation',
      description: 'Compile results into user response',
      icon: <CheckCircle className="w-5 h-5" />,
      status: 'pending',
      duration: 700,
      details: ['Result compilation', 'Response formatting', 'Quality validation']
    }
  ]);

  const startFlow = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setFlowSteps(prev => prev.map(step => ({ ...step, status: 'pending' })));
  };

  const pauseFlow = () => {
    setIsPlaying(false);
  };

  const resetFlow = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setFlowSteps(prev => prev.map(step => ({ ...step, status: 'pending' })));
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isPlaying && currentStep < flowSteps.length) {
      // Mark current step as active
      setFlowSteps(prev => prev.map((step, index) => 
        index === currentStep 
          ? { ...step, status: 'active' }
          : step
      ));

      timeout = setTimeout(() => {
        // Mark current step as completed
        setFlowSteps(prev => prev.map((step, index) => 
          index === currentStep 
            ? { ...step, status: 'completed' }
            : step
        ));

        // Move to next step
        setCurrentStep(prev => prev + 1);
      }, flowSteps[currentStep].duration);
    } else if (currentStep >= flowSteps.length) {
      setIsPlaying(false);
    }

    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep, flowSteps]);

  const getStepColor = (status: string) => {
    switch (status) {
      case 'active': return 'border-blue-500 bg-blue-500/20 text-blue-400';
      case 'completed': return 'border-green-500 bg-green-500/20 text-green-400';
      case 'error': return 'border-red-500 bg-red-500/20 text-red-400';
      default: return 'border-gray-600 bg-gray-700/50 text-gray-400';
    }
  };

  const getIconColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-blue-400';
      case 'completed': return 'text-green-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Process Flow Visualization</h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={startFlow}
              disabled={isPlaying}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <Play className="w-4 h-4" />
              <span>Start Flow</span>
            </button>
            <button
              onClick={pauseFlow}
              disabled={!isPlaying}
              className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </button>
            <button
              onClick={resetFlow}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <span>Current Step: {currentStep + 1} / {flowSteps.length}</span>
          <span>Status: {isPlaying ? 'Running' : 'Paused'}</span>
          <span>Progress: {Math.round((currentStep / flowSteps.length) * 100)}%</span>
        </div>
      </div>

      {/* Flow Steps */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-medium text-white mb-6">Execution Flow</h3>
        
        <div className="space-y-4">
          {flowSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connection Line */}
              {index < flowSteps.length - 1 && (
                <div className="absolute left-6 top-12 w-px h-8 bg-gray-600"></div>
              )}
              
              {/* Step Content */}
              <div className={`flex items-start space-x-4 p-4 rounded-lg border transition-all duration-300 ${getStepColor(step.status)}`}>
                {/* Step Icon */}
                <div className={`p-2 rounded-lg border ${getStepColor(step.status)} flex-shrink-0`}>
                  <div className={getIconColor(step.status)}>
                    {step.icon}
                  </div>
                </div>

                {/* Step Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-medium text-white">{step.title}</h4>
                    <div className="flex items-center space-x-2">
                      {step.status === 'active' && (
                        <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                      )}
                      {step.status === 'completed' && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                      <span className="text-xs text-gray-400">{step.duration}ms</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3">{step.description}</p>
                  
                  {/* Step Details */}
                  <div className="flex flex-wrap gap-2">
                    {step.details.map((detail, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 text-xs rounded ${
                          step.status === 'completed' 
                            ? 'bg-green-500/20 text-green-300' 
                            : step.status === 'active'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-gray-600/50 text-gray-400'
                        }`}
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Step {index + 1}</div>
                    {step.status === 'active' && (
                      <div className="text-xs text-blue-400 font-mono">Processing...</div>
                    )}
                    {step.status === 'completed' && (
                      <div className="text-xs text-green-400 font-mono">Complete</div>
                    )}
                  </div>
                  
                  {index < flowSteps.length - 1 && (
                    <ArrowRight className={`w-4 h-4 ${
                      step.status === 'completed' ? 'text-green-400' : 'text-gray-500'
                    }`} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flow Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Steps</p>
              <p className="text-xl font-bold text-white">{flowSteps.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Completed</p>
              <p className="text-xl font-bold text-white">
                {flowSteps.filter(step => step.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Play className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Current Step</p>
              <p className="text-xl font-bold text-white">{Math.min(currentStep + 1, flowSteps.length)}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Bot className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Est. Duration</p>
              <p className="text-xl font-bold text-white">
                {(flowSteps.reduce((sum, step) => sum + step.duration, 0) / 1000).toFixed(1)}s
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowVisualization;
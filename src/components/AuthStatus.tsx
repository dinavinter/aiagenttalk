import React, { useState, useEffect } from 'react';
import { Key, Shield, Clock, CheckCircle, AlertTriangle, RefreshCw, Copy } from 'lucide-react';

interface AuthStatusProps {
  authStatus: any;
  setAuthStatus: (status: any) => void;
}

const AuthStatus: React.FC<AuthStatusProps> = ({ authStatus, setAuthStatus }) => {
  const [showToken, setShowToken] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAuthStatus(prev => ({
        ...prev,
        expiresIn: Math.max(0, prev.expiresIn - 1)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [setAuthStatus]);

  const refreshToken = async () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      setAuthStatus(prev => ({
        ...prev,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.NEW_TOKEN...',
        expiresIn: 3600,
        isAuthenticated: true
      }));
      setIsRefreshing(false);
    }, 2000);
  };

  const copyToken = () => {
    navigator.clipboard.writeText(authStatus.token);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTokenStatus = () => {
    if (authStatus.expiresIn > 1800) return { color: 'text-green-400', bg: 'bg-green-500/20', status: 'Healthy' };
    if (authStatus.expiresIn > 300) return { color: 'text-yellow-400', bg: 'bg-yellow-500/20', status: 'Expiring Soon' };
    return { color: 'text-red-400', bg: 'bg-red-500/20', status: 'Critical' };
  };

  const tokenStatus = getTokenStatus();

  return (
    <div className="space-y-6">
      {/* Authentication Overview */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">NexusAI Authentication Status</h2>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${tokenStatus.bg}`}>
            <div className={`w-2 h-2 rounded-full ${tokenStatus.color.replace('text-', 'bg-')} animate-pulse`}></div>
            <span className={`text-sm font-medium ${tokenStatus.color}`}>{tokenStatus.status}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Authentication Status */}
          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Shield className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">Authentication</h3>
                <p className="text-xs text-gray-400">Current Status</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400 font-medium">Authenticated</span>
            </div>
          </div>

          {/* Token Expiry */}
          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center space-x-3 mb-3">
              <div className={`p-2 rounded-lg ${tokenStatus.bg}`}>
                <Clock className={`w-5 h-5 ${tokenStatus.color}`} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">Token Expiry</h3>
                <p className="text-xs text-gray-400">Time Remaining</p>
              </div>
            </div>
            <div className="text-lg font-mono text-white">
              {formatTime(authStatus.expiresIn)}
            </div>
          </div>

          {/* Token Actions */}
          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Key className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">Token Management</h3>
                <p className="text-xs text-gray-400">Refresh & Copy</p>
              </div>
            </div>
            <button
              onClick={refreshToken}
              disabled={isRefreshing}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center space-x-2 transition-colors duration-200"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Token'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Token Details */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-medium text-white mb-4">Token Details</h3>
        
        <div className="space-y-4">
          {/* Token Value */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-300">JWT Token</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowToken(!showToken)}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  {showToken ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={copyToken}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center space-x-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-3 font-mono text-sm text-gray-300 break-all">
              {showToken ? authStatus.token : authStatus.token.replace(/./g, '•')}
            </div>
          </div>

          {/* Permissions */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Permissions</label>
            <div className="flex flex-wrap gap-2">
              {authStatus.permissions.map((permission, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {permission}
                </span>
              ))}
            </div>
          </div>

          {/* User Context */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">User Context</label>
            <div className="bg-gray-900/50 rounded-lg p-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">User:</span>
                <span className="text-white">{authStatus.user.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Role:</span>
                <span className="text-white">{authStatus.user.role}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Company:</span>
                <span className="text-white">{authStatus.user.company}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Department:</span>
                <span className="text-white">{authStatus.user.department}</span>
              </div>
            </div>
          </div>

          {/* Token Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-400">Issued At</label>
              <p className="text-sm text-white font-mono">
                {new Date(Date.now() - (3600 - authStatus.expiresIn) * 1000).toLocaleString()}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-400">Expires At</label>
              <p className="text-sm text-white font-mono">
                {new Date(Date.now() + authStatus.expiresIn * 1000).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Recommendations */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-medium text-white mb-4">Security Recommendations</h3>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-400">Token Rotation Enabled</h4>
              <p className="text-xs text-gray-300">Tokens are automatically refreshed before expiration</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-green-400">Secure Transport</h4>
              <p className="text-xs text-gray-300">All communications use HTTPS/TLS encryption</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-yellow-400">Token Expiry Warning</h4>
              <p className="text-xs text-gray-300">Consider refreshing tokens when they have less than 5 minutes remaining</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthStatus;
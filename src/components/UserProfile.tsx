import React from 'react';
import { User, Building, Mail, Shield, Award, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface UserProfileProps {
  authStatus: any;
}

const UserProfile: React.FC<UserProfileProps> = ({ authStatus }) => {
  const { user, permissions } = authStatus;

  const roleCapabilities = {
    'Senior Business Analyst': [
      'Analyze BTP account services and configurations',
      'Set up API gateways and backend connections',
      'Configure OAuth2 authentication and security',
      'Deploy Cloud Foundry microservices',
      'Create REST API endpoints and documentation',
      'Establish frontend-backend communication bridges'
    ]
  };

  const recentActivity = [
    { action: 'Set up API gateway for React web app', time: '2 minutes ago', status: 'success' },
    { action: 'Configured SAP HANA database connection', time: '15 minutes ago', status: 'success' },
    { action: 'Deployed Cloud Foundry microservices', time: '1 hour ago', status: 'success' },
    { action: 'Updated OAuth2 authentication service', time: '3 hours ago', status: 'warning' },
    { action: 'Created REST API endpoints', time: '5 hours ago', status: 'success' }
  ];

  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case 'tools:execute': return '🔧';
      case 'tools:create': return '⚡';
      case 'agents:communicate': return '🤖';
      case 'apis:access': return '🌐';
      case 'data:read': return '📊';
      case 'reports:generate': return '📈';
      default: return '🔒';
    }
  };

  const getPermissionDescription = (permission: string) => {
    switch (permission) {
      case 'tools:execute': return 'Execute existing tools and APIs';
      case 'tools:create': return 'Create and deploy new tools';
      case 'agents:communicate': return 'Communicate with AI agents';
      case 'apis:access': return 'Access external APIs and services';
      case 'data:read': return 'Read sensitive business data';
      case 'reports:generate': return 'Generate and export reports';
      default: return 'Standard access permission';
    }
  };

  return (
    <div className="space-y-6">
      {/* User Profile Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
        <div className="flex items-start space-x-6">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400">Role:</span>
                <span className="text-white font-medium">{user.role}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-green-400" />
                <span className="text-gray-400">Company:</span>
                <span className="text-white font-medium">{user.company}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400">Email:</span>
                <span className="text-white font-medium">{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-orange-400" />
                <span className="text-gray-400">Department:</span>
                <span className="text-white font-medium">{user.department}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Permissions & Capabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Permissions */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <span>Access Permissions</span>
          </h3>
          
          <div className="space-y-3">
            {permissions.map((permission, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getPermissionIcon(permission)}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{permission}</p>
                    <p className="text-xs text-gray-400">{getPermissionDescription(permission)}</p>
                  </div>
                </div>
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Role Capabilities */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
            <Award className="w-5 h-5 text-green-400" />
            <span>Role Capabilities</span>
          </h3>
          
          <div className="space-y-2">
            {roleCapabilities[user.role]?.map((capability, index) => (
              <div key={index} className="flex items-start space-x-2 p-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-300">{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <Clock className="w-5 h-5 text-purple-400" />
          <span>Recent Activity</span>
        </h3>
        
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <div className="flex items-center space-x-3">
                {activity.status === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                )}
                <div>
                  <p className="text-sm text-white">{activity.action}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                activity.status === 'success' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Award className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Tools Executed</p>
              <p className="text-xl font-bold text-white">247</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Success Rate</p>
              <p className="text-xl font-bold text-white">98.7%</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg Response</p>
              <p className="text-xl font-bold text-white">1.2s</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <User className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Tools Created</p>
              <p className="text-xl font-bold text-white">12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
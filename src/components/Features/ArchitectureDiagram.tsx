import { useState } from 'react';
import { 
  Shield, 
  Brain, 
  Database, 
  Key, 
  Bell, 
  Server, 
  Users,
  ArrowRight,
  Workflow,
  Lock,
  FileCode,
  MessageSquare,
  Cog
} from 'lucide-react';

interface ServiceFlowProps {
  title: string;
  steps: string[];
  icon: React.ReactNode;
  color: string;
}

function ServiceFlow({ title, steps, icon, color }: ServiceFlowProps) {
  return (
    <div className={`bg-${color}-50 rounded-lg p-4`}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h4 className={`font-medium text-${color}-900`}>{title}</h4>
      </div>
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ArrowRight className={`h-4 w-4 text-${color}-400`} />}
            <span className={`text-sm text-${color}-700`}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ComponentNodeProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  services: string[];
  onClick: () => void;
}

function ComponentNode({ title, description, icon, color, services, onClick }: ComponentNodeProps) {
  return (
    <div 
      className={`bg-${color}-50 p-4 rounded-lg border border-${color}-200 cursor-pointer hover:shadow-lg transition-shadow`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h4 className={`font-medium text-${color}-900`}>{title}</h4>
      </div>
      <p className={`text-sm text-${color}-700 mb-3`}>{description}</p>
      <div className="flex flex-wrap gap-2">
        {services.map((service, index) => (
          <span 
            key={index}
            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-${color}-100 text-${color}-800`}
          >
            {service}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ArchitectureDiagram() {
  type ComponentKey = 'auth' | 'ai' | 'functions' | 'database' | 'graph' | 'notifications' | 'vault';

  const [selectedComponent, setSelectedComponent] = useState<ComponentKey | null>(null);

  const components: Record<ComponentKey, {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    services: string[];
    flows: string[];
  }> = {
    auth: {
      title: 'Azure Entra ID',
      description: 'Authentication and authorization service',
      icon: <Shield className="h-5 w-5 text-purple-600" />,
      color: 'purple',
      services: ['Authentication', 'Authorization', 'User Management', 'SSO'],
      flows: [
        'User authentication request',
        'Token validation',
        'Role assignment',
        'Access control'
      ]
    },
    ai: {
      title: 'Azure OpenAI',
      description: 'AI-powered permission suggestions',
      icon: <Brain className="h-5 w-5 text-green-600" />,
      color: 'green',
      services: ['Permission Analysis', 'Code Generation', 'Security Insights'],
      flows: [
        'Permission request analysis',
        'Security impact assessment',
        'Code example generation',
        'Alternative suggestions'
      ]
    },
    functions: {
      title: 'Azure Functions',
      description: 'Serverless API endpoints',
      icon: <Server className="h-5 w-5 text-orange-600" />,
      color: 'orange',
      services: ['API Endpoints', 'Workflow Logic', 'Data Processing'],
      flows: [
        'Request handling',
        'Permission validation',
        'Workflow orchestration',
        'Data transformation'
      ]
    },
    database: {
      title: 'Azure SQL Database',
      description: 'Data storage and management',
      icon: <Database className="h-5 w-5 text-blue-600" />,
      color: 'blue',
      services: ['Data Storage', 'Audit Logging', 'Request Tracking'],
      flows: [
        'Permission storage',
        'Approval workflow tracking',
        'Audit trail logging',
        'Data encryption'
      ]
    },
    graph: {
      title: 'Microsoft Graph API',
      description: 'Graph API integration',
      icon: <Workflow className="h-5 w-5 text-indigo-600" />,
      color: 'indigo',
      services: ['Permission Management', 'User Data', 'Application Data'],
      flows: [
        'Permission scope validation',
        'User profile access',
        'Application data retrieval',
        'Permission implementation'
      ]
    },
    notifications: {
      title: 'Rebar Notifications',
      description: 'Real-time notification system',
      icon: <Bell className="h-5 w-5 text-yellow-600" />,
      color: 'yellow',
      services: ['Real-time Updates', 'Email Notifications', 'Status Alerts'],
      flows: [
        'Event detection',
        'Notification generation',
        'Delivery handling',
        'Status tracking'
      ]
    },
    vault: {
      title: 'Azure Key Vault',
      description: 'Secure credential management',
      icon: <Key className="h-5 w-5 text-red-600" />,
      color: 'red',
      services: ['Secret Management', 'Certificate Storage', 'Key Management'],
      flows: [
        'Credential retrieval',
        'Secret rotation',
        'Access policy enforcement',
        'Encryption key management'
      ]
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(components).map(([key, component]) => (
          <ComponentNode
            key={key}
            {...component}
            onClick={() => setSelectedComponent(key)}
          />
        ))}
      </div>

      {selectedComponent && (
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {components[selectedComponent].icon}
              <h3 className="text-lg font-medium text-gray-900">
                {components[selectedComponent].title} Integration Flow
              </h3>
            </div>
            <button
              onClick={() => setSelectedComponent(null)}
              className="text-gray-400 hover:text-gray-500"
            >
              <Lock className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceFlow
              title="Service Integration"
              steps={components[selectedComponent].flows}
              icon={<Workflow className="h-5 w-5 text-blue-600" />}
              color="blue"
            />

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileCode className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium text-gray-900">Integration Points</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Cog className="h-4 w-4 text-gray-400" />
                    <span>Service configuration and setup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                    <span>API communication and data exchange</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>User interaction and feedback</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-900">Security Measures</h4>
                </div>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-green-500" />
                    <span>Encrypted data transmission</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-green-500" />
                    <span>Secure credential management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-500" />
                    <span>Role-based access control</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
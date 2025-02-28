import { useState, useEffect } from 'react';
import { Calendar, Clock, Target, CheckCircle2, ArrowRight, ChevronDown, ChevronUp, Users, Code, Shield, Zap, Sparkles } from 'lucide-react';
import { generateSprints } from './SprintGenerator';
import type { Sprint } from './types';

export function TimelineDiagram() {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);

  useEffect(() => {
    setSprints(generateSprints());
    // Auto-expand the first phase on initial load
    setExpandedPhase('setup');
  }, []);

  // Project phases with their corresponding sprints
  const phases = [
    { 
      id: 'setup', 
      name: 'Setup & Requirements', 
      sprints: [1, 2], 
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      borderColor: 'border-blue-300',
      icon: <Shield className="h-5 w-5 text-blue-600" />,
      description: 'Establish the core infrastructure and development environment for the project.',
      deliverables: [
        'Azure infrastructure configuration',
        'Development environment setup',
        'Base component development',
        'Testing framework configuration'
      ]
    },
    { 
      id: 'core', 
      name: 'Core Development', 
      sprints: [3, 4], 
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      borderColor: 'border-purple-300',
      icon: <Code className="h-5 w-5 text-purple-600" />,
      description: 'Implement the core permission selection and approval workflow functionality.',
      deliverables: [
        'Permission selection interface',
        'Permission data integration',
        'Approval workflow backend',
        'Approval management interface'
      ]
    },
    { 
      id: 'ai', 
      name: 'AI Integration', 
      sprints: [5], 
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      borderColor: 'border-green-300',
      icon: <Sparkles className="h-5 w-5 text-green-600" />,
      description: 'Integrate Azure OpenAI services to provide intelligent permission suggestions.',
      deliverables: [
        'Azure OpenAI integration',
        'AI suggestion interface',
        'Code example generation',
        'Security impact analysis'
      ]
    },
    { 
      id: 'notifications', 
      name: 'Notification System', 
      sprints: [6], 
      color: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
      borderColor: 'border-yellow-300',
      icon: <Zap className="h-5 w-5 text-yellow-600" />,
      description: 'Develop a robust notification system for the permission request lifecycle.',
      deliverables: [
        'Notification backend',
        'Notification interface',
        'Email integration',
        'Notification preferences'
      ]
    },
    { 
      id: 'dashboard', 
      name: 'Dashboard & Analytics', 
      sprints: [7], 
      color: 'bg-gradient-to-r from-red-500 to-red-600',
      borderColor: 'border-red-300',
      icon: <Target className="h-5 w-5 text-red-600" />,
      description: 'Create comprehensive dashboards and analytics for permission request data.',
      deliverables: [
        'Dashboard backend',
        'Interactive charts',
        'Filtering and export',
        'Real-time updates'
      ]
    },
    { 
      id: 'security', 
      name: 'Security & Compliance', 
      sprints: [8], 
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
      borderColor: 'border-indigo-300',
      icon: <Shield className="h-5 w-5 text-indigo-600" />,
      description: 'Implement comprehensive security features and compliance controls.',
      deliverables: [
        'Authentication enhancements',
        'Authorization controls',
        'Audit logging',
        'Compliance reporting'
      ]
    },
    { 
      id: 'performance', 
      name: 'Performance Optimization', 
      sprints: [9], 
      color: 'bg-gradient-to-r from-pink-500 to-pink-600',
      borderColor: 'border-pink-300',
      icon: <Zap className="h-5 w-5 text-pink-600" />,
      description: 'Optimize the application for improved performance and scalability.',
      deliverables: [
        'Backend optimization',
        'Frontend optimization',
        'Caching implementation',
        'Load testing'
      ]
    },
    { 
      id: 'documentation', 
      name: 'Documentation & Training', 
      sprints: [10], 
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      borderColor: 'border-orange-300',
      icon: <FileIcon className="h-5 w-5 text-orange-600" />,
      description: 'Create comprehensive documentation and training materials.',
      deliverables: [
        'Technical documentation',
        'User guides',
        'API documentation',
        'Video tutorials'
      ]
    },
    { 
      id: 'uat', 
      name: 'UAT & Bug Fixes', 
      sprints: [11], 
      color: 'bg-gradient-to-r from-teal-500 to-teal-600',
      borderColor: 'border-teal-300',
      icon: <Users className="h-5 w-5 text-teal-600" />,
      description: 'Conduct user acceptance testing and address identified issues.',
      deliverables: [
        'UAT environment setup',
        'Stakeholder testing',
        'Bug fixes',
        'Final refinements'
      ]
    },
    { 
      id: 'deployment', 
      name: 'Production Deployment', 
      sprints: [12], 
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      borderColor: 'border-emerald-300',
      icon: <Rocket className="h-5 w-5 text-emerald-600" />,
      description: 'Deploy the application to production and ensure smooth operation.',
      deliverables: [
        'Production environment setup',
        'Deployment execution',
        'Post-deployment verification',
        'Monitoring setup'
      ]
    }
  ];

  // Get sprint details by number
  const getSprintByNumber = (sprintNumber: number): Sprint | undefined => {
    return sprints.find(s => s.id === sprintNumber);
  };

  // Toggle expanded phase
  const togglePhase = (phaseId: string) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  // Get the total number of user stories for a phase
  const getTotalUserStories = (phaseSprintNumbers: number[]): number => {
    return phaseSprintNumbers.reduce((total, sprintNum) => {
      const sprint = getSprintByNumber(sprintNum);
      return total + (sprint?.userStories.length || 0);
    }, 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center">
          <Calendar className="h-6 w-6 mr-3" />
          <div>
            <h3 className="text-xl font-bold">Project Timeline</h3>
            <p className="text-blue-100 text-sm mt-1">March 2025 - August 2025</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Phase navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {phases.map((phase) => (
            <button
              key={phase.id}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
                expandedPhase === phase.id
                  ? `${phase.color.replace('bg-gradient-to-r', 'bg')} text-white shadow-md`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => togglePhase(phase.id)}
            >
              {phase.icon}
              <span className="ml-1.5">{phase.name}</span>
            </button>
          ))}
        </div>

        <div className="relative">
          {/* Timeline line with gradient */}
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full"></div>

          {/* Project phases */}
          <div className="space-y-8">
            {phases.map((phase, index) => {
              const isExpanded = expandedPhase === phase.id;
              const firstSprint = getSprintByNumber(phase.sprints[0]);
              const lastSprint = getSprintByNumber(phase.sprints[phase.sprints.length - 1]);
              const totalStories = getTotalUserStories(phase.sprints);
              
              return (
                <div 
                  key={phase.id} 
                  className="relative pl-12"
                  onMouseEnter={() => setHoveredPhase(phase.id)}
                  onMouseLeave={() => setHoveredPhase(null)}
                >
                  {/* Timeline dot with pulse effect */}
                  <div className="absolute left-4 top-6 transform -translate-x-1/2 z-10">
                    <div className={`w-6 h-6 rounded-full ${phase.color} shadow-md flex items-center justify-center`}>
                      {hoveredPhase === phase.id && (
                        <div className="absolute w-10 h-10 rounded-full animate-ping opacity-75" style={{background: `rgba(${index * 20}, 100, 200, 0.3)`}}></div>
                      )}
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Phase card */}
                  <div 
                    className={`border-2 rounded-lg overflow-hidden transition-all duration-300 ${
                      isExpanded 
                        ? `${phase.borderColor} shadow-lg` 
                        : `border-gray-200 hover:${phase.borderColor} hover:shadow-md`
                    }`}
                  >
                    {/* Phase header */}
                    <div 
                      className={`p-4 cursor-pointer transition-colors duration-200 ${
                        isExpanded ? 'bg-gray-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => togglePhase(phase.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full ${phase.color} shadow flex items-center justify-center mr-3`}>
                            {phase.icon}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{phase.name}</h4>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>
                                {firstSprint?.startDate} to {lastSprint?.endDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex flex-col items-end">
                            <div className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                              Sprint {phase.sprints.join(', ')}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {totalStories} User Stories
                            </div>
                          </div>
                          <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Expanded content with animation */}
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${
                        isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="border-t border-gray-200 p-6 bg-gray-50">
                        <p className="text-gray-600 mb-6 leading-relaxed">{phase.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="text-sm font-bold text-gray-900 mb-3 flex items-center uppercase tracking-wider">
                              <Target className="h-4 w-4 text-blue-600 mr-2" />
                              Key Deliverables
                            </h5>
                            <ul className="space-y-3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                              {phase.deliverables.map((deliverable, idx) => (
                                <li key={idx} className="flex items-start text-gray-700">
                                  <div className="flex-shrink-0 mt-1">
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                  </div>
                                  <span className="ml-3">{deliverable}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-bold text-gray-900 mb-3 flex items-center uppercase tracking-wider">
                              <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                              Sprint Details
                            </h5>
                            <div className="space-y-3">
                              {phase.sprints.map(sprintNum => {
                                const sprint = getSprintByNumber(sprintNum);
                                if (!sprint) return null;
                                
                                return (
                                  <div key={sprintNum} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center">
                                        <div className={`w-8 h-8 rounded-full ${phase.color} flex items-center justify-center mr-3`}>
                                          <span className="text-white font-bold text-xs">{sprint.id}</span>
                                        </div>
                                        <div className="font-bold text-gray-900">Sprint {sprint.id}</div>
                                      </div>
                                      <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                        {sprint.startDate} to {sprint.endDate}
                                      </div>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                      <div className="text-sm text-gray-600">
                                        {sprint.userStories.length} User Stories
                                      </div>
                                      <div className="flex space-x-2">
                                        {sprint.userStories.slice(0, 3).map((story, idx) => (
                                          <div 
                                            key={idx} 
                                            className="w-2 h-2 rounded-full"
                                            style={{
                                              backgroundColor: 
                                                story.type === 'Development' ? '#8b5cf6' : 
                                                story.type === 'Testing' ? '#10b981' : 
                                                '#f59e0b'
                                            }}
                                          ></div>
                                        ))}
                                        {sprint.userStories.length > 3 && (
                                          <div className="text-xs text-gray-500">+{sprint.userStories.length - 3}</div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom File icon component
function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

// Custom Rocket icon component
function Rocket(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}
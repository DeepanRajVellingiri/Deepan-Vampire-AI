import { useState } from 'react';
import { Milestone, Clock, Calendar, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface ProjectMilestone {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'in-progress' | 'upcoming' | 'at-risk';
  description: string;
  deliverables: string[];
}

export function MilestoneTimeline() {
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null);
  
  const milestones: ProjectMilestone[] = [
    {
      id: 'milestone-1',
      title: 'Project Kickoff',
      date: '2025-03-01',
      status: 'completed',
      description: 'Initial project setup and infrastructure configuration.',
      deliverables: [
        'Project charter',
        'Azure infrastructure setup',
        'Development environment configuration',
        'Initial backlog creation'
      ]
    },
    {
      id: 'milestone-2',
      title: 'Core Functionality Complete',
      date: '2025-04-30',
      status: 'in-progress',
      description: 'Completion of the core permission selection and approval workflow functionality.',
      deliverables: [
        'Permission selection interface',
        'Permission data integration',
        'Approval workflow',
        'Basic dashboard'
      ]
    },
    {
      id: 'milestone-3',
      title: 'AI Integration Complete',
      date: '2025-05-15',
      status: 'upcoming',
      description: 'Integration of Azure OpenAI for intelligent permission suggestions.',
      deliverables: [
        'Azure OpenAI integration',
        'AI suggestion interface',
        'Code example generation',
        'Security impact analysis'
      ]
    },
    {
      id: 'milestone-4',
      title: 'Feature Complete',
      date: '2025-06-30',
      status: 'upcoming',
      description: 'All planned features implemented and ready for testing.',
      deliverables: [
        'Notification system',
        'Dashboard and analytics',
        'Security and compliance features',
        'Performance optimizations'
      ]
    },
    {
      id: 'milestone-5',
      title: 'User Acceptance Testing',
      date: '2025-07-31',
      status: 'at-risk',
      description: 'Comprehensive testing with stakeholders to validate the system.',
      deliverables: [
        'UAT environment',
        'Test scenarios',
        'Stakeholder feedback',
        'Bug fixes and refinements'
      ]
    },
    {
      id: 'milestone-6',
      title: 'Production Deployment',
      date: '2025-08-31',
      status: 'upcoming',
      description: 'Final deployment to production environment.',
      deliverables: [
        'Production environment setup',
        'Deployment execution',
        'Post-deployment verification',
        'Monitoring setup'
      ]
    }
  ];

  const toggleMilestone = (id: string) => {
    setExpandedMilestone(expandedMilestone === id ? null : id);
  };

  const getStatusIcon = (status: ProjectMilestone['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'at-risk':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusClass = (status: ProjectMilestone['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'at-risk':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: ProjectMilestone['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'at-risk':
        return 'At Risk';
      default:
        return 'Upcoming';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Milestone className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Project Milestones</h3>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        {/* Milestones */}
        <div className="space-y-6">
          {milestones.map((milestone) => {
            const isExpanded = expandedMilestone === milestone.id;
            
            return (
              <div key={milestone.id} className="relative pl-12">
                {/* Timeline dot */}
                <div className={`absolute left-4 top-4 w-4 h-4 rounded-full transform -translate-x-1/2 z-10 ${
                  milestone.status === 'completed' ? 'bg-green-500' :
                  milestone.status === 'in-progress' ? 'bg-blue-500' :
                  milestone.status === 'at-risk' ? 'bg-orange-500' :
                  'bg-gray-400'
                }`}></div>
                
                {/* Milestone card */}
                <div 
                  className={`border rounded-lg shadow-sm overflow-hidden transition-all duration-200 ${
                    isExpanded ? 'border-blue-300 shadow-md' : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  {/* Milestone header */}
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() => toggleMilestone(milestone.id)}
                  >
                    <div className="flex-1">
                      <h4 className="text-md font-medium text-gray-900">{milestone.title}</h4>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{milestone.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(milestone.status)}`}>
                        {getStatusIcon(milestone.status)}
                        <span className="ml-1">{getStatusText(milestone.status)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      <p className="text-sm text-gray-600 mb-4">{milestone.description}</p>
                      
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Key Deliverables</h5>
                      <ul className="space-y-2">
                        {milestone.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
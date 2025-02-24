import { useState } from 'react';
import { 
  Calendar,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  Code,
  TestTube,
  FileText,
  Users,
  Workflow,
  Lightbulb,
  ScrollText,
  Target,
  Shield,
  Database,
  Brain,
  Bell
} from 'lucide-react';

interface Sprint {
  id: number;
  startDate: string;
  endDate: string;
  userStories: UserStory[];
}

interface UserStory {
  id: string;
  title: string;
  description: string;
  type: 'Development' | 'Testing' | 'BA' | 'Product';
  tasks: Task[];
  status: 'To Do' | 'In Progress' | 'Done';
  points: number;
  priority: 'High' | 'Medium' | 'Low';
  acceptanceCriteria?: string[];
}

interface Task {
  id: string;
  title: string;
  role: string;
  status: 'To Do' | 'In Progress' | 'Done';
  estimate: string;
}

function generateSprints(): Sprint[] {
  const startDate = new Date('2025-03-01');
  const sprints: Sprint[] = [];
  
  for (let i = 0; i < 12; i++) {
    const sprintStart = new Date(startDate);
    sprintStart.setDate(startDate.getDate() + (i * 14));
    const sprintEnd = new Date(sprintStart);
    sprintEnd.setDate(sprintStart.getDate() + 13);

    sprints.push({
      id: i + 1,
      startDate: sprintStart.toISOString().split('T')[0],
      endDate: sprintEnd.toISOString().split('T')[0],
      userStories: generateUserStories(i + 1)
    });
  }

  return sprints;
}

function generateUserStories(sprintNumber: number): UserStory[] {
  const stories: UserStory[] = [];
  
  // Sprint 1-2: Project Setup and Requirements
  if (sprintNumber <= 2) {
    stories.push({
      id: `US-${sprintNumber}-1`,
      title: 'Project Infrastructure Setup',
      description: 'Set up Azure infrastructure and development environment',
      type: 'Development',
      points: 8,
      priority: 'High',
      status: 'To Do',
      acceptanceCriteria: [
        'Azure Entra ID is configured and accessible',
        'Azure Functions environment is set up and functional',
        'SQL Database is provisioned and accessible',
        'Local development environment is configured'
      ],
      tasks: [
        {
          id: `TASK-${sprintNumber}-1-1`,
          title: 'Configure Azure Entra ID integration',
          role: 'DevOps',
          status: 'To Do',
          estimate: '3d'
        },
        {
          id: `TASK-${sprintNumber}-1-2`,
          title: 'Set up Azure Functions and SQL Database',
          role: 'DevOps',
          status: 'To Do',
          estimate: '3d'
        }
      ]
    });

    stories.push({
      id: `US-${sprintNumber}-2`,
      title: 'Infrastructure Testing and Validation',
      description: 'Verify all infrastructure components are properly configured',
      type: 'Testing',
      points: 5,
      priority: 'High',
      status: 'To Do',
      acceptanceCriteria: [
        'All Azure services are accessible and responding correctly',
        'Authentication flow works as expected',
        'Database connections are secure and performant',
        'Monitoring and logging are properly configured'
      ],
      tasks: [
        {
          id: `TASK-${sprintNumber}-2-1`,
          title: 'Test Azure Entra ID configuration',
          role: 'QA Engineer',
          status: 'To Do',
          estimate: '2d'
        },
        {
          id: `TASK-${sprintNumber}-2-2`,
          title: 'Validate database security and performance',
          role: 'Security Engineer',
          status: 'To Do',
          estimate: '2d'
        }
      ]
    });
  }

  // Sprint 3-5: Core Features Development
  else if (sprintNumber <= 5) {
    stories.push({
      id: `US-${sprintNumber}-1`,
      title: 'Permission Management Interface',
      description: 'Implement core permission selection and management UI',
      type: 'Development',
      points: 13,
      priority: 'High',
      status: 'To Do',
      acceptanceCriteria: [
        'Users can select multiple permissions',
        'Permission details are displayed clearly',
        'Form validation prevents invalid submissions',
        'Changes are saved automatically',
        'UI is responsive and accessible'
      ],
      tasks: [
        {
          id: `TASK-${sprintNumber}-1-1`,
          title: 'Implement permission selection component',
          role: 'Frontend Developer',
          status: 'To Do',
          estimate: '5d'
        },
        {
          id: `TASK-${sprintNumber}-1-2`,
          title: 'Integrate Graph API permissions',
          role: 'Backend Developer',
          status: 'To Do',
          estimate: '4d'
        }
      ]
    });

    stories.push({
      id: `US-${sprintNumber}-2`,
      title: 'Permission Interface Testing',
      description: 'Comprehensive testing of permission management interface',
      type: 'Testing',
      points: 8,
      priority: 'High',
      status: 'To Do',
      acceptanceCriteria: [
        'All UI components render correctly',
        'Form validation works as expected',
        'API integration tests pass',
        'Accessibility standards are met',
        'Performance meets requirements'
      ],
      tasks: [
        {
          id: `TASK-${sprintNumber}-2-1`,
          title: 'Create UI component tests',
          role: 'QA Engineer',
          status: 'To Do',
          estimate: '3d'
        },
        {
          id: `TASK-${sprintNumber}-2-2`,
          title: 'Perform accessibility testing',
          role: 'QA Engineer',
          status: 'To Do',
          estimate: '2d'
        }
      ]
    });

    stories.push({
      id: `US-${sprintNumber}-3`,
      title: 'Approval Workflow Implementation',
      description: 'Build multi-stage approval workflow system',
      type: 'Development',
      points: 13,
      priority: 'High',
      status: 'To Do',
      acceptanceCriteria: [
        'Workflow stages are clearly defined',
        'Approvers can review and act on requests',
        'Status updates are reflected in real-time',
        'Email notifications are sent correctly',
        'Audit trail is maintained'
      ],
      tasks: [
        {
          id: `TASK-${sprintNumber}-3-1`,
          title: 'Implement approval workflow logic',
          role: 'Backend Developer',
          status: 'To Do',
          estimate: '4d'
        },
        {
          id: `TASK-${sprintNumber}-3-2`,
          title: 'Create approval UI components',
          role: 'Frontend Developer',
          status: 'To Do',
          estimate: '3d'
        }
      ]
    });

    stories.push({
      id: `US-${sprintNumber}-4`,
      title: 'Approval Workflow Testing',
      description: 'Test approval workflow functionality',
      type: 'Testing',
      points: 8,
      priority: 'High',
      status: 'To Do',
      acceptanceCriteria: [
        'All workflow stages function correctly',
        'Notifications are delivered properly',
        'State transitions are handled correctly',
        'Edge cases are properly handled',
        'Performance under load meets requirements'
      ],
      tasks: [
        {
          id: `TASK-${sprintNumber}-4-1`,
          title: 'Create workflow test scenarios',
          role: 'QA Engineer',
          status: 'To Do',
          estimate: '3d'
        },
        {
          id: `TASK-${sprintNumber}-4-2`,
          title: 'Perform load testing',
          role: 'Performance Engineer',
          status: 'To Do',
          estimate: '2d'
        }
      ]
    });
  }

  // Sprint 6-8: AI Integration and Advanced Features
  else if (sprintNumber <= 8) {
    stories.push({
      id: `US-${sprintNumber}-1`,
      title: 'Azure OpenAI Integration',
      description: 'Implement AI-powered permission suggestions',
      type: 'Development',
      points: 13,
      priority: 'Medium',
      status: 'To Do',
      acceptanceCriteria: [
        'AI service responds within performance targets',
        'Suggestions are relevant to user context',
        'Error handling is robust',
        'Service fallback works correctly'
      ],
      tasks: [
        {
          id: `TASK-${sprintNumber}-1-1`,
          title: 'Implement AI service integration',
          role: 'Backend Developer',
          status: 'To Do',
          estimate: '4d'
        },
        {
          id: `TASK-${sprintNumber}-1-2`,
          title: 'Create suggestion UI components',
          role: 'Frontend Developer',
          status: 'To Do',
          estimate: '3d'
        }
      ]
    });

    stories.push({
      id: `US-${sprintNumber}-2`,
      title: 'AI Integration Testing',
      description: 'Test AI suggestion functionality',
      type: 'Testing',
      points: 8,
      priority: 'Medium',
      status: 'To Do',
      acceptanceCriteria: [
        'AI responses meet accuracy requirements',
        'Performance meets SLA targets',
        'Error scenarios are handled gracefully',
        'Integration points work correctly'
      ],
      tasks: [
        {
          id: `TASK-${sprintNumber}-2-1`,
          title: 'Test AI response quality',
          role: 'QA Engineer',
          status: 'To Do',
          estimate: '3d'
        },
        {
          id: `TASK-${sprintNumber}-2-2`,
          title: 'Performance testing of AI integration',
          role: 'Performance Engineer',
          status: 'To Do',
          estimate: '2d'
        }
      ]
    });
  }

  // Sprint 9-10: Testing and Quality Assurance
  else if (sprintNumber <= 10) {
    stories.push({
      id: `US-${sprintNumber}-1`,
      title: 'End-to-End Testing',
      description: 'Comprehensive system testing',
      type: 'Testing',
      points: 13,
      priority: 'High',
      status: 'To Do',
      acceptanceCriteria: [
        'All critical paths are tested',
        'Integration points are verified',
        'Performance meets requirements',
        'Security requirements are met'
      ],
      tasks: [
        {
          id: `TASK-${sprintNumber}-1-1`,
          title: 'Execute end-to-end test cases',
          role: 'QA Engineer',
          status: 'To Do',
          estimate: '5d'
        },
        {
          id: `TASK-${sprintNumber}-1-2`,
          title: 'Security penetration testing',
          role: 'Security Engineer',
          status: 'To Do',
          estimate: '4d'
        }
      ]
    });

    stories.push({
      id: `US-${sprintNumber}-2`,
      title: 'Performance Optimization',
      description: 'Optimize system performance',
      type: 'Development',
      points: 8,
      priority: 'High',
      status: 'To Do',
      acceptanceCriteria: [
        'Response times meet SLA requirements',
        'Resource usage is optimized',
        'Caching is implemented correctly',
        'Database queries are optimized'
      ],
      tasks: [
        {
          id: `TASK-${sprintNumber}-2-1`,
          title: 'Optimize database queries',
          role: 'Backend Developer',
          status: 'To Do',
          estimate: '3d'
        },
        {
          id: `TASK-${sprintNumber}-2-2`,
          title: 'Implement caching',
          role: 'Backend Developer',
          status: 'To Do',
          estimate: '2d'
        }
      ]
    });
  }

  // Sprint 11-12: Launch Preparation and Go-Live
  else {
    stories.push({
      id: `US-${sprintNumber}-1`,
      title: 'Production Deployment',
      description: 'Prepare and execute production deployment',
      type: 'Development',
      points: 8,
      priority: 'High',
      status: 'To Do',
      acceptanceCriteria: [
        'All environments are properly configured',
        'Monitoring is set up and functional',
        'Backup procedures are in place',
        'Rollback procedures are documented'
      ],
      tasks: [
        {
          id: `TASK-${sprintNumber}-1-1`,
          title: 'Configure production environment',
          role: 'DevOps',
          status: 'To Do',
          estimate: '3d'
        },
        {
          id: `TASK-${sprintNumber}-1-2`,
          title: 'Set up monitoring and alerts',
          role: 'DevOps',
          status: 'To Do',
          estimate: '2d'
        }
      ]
    });

    stories.push({
      id: `US-${sprintNumber}-2`,
      title: 'Production Readiness Testing',
      description: 'Final testing in production-like environment',
      type: 'Testing',
      points: 8,
      priority: 'High',
      status: 'To Do',
      acceptanceCriteria: [
        'All critical paths work in production environment',
        'Monitoring alerts work correctly',
        'Backup and restore procedures verified',
        'Performance meets production requirements'
      ],
      tasks: [
        {
          id: `TASK-${sprintNumber}-2-1`,
          title: 'Production environment testing',
          role: 'QA Engineer',
          status: 'To Do',
          estimate: '3d'
        },
        {
          id: `TASK-${sprintNumber}-2-2`,
          title: 'Disaster recovery testing',
          role: 'DevOps',
          status: 'To Do',
          estimate: '2d'
        }
      ]
    });
  }

  return stories;
}

function SprintCard({ sprint, isExpanded, onToggle }: { 
  sprint: Sprint; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Development':
        return <Code className="h-4 w-4 text-purple-500" />;
      case 'Testing':
        return <TestTube className="h-4 w-4 text-green-500" />;
      case 'BA':
        return <ScrollText className="h-4 w-4 text-blue-500" />;
      case 'Product':
        return <Target className="h-4 w-4 text-red-500" />;
      default:
        return <Lightbulb className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div 
        className="px-4 py-5 sm:px-6 cursor-pointer hover:bg-gray-50"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              Sprint {sprint.id}
            </h3>
            <span className="ml-2 text-sm text-gray-500">
              {sprint.startDate} to {sprint.endDate}
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="space-y-6">
            {sprint.userStories.map(story => (
              <div key={story.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(story.type)}
                      <h4 className="text-sm font-medium text-gray-900">
                        {story.title}
                      </h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(story.status)}`}>
                        {story.status}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(story.priority)}`}>
                        {story.priority}
                      </span>
                      <span className="text-xs text-gray-500">
                        {story.points} points
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {story.description}
                    </p>

                    {story.acceptanceCriteria && (
                      <div className="mt-3">
                        <h5 className="text-sm font-medium text-gray-900">Acceptance Criteria:</h5>
                        <ul className="mt-1 list-disc pl-5 text-sm text-gray-600">
                          {story.acceptanceCriteria.map((criteria, index) => (
                            <li key={index}>{criteria}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-4 space-y-3">
                      {story.tasks.map(task => (
                        <div key={task.id} className="bg-white rounded p-3 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900">
                                {task.title}
                              </span>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
                                {task.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-500">
                                {task.role}
                              </span>
                              <span className="text-sm text-gray-500">
                                {task.estimate}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function TimelineTab() {
  const [expandedSprints, setExpandedSprints] = useState<number[]>([1]);
  const sprints = generateSprints();

  const toggleSprint = (sprintId: number) => {
    setExpandedSprints(current =>
      current.includes(sprintId)
        ? current.filter(id => id !== sprintId)
        : [...current, sprintId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3">
          <Workflow className="h-8 w-8 text-white" />
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Project Timeline
            </h1>
            <p className="text-indigo-100">
              March 2025 - August 2025 (6 months, 2-week sprints)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-medium text-gray-900">Project Overview</h2>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Duration: 6 months</p>
            <p>• Sprint Length: 2 weeks</p>
            <p>• Total Sprints: 12</p>
            <p>• Start: March 1, 2025</p>
            <p>• End: August 31, 2025</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-red-600" />
            <h2 className="text-lg font-medium text-gray-900">Key Deliverables</h2>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-500" />
              <span>Azure Entra ID Integration</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-green-500" />
              <span>Permission Management System</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-500" />
              <span>AI-Powered Suggestions</span>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-yellow-500" />
              <span>Rebar Notifications</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-green-600" />
            <h2 className="text-lg font-medium text-gray-900">Project Phases</h2>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Setup & Requirements (Sprint 1-2)</p>
            <p>• Core Development (Sprint 3-5)</p>
            <p>• AI Integration (Sprint 6-8)</p>
            <p>• Testing & QA (Sprint 9-10)</p>
            <p>• Launch Prep (Sprint 11-12)</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sprints.map(sprint => (
          <SprintCard
            key={sprint.id}
            sprint={sprint}
            isExpanded={expandedSprints.includes(sprint.id)}
            onToggle={() => toggleSprint(sprint.id)}
          />
        ))}
      </div>
    </div>
  );
}
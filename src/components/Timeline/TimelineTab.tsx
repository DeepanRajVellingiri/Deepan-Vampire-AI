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
  
  switch(sprintNumber) {
    case 1:
      // Sprint 1: Project Setup and Initial Infrastructure
      stories.push({
        id: `US-${sprintNumber}-1`,
        title: 'Azure Infrastructure Setup',
        description: 'Set up core Azure infrastructure components',
        type: 'Development',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Azure Entra ID is configured and accessible',
          'Azure Functions environment is set up',
          'Azure SQL Database is provisioned',
          'Azure Key Vault is configured'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-1-1`,
            title: 'Configure Azure Entra ID',
            role: 'DevOps Engineer',
            status: 'To Do',
            estimate: '2d'
          },
          {
            id: `TASK-${sprintNumber}-1-2`,
            title: 'Set up Azure Functions',
            role: 'DevOps Engineer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-2`,
        title: 'Infrastructure Testing',
        description: 'Test and validate Azure infrastructure setup',
        type: 'Testing',
        points: 5,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'All Azure services are accessible',
          'Authentication flow works correctly',
          'Database connections are secure',
          'Key Vault access is working'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-2-1`,
            title: 'Test Azure Entra ID integration',
            role: 'QA Engineer',
            status: 'To Do',
            estimate: '2d'
          },
          {
            id: `TASK-${sprintNumber}-2-2`,
            title: 'Validate security configuration',
            role: 'Security Engineer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });
      break;

    case 2:
      // Sprint 2: Development Environment and Base Components
      stories.push({
        id: `US-${sprintNumber}-1`,
        title: 'Development Environment Setup',
        description: 'Set up local development environment and base project structure',
        type: 'Development',
        points: 5,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'React project with TypeScript is set up',
          'Development tools are configured',
          'CI/CD pipeline is established',
          'Code quality tools are integrated'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-1-1`,
            title: 'Set up React project',
            role: 'Frontend Developer',
            status: 'To Do',
            estimate: '1d'
          },
          {
            id: `TASK-${sprintNumber}-1-2`,
            title: 'Configure CI/CD pipeline',
            role: 'DevOps Engineer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-2`,
        title: 'Base Component Development',
        description: 'Create core UI components and layouts',
        type: 'Development',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Navigation component is implemented',
          'Layout structure is created',
          'Base styling is applied',
          'Component library is integrated'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-2-1`,
            title: 'Create navigation component',
            role: 'Frontend Developer',
            status: 'To Do',
            estimate: '2d'
          },
          {
            id: `TASK-${sprintNumber}-2-2`,
            title: 'Implement base layouts',
            role: 'Frontend Developer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-3`,
        title: 'Component Testing Setup',
        description: 'Set up testing framework and initial tests',
        type: 'Testing',
        points: 5,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Testing framework is configured',
          'Component tests are working',
          'CI integration is complete',
          'Test coverage reporting is set up'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-3-1`,
            title: 'Configure testing framework',
            role: 'QA Engineer',
            status: 'To Do',
            estimate: '2d'
          },
          {
            id: `TASK-${sprintNumber}-3-2`,
            title: 'Write base component tests',
            role: 'QA Engineer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });
      break;

    case 3:
      // Sprint 3: Permission Selection Interface
      stories.push({
        id: `US-${sprintNumber}-1`,
        title: 'Permission Selection UI',
        description: 'Implement permission selection interface',
        type: 'Development',
        points: 13,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Users can search and select permissions',
          'Permission details are displayed',
          'Selection state is maintained',
          'UI is responsive and accessible'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-1-1`,
            title: 'Create permission selector',
            role: 'Frontend Developer',
            status: 'To Do',
            estimate: '3d'
          },
          {
            id: `TASK-${sprintNumber}-1-2`,
            title: 'Implement search functionality',
            role: 'Frontend Developer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-2`,
        title: 'Permission Data Integration',
        description: 'Integrate Graph API permission data',
        type: 'Development',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Permission data is loaded correctly',
          'Data is cached appropriately',
          'Error handling is implemented',
          'Performance requirements are met'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-2-1`,
            title: 'Implement data loading',
            role: 'Backend Developer',
            status: 'To Do',
            estimate: '2d'
          },
          {
            id: `TASK-${sprintNumber}-2-2`,
            title: 'Set up caching system',
            role: 'Backend Developer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-3`,
        title: 'Permission Interface Testing',
        description: 'Test permission selection functionality',
        type: 'Testing',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Selection functionality works correctly',
          'Search results are accurate',
          'UI is responsive and accessible',
          'Error states are handled properly'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-3-1`,
            title: 'Test selection functionality',
            role: 'QA Engineer',
            status: 'To Do',
            estimate: '2d'
          },
          {
            id: `TASK-${sprintNumber}-3-2`,
            title: 'Perform accessibility testing',
            role: 'QA Engineer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });
      break;

    case 4:
      // Sprint 4: Approval Workflow Implementation
      stories.push({
        id: `US-${sprintNumber}-1`,
        title: 'Approval Workflow Backend',
        description: 'Implement approval workflow logic',
        type: 'Development',
        points: 13,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Workflow stages are implemented',
          'State transitions work correctly',
          'Approver roles are managed',
          'History is maintained'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-1-1`,
            title: 'Implement workflow engine',
            role: 'Backend Developer',
            status: 'To Do',
            estimate: '4d'
          },
          {
            id: `TASK-${sprintNumber}-1-2`,
            title: 'Create approval handlers',
            role: 'Backend Developer',
            status: 'To Do',
            estimate: '3d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-2`,
        title: 'Approval Interface',
        description: 'Create approval management interface',
        type: 'Development',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Approvers can review requests',
          'Actions are clearly presented',
          'Status is updated in real-time',
          'History is displayed'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-2-1`,
            title: 'Create approval UI',
            role: 'Frontend Developer',
            status: 'To Do',
            estimate: '3d'
          },
          {
            id: `TASK-${sprintNumber}-2-2`,
            title: 'Implement real-time updates',
            role: 'Frontend Developer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-3`,
        title: 'Workflow Testing',
        description: 'Test approval workflow functionality',
        type: 'Testing',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Workflow transitions work correctly',
          'Permissions are properly enforced',
          'History is accurately maintained',
          'Edge cases are handled'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-3-1`,
            title: 'Test workflow logic',
            role: 'QA Engineer',
            status: 'To Do',
            estimate: '3d'
          },
          {
            id: `TASK-${sprintNumber}-3-2`,
            title: 'Perform security testing',
            role: 'Security Engineer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });
      break;

    case 5:
      // Sprint 5: AI Integration
      stories.push({
        id: `US-${sprintNumber}-1`,
        title: 'Azure OpenAI Integration',
        description: 'Integrate Azure OpenAI for permission suggestions',
        type: 'Development',
        points: 13,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'AI service is properly integrated',
          'Suggestions are relevant',
          'Response times meet requirements',
          'Error handling is robust'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-1-1`,
            title: 'Set up Azure OpenAI client',
            role: 'Backend Developer',
            status: 'To Do',
            estimate: '3d'
          },
          {
            id: `TASK-${sprintNumber}-1-2`,
            title: 'Implement suggestion logic',
            role: 'Backend Developer',
            status: 'To Do',
            estimate: '3d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-2`,
        title: 'AI Suggestion Interface',
        description: 'Create UI for AI-powered suggestions',
        type: 'Development',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Suggestions are clearly displayed',
          'Users can accept/reject suggestions',
          'Loading states are handled',
          'Errors are properly displayed'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-2-1`,
            title: 'Create suggestion UI',
            role: 'Frontend Developer',
            status: 'To Do',
            estimate: '3d'
          },
          {
            id: `TASK-${sprintNumber}-2-2`,
            title: 'Implement interaction handlers',
            role: 'Frontend Developer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-3`,
        title: 'AI Integration Testing',
        description: 'Test AI suggestion functionality',
        type: 'Testing',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Suggestions are accurate',
          'Performance meets requirements',
          'Error handling works correctly',
          'Edge cases are covered'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-3-1`,
            title: 'Test suggestion accuracy',
            role: 'QA Engineer',
            status: 'To Do',
            estimate: '3d'
          },
          {
            id: `TASK-${sprintNumber}-3-2`,
            title: 'Performance testing',
            role: 'Performance Engineer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });
      break;

    case 6:
      // Sprint 6: Notification System
      stories.push({
        id: `US-${sprintNumber}-1`,
        title: 'Notification Backend',
        description: 'Implement notification system backend',
        type: 'Development',
        points: 13,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Notifications are generated correctly',
          'Different notification types work',
          'Delivery is reliable',
          'Templates are flexible'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-1-1`,
            title: 'Create notification engine',
            role: 'Backend Developer',
            status: 'To Do',
            estimate: '4d'
          },
          {
            id: `TASK-${sprintNumber}-1-2`,
            title: 'Implement templates',
            role: 'Backend Developer',
            status: 'To Do',
            estimate: '3d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-2`,
        title: 'Notification Interface',
        description: 'Create notification management UI',
        type: 'Development',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Notifications are displayed properly',
          'Users can manage preferences',
          'Real-time updates work',
          'History is maintained'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-2-1`,
            title: 'Create notification UI',
            role: 'Frontend Developer',
            status: 'To Do',
            estimate: '3d'
          },
          {
            id: `TASK-${sprintNumber}-2-2`,
            title: 'Implement preferences',
            role: 'Frontend Developer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-3`,
        title: 'Notification Testing',
        description: 'Test notification system',
        type: 'Testing',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Notifications are delivered correctly',
          'Templates render properly',
          'Preferences are respected',
          'Performance is acceptable'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-3-1`,
            title: 'Test notification delivery',
            role: 'QA Engineer',
            status: 'To Do',
            estimate: '3d'
          },
          {
            id: `TASK-${sprintNumber}-3-2`,
            title: 'Test template rendering',
            role: 'QA Engineer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });
      break;

    case 7:
      // Sprint 7: Dashboard and Analytics
      stories.push({
        id: `US-${sprintNumber}-1`,
        title: 'Dashboard Backend',
        description: 'Implement dashboard data processing',
        type: 'Development',
        points: 13,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Data aggregation works correctly',
          'Metrics are calculated accurately',
          'Performance is optimized',
          'Data is cached appropriately'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-1-1`,
            title: 'Implement data aggregation',
            role: 'Backend Developer',
            status: 'To Do',
            estimate: '4d'
          },
          {
            id: `TASK-${sprintNumber}-1-2`,
            title: 'Create metrics engine',
            role: 'Backend Developer',
            status: 'To Do',
            estimate: '3d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-2`,
        title: 'Dashboard Interface',
        description: 'Create dashboard UI with charts',
        type: 'Development',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Charts display correctly',
          'Filters work properly',
          'Data updates in real-time',
          'UI is responsive'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-2-1`,
            title: 'Create dashboard layout',
            role: 'Frontend Developer',
            status: 'To Do',
            estimate: '3d'
          },
          {
            id: `TASK-${sprintNumber}-2-2`,
            title: 'Implement charts',
            role: 'Frontend Developer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-3`,
        title: 'Dashboard Testing',
        description: 'Test dashboard functionality',
        type: 'Testing',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Data is displayed accurately',
          'Filters work correctly',
          'Performance is acceptable',
          'Charts render properly'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-3-1`,
            title: 'Test data accuracy',
            role: 'QA Engineer',
            status: 'To Do',
            estimate: '3d'
          },
          {
            id: `TASK-${sprintNumber}-3-2`,
            title: 'Performance testing',
            role: 'Performance Engineer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });
      break;

    case 8:
      // Sprint 8: Security and Compliance
      stories.push({
        id: `US-${sprintNumber}-1`,
        title: 'Security Implementation',
        description: 'Implement security features and controls',
        type: 'Development',
        points: 13,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Authentication is secure',
          'Authorization works correctly',
          'Data encryption is implemented',
          'Audit logging is complete'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-1-1`,
            title: 'Implement security controls',
            role: 'Security Engineer',
            status: 'To Do',
            estimate: '4d'
          },
          {
            id: `TASK-${sprintNumber}-1-2`,
            title: 'Set up audit logging',
            role: 'Backend Developer',
            status: 'To Do',
            estimate: '3d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-2`,
        title: 'Compliance Features',
        description: 'Implement compliance-related features',
        type: 'Development',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Compliance reports work',
          'Data retention policies work',
          'Privacy controls are implemented',
          'Documentation is complete'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-2-1`,
            title: 'Create compliance reports',
            role: 'Backend Developer',
            status: 'To Do',
            estimate: '3d'
          },
          {
            id: `TASK-${sprintNumber}-2-2`,
            title: 'Implement privacy controls',
            role: 'Security Engineer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-3`,
        title: 'Security Testing',
        description: 'Comprehensive security testing',
        type: 'Testing',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Security controls work',
          'Vulnerabilities are addressed',
          'Compliance requirements are met',
          'Audit logs are accurate'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-3-1`,
            title: 'Security penetration testing',
            role: 'Security Engineer',
            status: 'To Do',
            estimate: '3d'
          },
          {
            id: `TASK-${sprintNumber}-3-2`,
            title: 'Compliance testing',
            role: 'QA Engineer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });
      break;

    case 9:
      // Sprint 9: Performance Optimization
      stories.push({
        id: `US-${sprintNumber}-1`,
        title: 'Backend Optimization',
        description: 'Optimize backend performance',
        type: 'Development',
        points: 13,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Response times are improved',
          'Database queries are optimized',
          'Caching is effective',
          'Resource usage is efficient'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-1-1`,
            title: 'Optimize database queries',
            role: 'Backend Developer',
            status: 'To Do',
            estimate: '4d'
          },
          {
            id: `TASK-${sprintNumber}-1-2`,
            title: 'Implement caching',
            role: 'Backend Developer',
            status: 'To Do',
            estimate: '3d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-2`,
        title: 'Frontend Optimization',
        description: 'Optimize frontend performance',
        type: 'Development',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Bundle size is reduced',
          'Loading times are improved',
          'Rendering is optimized',
          'Assets are optimized'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-2-1`,
            title: 'Optimize bundle size',
            role: 'Frontend Developer',
            status: 'To Do',
            estimate: '3d'
          },
          {
            id: `TASK-${sprintNumber}-2-2`,
            title: 'Implement lazy loading',
            role: 'Frontend Developer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-3`,
        title: 'Performance Testing',
        description: 'Comprehensive performance testing',
        type: 'Testing',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Performance metrics are met',
          'Load testing is successful',
          'Stress testing is complete',
          'Bottlenecks are identified'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-3-1`,
            title: 'Load testing',
            role: 'Performance Engineer',
            status: 'To Do',
            estimate: '3d'
          },
          {
            id: `TASK-${sprintNumber}-3-2`,
            title: 'Stress testing',
            role: 'Performance Engineer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });
      break;

    case 10:
      // Sprint 10: Documentation and Training
      stories.push({
        id: `US-${sprintNumber}-1`,
        title: 'Technical Documentation',
        description: 'Create technical documentation',
        type: 'Development',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'API documentation is complete',
          'Architecture is documented',
          'Setup guides are created',
          'Code is well-documented'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-1-1`,
            title: 'Write API documentation',
            role: 'Technical Writer',
            status: 'To Do',
            estimate: '3d'
          },
          {
            id: `TASK-${sprintNumber}-1-2`,
            title: 'Create setup guides',
            role: 'Technical Writer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-2`,
        title: 'User Documentation',
        description: 'Create user documentation and guides',
        type: 'Development',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'User guides are complete',
          'Help content is created',
          'FAQs are documented',
          'Video tutorials are created'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-2-1`,
            title: 'Create user guides',
            role: 'Technical Writer',
            status: 'To Do',
            estimate: '3d'
          },
          {
            id: `TASK-${sprintNumber}-2-2`,
            title: 'Record tutorials',
            role: 'Technical Writer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-3`,
        title: 'Documentation Testing',
        description: 'Test and validate documentation',
        type: 'Testing',
        points: 5,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Documentation is accurate',
          'Links work correctly',
          'Examples are valid',
          'Feedback is collected'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-3-1`,
            title: 'Review documentation',
            role: 'QA Engineer',
            status: 'To Do',
            estimate: '2d'
          },
          {
            id: `TASK-${sprintNumber}-3-2`,
            title: 'Validate examples',
            role: 'QA Engineer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });
      break;

    case 11:
      // Sprint 11: UAT and Bug Fixes
      stories.push({
        id: `US-${sprintNumber}-1`,
        title: 'User Acceptance Testing',
        description: 'Conduct UAT with stakeholders',
        type: 'Testing',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'UAT environment is ready',
          'Test scenarios are prepared',
          'Stakeholders are engaged',
          'Feedback is documented'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-1-1`,
            title: 'Prepare UAT environment',
            role: 'DevOps Engineer',
            status: 'To Do',
            estimate: '2d'
          },
          {
            id: `TASK-${sprintNumber}-1-2`,
            title: 'Conduct UAT sessions',
            role: 'Business Analyst',
            status: 'To Do',
            estimate: '3d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-2`,
        title: 'Bug Fixes and Refinements',
        description: 'Address UAT feedback and fix issues',
        type: 'Development',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Critical bugs are fixed',
          'UAT feedback is addressed',
          'Regression testing is complete',
          'Performance is verified'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-2-1`,
            title: 'Fix critical issues',
            role: 'Full Stack Developer',
            status: 'To Do',
            estimate: '3d'
          },
          {
            id: `TASK-${sprintNumber}-2-2`,
            title: 'Implement refinements',
            role: 'Full Stack Developer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-3`,
        title: 'Final Testing Round',
        description: 'Comprehensive testing of fixes',
        type: 'Testing',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'All fixes are verified',
          'Regression tests pass',
          'Performance is acceptable',
          'No critical issues remain'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-3-1`,
            title: 'Verify bug fixes',
            role: 'QA Engineer',
            status: 'To Do',
            estimate: '2d'
          },
          {
            id: `TASK-${sprintNumber}-3-2`,
            title: 'Run regression tests',
            role: 'QA Engineer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });
      break;

    case 12:
      // Sprint 12: Production Deployment
      stories.push({
        id: `US-${sprintNumber}-1`,
        title: 'Production Environment Setup',
        description: 'Prepare production environment',
        type: 'Development',
        points: 13,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Production environment is configured',
          'Security measures are implemented',
          'Monitoring is set up',
          'Backup procedures are tested'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-1-1`,
            title: 'Configure production environment',
            role: 'DevOps Engineer',
            status: 'To Do',
            estimate: '3d'
          },
          {
            id: `TASK-${sprintNumber}-1-2`,
            title: 'Set up monitoring',
            role: 'DevOps Engineer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-2`,
        title: 'Production Deployment',
        description: 'Deploy application to production',
        type: 'Development',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Deployment is successful',
          'Zero-downtime achieved',
          'Rollback plan is tested',
          'Production verification complete'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-2-1`,
            title: 'Execute deployment',
            role: 'DevOps Engineer',
            status: 'To Do',
            estimate: '2d'
          },
          {
            id: `TASK-${sprintNumber}-2-2`,
            title: 'Verify deployment',
            role: 'DevOps Engineer',
            status: 'To Do',
            estimate: '1d'
          }
        ]
      });

      stories.push({
        id: `US-${sprintNumber}-3`,
        title: 'Post-Deployment Testing',
        description: 'Verify production deployment',
        type: 'Testing',
        points: 8,
        priority: 'High',
        status: 'To Do',
        acceptanceCriteria: [
          'Production functionality works',
          'Performance is acceptable',
          'Monitoring is working',
          'No critical issues exist'
        ],
        tasks: [
          {
            id: `TASK-${sprintNumber}-3-1`,
            title: 'Production testing',
            role: 'QA Engineer',
            status: 'To Do',
            estimate: '2d'
          },
          {
            id: `TASK-${sprintNumber}-3-2`,
            title: 'Monitor system health',
            role: 'DevOps Engineer',
            status: 'To Do',
            estimate: '2d'
          }
        ]
      });
      break;

    default:
      // Default empty sprint if number is out of range
      stories.push({
        id: `US-${sprintNumber}-1`,
        title: 'Maintenance and Support',
        description: 'Ongoing maintenance activities',
        type: 'Development',
        points: 5,
        priority: 'Medium',
        status: 'To Do',
        tasks: [
          {
            id: `TASK-${sprintNumber}-1-1`,
            title: 'Regular maintenance',
            role: 'Developer',
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
              <span>Notification System</span>
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
        <p>• Core Development (Sprint 3-4)</p>
        <p>• AI Integration (Sprint 5)</p>
        <p>• Notification System (Sprint 6)</p>
        <p>• Dashboard and Analytics (Sprint 7)</p>
        <p>• Security and Compliance (Sprint 8)</p>
        <p>• Performance Optimization (Sprint 9)</p>
        <p>• Documentation and Training (Sprint 10)</p>
        <p>• UAT and Bug Fixes (Sprint 11)</p>
        <p>• Production Deployment (Sprint 12)</p>
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
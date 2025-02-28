import type { Sprint, UserStory, Task } from './types';

export function generateSprints(): Sprint[] {
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
        description: 'Establish the core Azure infrastructure components required for the Graph Permissions system. This includes configuring Azure Entra ID for authentication, setting up Azure Functions for serverless API endpoints, provisioning Azure SQL Database for data storage, and configuring Azure Key Vault for secure credential management. The infrastructure should be set up with proper security configurations and access controls.',
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
        description: 'Thoroughly test and validate the Azure infrastructure setup to ensure all components are properly configured and working together. This includes verifying authentication flows, testing database connections, validating Key Vault access, and ensuring proper security measures are in place. The testing should cover both functional aspects and security considerations to establish a solid foundation for the application.',
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
        description: 'Establish a comprehensive local development environment and base project structure for the team. This includes setting up a React project with TypeScript, configuring development tools like ESLint and Prettier, establishing a CI/CD pipeline for automated testing and deployment, and integrating code quality tools. The environment should be consistent across all team members to ensure smooth collaboration and development.',
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
        description: 'Create the foundational UI components and layouts that will be used throughout the application. This includes developing a consistent navigation system, establishing the overall layout structure, implementing base styling with Tailwind CSS, and integrating a component library for common UI elements. These components should be reusable, accessible, and follow design best practices to ensure a cohesive user experience.',
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
        description: 'Establish a robust testing framework and create initial tests for the base components. This includes configuring testing libraries like Vitest, setting up component testing with React Testing Library, integrating test coverage reporting, and ensuring tests run as part of the CI pipeline. The testing setup should enable developers to write comprehensive tests for components and ensure code quality throughout the development process.',
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
        description: 'Develop a comprehensive permission selection interface that allows users to search, browse, and select Microsoft Graph API permissions. The interface should display detailed information about each permission, maintain selection state, provide filtering capabilities, and offer a responsive design that works across different devices. The UI should be intuitive and help users understand the implications of each permission they select.',
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
        description: 'Integrate Microsoft Graph API permission data into the application, ensuring that all permission information is accurately represented. This includes loading permission data from a reliable source, implementing efficient caching mechanisms to improve performance, handling error cases gracefully, and ensuring the data is presented in a user-friendly format. The integration should support both delegated and application permission types.',
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
        description: 'Conduct comprehensive testing of the permission selection functionality to ensure it works correctly under various conditions. This includes verifying that selection and deselection work properly, search results are accurate and relevant, the UI adapts to different screen sizes, and error states are handled appropriately. Testing should also cover accessibility requirements to ensure the interface is usable by all users.',
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
        description: 'Implement the core approval workflow logic that will manage the entire permission request lifecycle. This includes defining workflow stages (business approval, technical approval, implementation), handling state transitions between stages, managing approver roles and responsibilities, and maintaining a comprehensive history of all actions. The workflow should be flexible enough to accommodate different permission types and approval requirements.',
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
        description: 'Create a comprehensive approval management interface that allows approvers to review, approve, or deny permission requests. The interface should clearly present all relevant information about the request, provide appropriate actions based on the approver\'s role, update status in real-time, and display the complete approval history. The design should be intuitive and help approvers make informed decisions efficiently.',
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
        description: 'Thoroughly test the approval workflow functionality to ensure it handles all scenarios correctly. This includes verifying that workflow transitions work as expected, permissions are properly enforced for different roles, approval history is accurately maintained, and edge cases (like denials, revisions, and multi-stage approvals) are handled correctly. Testing should cover both the backend logic and the frontend interface.',
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
        description: 'Integrate Azure OpenAI services to provide intelligent permission suggestions and insights. This includes setting up the Azure OpenAI client, developing prompt engineering strategies for optimal results, implementing suggestion logic that analyzes permission contexts, and ensuring the AI responses are relevant and helpful. The integration should handle rate limiting, caching, and error scenarios gracefully while maintaining good performance.',
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
        description: 'Create an intuitive user interface for displaying AI-powered permission suggestions and insights. The interface should clearly present AI recommendations, allow users to easily accept or reject suggestions, handle loading states appropriately, and display errors in a user-friendly manner. The design should seamlessly integrate with the existing permission selection flow and enhance the user experience without adding complexity.',
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
        description: 'Conduct comprehensive testing of the AI suggestion functionality to ensure it provides valuable insights and maintains good performance. This includes evaluating the accuracy and relevance of suggestions, measuring response times under various conditions, verifying error handling mechanisms, and testing edge cases like unusual permission combinations or service unavailability. The testing should also gather feedback to improve the AI prompts and responses.',
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
        description: 'Develop a robust notification system backend that can generate, manage, and deliver various types of notifications throughout the permission request lifecycle. This includes creating a notification engine that supports different delivery channels (in-app, email), implementing flexible notification templates, ensuring reliable delivery with retry mechanisms, and maintaining notification history. The system should be scalable and handle high volumes of notifications efficiently.',
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
        description: 'Create a comprehensive notification management interface that allows users to view, manage, and respond to notifications. The interface should display notifications in a clear and organized manner, support real-time updates without page refreshes, allow users to configure their notification preferences, and maintain a searchable history of past notifications. The design should be unobtrusive while ensuring important notifications are not missed.',
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
        description: 'Thoroughly test the notification system to ensure it reliably delivers appropriate notifications for all relevant events. This includes verifying that notifications are generated for the correct events, templates render properly with the right information, user preferences are respected, and performance remains good even under high notification volumes. Testing should cover all delivery channels and notification types.',
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
        description: 'Implement the backend services required for the dashboard and analytics features. This includes developing data aggregation logic that processes permission request data, creating a metrics calculation engine that generates meaningful insights, optimizing queries for performance, and implementing appropriate caching strategies. The backend should support filtering, sorting, and exporting of dashboard data while maintaining data accuracy.',
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
        description: 'Create a comprehensive dashboard interface with interactive charts and visualizations that provide insights into permission request data. The interface should include various chart types (bar charts, pie charts, line graphs) to represent different metrics, support filtering and date range selection, update data in real-time or near-real-time, and adapt responsively to different screen sizes. The design should be intuitive and help users quickly understand the status of permission requests.',
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
        description: 'Conduct comprehensive testing of the dashboard functionality to ensure it accurately presents data and provides a good user experience. This includes verifying that data is displayed correctly across different chart types, filters and date ranges work as expected, performance remains good with large datasets, and the interface adapts properly to different devices. Testing should also verify that exported data matches what is displayed on screen.',
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
        description: 'Implement comprehensive security features and controls throughout the application. This includes enhancing authentication mechanisms with multi-factor authentication, implementing fine-grained authorization based on user roles, ensuring all sensitive data is properly encrypted both in transit and at rest, and setting up detailed audit logging for security-relevant events. The security implementation should follow industry best practices and address potential vulnerabilities identified in security assessments.',
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
        description: 'Implement features required for regulatory compliance and internal governance. This includes creating comprehensive compliance reports that track permission usage and approvals, implementing data retention policies that comply with legal requirements, adding privacy controls that protect sensitive information, and ensuring all necessary documentation is available for compliance audits. The features should be flexible enough to adapt to changing compliance requirements.',
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
        description: 'Conduct comprehensive security testing to identify and address potential vulnerabilities. This includes performing penetration testing to simulate attacks, verifying that security controls work as expected, ensuring compliance requirements are met, and validating that audit logs capture all relevant information. The testing should cover authentication, authorization, data protection, and other security aspects of the application.',
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
        description: 'Optimize the backend services to improve overall system performance and scalability. This includes analyzing and optimizing database queries to reduce execution time, implementing efficient caching strategies at multiple levels, reducing resource usage through code optimization, and ensuring the system can handle increased load. The optimizations should be measurable with clear performance improvements while maintaining functionality and reliability.',
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
        description: 'Optimize the frontend application to improve user experience and page performance. This includes reducing JavaScript bundle sizes through code splitting and tree shaking, improving initial loading times with lazy loading and code optimization, enhancing rendering performance by minimizing unnecessary re-renders, and optimizing assets like images and fonts. The optimizations should result in measurable improvements in key metrics like Time to Interactive and Largest Contentful Paint.',
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
        description: 'Conduct comprehensive performance testing to measure the impact of optimizations and identify any remaining bottlenecks. This includes running load tests to simulate high user traffic, stress testing to find breaking points, measuring response times under various conditions, and profiling both frontend and backend code to identify optimization opportunities. The testing should establish performance baselines and verify improvements against those baselines.',
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
        description: 'Create comprehensive technical documentation for the Graph Permissions system. This includes documenting the API endpoints with detailed request/response examples, describing the overall system architecture with component diagrams, providing setup guides for development and production environments, and ensuring code is well-documented with comments and type definitions. The documentation should be clear, accurate, and maintained alongside the code to ensure it stays current.',
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
        description: 'Develop comprehensive user documentation and guides that help end users effectively use the Graph Permissions system. This includes creating step-by-step user guides for common tasks, developing in-app help content that provides context-sensitive assistance, compiling frequently asked questions with clear answers, and producing video tutorials that demonstrate key workflows. The documentation should be accessible, easy to understand, and cover both basic and advanced usage scenarios.',
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
        description: 'Test and validate all documentation to ensure it is accurate, complete, and helpful. This includes reviewing technical documentation for correctness, verifying that user guides match the actual application behavior, testing all examples and code snippets to ensure they work as described, and collecting feedback from potential users to identify areas for improvement. The testing should also verify that documentation is accessible and properly formatted across different devices.',
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
        description: 'Conduct comprehensive User Acceptance Testing (UAT) with key stakeholders to validate that the system meets business requirements and user expectations. This includes preparing a dedicated UAT environment that closely resembles production, creating detailed test scenarios that cover all major workflows, engaging stakeholders from different departments to participate in testing, and documenting all feedback systematically. The UAT process should identify any gaps between requirements and implementation before production deployment.',
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
        description: 'Address all issues identified during UAT and implement refinements based on stakeholder feedback. This includes fixing critical bugs that affect core functionality, addressing usability issues that impact user experience, implementing minor feature enhancements requested by stakeholders, and making visual refinements to improve the interface. All changes should be thoroughly tested to ensure they don\'t introduce new issues while resolving existing ones.',
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
        description: 'Conduct a final comprehensive testing round to ensure all fixes and refinements work correctly and the system is ready for production. This includes verifying that all reported bugs have been properly fixed, running regression tests to ensure existing functionality still works, performing final performance checks to confirm the system meets requirements, and validating that no critical issues remain. This final testing should provide confidence that the system is stable and ready for deployment.',
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
        description: 'Prepare the production environment for the final deployment of the Graph Permissions system. This includes configuring all required Azure services with production-grade settings, implementing comprehensive security measures like network security groups and access controls, setting up monitoring and alerting systems to track application health, and establishing backup and disaster recovery procedures. The environment should be thoroughly tested to ensure it meets all requirements for performance, security, and reliability.',
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
        description: 'Execute the production deployment of the Graph Permissions system with minimal disruption to users. This includes following a detailed deployment plan with clear steps and responsibilities, implementing the deployment using zero-downtime techniques where possible, having a tested rollback plan ready in case of unexpected issues, and conducting thorough post-deployment verification to ensure everything is working correctly. The deployment process should be well-documented for future reference.',
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
        description: 'Conduct comprehensive testing in the production environment to verify that the deployed system is functioning correctly. This includes performing smoke tests to check critical functionality, monitoring system performance under real user load, verifying that all integrations with other systems are working properly, and ensuring that monitoring and alerting systems are correctly capturing system health information. Any issues found should be prioritized and addressed according to their severity.',
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
        description: 'Perform ongoing maintenance activities to ensure the Graph Permissions system continues to function optimally. This includes addressing any reported bugs or issues, implementing minor enhancements based on user feedback, performing routine security updates and patches, and monitoring system performance to identify and resolve any degradation. These maintenance activities are essential for keeping the system reliable, secure, and aligned with evolving user needs.',
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
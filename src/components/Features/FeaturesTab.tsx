import { 
  Database, 
  Cloud, 
  Key, 
  Code, 
  GitBranch, 
  Server, 
  Shield, 
  Users,
  Workflow,
  Boxes,
  Cog,
  FileCode,
  GitPullRequest,
  Terminal,
  Bell,
  Brain,
  MessageSquare,
  TestTube,
  Rocket
} from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

function FeatureCard({ title, description, icon, className = '' }: FeatureCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

interface ArchitectureComponentProps {
  title: string;
  features: string[];
  icon: React.ReactNode;
}

function ArchitectureComponent({ title, features, icon }: ArchitectureComponentProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-600">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface StrategyComponentProps {
  title: string;
  description: string;
  steps: string[];
  icon: React.ReactNode;
}

function StrategyComponent({ title, description, steps, icon }: StrategyComponentProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
      <ol className="space-y-3 mt-4">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
              {index + 1}
            </span>
            <span className="text-gray-600">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function FeaturesTab() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3">
          <Boxes className="h-8 w-8 text-white" />
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Service Architecture
            </h1>
            <p className="text-blue-100">
              Comprehensive overview of system components and features
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Core Features */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Azure Entra ID Authentication"
              description="Enterprise-grade authentication and authorization with Azure Entra ID, supporting SSO and MFA for secure access control."
              icon={<Shield className="h-8 w-8 text-blue-600" />}
            />
            <FeatureCard
              title="Azure OpenAI Integration"
              description="AI-powered permission suggestions and intelligent assistance using Azure OpenAI for enhanced user experience."
              icon={<Brain className="h-8 w-8 text-blue-600" />}
            />
            <FeatureCard
              title="Rebar Notifications"
              description="Real-time notifications for permission updates, approvals, and system events using Rebar's notification system."
              icon={<Bell className="h-8 w-8 text-blue-600" />}
            />
          </div>
        </section>

        {/* Architecture Components */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Architecture Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ArchitectureComponent
              title="Azure Entra ID"
              icon={<Users className="h-6 w-6 text-purple-600" />}
              features={[
                "Enterprise identity management",
                "Single sign-on (SSO) capabilities",
                "Role-based access control (RBAC)",
                "Multi-factor authentication (MFA)",
                "Conditional access policies",
                "User and group management",
                "Application registration and management"
              ]}
            />
            <ArchitectureComponent
              title="Azure OpenAI Service"
              icon={<Brain className="h-6 w-6 text-green-600" />}
              features={[
                "Intelligent permission suggestions",
                "Natural language processing",
                "Context-aware recommendations",
                "Security impact analysis",
                "Permission usage patterns",
                "Automated documentation generation",
                "Risk assessment assistance"
              ]}
            />
            <ArchitectureComponent
              title="Azure Functions"
              icon={<Cog className="h-6 w-6 text-orange-600" />}
              features={[
                "Serverless API endpoints",
                "Event-driven architecture",
                "Database operations handling",
                "Permission validation logic",
                "Notification triggers",
                "Approval workflow automation",
                "Integration with Graph API"
              ]}
            />
            <ArchitectureComponent
              title="Azure SQL Database"
              icon={<Database className="h-6 w-6 text-blue-600" />}
              features={[
                "Permission request storage",
                "Approval workflow tracking",
                "User and role management",
                "Audit trail logging",
                "High availability configuration",
                "Automated backups",
                "Data encryption at rest"
              ]}
            />
            <ArchitectureComponent
              title="Microsoft Graph API"
              icon={<Workflow className="h-6 w-6 text-indigo-600" />}
              features={[
                "Application owner details retrieval",
                "Permission scope validation",
                "User profile management",
                "Group membership verification",
                "Directory role assignment",
                "Application permission management",
                "Security group integration"
              ]}
            />
            <ArchitectureComponent
              title="Rebar Notification System"
              icon={<Bell className="h-6 w-6 text-yellow-600" />}
              features={[
                "Real-time notifications",
                "Multi-channel delivery",
                "Custom notification templates",
                "Delivery status tracking",
                "Notification preferences",
                "Event-based triggers",
                "Notification history"
              ]}
            />
          </div>
        </section>

        {/* Deployment Strategy */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Deployment Strategy</h2>
          <StrategyComponent
            title="Continuous Deployment Pipeline"
            description="Automated deployment process using Azure DevOps pipelines with multiple environments"
            icon={<Rocket className="h-6 w-6 text-blue-600" />}
            steps={[
              "Code changes are committed to feature branches in Azure DevOps repository",
              "Pull requests trigger automated builds and unit tests",
              "Successful PR builds deploy to Development environment",
              "QA approval triggers deployment to Staging environment",
              "Production deployment requires manual approval from release manager",
              "Post-deployment smoke tests verify system health",
              "Automated rollback procedures in case of deployment issues",
              "Monitoring and alerts configured for deployment status"
            ]}
          />
        </section>

        {/* Testing Strategy */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Testing Strategy</h2>
          <StrategyComponent
            title="Comprehensive Testing Approach"
            description="Multi-level testing strategy ensuring quality and reliability"
            icon={<TestTube className="h-6 w-6 text-green-600" />}
            steps={[
              "Unit Tests: Component-level testing using Vitest",
              "Integration Tests: API and service integration testing",
              "E2E Tests: Full workflow testing with Cypress",
              "Security Testing: Vulnerability scanning and penetration testing",
              "Performance Testing: Load and stress testing of critical paths",
              "Accessibility Testing: WCAG 2.1 compliance verification",
              "Cross-browser Testing: Compatibility across major browsers",
              "Automated Regression Testing: CI/CD pipeline integration"
            ]}
          />
        </section>

        {/* Development & Deployment */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Development & Deployment</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Code className="h-6 w-6 text-indigo-600" />
                <h3 className="text-lg font-medium text-gray-900">Development Stack</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Frontend</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <FileCode className="h-4 w-4" />
                      React with TypeScript
                    </li>
                    <li className="flex items-center gap-2">
                      <FileCode className="h-4 w-4" />
                      Tailwind CSS
                    </li>
                    <li className="flex items-center gap-2">
                      <FileCode className="h-4 w-4" />
                      Vite Build System
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Backend</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <Server className="h-4 w-4" />
                      Azure Functions
                    </li>
                    <li className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Azure SQL
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Azure Entra ID
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <GitBranch className="h-6 w-6 text-indigo-600" />
                <h3 className="text-lg font-medium text-gray-900">Source Control & CI/CD</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Version Control</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <GitBranch className="h-4 w-4" />
                      Git with feature branch workflow
                    </li>
                    <li className="flex items-center gap-2">
                      <GitPullRequest className="h-4 w-4" />
                      Pull request reviews
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Azure DevOps</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <Terminal className="h-4 w-4" />
                      Automated builds and deployments
                    </li>
                    <li className="flex items-center gap-2">
                      <Terminal className="h-4 w-4" />
                      Environment-specific pipelines
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
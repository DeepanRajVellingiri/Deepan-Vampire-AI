import { 
  Database, 
  Key, 
  Code, 
  GitBranch, 
  Server, 
  Shield, 
  Users,
  Workflow,
  Boxes,
  FileCode,
  GitPullRequest,
  Terminal,
  Bell,
  Brain,
  TestTube,
  Rocket,
  Layout,
  Lock,
  UserCog,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { AIWorkflowOverview } from './AIWorkflowOverview';

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
              Comprehensive overview of system components and integrations
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* AI Workflow Overview Section */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          <AIWorkflowOverview />
        </section>

        {/* Add new Technical Architecture Flowchart section */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Workflow className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Technical Architecture Flow</h2>
          </div>

          <div className="space-y-8">
            {/* User Perspective */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                User Perspective Flow
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">1. Authentication</h4>
                    <p className="text-sm text-gray-600">User authenticates through Azure Entra ID for secure access</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Brain className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">2. Permission Selection</h4>
                    <p className="text-sm text-gray-600">Azure OpenAI assists with intelligent permission suggestions and analysis</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Workflow className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">3. Request Processing</h4>
                    <p className="text-sm text-gray-600">Azure Functions handle request validation and workflow management</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">4. Status Updates</h4>
                    <p className="text-sm text-gray-600">Real-time notifications through Rebar for request status changes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Perspective */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <UserCog className="h-5 w-5 text-purple-600 mr-2" />
                Admin Perspective Flow
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">1. Request Review</h4>
                    <p className="text-sm text-gray-600">Admins review incoming requests with AI-powered insights</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">2. Approval Process</h4>
                    <p className="text-sm text-gray-600">Multi-stage approval workflow with security validations</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <XCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">3. Denial Management</h4>
                    <p className="text-sm text-gray-600">Handle denials with detailed feedback and revision tracking</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Lock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">4. Implementation</h4>
                    <p className="text-sm text-gray-600">Secure implementation through Azure Key Vault and Graph API</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Layer */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Shield className="h-5 w-5 text-red-600 mr-2" />
                Security Layer
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <Key className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Azure Key Vault</h4>
                      <p className="text-sm text-gray-600">Secure storage of credentials and certificates</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <Database className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Encrypted Storage</h4>
                      <p className="text-sm text-gray-600">Data encryption at rest and in transit</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Audit Logging</h4>
                      <p className="text-sm text-gray-600">Comprehensive activity tracking and monitoring</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Shield className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Access Control</h4>
                      <p className="text-sm text-gray-600">Role-based access control and permissions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Architecture Diagram */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Layout className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Technical Architecture</h2>
          </div>
          <ArchitectureDiagram />
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
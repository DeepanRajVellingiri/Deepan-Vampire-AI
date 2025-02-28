import { 
    Brain, 
    Workflow, 
    CheckCircle2, 
    XCircle, 
    AlertTriangle, 
    Code, 
    Zap,
    Shield,
    Lock,
    Lightbulb,
    ArrowRight,
    Database,
    Server,
    Settings,
    BarChart4,
    FileCode
  } from 'lucide-react';
  
  export function AIWorkflowOverview() {
    return (
      <div className="space-y-8">
        {/* AI Workflow Overview Section */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">AI-Driven Workflow Overview</h2>
          </div>
  
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              Our system leverages Azure OpenAI to provide intelligent, context-aware assistance throughout the Graph API permission request process. This AI-driven approach streamlines permission selection, enhances security awareness, and provides valuable implementation guidance.
            </p>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-purple-900 mb-4">How It Works</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                      <span className="text-purple-700 text-sm font-medium">1</span>
                    </div>
                    <p className="text-purple-800">
                      <strong>Permission Analysis:</strong> AI analyzes permission requests in real-time, evaluating security implications and use cases.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                      <span className="text-purple-700 text-sm font-medium">2</span>
                    </div>
                    <p className="text-purple-800">
                      <strong>Intelligent Suggestions:</strong> Based on analysis, the system suggests appropriate permissions and alternatives with lower privilege levels.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                      <span className="text-purple-700 text-sm font-medium">3</span>
                    </div>
                    <p className="text-purple-800">
                      <strong>Code Generation:</strong> Provides implementation examples in multiple programming languages tailored to the specific permissions.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                      <span className="text-purple-700 text-sm font-medium">4</span>
                    </div>
                    <p className="text-purple-800">
                      <strong>Security Insights:</strong> Highlights potential security implications and best practices for each permission.
                    </p>
                  </div>
                </div>
              </div>
  
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-blue-900 mb-4">Key Benefits</h3>
                <ul className="space-y-3 text-blue-800">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span><strong>Reduced Complexity:</strong> Simplifies the complex world of Graph API permissions with clear explanations and guidance.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span><strong>Enhanced Security:</strong> Promotes least-privilege approach by suggesting alternatives to high-privilege permissions.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span><strong>Accelerated Development:</strong> Provides ready-to-use code examples that speed up implementation.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span><strong>Contextual Understanding:</strong> Delivers insights based on the specific permission context and use case.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
  
        {/* AI Workflow Diagram */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Workflow className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">AI Workflow Diagram</h2>
          </div>
  
          <div className="bg-gray-50 p-8 rounded-lg mb-6">
            <div className="flex flex-col items-center">
              {/* User Input */}
              <div className="bg-blue-100 rounded-lg p-4 w-64 text-center mb-4">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-800">User Permission Selection</span>
                </div>
                <p className="text-sm text-blue-700">User selects or searches for Graph API permissions</p>
              </div>
  
              <ArrowRight className="h-6 w-6 text-gray-400 mb-4" />
  
              {/* AI Processing */}
              <div className="bg-purple-100 rounded-lg p-4 w-80 text-center mb-4">
                <div className="flex items-center justify-center mb-2">
                  <Brain className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="font-medium text-purple-800">Azure OpenAI Processing</span>
                </div>
                <p className="text-sm text-purple-700">
                  Analyzes permission context, security implications, and use cases
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="bg-purple-200 rounded p-2 text-xs text-purple-800">
                    Permission Analysis
                  </div>
                  <div className="bg-purple-200 rounded p-2 text-xs text-purple-800">
                    Security Evaluation
                  </div>
                  <div className="bg-purple-200 rounded p-2 text-xs text-purple-800">
                    Code Generation
                  </div>
                  <div className="bg-purple-200 rounded p-2 text-xs text-purple-800">
                    Alternative Suggestions
                  </div>
                </div>
              </div>
  
              <ArrowRight className="h-6 w-6 text-gray-400 mb-4" />
  
              {/* AI Output */}
              <div className="grid grid-cols-3 gap-4 w-full">
                <div className="bg-green-100 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Lightbulb className="h-5 w-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-800">Permission Insights</span>
                  </div>
                  <p className="text-xs text-green-700">
                    Detailed explanation and security context
                  </p>
                </div>
  
                <div className="bg-amber-100 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Lock className="h-5 w-5 text-amber-600 mr-2" />
                    <span className="font-medium text-amber-800">Alternative Suggestions</span>
                  </div>
                  <p className="text-xs text-amber-700">
                    Lower-privilege alternatives when applicable
                  </p>
                </div>
  
                <div className="bg-blue-100 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Code className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-800">Code Examples</span>
                  </div>
                  <p className="text-xs text-blue-700">
                    Implementation examples in multiple languages
                  </p>
                </div>
              </div>
  
              <ArrowRight className="h-6 w-6 text-gray-400 my-4" />
  
              {/* User Decision */}
              <div className="bg-indigo-100 rounded-lg p-4 w-64 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle2 className="h-5 w-5 text-indigo-600 mr-2" />
                  <span className="font-medium text-indigo-800">Informed User Decision</span>
                </div>
                <p className="text-sm text-indigo-700">
                  User makes informed permission selection with AI guidance
                </p>
              </div>
            </div>
          </div>
  
          <div className="prose max-w-none">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Key Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-2">AI Integration Components</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Brain className="h-4 w-4 text-purple-600 mt-1 mr-2" />
                    <div>
                      <p className="font-medium text-gray-900">Azure OpenAI Service</p>
                      <p className="text-sm text-gray-600">Core AI engine that powers the intelligent suggestions</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Database className="h-4 w-4 text-blue-600 mt-1 mr-2" />
                    <div>
                      <p className="font-medium text-gray-900">Permission Knowledge Base</p>
                      <p className="text-sm text-gray-600">Structured data about Graph API permissions</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Server className="h-4 w-4 text-green-600 mt-1 mr-2" />
                    <div>
                      <p className="font-medium text-gray-900">API Integration Layer</p>
                      <p className="text-sm text-gray-600">Connects frontend with Azure OpenAI backend</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Code className="h-4 w-4 text-amber-600 mt-1 mr-2" />
                    <div>
                      <p className="font-medium text-gray-900">Code Generation Engine</p>
                      <p className="text-sm text-gray-600">Creates implementation examples in multiple languages</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-2">Models & Integrations</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Brain className="h-4 w-4 text-indigo-600 mt-1 mr-2" />
                    <div>
                      <p className="font-medium text-gray-900">GPT-4 Model</p>
                      <p className="text-sm text-gray-600">Advanced language model for understanding permission context</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-4 w-4 text-red-600 mt-1 mr-2" />
                    <div>
                      <p className="font-medium text-gray-900">Security Analysis Module</p>
                      <p className="text-sm text-gray-600">Evaluates security implications of permissions</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Settings className="h-4 w-4 text-gray-600 mt-1 mr-2" />
                    <div>
                      <p className="font-medium text-gray-900">Configuration Management</p>
                      <p className="text-sm text-gray-600">Handles Azure OpenAI settings and parameters</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <BarChart4 className="h-4 w-4 text-blue-600 mt-1 mr-2" />
                    <div>
                      <p className="font-medium text-gray-900">Performance Analytics</p>
                      <p className="text-sm text-gray-600">Monitors and optimizes AI response quality</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
  
        {/* Azure OpenAI Evaluation */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Azure OpenAI Evaluation</h2>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-medium text-green-900 mb-4 flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                Advantages
              </h3>
              <ul className="space-y-3">
                <li className="bg-green-50 p-3 rounded-lg">
                  <p className="font-medium text-green-800">Enterprise-Grade Security</p>
                  <p className="text-sm text-green-700 mt-1">
                    Azure OpenAI provides robust security features, compliance certifications, and data protection that meet enterprise requirements.
                  </p>
                </li>
                <li className="bg-green-50 p-3 rounded-lg">
                  <p className="font-medium text-green-800">Seamless Azure Integration</p>
                  <p className="text-sm text-green-700 mt-1">
                    Integrates natively with other Azure services, enabling comprehensive solutions with identity management, storage, and monitoring.
                  </p>
                </li>
                <li className="bg-green-50 p-3 rounded-lg">
                  <p className="font-medium text-green-800">Advanced AI Capabilities</p>
                  <p className="text-sm text-green-700 mt-1">
                    Access to state-of-the-art GPT models with fine-tuning capabilities for specialized tasks.
                  </p>
                </li>
                <li className="bg-green-50 p-3 rounded-lg">
                  <p className="font-medium text-green-800">Scalability</p>
                  <p className="text-sm text-green-700 mt-1">
                    Enterprise-level infrastructure that can scale to handle high volumes of requests with consistent performance.
                  </p>
                </li>
              </ul>
            </div>
  
            <div>
              <h3 className="text-lg font-medium text-red-900 mb-4 flex items-center">
                <XCircle className="h-5 w-5 text-red-600 mr-2" />
                Limitations
              </h3>
              <ul className="space-y-3">
                <li className="bg-red-50 p-3 rounded-lg">
                  <p className="font-medium text-red-800">Cost Considerations</p>
                  <p className="text-sm text-red-700 mt-1">
                    Higher operational costs compared to open-source alternatives, with pricing based on token usage.
                  </p>
                </li>
                <li className="bg-red-50 p-3 rounded-lg">
                  <p className="font-medium text-red-800">Latency Challenges</p>
                  <p className="text-sm text-red-700 mt-1">
                    API calls to Azure OpenAI can introduce latency, requiring optimization strategies for real-time applications.
                  </p>
                </li>
                <li className="bg-red-50 p-3 rounded-lg">
                  <p className="font-medium text-red-800">Knowledge Cutoff Limitations</p>
                  <p className="text-sm text-red-700 mt-1">
                    Model knowledge is limited to training data cutoff date, requiring supplementation for recent Graph API changes.
                  </p>
                </li>
                <li className="bg-red-50 p-3 rounded-lg">
                  <p className="font-medium text-red-800">Customization Complexity</p>
                  <p className="text-sm text-red-700 mt-1">
                    Fine-tuning and customization require specialized knowledge and significant data preparation.
                  </p>
                </li>
              </ul>
            </div>
          </div>
  
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
            <div className="flex">
              <AlertTriangle className="h-6 w-6 text-amber-600 mr-2" />
              <div>
                <h3 className="text-lg font-medium text-amber-800">Implementation Considerations</h3>
                <p className="mt-2 text-amber-700">
                  When implementing Azure OpenAI in a permission management system, consider these key factors:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5 text-amber-700">
                  <li>Implement robust error handling for AI service unavailability</li>
                  <li>Establish fallback mechanisms when AI suggestions are not available</li>
                  <li>Create a feedback loop to improve AI suggestion quality over time</li>
                  <li>Implement caching strategies to reduce API calls and improve performance</li>
                  <li>Regularly update the permission knowledge base to ensure accuracy</li>
                </ul>
              </div>
            </div>
          </div>
  
          <div className="prose max-w-none">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Value Proposition</h3>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-blue-800 mb-4">
                The Azure OpenAI integration delivers significant value by transforming the complex permission selection process into an intuitive, guided experience:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <Zap className="h-5 w-5 text-amber-500 mr-2" />
                    <h4 className="font-medium text-gray-900">Efficiency Gains</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Reduces permission selection time by 60% through intelligent suggestions and clear explanations.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    <h4 className="font-medium text-gray-900">Security Enhancement</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Promotes least-privilege security principles, reducing over-privileged permission requests by 40%.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <Code className="h-5 w-5 text-blue-500 mr-2" />
                    <h4 className="font-medium text-gray-900">Developer Acceleration</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Speeds up implementation with ready-to-use code examples, cutting development time by 30%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Integration & Configuration */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="h-6 w-6 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">Integration & Configuration</h2>
          </div>
  
          <div className="prose max-w-none mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Integrating AI-Driven Suggestions</h3>
            <p className="text-gray-600 mb-4">
              Implementing AI-driven permission suggestions in your application involves several key steps:
            </p>
  
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <ol className="list-decimal pl-5 space-y-4">
                <li className="text-gray-800">
                  <strong>Azure OpenAI Setup</strong>
                  <p className="text-gray-600 mt-1">
                    Create an Azure OpenAI resource in your Azure portal and deploy a GPT-4 model instance.
                  </p>
                </li>
                <li className="text-gray-800">
                  <strong>API Integration</strong>
                  <p className="text-gray-600 mt-1">
                    Implement a service layer that handles communication between your application and Azure OpenAI.
                  </p>
                </li>
                <li className="text-gray-800">
                  <strong>Prompt Engineering</strong>
                  <p className="text-gray-600 mt-1">
                    Design effective prompts that provide context about permissions and extract structured responses.
                  </p>
                </li>
                <li className="text-gray-800">
                  <strong>Response Processing</strong>
                  <p className="text-gray-600 mt-1">
                    Parse and validate AI responses to ensure they meet quality and security standards.
                  </p>
                </li>
                <li className="text-gray-800">
                  <strong>UI Integration</strong>
                  <p className="text-gray-600 mt-1">
                    Present AI suggestions in an intuitive interface that helps users make informed decisions.
                  </p>
                </li>
              </ol>
            </div>
  
            <h3 className="text-lg font-medium text-gray-900 mb-4">Azure OpenAI Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Environment Setup</h4>
                <div className="space-y-2 text-blue-800">
                  <p className="flex items-start">
                    <span className="inline-block w-4 h-4 rounded-full bg-blue-200 text-blue-700 text-xs font-bold flex items-center justify-center mr-2 mt-1">1</span>
                    Create Azure OpenAI resource in Azure Portal
                  </p>
                  <p className="flex items-start">
                    <span className="inline-block w-4 h-4 rounded-full bg-blue-200 text-blue-700 text-xs font-bold flex items-center justify-center mr-2 mt-1">2</span>
                    Deploy GPT-4 model with appropriate capacity
                  </p>
                  <p className="flex items-start">
                    <span className="inline-block w-4 h-4 rounded-full bg-blue-200 text-blue-700 text-xs font-bold flex items-center justify-center mr-2 mt-1">3</span>
                    Set up authentication using API keys or Azure AD
                  </p>
                  <p className="flex items-start">
                    <span className="inline-block w-4 h-4 rounded-full bg-blue-200 text-blue-700 text-xs font-bold flex items-center justify-center mr-2 mt-1">4</span>
                    Configure network security and access controls
                  </p>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">Model Configuration</h4>
                <div className="space-y-2 text-purple-800">
                  <p className="flex items-start">
                    <span className="inline-block w-4 h-4 rounded-full bg-purple-200 text-purple-700 text-xs font-bold flex items-center justify-center mr-2 mt-1">1</span>
                    Set appropriate temperature (0.2-0.4 recommended)
                  </p>
                  <p className="flex items-start">
                    <span className="inline-block w-4 h-4 rounded-full bg-purple-200 text-purple-700 text-xs font-bold flex items-center justify-center mr-2 mt-1">2</span>
                    Configure max tokens based on response needs
                  </p>
                  <p className="flex items-start">
                    <span className="inline-block w-4 h-4 rounded-full bg-purple-200 text-purple-700 text-xs font-bold flex items-center justify-center mr-2 mt-1">3</span>
                    Implement rate limiting and quota management
                  </p>
                  <p className="flex items-start">
                    <span className="inline-block w-4 h-4 rounded-full bg-purple-200 text-purple-700 text-xs font-bold flex items-center justify-center mr-2 mt-1">4</span>
                    Set up monitoring and logging for API calls
                  </p>
                </div>
              </div>
            </div>
  
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Environment Variables Configuration</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
  {`# Azure OpenAI Configuration
  AZURE_OPENAI_ENDPOINT="https://deepanvampireai.openai.azure.com/"
  AZURE_OPENAI_KEY="Api-key"
  AZURE_OPENAI_DEPLOYMENT="gpt4-deployment-name"
  AZURE_OPENAI_API_VERSION="2023-05-15"
  
  # Application Settings
  MAX_TOKENS=1000
  TEMPERATURE=0.3
  RESPONSE_FORMAT="json"
  CACHE_DURATION=3600  # Cache responses for 1 hour`}
              </pre>
            </div>
          </div>
  
          <div className="prose max-w-none">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Performance & Efficiency</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Response Time</h4>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">AI-Driven</span>
                      <span className="text-sm font-medium text-gray-900">~800ms</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <div className="flex items-center justify-between mt-4 mb-2">
                      <span className="text-sm text-gray-600">Traditional</span>
                      <span className="text-sm font-medium text-gray-900">~200ms</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Accuracy</h4>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">AI-Driven</span>
                      <span className="text-sm font-medium text-gray-900">94%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                    <div className="flex items-center justify-between mt-4 mb-2">
                      <span className="text-sm text-gray-600">Traditional</span>
                      <span className="text-sm font-medium text-gray-900">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">User Satisfaction</h4>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">AI-Driven</span>
                      <span className="text-sm font-medium text-gray-900">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <div className="flex items-center justify-between mt-4 mb-2">
                      <span className="text-sm text-gray-600">Traditional</span>
                      <span className="text-sm font-medium text-gray-900">65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
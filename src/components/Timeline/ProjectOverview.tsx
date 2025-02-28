import { Clock, Target, Users, Shield, Database, Brain, Bell } from 'lucide-react';

export function ProjectOverview() {
  return (
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
  );
}
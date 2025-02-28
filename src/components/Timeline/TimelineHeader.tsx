import { Workflow } from 'lucide-react';

export function TimelineHeader() {
  return (
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
  );
}
import { useState } from 'react';
import { Shield, Database, Brain, Bell, Calendar, Milestone, BarChart2 } from 'lucide-react';
import { TimelineHeader } from './TimelineHeader';
import { ProjectOverview } from './ProjectOverview';
import { SprintCard } from './SprintCard';
import { generateSprints } from './SprintGenerator';
import { TimelineDiagram } from './TimelineDiagram';
import { GanttChart } from './GanttChart';
import { MilestoneTimeline } from './MilestoneTimeline';

export function TimelineTab() {
  const [expandedSprints, setExpandedSprints] = useState<number[]>([1]);
  const [activeTab, setActiveTab] = useState<'sprints' | 'timeline' | 'gantt' | 'milestones'>('timeline');
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
      <TimelineHeader />
      <ProjectOverview />

      {/* Tab navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === 'timeline'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1.5" />
            Timeline Diagram
          </div>
        </button>
        <button
          onClick={() => setActiveTab('gantt')}
          className={`px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === 'gantt'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-1.5" />
            Gantt Chart
          </div>
        </button>
        <button
          onClick={() => setActiveTab('milestones')}
          className={`px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === 'milestones'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center">
            <Milestone className="h-4 w-4 mr-1.5" />
            Milestones
          </div>
        </button>
        <button
          onClick={() => setActiveTab('sprints')}
          className={`px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === 'sprints'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center">
            <Shield className="h-4 w-4 mr-1.5" />
            Sprint Details
          </div>
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'timeline' && <TimelineDiagram />}
      {activeTab === 'gantt' && <GanttChart />}
      {activeTab === 'milestones' && <MilestoneTimeline />}
      {activeTab === 'sprints' && (
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
      )}
    </div>
  );
}
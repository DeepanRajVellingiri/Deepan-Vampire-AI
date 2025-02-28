import { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { generateSprints } from './SprintGenerator';
import type { Sprint } from './types';

interface GanttChartProps {
  startDate?: string;
  endDate?: string;
}

export function GanttChart({ startDate = '2025-03-01', endDate = '2025-08-31' }: GanttChartProps) {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [viewMode, setViewMode] = useState<'months' | 'weeks'>('months');
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Project phases with their corresponding sprints
  const phases = [
    { name: 'Setup & Requirements', sprints: [1, 2], color: 'bg-blue-500' },
    { name: 'Core Development', sprints: [3, 4], color: 'bg-purple-500' },
    { name: 'AI Integration', sprints: [5], color: 'bg-green-500' },
    { name: 'Notification System', sprints: [6], color: 'bg-yellow-500' },
    { name: 'Dashboard & Analytics', sprints: [7], color: 'bg-red-500' },
    { name: 'Security & Compliance', sprints: [8], color: 'bg-indigo-500' },
    { name: 'Performance Optimization', sprints: [9], color: 'bg-pink-500' },
    { name: 'Documentation & Training', sprints: [10], color: 'bg-orange-500' },
    { name: 'UAT & Bug Fixes', sprints: [11], color: 'bg-teal-500' },
    { name: 'Production Deployment', sprints: [12], color: 'bg-emerald-500' }
  ];

  // Key deliverables for each sprint
  const deliverables = {
    1: ['Azure Infrastructure Setup', 'Infrastructure Testing'],
    2: ['Development Environment Setup', 'Base Component Development'],
    3: ['Permission Selection UI', 'Permission Data Integration'],
    4: ['Approval Workflow Backend', 'Approval Interface'],
    5: ['Azure OpenAI Integration', 'AI Suggestion Interface'],
    6: ['Notification Backend', 'Notification Interface'],
    7: ['Dashboard Backend', 'Dashboard Interface'],
    8: ['Security Implementation', 'Compliance Features'],
    9: ['Backend Optimization', 'Frontend Optimization'],
    10: ['Technical Documentation', 'User Documentation'],
    11: ['User Acceptance Testing', 'Bug Fixes and Refinements'],
    12: ['Production Environment Setup', 'Production Deployment']
  };

  useEffect(() => {
    setSprints(generateSprints());
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      containerRef.current.scrollLeft += scrollAmount;
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };

  // Generate months between start and end date
  const getMonths = () => {
    const months = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    const current = new Date(start);
    
    while (current <= end) {
      months.push(new Date(current));
      current.setMonth(current.getMonth() + 1);
    }
    
    return months;
  };

  // Generate weeks between start and end date
  const getWeeks = () => {
    const weeks = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    const current = new Date(start);
    
    while (current <= end) {
      weeks.push(new Date(current));
      current.setDate(current.getDate() + 7);
    }
    
    return weeks;
  };

  const months = getMonths();
  const weeks = getWeeks();
  const timeUnits = viewMode === 'months' ? months : weeks;

  // Calculate position and width for sprint bars
  const getSprintStyle = (sprint: Sprint) => {
    const start = new Date(sprint.startDate);
    const end = new Date(sprint.endDate);
    const projectStart = new Date(startDate);
    const projectEnd = new Date(endDate);
    
    const totalDuration = projectEnd.getTime() - projectStart.getTime();
    const startOffset = start.getTime() - projectStart.getTime();
    const duration = end.getTime() - start.getTime();
    
    const leftPercent = (startOffset / totalDuration) * 100;
    const widthPercent = (duration / totalDuration) * 100;
    
    return {
      left: `${leftPercent}%`,
      width: `${widthPercent}%`
    };
  };

  // Get phase style for the Gantt chart
  const getPhaseStyle = (phase: typeof phases[0]) => {
    if (sprints.length === 0) return { left: '0%', width: '0%' };
    
    const phaseSprintNumbers = phase.sprints;
    const phaseSprints = sprints.filter(s => phaseSprintNumbers.includes(s.id));
    
    if (phaseSprints.length === 0) return { left: '0%', width: '0%' };
    
    const firstSprint = phaseSprints[0];
    const lastSprint = phaseSprints[phaseSprints.length - 1];
    
    const start = new Date(firstSprint.startDate);
    const end = new Date(lastSprint.endDate);
    const projectStart = new Date(startDate);
    const projectEnd = new Date(endDate);
    
    const totalDuration = projectEnd.getTime() - projectStart.getTime();
    const startOffset = start.getTime() - projectStart.getTime();
    const duration = end.getTime() - start.getTime();
    
    const leftPercent = (startOffset / totalDuration) * 100;
    const widthPercent = (duration / totalDuration) * 100;
    
    return {
      left: `${leftPercent}%`,
      width: `${widthPercent}%`
    };
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return viewMode === 'months' 
      ? date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Calendar className="h-5 w-5 text-blue-600 mr-2" />
          Project Timeline Gantt Chart
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('months')}
              className={`px-3 py-1 rounded text-sm ${
                viewMode === 'months' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Months
            </button>
            <button
              onClick={() => setViewMode('weeks')}
              className={`px-3 py-1 rounded text-sm ${
                viewMode === 'weeks' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Weeks
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleScroll('left')}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto" ref={containerRef}>
        <div className="min-w-max">
          {/* Timeline header */}
          <div className="flex border-b border-gray-200">
            <div className="w-48 flex-shrink-0 p-2 font-medium text-gray-700">
              Project Phases
            </div>
            <div className="flex-grow">
              <div className="flex">
                {timeUnits.map((unit, index) => (
                  <div 
                    key={index} 
                    className="flex-1 p-2 text-center text-sm font-medium text-gray-700 border-l border-gray-200"
                  >
                    {formatDate(unit)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Project phases */}
          {phases.map((phase, index) => (
            <div key={index} className="flex border-b border-gray-100">
              <div className="w-48 flex-shrink-0 p-3 text-sm text-gray-700 bg-gray-50">
                {phase.name}
              </div>
              <div className="flex-grow relative h-12">
                <div 
                  className={`absolute top-2 h-8 ${phase.color} bg-opacity-70 rounded-md shadow-sm flex items-center justify-center text-xs text-white font-medium px-2`}
                  style={getPhaseStyle(phase)}
                >
                  {phase.name}
                </div>
              </div>
            </div>
          ))}

          {/* Sprints */}
          <div className="mt-6 flex border-b border-gray-200">
            <div className="w-48 flex-shrink-0 p-2 font-medium text-gray-700">
              Sprints
            </div>
            <div className="flex-grow">
              <div className="flex">
                {timeUnits.map((unit, index) => (
                  <div 
                    key={index} 
                    className="flex-1 p-2 text-center text-sm font-medium text-gray-700 border-l border-gray-200"
                  >
                    {formatDate(unit)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {sprints.map((sprint) => (
            <div key={sprint.id} className="flex border-b border-gray-100">
              <div className="w-48 flex-shrink-0 p-3 text-sm text-gray-700 bg-gray-50">
                Sprint {sprint.id} ({sprint.startDate} to {sprint.endDate})
              </div>
              <div className="flex-grow relative h-12">
                <div 
                  className="absolute top-2 h-8 bg-blue-500 bg-opacity-70 rounded-md shadow-sm flex items-center justify-center text-xs text-white font-medium px-2"
                  style={getSprintStyle(sprint)}
                >
                  Sprint {sprint.id}
                </div>
              </div>
            </div>
          ))}

          {/* Deliverables */}
          <div className="mt-6 flex border-b border-gray-200">
            <div className="w-48 flex-shrink-0 p-2 font-medium text-gray-700">
              Key Deliverables
            </div>
            <div className="flex-grow">
              <div className="flex">
                {timeUnits.map((unit, index) => (
                  <div 
                    key={index} 
                    className="flex-1 p-2 text-center text-sm font-medium text-gray-700 border-l border-gray-200"
                  >
                    {formatDate(unit)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {sprints.map((sprint) => (
            <div key={`deliverable-${sprint.id}`} className="flex border-b border-gray-100">
              <div className="w-48 flex-shrink-0 p-3 text-sm text-gray-700 bg-gray-50">
                Sprint {sprint.id} Deliverables
              </div>
              <div className="flex-grow relative min-h-12">
                <div 
                  className="absolute top-2 bg-green-100 border border-green-200 rounded-md shadow-sm flex flex-col items-start justify-center text-xs text-green-800 font-medium p-2"
                  style={getSprintStyle(sprint)}
                >
                  {deliverables[sprint.id as keyof typeof deliverables]?.map((deliverable, idx) => (
                    <div key={idx} className="mb-1 last:mb-0">• {deliverable}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Legend</h4>
        <div className="flex flex-wrap gap-4">
          {phases.map((phase, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-4 h-4 ${phase.color} rounded mr-2`}></div>
              <span className="text-xs text-gray-600">{phase.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
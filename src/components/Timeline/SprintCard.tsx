import { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { UserStoryItem } from './UserStoryItem';
import type { Sprint } from './types';

interface SprintCardProps {
  sprint: Sprint;
  isExpanded: boolean;
  onToggle: () => void;
}

export function SprintCard({ sprint, isExpanded, onToggle }: SprintCardProps) {
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
              <UserStoryItem key={story.id} story={story} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
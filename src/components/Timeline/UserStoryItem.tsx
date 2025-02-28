import { Code, TestTube, ScrollText, Target, Lightbulb } from 'lucide-react';
import { TaskItem } from './TaskItem';
import type { UserStory } from './types';

interface UserStoryItemProps {
  story: UserStory;
}

export function UserStoryItem({ story }: UserStoryItemProps) {
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
    <div className="bg-gray-50 rounded-lg p-4">
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
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
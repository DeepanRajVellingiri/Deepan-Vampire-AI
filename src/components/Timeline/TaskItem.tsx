import type { Task } from './types';

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
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

  return (
    <div className="bg-white rounded p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">
            {task.title}
          </span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {task.role}
          </span>
          <span className="text-sm text-gray-500">
            {task.estimate}
          </span>
        </div>
      </div>
    </div>
  );
}
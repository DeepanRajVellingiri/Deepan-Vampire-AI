export interface Sprint {
  id: number;
  startDate: string;
  endDate: string;
  userStories: UserStory[];
}

export interface UserStory {
  id: string;
  title: string;
  description: string;
  type: 'Development' | 'Testing' | 'BA' | 'Product';
  tasks: Task[];
  status: 'To Do' | 'In Progress' | 'Done';
  points: number;
  priority: 'High' | 'Medium' | 'Low';
  acceptanceCriteria?: string[];
}

export interface Task {
  id: string;
  title: string;
  role: string;
  status: 'To Do' | 'In Progress' | 'Done';
  estimate: string;
}
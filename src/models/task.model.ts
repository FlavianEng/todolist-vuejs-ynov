export interface Task {
  assignee: string;
  estimatedTime: string;
  id: string;
  isDone: boolean;
  title: string;
}

export type TaskVisibility = 'undone' | 'all' | 'done';

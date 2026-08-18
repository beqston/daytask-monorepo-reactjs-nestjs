export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Task {
  id: number;
  title: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}
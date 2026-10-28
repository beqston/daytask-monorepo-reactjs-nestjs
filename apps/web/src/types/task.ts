// libs/shared-types/src/task.ts

export interface TaskMember {
  id: string;
  fullName: string;
  imageUrl: string | null;
}

export interface TaskAuthor {
  id: string;
  fullName: string;
  imageUrl: string | null;
}

export interface Task {
  id: string;
  title: string;
  details: string;
  time: string;
  date: string;
  subtask: string | null;
  percentage: number | null;
  isCompleted: boolean | null;
  createdAt: string;   
  updatedAt: string;   
  authorId: string;
  members: TaskMember[];
  author: TaskAuthor;
}
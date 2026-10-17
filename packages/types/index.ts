export interface User {
  id: string,
  email: string,
  role: string,
  fullName:string,
  imageUrl:string,
}

export interface Task {
  id: number;
  title: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}
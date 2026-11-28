export type RoleEnum = "USER" | "ADMIN";
export interface User {
  id: string,
  email: string,
  role: RoleEnum,
  fullName:string,
  imageUrl:string | null,
}

export interface Task {
  id: number;
  title: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

import { type User } from '../../../../packages/types';

export interface AuthState{
    user: User | null,
    isAuth:boolean,
    loading:boolean,
    error:string | null
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export type RoleEnum = "USER" | "ADMIN";

export interface GoogleUser {
  id: string;
  email: string;
  fullName: string;
  role: RoleEnum;
  imageUrl: string | null;
}

export interface GoogleAuthResponse {
  acsessToken: string;
  refreshToken: string;
  user: GoogleUser;
}

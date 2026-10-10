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


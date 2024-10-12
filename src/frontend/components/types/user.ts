import { Goal } from "./goal";
import { Progress } from "./progress";
import { Post } from "./post";

export interface User {
  id: number;
  email: string;
  username: string;
  goals: Goal[];
  progress: Progress[];
  posts: Post[];
}

export interface UserCreateInput {
  email: string;
  password: string;
  username: string;
}

export interface UserUpdateInput {
  email?: string;
  password?: string;
  username?: string;
}

export interface UsersService {
  fetchUsers: () => Promise<User[]>;
  createUser: (userData: UserCreateInput) => Promise<User>;
  updateUser: (userId: number, updatedUserData: UserUpdateInput) => Promise<User>;
  deleteUser: (userId: number) => Promise<void>;
}

export interface UserProps {
  user: User;
}

export interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface UserListProps {
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => void;
  deleteUser: (userId: number) => Promise<void>;
  editUser: (user: User) => void;
}
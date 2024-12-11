import { User } from './user.response';

export interface Message {
  id: number;
  content: string;
  createdAt: string;
  user: User;
}

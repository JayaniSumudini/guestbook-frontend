import { UserType } from './user';

export interface Comment {
  id: string;
  content: string;
  userType: UserType;
  createdAt: Date;
  userId?: string;
  updatedAt?: Date;
  deletedAt?: Date;
  isDeleted?: boolean;
}

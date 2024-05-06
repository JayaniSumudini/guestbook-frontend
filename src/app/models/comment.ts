import { UserType } from './user';

export interface Comment {
  _id: string;
  content: string;
  user: CommentUserDetails;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isDeleted?: boolean;
}

export type CommentUserDetails = {
  userType: UserType;
  id?: string;
  name?: string;
};

import { Comment } from './comment';
import { User } from './user';

export interface getAllCommentsResponse {
  comments: Comment[];
}

export interface saveCommentResponse {
  commentId: string;
}

export interface loginResponse {
  accessToken: string;
}

export interface authIdentityResponse {
  user: User;
}

export interface forgotPasswordResponse {
  resetPasswordToken: string;
}

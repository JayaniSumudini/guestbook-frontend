import { Comment } from './comment';

export interface getAllCommentsResponse {
  comments: Comment[];
}

export interface saveCommentResponse {
  commentId: string;
}

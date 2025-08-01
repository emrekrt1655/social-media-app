export type Comment = CommentCreateData & {
  category?: string;
  isElite?: string;
  createdAt?: string;
};

export type CommentCreateData = {
  commentId?: string;
  text: string;
  commentPostId: string;
  commentUserId: string;
};

export type CommentCreationResponse = {
  message: string;
};

export type CommentDeleteResponse = CommentCreationResponse & {};

export type CommentsResponse = {
  status: string;
  message: string;
  data: Comment[];
};

export type Like = {
    likeId: string;
    likePostId: string | null;
    likeCommentId: string | null;
    likeUserId: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  };

  export type Likes = Like[];

  export type CreateLikePostData = {
    likePostId: string
    likeUserId: string
  }

  export type CreateLikeCommentData = {
    likeCommentId: string
    likeUserId: string
  }

  export type LikeResponse = {
    status: string;
    message: string;
    data: Likes | null;
  }

  export type LikeCreateResponse = { message: string }
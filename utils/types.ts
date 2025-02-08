import { Request } from "express";

export interface IUser {
  userId: string;
  userName: string;
  name: string;
  surname: string;
  bio?: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface IDecodedToken {
  id?: string;
  user?: IUser;
  iat: number;
  exp: number;
}

export interface IPost {
  postId: string;
  text: string;
  postUserId: string;
  postTopicId: string;
  image?: string;
  category?: string;
  isElite?: string;
}

export interface IComment {
  commentId: string;
  text: string;
  commentPostId: string;
  commentUserId: string;
  category?: string;
  isElite?: string;
}

export interface ILike {
  likeId: string;
  likePostId?: string;
  likeCommentId?: string;
  likeUserId: string;
}

export interface IFollower {
  folId: string;
  followerId: string;
  followedId: string;
}

export interface IFollowing {
  followingId: string;
  followerId: string;
  followedId: string;
}

export interface ITopic {
  topicId: string;
  text: string;
  topicUserId: string;
  image?: string;
  country: string;
  category?: string;
  isElite?: string;
}

export interface IReqAuth extends Request {
  user?: IUser;
}

import { apiRequest } from "./global/httpRequests";
import type {
  CreateLikePostData,
  CreateLikeCommentData,
  LikeCreateResponse,
  LikeResponse,
} from "../types/like";

//Fetches all likes  from the backend.
export const getLikes = () => apiRequest<LikeResponse>("/likes");

export const getPostLikes = (postId: string) =>
  apiRequest<LikeResponse>(`/likes/${postId}`);

export const getCommentLikes = (commentId: string) =>
  apiRequest<LikeResponse>(`/getCommentLikes/${commentId}`);

export const likePost = (likeData: CreateLikePostData) =>
  apiRequest<LikeCreateResponse>("/like/", "POST", likeData);

export const likeComment = (likeData: CreateLikeCommentData) =>
  apiRequest<LikeCreateResponse>("likeComment", "POST", likeData);

export const unlike = (likeId: string) =>
  apiRequest<LikeCreateResponse>(`/unlike/${likeId}`);

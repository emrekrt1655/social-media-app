import {
  PostCreateData,
  PostCreationResponse,
  PostDeleteResponse,
  PostsResponse,
} from "../types/posts";
import { apiRequest } from "./global/httpRequests";

/** Fetch all posts */
export const getPosts = () => apiRequest<PostsResponse>("/posts");

/** Fetch posts by a specific user */
export const getUserPosts = (userId: string) =>
  apiRequest<PostsResponse>(`/posts/${userId}`);

/** Create a new post */
export const createPost = (post: PostCreateData) =>
  apiRequest<PostCreationResponse>("/postCreate", "POST", post);

/** Delete a post */
export const deletePost = (postId: string) =>
  apiRequest<PostDeleteResponse>(`/postDelete/${postId}`, "DELETE");

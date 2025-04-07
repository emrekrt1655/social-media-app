import { apiRequest } from "./global/httpRequests";
import type {
  CommentCreateData,
  CommentCreationResponse,
  CommentDeleteResponse,
  CommentsResponse,
} from "../types/comment";

//Fetches all commments of a Post from the backend.
export const getComments = (postId: string) =>
  apiRequest<CommentsResponse>(`/comments/${postId}`);

//create a new comment
export const createComment = (comment: CommentCreateData) =>
  apiRequest<CommentCreationResponse>("commentCreate", "POST", comment);

//delete a comment
export const deleteComment = (commentId: string) =>
  apiRequest<CommentDeleteResponse>(`/commentDelete/${commentId}`, "DELETE");

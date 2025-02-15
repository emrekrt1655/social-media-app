import { API_URL, apiRequest } from "./global/httpRequests";
import type {
  CommentCreateData,
  Comment,
  CommentCreationResponse,
  CommentDeleteResponse,
} from "../types/comment";

/**
 * Fetches all commments of a Post from the backend.
 * @returns {Promise<Comment[]>}
 */

export const getComments = async (postId: string): Promise<Comment[]> => {
  const url = `${API_URL}/comments/${postId}`;

  try {
    const comments = await apiRequest(url);
    return comments;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch comments");
  }
};

/**
 * Create a new comment
 * @returns {Promise<CommentCreationResponse>}
 */

export const createComment = async (
  comment: CommentCreateData
): Promise<CommentCreationResponse> => {
  const url = `${API_URL}/commentCreate`;
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return { message: "Token not found" };
  }

  try {
    const result = await apiRequest(url, {
        method: "POST",
      headers: {
        "Content-Type": "application/json",
        Token: `${token}`,
      },
      body: JSON.stringify(comment),
    });
    console.log("Comment created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error creating comment:", error);
    return Promise.resolve({ message: "Error creating comment" });
  }
  }



/**
 * Delete a comment
 * @returns {Promise<CommentDeleteResponse>}
 */

export const deleteComment = async (commentId: string): Promise<CommentDeleteResponse> => {
  const url = `${API_URL}/commentDelete/${commentId}`;
  console.log(url)
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return { message: "Token not found" };
  }

  try {
    const result = await apiRequest(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Token: `${token}`,
      },
    });
    console.log("Comment deleted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error deleting comment:", error);
    return Promise.resolve({ message: "Error deleting comment" });
  }
};

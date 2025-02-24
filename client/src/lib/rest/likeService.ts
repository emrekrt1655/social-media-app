import { API_URL, apiRequest } from "./global/httpRequests";
import type {
  CreateLikePostData,
  CreateLikeCommentData,
  LikeCreateResponse,
  LikeResponse,
} from "../types/like";

/**
 * Fetches all likes  from the backend.
 * @returns {Promise<LikeResponse>}
 */

export const getLikes = async (): Promise<LikeResponse> => {
  const url = `${API_URL}/likes`;

  try {
    const likes = await apiRequest(url);
    return likes;
  } catch (error) {
    console.error("Error fetching likes:", error);
    throw new Error("Failed to fetch likes");
  }
};

export const getPostLikes = async (
  postId: string
): Promise<LikeResponse> => {
  const url = `${API_URL}/likes/${postId}`;

  try {
    const likes = await apiRequest(url);
    return likes;
  } catch (error) {
    console.error("Error fetching post likes:", error);
    throw new Error("Failed to fetch post likes");
  }
};

export const getCommentLikes = async (
  commentId: string
): Promise<LikeResponse> => {
  const url = `${API_URL}/getCommentLikes/${commentId}`;
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
  }

  try {
    const likes = await apiRequest(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Token: `${token}`,
      },
    });
    return likes;
  } catch (error) {
    console.error("Error fetching comment likes:", error);
    throw new Error("Failed to fetch comment likes");
  }
};

export const likePost = async (
  likeData: CreateLikePostData
): Promise<LikeCreateResponse> => {
  const url = `${API_URL}/like`;
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return { message: "Token not found" };
  }

  try {
    const result = apiRequest(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Token: `${token}`,
      },
      body: JSON.stringify(likeData),
    });
    return result;
  } catch (error) {
    console.error("Error liking post:", error);
    return Promise.resolve({ message: "Error creating like" });
  }
};

export const likeComment = async (
  likeData: CreateLikeCommentData
): Promise<LikeCreateResponse> => {
  const url = `${API_URL}/likeComment`;
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return { message: "Token not found" };
  }

  try {
    const result = apiRequest(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Token: `${token}`,
      },
      body: JSON.stringify(likeData),
    });
    return result;
  } catch (error) {
    console.error("Error liking comment:", error);
    return Promise.resolve({ message: "Error creating like" });
  }
};

export const unlike = async (likeId: string): Promise<LikeCreateResponse> => {
  const url = `${API_URL}/unlike/${likeId}`;
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
    return result;
  } catch (error) {
    console.error("Error deleting like:", error);
    return Promise.resolve({ message: "Error deleting like" });
  }
};

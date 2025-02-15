import { API_URL, apiRequest } from "./global/httpRequests";
import type {
  PostCreateData,
  PostCreationResponse,
  PostDeleteResponse,
  PostsResponse,
} from "../types/posts";

/**
 * Fetches all posts  from the backend.
 * @returns {Promise<PostsResponse>}
 */

export const getPosts = async (): Promise<PostsResponse> => {
  const url = `${API_URL}/posts`;

  try {
    const posts = await apiRequest(url);
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};

/**
 * Fetches all posts of a specific user
 * @returns {Promise<PostsResponse>}
 */

export const getUserPosts = async (userId: string): Promise<PostsResponse> => {
  const url = `${API_URL}/posts/${userId}`;

  try {
    const posts = await apiRequest(url);
    return posts;
  } catch (error) {
    console.error("Error fetching posts for user:", error);
    throw new Error("Failed to fetch posts for user");
  }
};

/**
 * Create a new post
 * @returns {Promise<PostCreationResponse>}
 */
export const createPost = async (
  post: PostCreateData
): Promise<PostCreationResponse> => {
  const url = `${API_URL}/postCreate`;
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
      body: JSON.stringify(post),
    });
    console.log("Post created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error creating post:", error);
    return Promise.resolve({ message: "Error creating post" });
  }
};

/**
 * Delete a post
 * @returns {Promise<PostDeleteResponse>}
 */

export const deletePost = async (
  postId: string
): Promise<PostDeleteResponse> => {
  const url = `${API_URL}/postDelete/${postId}`;
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
    console.log("Post deleted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error deleting post:", error);
    return Promise.resolve({ message: "Error deleting post" });
  }
};

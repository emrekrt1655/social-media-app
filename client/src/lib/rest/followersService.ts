import { API_URL, apiRequest } from "./global/httpRequests";
import {
  CreateFollowerData,
  FollowersResponse,
  CreateFollowersResponse,
  DeleteFollowersResponse,
} from "../types/follower";

/**
 * Fetches all followers  from the backend.
 * @returns {Promise<FollowersResponse>}
 */

export const getFollowers = async (): Promise<FollowersResponse> => {
  const url = `${API_URL}/followers`;
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found");
  }

  try {
    const followers = await await apiRequest(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Token: `${token}`,
      },
    });
    return followers;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch followers");
  }
};

/**
 * Create follower.
 * @returns {Promise<CreateFollowersResponse>}
 */

export const createFollower = async (
  follower: CreateFollowerData
): Promise<CreateFollowersResponse> => {
  const url = `${API_URL}/follow`;
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found");
  }

  try {
    const result = await apiRequest(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Token: `${token}`,
      },
      body: JSON.stringify(follower),
    });
    console.log("Follower created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error creating follower:", error);
    return Promise.resolve({ message: "Error creating follower" });
  }
};

/**
 * Unfollow a user.
 * @returns {Promise<DeleteFollowersResponse>}
 */

export const deleteFollower = async (
  folId: string
): Promise<DeleteFollowersResponse> => {
  const url = `${API_URL}/unfollow/${folId}`;
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found");
  }

  try {
    const result = await apiRequest(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Token: `${token}`,
      },
    });
    console.log("Follower deleted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error deleting follower:", error);
    return Promise.resolve({ message: "Error deleting follower" });
  }
};

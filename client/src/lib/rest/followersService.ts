import { apiRequest } from "./global/httpRequests";
import {
  CreateFollowerData,
  FollowersResponse,
  CreateFollowersResponse,
  DeleteFollowersResponse,
} from "../types/follower";

//Fetches all followers  from the backend.
export const getFollowers = () => apiRequest<FollowersResponse>("/followers");

//Create a new follower
export const createFollower = (follower: CreateFollowerData) =>
  apiRequest<CreateFollowersResponse>("/follow", "POST", follower);

//unfollow a follower
export const deleteFollower = (follId: string) =>
  apiRequest<DeleteFollowersResponse>(`/unfollow/${follId}`, "DELETE");

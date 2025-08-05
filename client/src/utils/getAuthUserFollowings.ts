import { Follower } from "../lib/types/follower";

export function getAuthUserFollowings(followers: Follower[], authUserId: string): string[] {
  return followers
    .filter((f) => f.followerId === authUserId)
    .map((f) => f.followedId);
}
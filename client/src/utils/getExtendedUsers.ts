import { AuthUserData, ExtendedUserWithFollowInfo } from "../lib/types/auth";
import { Follower } from "../lib/types/follower";

export function getExtendedUsers(
  mode: "followers" | "followings",
  currentUserId: string,
  followers: Follower[],
  users: AuthUserData[] = []
): ExtendedUserWithFollowInfo[] {
  return followers
    .filter((f) =>
      mode === "followers"
        ? f.followedId === currentUserId
        : f.followerId === currentUserId
    )
    .map((f) => {
      const relatedUserId = mode === "followers" ? f.followerId : f.followedId;

      const user = users.find((u) => u.userId === relatedUserId);
      if (!user) return null;

      return {
        ...user,
        folId: f.folId,
        followerId: f.followerId,
        followedId: f.followedId,
      };
    })
    .filter(Boolean) as ExtendedUserWithFollowInfo[];
}

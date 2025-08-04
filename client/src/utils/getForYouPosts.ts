import { Post } from "../lib/types/posts";
import { AuthUserData } from "../lib/types/auth";
import { Follower } from "../lib/types/follower";

export function getForYouPosts({
  posts,
  authUser,
  followers,
}: {
  posts: Post[];
  authUser: AuthUserData;
  followers: Follower[];
}): {
  forYouPosts: Post[];
  directFollowings: Post[];
} {
  if (!authUser) return { forYouPosts: [], directFollowings: [] };

  const authUserFollowers = followers
    .filter((f) => f.followerId === authUser.userId)
    .map((f) => f.followedId);

  const secondDegreeFollowedIds = followers
    .filter((f) => authUserFollowers.includes(f.followerId))
    .map((f) => f.followedId);

  const userPostTopicIds = posts
    .filter((p) => p.postUserId === authUser.userId)
    .map((p) => p.postTopicId);

  const now = new Date().getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  const directFollowings = posts
    .filter((p) => authUserFollowers.includes(p.postUserId))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const secondDegree = posts.filter((p) =>
    secondDegreeFollowedIds.includes(p.postUserId)
  );

  const topicBased = posts.filter((p) =>
    userPostTopicIds.includes(p.postTopicId)
  );

  const popular = posts.filter((p) => p._count.likes && p._count.likes > 5);

  const recentPopular = posts.filter(
    (p) =>
      now - new Date(p.createdAt).getTime() < oneDay &&
      p._count.likes !== undefined &&
      p._count.likes >= 3
  );

  const combinedPosts = [
    ...directFollowings,
    ...secondDegree,
    ...topicBased,
    ...popular,
    ...recentPopular,
  ];

  const uniquePostsMap = new Map<string, Post>();
  for (const post of combinedPosts) {
    if (!uniquePostsMap.has(post.postId)) {
      uniquePostsMap.set(post.postId, post);
    }
  }

  const forYouPosts = Array.from(uniquePostsMap.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return {
    forYouPosts,
    directFollowings,
  };
}

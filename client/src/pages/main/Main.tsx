import "./Main.scss";
import { usePosts } from "../../lib/hooks/usePost";
import { Post } from "../../lib/types/posts";
import { useState } from "react";
import PostCard from "../../components/PostCard/PostCard";
import { useAuth } from "../../lib/hooks/useAuth";
import { AuthUserData } from "../../lib/types/auth";
import { useTopics } from "../../lib/hooks/useTopics";
import { Topic } from "../../lib/types/topics";
import ToggleTabs from "../../components/ToggleTabs/ToggleTabs";
import { getUserFromStorage } from "../../utils/localStorage";
import { useFollowers } from "../../lib/hooks/useFollowers";

const Main = () => {
  const { posts } = usePosts();
  const { users } = useAuth();
  const { topics } = useTopics();
  const authUser: AuthUserData = getUserFromStorage();
  const { followers } = useFollowers();

  const authUserFollowers = authUser && followers
    .filter((follower) => follower.followerId === authUser.userId)
    .map((user) => user.followedId);

  const [activeTab, setActiveTab] = useState<"foryou" | "followings" | "all">(
    authUser ? "foryou" : "all"
  );

  const userMap =
    users?.reduce((acc, user) => {
      acc[user.userId] = user;
      return acc;
    }, {} as Record<string, AuthUserData>) || {};

  const topicMap =
    topics?.reduce((acc, topic) => {
      acc[topic.topicId] = topic;
      return acc;
    }, {} as Record<string, Topic>) || {};

  let postsList: Post[] = [];

  switch (activeTab) {
    case "all":
      postsList = posts;
      break;
    case "followings":
      postsList = posts.filter((post) =>
        authUserFollowers.includes(post.postUserId)
      );
      break;
    case "foryou":
      postsList = posts;
      break;
    default:
      postsList = posts;
      break;
  }

  return (
    <>
      <ToggleTabs
        options={
          authUser
            ? [
                { label: "For You", value: "foryou" },
                { label: "Followings", value: "followings" },
              ]
            : [{ label: "All Posts", value: "all" }]
        }
        active={activeTab}
        onChange={(val) => setActiveTab(val)}
      />

      {postsList.map((post: Post) => (
        <PostCard
          key={post.postId}
          post={post}
          postUser={userMap[post.postUserId]}
          topic={topicMap[post.postTopicId]}
        />
      ))}
    </>
  );
};

export default Main;

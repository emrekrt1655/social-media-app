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

const Main = () => {
  const { posts } = usePosts();
  const { users } = useAuth();
  const { topics } = useTopics();

  const [activeTab, setActiveTab] = useState<"foryou" | "followings">("foryou");

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

  return (
    <>
      <ToggleTabs
        options={[
          { label: "For You", value: "foryou" },
          { label: "Followings", value: "followings" },
        ]}
        active={activeTab}
        onChange={(val) => setActiveTab(val)}
      />

      {posts?.map((post: Post) => (
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

import "./Main.scss";
import { usePosts } from "../../lib/hooks/usePost";
import { Post } from "../../lib/types/posts";
import { useState } from "react";
import PostCard from "../../components/PostCard/PostCard";
import { useAuth } from "../../lib/hooks/useAuth";
import { AuthUserData } from "../../lib/types/auth";
import { useTopics } from "../../lib/hooks/useTopics";
import { Topic } from "../../lib/types/topics";

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
      <div className="main-toggle">
        <button
          className={`toggle-btn ${activeTab === "foryou" ? "active" : ""}`}
          onClick={() => setActiveTab("foryou")}
        >
          For You
        </button>
        <button
          className={`toggle-btn ${activeTab === "followings" ? "active" : ""}`}
          onClick={() => setActiveTab("followings")}
        >
          Followings
        </button>
      </div>
      {posts?.map((post: Post) => (
        <PostCard post={post} postUser={userMap[post.postUserId]} topic={topicMap[post.postTopicId]} />
      ))}
    </>
  );
};

export default Main;

import { useParams } from "react-router";
import { usePosts } from "../../lib/hooks/usePost";
import { Post } from "../../lib/types/posts";
import PostCard from "../../components/PostCard/PostCard";
import { useAuth } from "../../lib/hooks/useAuth";
import { AuthUserData } from "../../lib/types/auth";
import { useTopics } from "../../lib/hooks/useTopics";
import { Topic } from "../../lib/types/topics";
import ToggleTabs from "../../components/ToggleTabs/ToggleTabs";
import { useState } from "react";
import TopicCard from "../../components/TopicCard/TopicCard";

const UserProfile = () => {
  const { posts } = usePosts();
  const { users } = useAuth();
  const { topics } = useTopics();
  const { userId } = useParams<{ userId: string }>();
  const [activeTab, setActiveTab] = useState<"posts" | "topics">("posts");

  const userMap =
    users?.reduce((acc, user) => {
      acc[user.userId] = user;
      return acc;
    }, {} as Record<string, AuthUserData>) || {};

  const userPosts = posts.filter((post: Post) => userId === post.postUserId);
  const userTopics = topics.filter(
    (topic: Topic) => userId === topic.topicUserId
  );
  const topicMap =
    topics?.reduce((acc, topic) => {
      acc[topic.topicId] = topic;
      return acc;
    }, {} as Record<string, Topic>) || {};

  return (
    <>
      <ToggleTabs
        options={[
          { label: "User Posts", value: "posts" },
          { label: "User Topics", value: "topics" },
        ]}
        active={activeTab}
        onChange={(val) => setActiveTab(val)}
      />
      {activeTab === "posts"
        ? userPosts?.map((post: Post) => (
            <PostCard
              post={post}
              postUser={userMap[post.postUserId]}
              topic={topicMap[post.postTopicId]}
            />
          ))
        : userTopics?.map((topic: Topic) => (
            <TopicCard topic={topic} topicUser={userMap[topic.topicUserId]} />
          ))}
    </>
  );
};

export default UserProfile;

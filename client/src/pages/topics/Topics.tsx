import TopicCard from "../../components/TopicCard/TopicCard";
import { useAuth } from "../../lib/hooks/useAuth";
import { useTopics } from "../../lib/hooks/useTopics";
import { AuthUserData } from "../../lib/types/auth";
import "./topics.scss";

function Topics() {
  const { topics } = useTopics();
  const {users} = useAuth()

  const userMap =
      users?.reduce((acc, user) => {
        acc[user.userId] = user;
        return acc;
      }, {} as Record<string, AuthUserData>) || {};

  return (
    <div className="topics-wrapper">
      <h2 className="topics-title">All Topics</h2>
      <div className="topics-container">
        {topics.map((topic) => (
          <TopicCard topic={topic} topicUser={userMap[topic.topicUserId]} />
        ))}
      </div>
    </div>
  );
}

export default Topics;

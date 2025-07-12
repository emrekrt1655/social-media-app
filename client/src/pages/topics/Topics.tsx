import { useState, useMemo } from "react";
import TopicCard from "../../components/TopicCard/TopicCard";
import { useAuth } from "../../lib/hooks/useAuth";
import { useTopics } from "../../lib/hooks/useTopics";
import { AuthUserData } from "../../lib/types/auth";
import "./topics.scss";

function Topics() {
  const [sortBy, setSortBy] = useState<
    "newest" | "oldest" | "username" | "postCount"
  >("newest");
  const { topics } = useTopics();
  const { users } = useAuth();

  const userMap =
    users?.reduce((acc, user) => {
      acc[user.userId] = user;
      return acc;
    }, {} as Record<string, AuthUserData>) || {};

  const sortedTopics = useMemo(() => {
    const copied = [...topics];
    switch (sortBy) {
      case "newest":
        return copied.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return copied.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "username":
        return copied.sort((a, b) => {
          const userA = userMap[a.topicUserId]?.userName || "";
          const userB = userMap[b.topicUserId]?.userName || "";
          return userA.localeCompare(userB);
        });
      // case "postCount":
      //   const postCounts: Record<string, number> = topics.reduce(
      //     (acc, topic) => {
      //       acc[topic.topicUserId] = (acc[topic.topicUserId] || 0) + 1;
      //       return acc;
      //     },
      //     {} as Record<string, number>
      //   );
      //   return copied.sort((a, b) => {
      //     return (
      //       (postCounts[b.topicUserId] || 0) - (postCounts[a.topicUserId] || 0)
      //     );
      //   });
      case "postCount":
        return copied.sort((a, b) => b._count.posts - a._count.posts);

      default:
        return copied;
    }
  }, [topics, sortBy, userMap]);

  return (
    <div className="topics-wrapper">
      <h2 className="topics-title">All Topics</h2>

      <div className="topics-sorting">
        <label htmlFor="sortBy">Sort By:</label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="username">Username</option>
          <option value="postCount">User Post Count</option>
        </select>
      </div>

      <div className="topics-container">
        {sortedTopics.map((topic) => (
          <TopicCard
            key={topic.topicId}
            topic={topic}
            topicUser={userMap[topic.topicUserId]}
          />
        ))}
      </div>
    </div>
  );
}

export default Topics;

import { useParams } from "react-router";
import { usePosts } from "../../lib/hooks/usePost";
import { Post } from "../../lib/types/posts";
import PostCard from "../../components/PostCard/PostCard";
import { useAuth } from "../../lib/hooks/useAuth";
import { AuthUserData } from "../../lib/types/auth";
import { useTopics } from "../../lib/hooks/useTopics";
import { Topic } from "../../lib/types/topics";

const TopicPosts = () => {
  const { posts } = usePosts();
  const {users} = useAuth()
  const {topics} = useTopics()
  const { topicId } = useParams<{ topicId: string }>();
  const userMap =
      users?.reduce((acc, user) => {
        acc[user.userId] = user;
        return acc;
      }, {} as Record<string, AuthUserData>) || {};

  const topicPosts = posts.filter((post: Post) => topicId === post.postTopicId);
  const topic = topics.find((topic : Topic) => topic.topicId === topicId)

  return (
    <>
      {topicPosts?.map((post: Post) => (
        <PostCard
          post={post}
          postUser={userMap[post.postUserId]}
          topic={topic!}
        />
      ))}
    </>
  );
};

export default TopicPosts;

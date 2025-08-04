import "./MostLikedPost.scss";
import { usePosts } from "../../../../lib/hooks/usePost";
import { useAuth } from "../../../../lib/hooks/useAuth";
import { Post } from "../../../../lib/types/posts";
import { AuthUserData } from "../../../../lib/types/auth";
import { Topic } from "../../../../lib/types/topics";
import { useTopics } from "../../../../lib/hooks/useTopics";
import PostCard from "../../../PostCard/PostCard";

const MostLikedPost = () => {
  const { posts } = usePosts();
  const { users } = useAuth();
  const { topics } = useTopics();

  if (!posts || posts.length === 0) return <div>No posts found.</div>;

  const now = new Date();

  const filterPostsByHours = (hours: number): Post[] => {
    return posts.filter((post) => {
      const createdAt = new Date(post.createdAt);
      const diffHours = (now.getTime() - createdAt.getTime()) / 1000 / 60 / 60;
      return diffHours <= hours;
    });
  };

  let filteredPosts: Post[] = filterPostsByHours(24);

  if (filteredPosts.length === 0) filteredPosts = filterPostsByHours(72);
  if (filteredPosts.length === 0) filteredPosts = filterPostsByHours(168); // 7 gün
  if (filteredPosts.length === 0) filteredPosts = posts;

  const mostLikedPost: Post = filteredPosts.reduce((prev, current) => {
    const prevScore = prev._count.likes + prev._count.comments;
    const currentScore = current._count.likes + current._count.comments;
    return currentScore > prevScore ? current : prev;
  });

  const postUser: AuthUserData | undefined = users?.find(
    (user) => user.userId === mostLikedPost.postUserId
  );

  const topic: Topic | undefined = topics?.find(
    (t) => t.topicId === mostLikedPost.postTopicId
  );

  if (!postUser || !topic) return <div>Post data is incomplete.</div>;

  return (
    <div className="most-liked-post">
      <h3 className="title">Most Liked Post</h3>
      <PostCard mostLiked post={mostLikedPost} postUser={postUser} topic={topic} />
    </div>
  );
};

export default MostLikedPost;

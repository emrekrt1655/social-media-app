import React from "react";
import { useParams } from "react-router";
import { usePosts } from "../../lib/hooks/usePost";
import { useTopics } from "../../lib/hooks/useTopics";
import { useAuth } from "../../lib/hooks/useAuth";
import { Post } from "../../lib/types/posts";
import { Topic } from "../../lib/types/topics";
import "./DetailedPost.scss";
import PostCard from "../../components/PostCard/PostCard";

const DetailedPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { posts } = usePosts();
  const { topics } = useTopics();
  const { users } = useAuth();

  const post: Post | undefined = posts.find((post) => post.postId === postId);
  const topic: Topic | undefined = topics.find(
    (topic) => topic.topicId === post?.postTopicId
  );
  const postUser = users?.find((u) => u.userId === post?.postUserId);

  if (!post || !postUser || !topic) {
    return <div className="detailed-post__loading">Post loading...</div>;
  }

  return (
    <>
      <PostCard detailed post={post} postUser={postUser} topic={topic} />
    </>
  );
};

export default DetailedPost;

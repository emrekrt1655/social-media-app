import "./MostLikedPost.scss";
import { usePosts } from "../../../../lib/hooks/usePost";
import { Post } from "../../../../lib/types/posts";
import { useNavigate } from "react-router";

const MostLikedPost = () => {
  // TODO add a logic to pick post only in 24 hour
  const { posts } = usePosts();
  const navigate = useNavigate();

  if (!posts || posts.length === 0) return <div>No posts found.</div>;

  const mostLikedPost: Post = posts.reduce((prev, current) => {
    const prevScore = prev._count.likes + prev._count.comments;
    const currentScore = current._count.likes + current._count.comments;
    return currentScore > prevScore ? current : prev;
  });

  return (
    <div className="most-liked-post">
      <h3 className="title">Most Liked Post</h3>
      <div
        className="post-card"
        onClick={() => navigate(`/post:/${mostLikedPost.postId}`)}
      >
        {mostLikedPost.image && (
          <div className="image-wrapper">
            <img
              src={mostLikedPost.image}
              alt={mostLikedPost.text}
              className="post-image"
            />
          </div>
        )}
        <div className="post-text">{mostLikedPost.text}</div>
        <div className="post-meta">
          <span>👍 {mostLikedPost._count.likes} likes</span>
          <span>💬 {mostLikedPost._count.comments} comments</span>
        </div>
      </div>
    </div>
  );
};

export default MostLikedPost;

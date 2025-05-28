import React from "react";
import { Post } from "../../lib/types/posts";
import "./PostCard.scss";
import { AuthUserData } from "../../lib/types/auth";
import { formatPostDate } from "../../utils/formatPostDate";
import { useNavigate } from "react-router";
import { Topic } from "../../lib/types/topics";
import AvatarCard from "../Avatar/AvatarCard";

type PostCardProps = {
  post: Post;
  postUser: AuthUserData;
  topic: Topic;
};

const PostCard: React.FC<PostCardProps> = ({ post, postUser, topic }) => {
  const navigate = useNavigate();

  const handleTopicClick = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    e.stopPropagation(); // post click'i engelle
    if (topic) {
      navigate(`/topic/${topic.topicId}`);
    }
  };

  return (
    <div className="post-card" onClick={() => navigate(`/post/${post.postId}`)}>
      <div className="post-card__content">
        <div className="post-card__left">
          <div className="post-card__header">
            <p
              className="post-card__category"
              style={{ cursor: topic ? "pointer" : "default" }}
              onClick={handleTopicClick}
            >
              {topic.text.length > 15
                ? topic.text.slice(0, 15) + "..."
                : topic.text}{" "}
              / {topic.category}
            </p>

            <AvatarCard user={postUser} />
          </div>

          <p className="post-card__text">{post.text}</p>

          <div className="post-card__footer">
            <span>👍 {post._count.likes}</span>
            <span>💬 {post._count.comments}</span>
            <span className="post-card__timestamp">
              {formatPostDate(post.createdAt)}
            </span>
          </div>
        </div>

        {post.image && (
          <div className="post-card__right">
            <img src={post.image} alt="Post visual" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;

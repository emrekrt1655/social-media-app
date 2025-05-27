import React from "react";
import { Post } from "../../lib/types/posts";
import "./PostCard.scss";
import { AuthUserData } from "../../lib/types/auth";
import { formatPostDate } from "../../utils/formatPostDate";
import { useNavigate } from "react-router";

type PostCardProps = {
  post: Post;
  postUser: AuthUserData;
};

const PostCard: React.FC<PostCardProps> = ({ post, postUser }) => {
  const navigate = useNavigate();
    const handleAvatarClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    navigate(`/profile/${postUser.userId}/${postUser.userName}`);
  };
  return (
    <div className="post-card" onClick={() => navigate(`/post/${post.postId}`)}>
      <div className="post-card__content">
        <div className="post-card__left">
          <div className="post-card__header">
            <p className="post-card__category">{post.category}</p>
            {postUser.avatar ? (
              <div
                className="post-card__avatar-wrapper"
                onClick={handleAvatarClick}
              >
                <img
                  src={postUser.avatar}
                  alt={`${postUser.name} avatar`}
                  className="post-card__avatar"
                />
                <span className="post-card__username-tooltip">
                  @{postUser.userName}
                </span>
              </div>
            ) : (
              <span>No Avatar</span>
            )}
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

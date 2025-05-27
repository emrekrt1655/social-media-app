import React from "react";
import { Post } from "../../lib/types/posts";
import "./PostCard.scss";

type PostCardProps = {
  post: Post;
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-card__content">
        <div className="post-card__left">
          <div className="post-card__header">
            <p className="post-card__category">{post.category}</p>
            {post.isElite === "true" && (
              <span className="post-card__elite">Elite</span>
            )}
          </div>
          <p className="post-card__text">{post.text}</p>

          <div className="post-card__footer">
            <span>👍 {post._count.likes}</span>
            <span>💬 {post._count.comments}</span>
            <span className="post-card__timestamp">
              {new Date(post.createdAt).toLocaleDateString()}
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

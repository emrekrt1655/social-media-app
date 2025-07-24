import React, { useState } from "react";
import { Post } from "../../lib/types/posts";
import "./PostCard.scss";
import { AuthUserData } from "../../lib/types/auth";
import { formatPostDate } from "../../utils/formatPostDate";
import { useNavigate } from "react-router";
import { Topic } from "../../lib/types/topics";
import AvatarCard from "../Avatar/AvatarCard";
import Modal from "../Modal/Modal";
import { PiThumbsUpDuotone, PiThumbsUpFill } from "react-icons/pi";
import { getUserFromStorage } from "../../utils/localStorage";
import { useLikes } from "../../lib/hooks/useLikes";
import { useAuth } from "../../lib/hooks/useAuth";

type PostCardProps = {
  post: Post;
  postUser: AuthUserData;
  topic: Topic;
};

const PostCard: React.FC<PostCardProps> = ({ post, postUser, topic }) => {
  const [isLikeModalOpen, setIsLikeModalOpen] = useState(false);
  const navigate = useNavigate();
  const authUser: AuthUserData = getUserFromStorage();
  const users = useAuth().users;

  const { postLikes } = useLikes().getAllPostLikes(post.postId);
  const likersIdList = postLikes.map((like) => like.likeUserId);
  const isPostLikedByAuthUser = likersIdList.includes(authUser.userId);
  const postLikers = likersIdList
    .map((id) => users?.find((user) => user.userId === id))
    .filter((user): user is AuthUserData => user !== undefined);

  const handleTopicClick = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (topic) {
      navigate(`/topic/${topic.topicId}`);
    }
  };

  return (
    <>
      <div
        className="post-card"
        onClick={() => navigate(`/post/${post.postId}`)}
      >
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
              <div className="like">
                {!isPostLikedByAuthUser ? (
                  <PiThumbsUpDuotone />
                ) : (
                  <PiThumbsUpFill />
                )}
                <span
                  className="like__likeCount"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLikeModalOpen(true);
                  }}
                >
                  {post._count.likes}{" "}
                </span>
              </div>

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
      {isLikeModalOpen && (
        <Modal title="Likers" onClose={() => setIsLikeModalOpen(false)}>
          <div className="liker-list">
            {postLikers.map((user) => (
              <div
                onClick={() => {
                  navigate(`/profile/${user.userId}/${user.userName}`);
                  setIsLikeModalOpen(false);
                }}
                key={user.userId}
                className="liker-list__item"
              >
                <span className="liker-list__name">
                  {user.name} {user.surname}
                </span>
                <img
                  src={user.avatar}
                  alt={`${user.name}'s avatar`}
                  className="liker-list__avatar"
                />
              </div>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};

export default PostCard;

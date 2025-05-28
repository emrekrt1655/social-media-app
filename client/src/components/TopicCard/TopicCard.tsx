import { AuthUserData } from "../../lib/types/auth";
import { Topic } from "../../lib/types/topics";
import "./TopicCard.scss";
import { useNavigate } from "react-router";

type TopicCardProps = {
  topic: Topic;
  topicUser: AuthUserData;
};

const TopicCard: React.FC<TopicCardProps> = ({ topic, topicUser }) => {
  const navigate = useNavigate();

  const handleAvatarClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    navigate(`/profile/${topicUser.userId}/${topicUser.userName}`);
  };

  const handleCardClick = () => {
    navigate(`/topic/${topic.topicId}`);
  };

  return (
    <div className="topic-card" onClick={handleCardClick}>
      <div className="topic-card__content">
        <div className="topic-card__left">
          <div className="topic-card__header">
            <p className="topic-card__title">{topic.text}</p>

            <div className="topic-card__avatar-wrapper" onClick={handleAvatarClick}>
              <img
                src={topicUser.avatar}
                alt={topicUser.name}
                className="topic-card__avatar"
              />
              <span className="topic-card__username-tooltip">
                @{topicUser.userName}
              </span>
            </div>
          </div>

          <p className="topic-card__meta">{topic.country}</p>
          <p className="topic-card__posts">{topic._count.posts} posts</p>
        </div>

        {topic.image && (
          <div className="topic-card__right">
            <img src={topic.image} alt={topic.text} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicCard;

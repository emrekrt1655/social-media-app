import React from "react";
import { AuthUserData } from "../../lib/types/auth";
import "./AvatarCard.scss";
import { useNavigate } from "react-router";

type AvatarCardProps = {
  user: AuthUserData;
};

const AvatarCard: React.FC<AvatarCardProps> = ({ user }) => {
  const navigate = useNavigate();
  const handleAvatarClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    navigate(`/profile/${user.userId}/${user.userName}`);
  };

  return user?.avatar ? (
    <div className="avatar-wrapper" onClick={handleAvatarClick}>
      <img
        src={user.avatar}
        alt={`${user.name} avatar`}
        className="avatar-wrapper__avatar"
      />
      <span className="avatar-wrapper__username-tooltip">@{user.userName}</span>
    </div>
  ) : (
    <span>No Avatar</span>
  );
};

export default AvatarCard;

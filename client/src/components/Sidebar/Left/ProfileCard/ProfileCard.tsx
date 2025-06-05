import { useAuth } from "../../../../lib/hooks/useAuth";
import { AuthUserData } from "../../../../lib/types/auth";
import { getUserFromStorage } from "../../../../utils/localStorage";
import { useParams } from "react-router";
import "./ProfileCard.scss"

const ProfileCard = () => {
  const { userId } = useParams<{ userId: string }>();
  const { users } = useAuth();

  const user: AuthUserData | undefined =
    userId && users ? users.find((u) => u.userId === userId) : getUserFromStorage();

  if (!user) {
    return <div className="profile-card__not-found">Kullanıcı bulunamadı.</div>;
  }

  return (
    <div className="profile-card">
      <div className="profile-card__avatar-wrapper">
        <img
          src={user.avatar || "https://via.placeholder.com/150"}
          alt={`${user.name} ${user.surname}`}
          className="profile-card__avatar"
        />
      </div>
      <div className="profile-card__info">
        <h2 className="profile-card__name">{user.name} {user.surname}</h2>
        <p className="profile-card__username">@{user.userName}</p>
        {user.bio && <p className="profile-card__bio">{user.bio}</p>}
      </div>
    </div>
  );
};

export default ProfileCard;

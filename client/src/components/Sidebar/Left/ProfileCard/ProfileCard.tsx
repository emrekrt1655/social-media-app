import { useState, useEffect } from "react";
import { useAuth } from "../../../../lib/hooks/useAuth";
import {
  AuthUserData,
  ExtendedUserWithFollowInfo,
} from "../../../../lib/types/auth";
import { getUserFromStorage } from "../../../../utils/localStorage";
import { useParams } from "react-router";
import "./ProfileCard.scss";
import { useFollowers } from "../../../../lib/hooks/useFollowers";
import Modal from "../../../Modal/Modal";
import UserList from "../../../UserList/UserList";
import { getExtendedUsers } from "../../../../utils/getExtendedUsers";

const ProfileCard = () => {
  const { userId } = useParams<{ userId: string }>();
  const { users } = useAuth();
  const { followers } = useFollowers();

  const [isFollowersModalOpen, setFollowersModalOpen] = useState(false);
  const [isFollowingsModalOpen, setFollowingsModalOpen] = useState(false);

  const user: AuthUserData | undefined =
    userId && users
      ? users.find((u) => u.userId === userId)
      : getUserFromStorage();

  if (!user) {
    return (
      <div className="profile-card__not-found">There is no such User!</div>
    );
  }

  const [authUser] = useState(() => getUserFromStorage()); // useMemo yerine useState

  const [authUserFollowings, setAuthUserFollowings] = useState<string[]>([]);

  useEffect(() => {
    const newFollowings = followers
      .filter((f) => f.followerId === authUser.userId)
      .map((f) => f.followedId);

    setAuthUserFollowings((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(newFollowings)) {
        return prev;
      }
      return newFollowings;
    });
  }, [followers, authUser.userId]);

  const userFollowers: ExtendedUserWithFollowInfo[] = getExtendedUsers(
    "followers",
    user.userId,
    followers,
    users || undefined
  );
  const userFollowings: ExtendedUserWithFollowInfo[] = getExtendedUsers(
    "followings",
    user.userId,
    followers,
    users || undefined
  );

  return (
    <>
      <div className="profile-card">
        <div className="profile-card__avatar-wrapper">
          <img
            src={user.avatar || "https://via.placeholder.com/150"}
            alt={`${user.name} ${user.surname}`}
            className="profile-card__avatar"
          />
        </div>
        <div className="profile-card__info">
          <h2 className="profile-card__name">
            {user.name} {user.surname}
          </h2>
          <p className="profile-card__username">@{user.userName}</p>
          {user.bio && <p className="profile-card__bio">{user.bio}</p>}

          <div className="profile-card__follow-stats">
            <div
              className="profile-card__follow-stats-item"
              onClick={() => setFollowersModalOpen(true)}
            >
              <span className="profile-card__follow-stats-count">
                {userFollowers.length}
              </span>
              <span className="profile-card__follow-stats-label">
                Followers
              </span>
            </div>
            <div
              className="profile-card__follow-stats-item"
              onClick={() => setFollowingsModalOpen(true)}
            >
              <span className="profile-card__follow-stats-count">
                {userFollowings.length}
              </span>
              <span className="profile-card__follow-stats-label">
                Following
              </span>
            </div>
          </div>
        </div>
      </div>
      {isFollowersModalOpen && (
        <Modal title="Followers" onClose={() => setFollowersModalOpen(false)}>
          <UserList
            userList={userFollowers}
            onclose={() => setFollowersModalOpen(false)}
            authUserFollowings={authUserFollowings}
          />
        </Modal>
      )}
      {isFollowingsModalOpen && (
        <Modal title="Followings" onClose={() => setFollowingsModalOpen(false)}>
          <UserList
            userList={userFollowings}
            onclose={() => setFollowingsModalOpen(false)}
            authUserFollowings={authUserFollowings}
          />
        </Modal>
      )}
    </>
  );
};

export default ProfileCard;

import React from "react";
import { AuthUserData, ExtendedUserWithFollowInfo } from "../../lib/types/auth";
import { useNavigate } from "react-router";
import "./UserList.scss";
import { useFollowersMutation } from "../../lib/hooks/useFollowers";
import { getUserFromStorage } from "../../utils/localStorage";

type UserListProps = {
  userList: ExtendedUserWithFollowInfo[] | AuthUserData[];
  onclose: () => void;
  authUserFollowings?: string[];
  likeModal?: boolean;
};

const UserList: React.FC<UserListProps> = ({
  userList,
  onclose,
  authUserFollowings = [],
  likeModal,
}) => {
  const navigate = useNavigate();
  const authUser: AuthUserData = getUserFromStorage();
  const { createFollower, deleteFollower } = useFollowersMutation();

  return (
    <div className="user-list">
      {userList.map((user, index) => {
        const isOwnProfile = authUser?.userId === user.userId;

        const isFollowing = authUserFollowings.includes(user.userId); // ✅ doğru kontrol

        const handleFollow = () => {
          if (authUser) {
            createFollower({
              followerId: authUser.userId,
              followedId: user.userId,
            });
          }
        };

        const handleUnfollow = () => {
          if ("folId" in user && user.folId) {
            deleteFollower(user.folId);
          }
        };

        return (
          <div
            key={user.userId ?? user.userName ?? index}
            className="user-list__item"
          >
            <div
              className="user-list__left"
              onClick={() => {
                navigate(`/profile/${user.userId}/${user.userName}`);
                onclose();
              }}
            >
              <img
                src={user.avatar || "https://via.placeholder.com/150"}
                alt={`${user.name}'s avatar`}
                className="user-list__avatar"
              />
              <span className="user-list__name">
                {user.name} {user.surname}
              </span>
            </div>

            {!isOwnProfile && !likeModal && (
              <button
                className={`user-list__button ${
                  isFollowing ? "unfollow" : "follow"
                }`}
                onClick={isFollowing ? handleUnfollow : handleFollow}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UserList;

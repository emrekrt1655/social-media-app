import React, { useEffect, useRef, useState } from "react";
import {
  useFollowers,
  useFollowersMutation,
} from "../../lib/hooks/useFollowers";
import { useAuth } from "../../lib/hooks/useAuth";
import { getUserFromStorage } from "../../utils/localStorage";
import { getAuthUserFollowings } from "../../utils/getAuthUserFollowings";
import { AuthUserData } from "../../lib/types/auth";
import { MdDeleteForever } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./WhoToFollow.scss";

const WhoToFollow: React.FC = () => {
  const { followers } = useFollowers();
  const { users } = useAuth();
  const { createFollower } = useFollowersMutation();

  const [authUser, setAuthUser] = useState<AuthUserData | null>(null);
  const [authUserFollowings, setAuthUserFollowings] = useState<string[]>([]);
  const [removedUsers, setRemovedUsers] = useState<string[]>([]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedUser = getUserFromStorage();
    if (storedUser) {
      setAuthUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (!authUser) return;

    const newFollowings = getAuthUserFollowings(followers, authUser.userId);
    setAuthUserFollowings((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(newFollowings)) {
        return prev;
      }
      return newFollowings;
    });
  }, [followers, authUser]);

  if (!authUser) return null;

  const whoToFollowList = users?.filter(
    (user) =>
      user.userId !== authUser.userId &&
      !authUserFollowings.includes(user.userId) &&
      !removedUsers.includes(user.userId)
  );

  const handleFollow = (userId: string) => {
    createFollower({
      followerId: authUser.userId,
      followedId: userId,
    });
  };

  const handleRemoveUser = (userId: string) => {
    setRemovedUsers((prev) => [...prev, userId]);
  };

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 130;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="who-to-follow">
      <div className="who-to-follow__title">Who to follow</div>

      <div className="who-to-follow__carousel-container">
        {whoToFollowList && whoToFollowList.length > 2 && (
          <FaChevronLeft
            className="who-to-follow__arrow left"
            onClick={() => handleScroll("left")}
          />
        )}

        <div
          className={`who-to-follow__carousel ${
            whoToFollowList && whoToFollowList.length <= 2 ? "centered" : ""
          }`}
          ref={scrollRef}
        >
          {whoToFollowList?.length === 0 && <p>No suggestions right now.</p>}
          {whoToFollowList?.map((user) => (
            <div className="who-to-follow__item" key={user.userId}>
              <MdDeleteForever
                className="who-to-follow__remove"
                onClick={() => handleRemoveUser(user.userId)}
              />
              <img
                className="who-to-follow__avatar"
                src={user.avatar || "https://via.placeholder.com/150"}
                alt={`${user.name} avatar`}
              />
              <div className="who-to-follow__name">
                {user.name} {user.surname}
              </div>
              <button
                className="who-to-follow__button follow"
                onClick={() => handleFollow(user.userId)}
              >
                Follow
              </button>
            </div>
          ))}
        </div>

        {whoToFollowList && whoToFollowList.length > 2 && (
          <FaChevronRight
            className="who-to-follow__arrow right"
            onClick={() => handleScroll("right")}
          />
        )}
      </div>
    </div>
  );
};

export default WhoToFollow;

import "./Main.scss";
import { usePostMutations, usePosts } from "../../lib/hooks/usePost";
import { Post, PostCreateData } from "../../lib/types/posts";
import { useState } from "react";
import PostCard from "../../components/PostCard/PostCard";
import { useAuth } from "../../lib/hooks/useAuth";
import { AuthUserData } from "../../lib/types/auth";
import { useTopics } from "../../lib/hooks/useTopics";
import { Topic } from "../../lib/types/topics";
import ToggleTabs from "../../components/ToggleTabs/ToggleTabs";
import { getUserFromStorage } from "../../utils/localStorage";
import { useFollowers } from "../../lib/hooks/useFollowers";
import Modal from "../../components/Modal/Modal";
import NewPostForm from "../../components/NewPostForm/NewPostForm";

const Main = () => {
  const { posts } = usePosts();
  const { users } = useAuth();
  const { topics } = useTopics();
  const authUser: AuthUserData = getUserFromStorage();
  const { followers } = useFollowers();
  const [isOpenNewPostModal, setIsOpenNewPostModal] = useState(false);
  const createPost = authUser
    ? usePostMutations(authUser.userId).createPost
    : null;
  const [formData, setFormData] = useState<PostCreateData | null>(null);

  const authUserFollowers =
    authUser &&
    followers
      .filter((follower) => follower.followerId === authUser.userId)
      .map((user) => user.followedId);

  const [activeTab, setActiveTab] = useState<"foryou" | "followings" | "all">(
    authUser ? "foryou" : "all"
  );

  const userMap =
    users?.reduce((acc, user) => {
      acc[user.userId] = user;
      return acc;
    }, {} as Record<string, AuthUserData>) || {};

  const topicMap =
    topics?.reduce((acc, topic) => {
      acc[topic.topicId] = topic;
      return acc;
    }, {} as Record<string, Topic>) || {};

  let postsList: Post[] = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  switch (activeTab) {
    case "all":
      postsList = [...postsList];
      break;
    case "followings":
      postsList = postsList.filter((post) =>
        authUserFollowers.includes(post.postUserId)
      );
      break;
    case "foryou":
      postsList = [...postsList];
      break;
    default:
      postsList = [...postsList];
      break;
  }

  return (
    <>
      <ToggleTabs
        options={
          authUser
            ? [
                { label: "For You", value: "foryou" },
                { label: "Followings", value: "followings" },
              ]
            : [{ label: "All Posts", value: "all" }]
        }
        active={activeTab}
        onChange={(val) => setActiveTab(val)}
      />

      {postsList.map((post: Post) => (
        <PostCard
          key={post.postId}
          post={post}
          postUser={userMap[post.postUserId]}
          topic={topicMap[post.postTopicId]}
        />
      ))}
      {authUser && (
        <button
          className="newPost-button"
          onClick={() => setIsOpenNewPostModal(true)}
        >
          {" "}
          Add Something...{" "}
        </button>
      )}
      {isOpenNewPostModal && (
        <Modal
          title="Add new Something"
          onClose={() => setIsOpenNewPostModal(false)}
          onSubmit={() => {
            if (formData && createPost) {
              createPost(formData, {
                onSuccess: () => {
                  setIsOpenNewPostModal(false);
                },
              });
            }
          }}
        >
          <NewPostForm
            topics={topics}
            authUser={authUser}
            onChange={(data) => {
              setFormData(data);
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default Main;

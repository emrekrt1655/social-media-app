import { useEffect, useMemo, useState } from "react";
import { usePostMutations, usePosts } from "../../lib/hooks/usePost";
import { Post, PostCreateData } from "../../lib/types/posts";
import PostCard from "../../components/PostCard/PostCard";
import { useAuth } from "../../lib/hooks/useAuth";
import { useTopics } from "../../lib/hooks/useTopics";
import { useFollowers } from "../../lib/hooks/useFollowers";
import { AuthUserData } from "../../lib/types/auth";
import { Topic } from "../../lib/types/topics";
import ToggleTabs from "../../components/ToggleTabs/ToggleTabs";
import Modal from "../../components/Modal/Modal";
import NewPostForm from "../../components/NewPostForm/NewPostForm";
import { getUserFromStorage } from "../../utils/localStorage";
import { getForYouPosts } from "../../utils/getForYouPosts";
import "./Main.scss";

const Main = () => {
  const [formData, setFormData] = useState<PostCreateData | null>(null);
  const { posts } = usePosts();
  const { users } = useAuth();
  const { topics } = useTopics();
  const { followers } = useFollowers();
  const authUser: AuthUserData = getUserFromStorage();
  const [isOpenNewPostModal, setIsOpenNewPostModal] = useState(false);
  const postMutations = usePostMutations(authUser?.userId ?? "");
  const createPost = authUser ? postMutations.createPost : null;

  const memoizedForYouData = useMemo(() => {
    if (!authUser || !posts || !followers) {
      return { forYouPosts: [], directFollowings: [] };
    }

    return getForYouPosts({ posts, authUser, followers });
  }, [posts, authUser, followers]);

  const { forYouPosts, directFollowings } = memoizedForYouData;

  let postsList: Post[] = posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

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

  switch (activeTab) {
    case "all":
      postsList = [...postsList];
      break;
    case "followings":
      postsList = [...directFollowings];
      break;
    case "foryou":
      postsList = [...forYouPosts];
      break;
    default:
      postsList = [...postsList];
      break;
  }

  useEffect(() => {
    if (!authUser) {
      setActiveTab("all");
    }
  }, [authUser]);
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

import "./Main.scss";
import { usePosts } from "../../lib/hooks/usePost";
import { Post } from "../../lib/types/posts";
import { useState } from "react";

const Main = () => {
  const { posts } = usePosts();
  const [activeTab, setActiveTab] = useState<"foryou" | "followings">("foryou");

  return (
<>
      <div className="main-toggle">
        <button
          className={`toggle-btn ${activeTab === "foryou" ? "active" : ""}`}
          onClick={() => setActiveTab("foryou")}
        >
          For You
        </button>
        <button
          className={`toggle-btn ${activeTab === "followings" ? "active" : ""}`}
          onClick={() => setActiveTab("followings")}
        >
          Followings
        </button>
      </div>

      <ul className="post-list">
        {posts.map((post: Post) => (
          <li key={post.postId} className="post-item">
            {post.text}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Main;

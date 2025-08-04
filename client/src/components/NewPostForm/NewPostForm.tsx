import { useState, useEffect } from "react";
import { Topic } from "../../lib/types/topics";
import { AuthUserData } from "../../lib/types/auth";
import { PostCreateData } from "../../lib/types/posts";
import "./NewPostForm.scss";

type NewPostFormProps = {
  topics: Topic[];
  authUser: AuthUserData;
  onChange: (data: PostCreateData) => void;
};

const NewPostForm = ({ topics, authUser, onChange }: NewPostFormProps) => {
  const [text, setText] = useState("");
  const [postTopicId, setPostTopicId] = useState(topics[0]?.topicId || "");
  const [image, setImage] = useState("");

  useEffect(() => {
    onChange({
      text,
      postUserId: authUser.userId,
      postTopicId,
      image,
    });
  }, [text, postTopicId, image]);

  return (
    <div className="createPost-form">
      <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />

      <select
        className="custom-select"
        value={postTopicId}
        onChange={(e) => setPostTopicId(e.target.value)}
        required
      >
        {topics.map((topic) => (
          <option key={topic.topicId} value={topic.topicId}>
            {topic.text}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
    </div>
  );
};

export default NewPostForm;

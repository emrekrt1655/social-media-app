import { useState } from "react";
import { useCommentMutations } from "../../lib/hooks/useComments";
import "./NewComment.scss";

type NewCommentProps = {
  postId: string;
  authUserId: string;
};

const NewComment: React.FC<NewCommentProps> = ({ postId, authUserId }) => {
  const { createComment } = useCommentMutations(postId);
  const [text, setText] = useState("");
  const isTextTyped = text.trim().length === 0;

  const handleSubmit = () => {
    if (isTextTyped) return;

    createComment({
      text,
      commentPostId: postId,
      commentUserId: authUserId,
    });

    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form className="new-comment" onSubmit={(e) => e.preventDefault()}>
      <div className="new-comment__input-wrapper">
        <textarea
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="new-comment__input"
          rows={3}
        />
        <button
          disabled={isTextTyped}
          type="button"
          onClick={handleSubmit}
          className="new-comment__button"
        >
          +
        </button>
      </div>
    </form>
  );
};

export default NewComment;

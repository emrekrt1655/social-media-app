import React from "react";
import { useComments } from "../../lib/hooks/useComments";
import { Comment } from "../../lib/types/comment";
import "./CommentBox.scss";
import AvatarCard from "../Avatar/AvatarCard";
import { useAuth } from "../../lib/hooks/useAuth";
import { AuthUserData } from "../../lib/types/auth";

type CommentBoxProps = {
  postId: string;
};

const CommentBox: React.FC<CommentBoxProps> = ({ postId }) => {
  const { comments } = useComments(postId);
  const { users } = useAuth();

  return (
    <div className="commentBox">
      <ul>
        {comments.map((comment: Comment) => {
          const commentUser = users?.find(
            (u: AuthUserData) => u.userId === comment.commentUserId
          );

          if (!commentUser) return null;

          return (
            <li key={comment.commentId} className="commentBox__item">
              <AvatarCard user={commentUser} />
              <div className="commentBox__content">
                <span className="commentBox__author">
                  {commentUser.name} {commentUser.surname}
                </span>
                <p className="commentBox__text">{comment.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CommentBox;

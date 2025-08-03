import React, { useState } from "react";
import { useCommentMutations, useComments } from "../../lib/hooks/useComments";
import { Comment } from "../../lib/types/comment";
import "./CommentBox.scss";
import AvatarCard from "../Avatar/AvatarCard";
import { useAuth } from "../../lib/hooks/useAuth";
import { AuthUserData } from "../../lib/types/auth";
import NewComment from "./NewComment";
import { getUserFromStorage } from "../../utils/localStorage";
import { formatPostDate } from "../../utils/formatPostDate";
import { FaCommentMedical } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router";

type CommentBoxProps = {
  postId: string;
  detailed?: boolean;
};

const CommentBox: React.FC<CommentBoxProps> = ({ postId, detailed }) => {
  const [openNewComment, setOpenNewComment] = useState(detailed);
  const { comments } = useComments(postId);
  const { deleteComment } = useCommentMutations(postId);
  const { users } = useAuth();
  const authUser: AuthUserData = getUserFromStorage();
  const navigate = useNavigate();

  const sortedComments: Comment[] = [...comments].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });

  const commentsList = !detailed ? sortedComments.slice(0, 2) : sortedComments;

  return (
    <div className="commentBox" onClick={(e) => e.stopPropagation()}>
      {!detailed && (
        <span onClick={() => setOpenNewComment(!openNewComment)}>
          <FaCommentMedical />
        </span>
      )}

      {openNewComment && authUser && (
        <NewComment postId={postId} authUserId={authUser.userId} />
      )}

      <ul>
        {commentsList.map((comment: Comment) => {
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
                <p className="commentBox__date">
                  {formatPostDate(comment.createdAt as string)}
                </p>
                {authUser &&  authUser.userId === commentUser.userId && (
                  <MdDeleteForever
                    onClick={() => deleteComment(comment.commentId as string)}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {!detailed && comments.length >= 3 && (
        <p
          onClick={() => navigate(`/post/${postId}`)}
          style={{ width: "100%", textAlign: "center" }}
        >
          {" "}
          More...{" "}
        </p>
      )}
    </div>
  );
};

export default CommentBox;

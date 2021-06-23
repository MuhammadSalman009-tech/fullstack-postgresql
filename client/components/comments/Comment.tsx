import React from "react";
import { CommentType } from "../../types/comments";
import { User } from "../../types/user";
import Delete from "./Delete";
interface CommentProps {
  comment: CommentType;
  fetchComments(): void;
  user: User;
}

function Comment({ comment, fetchComments, user }: CommentProps) {
  return (
    <div className="comment" key={comment.id}>
      <h6>
        {comment.name}{" "}
        {user?.userID === comment.user_id ? (
          <Delete commentId={comment.id} getComments={fetchComments} />
        ) : (
          <div></div>
        )}
      </h6>
      <p>{comment.description}</p>
      <p>{comment.created_at}</p>
    </div>
  );
}

export default Comment;

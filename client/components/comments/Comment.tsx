import React from "react";
import { CommentType } from "../../types/comments";
interface CommentProps {
  comment: CommentType;
}

function Comment({ comment }: CommentProps) {
  return (
    <div className="comment" key={comment.id}>
      <h6>{comment.name}</h6>
      <p>{comment.description}</p>
      <p>{comment.created_at}</p>
    </div>
  );
}

export default Comment;

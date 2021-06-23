import axios from "axios";
import React from "react";
import { baseURL } from "../../types/urls";
import { User } from "../../types/user";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { IconButton } from "@material-ui/core";
interface LikePostProps {
  user: User;
  commentId: string;
  fetchComments(): void;
}
function Like({ user, fetchComments, commentId }: LikePostProps) {
  // like/unlike a Comment
  const likeComment = async (commentId: string) => {
    if (user) {
      try {
        const { data } = await axios.post(
          `${baseURL}/api/posts/comment/like`,
          {
            comment_id: commentId,
          },
          { withCredentials: true }
        );
        fetchComments();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("please login before like");
    }
  };
  return (
    <IconButton
      onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        likeComment(commentId)
      }
    >
      <ThumbUpAltIcon />
    </IconButton>
  );
}

export default Like;

import axios from "axios";
import React from "react";
import { baseURL } from "../../types/urls";
import { User } from "../../types/user";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { IconButton } from "@material-ui/core";
interface LikePostProps {
  user: User;
  postId: string;
  fetchPosts(): void;
}
function LikePost({ user, fetchPosts, postId }: LikePostProps) {
  // like/unlike a post
  const likePost = async (postId: string) => {
    if (user) {
      try {
        const { data } = await axios.post(
          `${baseURL}/api/posts/like`,
          {
            post_id: postId,
          },
          { withCredentials: true }
        );
        fetchPosts();
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
        likePost(postId)
      }
    >
      <ThumbUpAltIcon />
    </IconButton>
  );
}

export default LikePost;

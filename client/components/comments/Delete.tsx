import axios from "axios";
import React from "react";
import { baseURL } from "../../types/urls";
interface DeleteProps {
  commentId: string;
  getComments(): void;
}
function Delete({ commentId, getComments }: DeleteProps) {
  const deletePost = async () => {
    console.log(commentId);

    try {
      const deletedComment = await axios.delete(
        `${baseURL}/api/posts/comment/${commentId}`,
        {
          withCredentials: true,
        }
      );
      console.log(deletedComment);
      getComments();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button className="btn btn-danger btn-sm" onClick={deletePost}>
        Delete
      </button>
    </div>
  );
}

export default Delete;

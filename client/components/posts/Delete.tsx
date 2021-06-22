import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import { baseURL } from "../../types/urls";
interface DeleteProps {
  postId: string;
  getPosts(): void;
}
function Delete({ postId, getPosts }: DeleteProps) {
  const router = useRouter();
  const deletePost = async () => {
    try {
      const deletedPost = await axios.delete(`${baseURL}/api/posts/${postId}`, {
        withCredentials: true,
      });
      console.log(deletedPost);
      getPosts();
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

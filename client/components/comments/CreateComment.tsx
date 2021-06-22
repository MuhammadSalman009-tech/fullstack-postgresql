import axios from "axios";
import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { baseURL } from "../../types/urls";
interface CommentFormInputs {
  comment: string;
  post_id: string;
}
interface CreateCommentProps {
  postId: string;
  getComments(postId: string): void;
}
function CreateComment({ postId, getComments }: CreateCommentProps) {
  //create comment
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const postComment: SubmitHandler<CommentFormInputs> = async (commentData) => {
    console.log(commentData);
    try {
      const { data } = await axios.post(
        `${baseURL}/api/posts/comment`,
        {
          post_id: commentData.post_id,
          description: commentData.comment,
        },
        { withCredentials: true }
      );
      getComments(postId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit(postComment)}>
        <input
          type="text"
          {...register("comment", { required: true })}
          className="form-control"
          placeholder="Write a comment..."
        />
        <input
          type="text"
          {...register("post_id", { required: true })}
          value={postId}
          hidden
        />
        <button className="btn btn-primary btn-sm">Comment</button>
      </form>
    </div>
  );
}

export default CreateComment;

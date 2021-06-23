import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../types/urls";
import { User } from "../../types/user";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
interface CommentListProps {
  postId: string;
  show: string;
  user: User;
}

function CommentList({ postId, show, user }: CommentListProps) {
  const [comments, setComments] = useState([]);
  //fetch comments
  useEffect(() => {
    fetchComments(postId);
  }, []);
  const fetchComments = async (postId: string) => {
    try {
      const { data } = await axios.post(
        `${baseURL}/api/posts/comment/all`,
        {
          post_id: postId,
        },
        { withCredentials: true }
      );
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };
  return show === postId ? (
    <div>
      <CreateComment
        postId={postId}
        getComments={() => fetchComments(postId)}
      />
      {comments?.map((item) => (
        <Comment
          comment={item}
          key={item.id}
          fetchComments={() => fetchComments(postId)}
          user={user}
        />
      ))}
    </div>
  ) : (
    <div></div>
  );
}

export default CommentList;

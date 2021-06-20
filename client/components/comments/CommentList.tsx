import axios from "axios";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
interface CommentListProps {
  postId: string;
}

function CommentList({ postId }: CommentListProps) {
  const [comments, setComments] = useState([]);
  //fetch comments
  useEffect(() => {
    fetchComments(postId);
  }, []);
  const fetchComments = async (postId: string) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/posts/comment/all",
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
  return (
    <div>
      <CreateComment
        postId={postId}
        getComments={() => fetchComments(postId)}
      />
      {comments.map((item) => (
        <Comment comment={item} key={item.id} />
      ))}
    </div>
  );
}

export default CommentList;

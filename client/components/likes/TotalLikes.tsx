import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

interface TotalLikesProps {
  postId: string;
}
function TotalLikes({ postId }: TotalLikesProps) {
  const [likes, setLikes] = useState(0);
  useEffect(() => {
    getTotalLikes(postId);
  }, []);
  const getTotalLikes = async (postId: string) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/posts/like/all",
        {
          post_id: postId,
        },
        { withCredentials: true }
      );
      setLikes(data.likes);
    } catch (error) {
      console.log(error);
    }
  };
  return <span>{likes}</span>;
}

export default TotalLikes;

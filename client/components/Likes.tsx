import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { baseURL } from "../types/urls";
interface LikesProps {
  postId: string;
}
interface data {
  likes: number;
}
function Likes({ postId }: LikesProps) {
  const getLikesOnPost = async (postId: string) => {
    console.log("get likes");
    try {
      const { data } = await axios.post<data>(
        `${baseURL}/api/posts/like/all`,
        {
          post_id: postId,
        },
        { withCredentials: true }
      );
      console.log(data.likes);
      return data.likes;
    } catch (error) {
      console.log(error);
    }
  };
  const [totalLikes, setTotalLikes] = useState(null);
  useEffect(() => {
    setTotalLikes(getLikesOnPost(postId));
  }, []);
  console.log(totalLikes);
  return <div></div>;
}

export default Likes;

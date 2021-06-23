import React, { useState } from "react";
import { Post } from "../../types/postTypes";
import { baseURL } from "../../types/urls";
import { IconButton } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import { User } from "../../types/user";
import Delete from "./Delete";
import CommentList from "../comments/CommentList";
import LikePost from "./LikePost";
interface PostProps {
  post: Post;
  user: User;
  fetchPosts(): void;
}
function PostCard({ post, user, fetchPosts }: PostProps) {
  const [hide, setHide] = useState(true);
  const [show, setShow] = useState("");

  return (
    <div className="card mt-4" style={{ width: "550px" }} key={post.id}>
      <div className="card-header">
        <span>
          <strong>{post.name}</strong>
        </span>
        <span>{post.created_at.split("T")[0]}</span>
      </div>
      <img
        className="card-img-top"
        src={`${baseURL}/${post.image}`}
        alt={post.title}
      />
      <div className="card-body">
        <h5 className="card-title">
          <strong>{post.title}</strong>
        </h5>
        <p className="card-text">{post.description}</p>

        <div>
          <strong>Likes:</strong>
          {post.likes}
        </div>
        <div className="delete-section">
          <div>
            <LikePost user={user} postId={post.id} fetchPosts={fetchPosts} />
            <IconButton
              onClick={() => {
                setHide(!hide);
                if (show !== post.id) {
                  setShow(post.id);
                } else {
                  setHide(true);
                }
              }}
            >
              <CommentIcon />
            </IconButton>
          </div>

          {user?.userID === post.user_id ? (
            <Delete getPosts={fetchPosts} postId={post.id} />
          ) : (
            <div></div>
          )}
        </div>
        <div>
          {hide ? (
            <div></div>
          ) : (
            <CommentList postId={post.id} show={show} user={user} />
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;

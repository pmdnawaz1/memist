import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [showComment, setShowComment] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const handleComment = () => {
    setShowComment(!showComment);
  };

  const handleVideoClick = () => {
    setShowVideo(!showVideo);
  };

  return (
    <div className="Post">
      {data.image && (
        <img
          src={process.env.REACT_APP_PUBLIC_FOLDER + data.image}
          alt=""
        />
      )}

      {data.video && !showVideo && (
        <div className="videoThumbnail" onClick={handleVideoClick}>
          <img src={process.env.REACT_APP_PUBLIC_FOLDER + data.video} alt="" />
          <div className="playButton"></div>
        </div>
      )}

      {data.video && showVideo && (
        <video controls onClick={handleVideoClick}>
          <source
            src={process.env.REACT_APP_PUBLIC_FOLDER + data.video}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )}

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />

        <img src={Comment} alt="" onClick={handleComment} />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      {showComment && <input type="text" placeholder="Add a comment" />}

      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
    </div>
  );
};

export default Post;

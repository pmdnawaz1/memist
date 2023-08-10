import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost, addCommentToPost } from "../../api/PostsRequests"; // Update the import
import { useSelector } from "react-redux";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [showComment, setShowComment] = useState(false);
  const [newComment, setNewComment] = useState(""); // State for the new comment

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  console.log(data._id, user._id,"meeeee")

  const handleComment = () => {
    setShowComment(!showComment);
  };

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      try {
        // Call the API function to add a comment
        await addCommentToPost(data._id, user._id, newComment);

        // Clear the newComment state and hide the comment input
        setNewComment("");
        setShowComment(false);

        // Optionally, you can fetch updated post data here
        // For example: fetchUpdatedPostData(data._id);
      } catch (error) {
        console.error("Error adding comment:", error);
        // Handle error cases if needed
      }
    }
  };

  return (
    <div className="Post">
      {data.image && (
        <img
          src={process.env.REACT_APP_PUBLIC_FOLDER + data.image}
          alt=""
        />
      )}

      {/* ... (rest of your code) ... */}

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

      {/* Render comment input */}
      {showComment && (
        <div>
          <input
            type="text"
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Post</button>
        </div>
      )}

      {console.log(newComment)}

      {/* Render comments */}
      {data.comments.map((comment, index) => (
        <div key={index} className="comment">
          <span>
            <b>{comment.user}</b>: {comment.text}
          </span>
        </div>
      ))}

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

import React from "react";
import "./ProfileCard.css";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";

import {  getAllFollowing, getAllFollowers } from "../../api/UserRequests";
const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  useEffect(() => {
    const fetchFollowersCount = async () => {
      const followersResponse = await getAllFollowers(user._id);
      const followersData = followersResponse.length;
      setFollowersCount(followersData);
    };

    const fetchFollowingCount = async () => {
      const followingResponse = await getAllFollowing(user._id);
      const followingData = await followingResponse.json();
      setFollowingCount(followingData.count);
    };

    fetchFollowersCount();
    fetchFollowingCount();
  }, [user._id]);

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          className="size"
          src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + "defaultCover.jpg"
          }
          alt="CoverImage"
        />
        <img
          className="size1"
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>
          {user.firstname} {user.lastname}
        </span>
        <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
        <div className="follow">
            <a href="/following">
              <span>{followersCount}</span>
              <span>Followers</span>
            </a>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <a href="/following">
              <span>{followingCount}</span>
              <span>Following</span>
            </a>
          </div>
          {/* for profilepage */}
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            to={`/profile/${user._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;

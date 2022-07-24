import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import UserTabs from "../UserPage/UserTabs/index";
import * as postServices from "../../services/PostService";
import * as userServices from "../../services/UserService";
import { setUserPosts } from "../../redux/Post/PostSlice";
import { setUserById } from "../../redux/User/UserSlice";
import { setFollowing, setFollowers } from "../../redux/Follow/FollowSlice";
import "../UserPage/index.css";
import { AiOutlinePlus } from "react-icons/ai";
import * as followServices from "../../services/FollowService";

const Index = () => {
  const user = useSelector((state) => state.user.userById);
  const currentUser = useSelector((state) => state.user.currentUser);
  const following = useSelector((state) => state.follow.following);
  const followers = useSelector((state) => state.follow.followers);
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    (async function () {
      const user = await userServices.getUserByIdService(userId);
      const userPosts = await postServices.getUserPostsService(user);
      const following = await followServices.getSubscribesService(user);
      const followers = await followServices.getFollowersService(user);
      dispatch(setUserById(user));
      dispatch(setUserPosts(userPosts));
      dispatch(setFollowers(followers));
      dispatch(setFollowing(following));
    })();
  }, [userId, dispatch]);



  const handleFollow = async (id) => {
    const data = await followServices.followService(id);
    const user = await userServices.getUserByIdService(id);
    const following = await followServices.getSubscribesService(user);
    dispatch(setFollowing(following));
  };

  const handleUnfollow = async (id) => {
    const data = await followServices.unFollowService(id);
    const user = await userServices.getUserByIdService(id);
    const following = await followServices.getSubscribesService(user);
    dispatch(setFollowing(following));
  };

  const handleProfileChange = async (name, value) => {
    const formData = new FormData();
    Array.from(value).forEach((ImageFile) =>
      formData.append("ImageFile", ImageFile)
    );
    await userServices.profilePicService(formData);
    const userById = await userServices.getUserByIdService(userId);
    dispatch(setUserById(userById));
  };
  const handleCoverChange = async (name, value) => {
  
    const formData = new FormData();
    Array.from(value).forEach((CoverPicFile) =>
      formData.append("CoverPicFile", CoverPicFile)
    );
    await userServices.coverPicService(formData);
    const userById = await userServices.getUserByIdService(userId);
    dispatch(setUserById(userById));
  };

  return (
    <Layout>
      <div className="container">
        <div className="row align-items-center justify-content-center text-center">
          <div className="col-12">
            <div className="m-3">
              <div className="user-profile">
                <div className="profile-banner">
                  {user?.coverPicUrl === null ? (
                    <img
                      src={require("../../helpers/images/cover.png")}
                      alt="cover-img"
                      className="w-100 h-100"
                    />
                  ) : (
                    <img
                      src={"http://localhost:39524/" + user?.coverPicUrl}
                      alt="cover-img"
                      className="w-100 h-100"
                    />
                  )}
                  {
                    user.id===currentUser.id &&(
                      <div className="cover-upload">
                      <label htmlFor="cover-photo">
                        <div className="user-profile-upload">
                          <AiOutlinePlus />
                        </div>
                      </label>
                      <input
                        type="file"
                        accept="images/*"
                        id="cover-photo"
                        className="custom-file-upload d-none"
                        name="CoverPicFile"
                        onChange={(e) =>
                          handleCoverChange("CoverPicFile", e.target.files)
                        }
                      />
                    </div>

                    )
                  }

                 
                </div>
                <div className="profile-content align-items-center justify-content-center">
                  <div className="avatar-parent">
                    <div className="profile-avatar">
                      {user?.imageUrl === null ? (
                        <img
                          src={require("../../helpers/images/avatar.jpg")}
                          alt="user-img"
                        />
                      ) : (
                        <img
                          src={"http://localhost:39524/" + user?.imageUrl}
                          alt="user-img"
                        />
                      )}
                    </div>
                    {
                      user.id===currentUser.id &&(
                        <div className="profile-upload">
                        <label htmlFor="profile-photo">
                          <div className="user-profile-upload">
                            <AiOutlinePlus />
                          </div>
                        </label>
                        <input
                          type="file"
                          accept="images/*"
                          id="profile-photo"
                          className="custom-file-upload d-none"
                          name="ImageFile"
                          onChange={(e) => {
                            e.stopPropagation();
                            handleProfileChange("ImageFile", e.target.files);
                          }}
                        />
                      </div>
                        
                      )
                    }
                   
                  </div>
                  <div className="profile-info align-items-center justify-content-center">
                    {user?.fullName ? (
                      <h1 className="username text-capitalize">
                        {user.fullName}
                      </h1>
                    ) : null}
                    {user?.status ? (
                      <span className="text-capitalize">
                        Status | {user.status}
                      </span>
                    ) : null}
                  </div>
             
                  {user?.id !== currentUser?.id ? (
                    <div className="d-flex w-100 justify-content-center align-items-center mt-3">
                      <button className="btn btn-primary">Message</button>
                      {/* {Boolean(following.find((f) => f.id === user.id)) ?
                       (
                        <button
                          className="following-button btn btn-secondary"
                          onClick={(e) => {
                            handleUnfollow(user.id);
                            e.stopPropagation();
                          }}
                        >
                          Unfollow
                        </button>
                      ) : (
                        <button
                          className="follow-button"
                          onClick={(e) => {
                            handleFollow(user.id);
                            e.stopPropagation();
                          }}
                        >
                          Follow
                        </button>
                      )} */}
                    </div>
                  ) : null}
                </div>
              </div>
              <UserTabs />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import UserTabs from "../UserPage/UserTabs/index";
import * as postServices from "../../services/PostService";
import * as userServices from "../../services/UserService";
import { setUserPosts } from "../../redux/Post/PostSlice";
import { setUserById,setCurrentUser } from "../../redux/User/UserSlice";
import { setFollowing, setFollowers } from "../../redux/Follow/FollowSlice";
import "../UserPage/index.css";
import { AiOutlinePlus } from "react-icons/ai";
import * as followServices from "../../services/FollowService";
import * as chatServices from "../../services/ChatSevice";
import { setChatExists } from '../../redux/Chat/PrivateChatSlice';

const Index = ({joinRoom}) => {
  const user = useSelector((state) => state.user.userById);
  const currentUser = useSelector((state) => state.user.currentUser);
  const following = useSelector((state) => state.follow.following);
  const followers = useSelector((state) => state.follow.followers);
  const chatExists = useSelector((state) => state.privateChat.chatExists);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    (async function () {
      const user = await userServices.getUserByIdService(userId);
      const userPosts = await postServices.getUserPostsService(user);
      const following = await followServices.getSubscribesService(user);
      const followers = await followServices.getFollowersService(user);
      const doesntExist = await chatServices.ChatDoesntExist(user);
      dispatch(setChatExists(doesntExist));
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
    const currentUser = await userServices.getUserService();
    dispatch(setUserById(userById));
    dispatch(setCurrentUser(currentUser));
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

  const createMessage = async (e) => {
    e.preventDefault();
    const privateChat = {
      userOneId: user.id,
      userTwoId: currentUser.id
    }
    const resp = await chatServices.CreateChat(privateChat);
    const doesntExist = await chatServices.ChatDoesntExist(user)
    dispatch(setChatExists(doesntExist));
    joinRoom(currentUser.userName, resp.id.toString())
    navigate(`/messages?chat=${resp.id}`)
  }

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
                      {console.log(chatExists)}
                      {chatExists === true && (
                        <button className="btn btn-primary" onClick={createMessage}>Message</button>
                      )}
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

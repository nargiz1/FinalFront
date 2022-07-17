import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserPosts } from "../../../redux/Post/PostSlice";
import { setFollowers, setFollowing } from "../../../redux/Follow/FollowSlice";
import { setUserById } from "../../../redux/User/UserSlice";
import * as followServices from "../../../services/FollowService";
import * as postServices from "../../../services/PostService";
import * as userServices from "../../../services/UserService";
import Tabs from "../../../components/Tabs/Tabs";
import TabPanel from "../../../components/Tabs/TabPanel";
import CreatePost from "../../../components/CreatePost/CreatePost";
import Post from "../../../components/Post/Post";
import { AiFillHeart } from "react-icons/ai";
import { TbWorld } from "react-icons/tb";
import { MdOutlineWork } from "react-icons/md";
import { FaBirthdayCake, FaUniversity } from "react-icons/fa";

import "../../UserPage/index.css";
import { BsFillArrowDownCircleFill } from "react-icons/bs";

const Index = ({ user }) => {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [likeTest, setLikeTest] = useState(false);
  const userById = useSelector((state) => state.user.userById);
  const currentUser = useSelector((state) => state.user.currentUser);
  const userPostsData = useSelector((state) => state.post.userPosts);
  const followersData = useSelector((state) => state.follow.followers);
  const followingData = useSelector((state) => state.follow.following);
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 3,
  });
  console.log(pagination)

  const page_limit = 3;

  const fetchData = async () => {
    const user = await userServices.getUserByIdService(userId);
    const userPosts = await postServices.getUserPostsService(
      user,
      pagination.skip,
      pagination.limit
    );
    dispatch(setUserPosts(userPosts));
  };

  const handleShowMore = (e, _limit) => {
    e.preventDefault();
    setPagination({ ...pagination, limit: _limit });
  };

  useEffect(() => {
    fetchData();
  }, [pagination, dispatch]);

  let visitedPage = page_limit + pagination.limit;

  useEffect(() => {
    (async function () {
      const user = await userServices.getUserByIdService(userId);
      const following = await followServices.getSubscribesService(user);
      const followers = await followServices.getFollowersService(user);
      dispatch(setUserById(user));
      dispatch(setFollowers(followers));
      dispatch(setFollowing(following));
    })();
  }, [userId, dispatch]);

  useEffect(() => {
    (async function () {
      const user = await userServices.getUserByIdService(userId);
      const userPosts = await postServices.getUserPostsService(user);
      dispatch(setUserPosts(userPosts));
    })();
  }, [likeTest, dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const deleteFollower = async (e, id) => {
    e.preventDefault();
    await followServices.deleteFollowerService(id);
  };

  const unFollow = async (e, id) => {
    await followServices.unFollowService(id);
  };

  return (
    <>
      <div className="tabs-holder">
        <Tabs
          activeTab={value}
          handleTabChange={handleChange}
          tabs={[
            "Timeline",
            "Followers",
            "Following",
            "Photos",
            "Videos",
            "About",
          ]}
        ></Tabs>
      </div>
      <div className="container">
        <TabPanel value={value} index={0}>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6 col-md-8">
              <CreatePost />
              {userPostsData && userPostsData?.userPosts?.length > 0 ? (
                userPostsData?.userPosts?.map((item, index) => (
                  <Post
                    post={item}
                    key={index}
                    likeTest={likeTest}
                    setLikeTest={setLikeTest}
                  />

                ))
                

              ) : (
                <div className="mt-3">User doesn't have any post</div>
              )}
               {pagination.limit < userPostsData?.count ? (
                <div className="d-flex justify-content-center mb-3">
                  <div
                    onClick={(e) => handleShowMore(e, visitedPage)}
                    className="show-more"
                  >
                    <BsFillArrowDownCircleFill />
                  </div>
                </div>
              ) : null}
             
            </div>
            <div className="col-lg-4">
              <div className="about-list">
              <h3>About</h3>
              <ul className="about text-capitalize">
                {userById?.country !== null ? (
                  <li>
                    <i>
                      <TbWorld style={{ color: "#3B82F6" }} />
                    </i>
                    Country |
                    <span className="about-data">{userById.country}</span>
                  </li>
                ) : null}
                {userById?.birthDate !== null ? (
                  <li>
                    <i>
                      <FaBirthdayCake style={{ color: "#EC4899" }} />
                    </i>
                    birth date |
                    <span className="about-data">
                      <Moment format="DD/MM/YYYY">{userById.birthDate}</Moment>
                    </span>
                  </li>
                ) : null}
                {userById?.education !== null ? (
                  <li>
                    <i>
                      <FaUniversity style={{ color: "#10B981" }} />
                    </i>
                    education |
                    <span className="about-data">{userById.education}</span>
                  </li>
                ) : null}
                {userById?.occupation !== null ? (
                  <li>
                    <i>
                      <MdOutlineWork style={{ color: "#F59E0B" }} />
                    </i>
                    occupation |
                    <span className="about-data">{userById.occupation}</span>
                  </li>
                ) : null}
                {userById?.relationshipStatus !== null ? (
                  <li>
                    <i>
                      <AiFillHeart style={{ color: "#EF4444" }} />
                    </i>
                    Relationship Status |
                    <span className="about-data">
                      {userById.relationshipStatus}
                    </span>
                  </li>
                ) : null}
              </ul>
              {userById.id == currentUser.id ? (
                <Link to={`/setting`}>
                  <button className="edit-button w-100 mt-3">Edit</button>
                </Link>
              ) : null}

              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="row d-flex justify-content-center">
            <div className="col-md-8">
              <div className="user-friends">
                <div className="row">
                  {followersData && followersData.length > 0
                    ? followersData.map((follower, index) => (
                        <div key={index} className="col-md-3">
                          <Link
                            to={`/user/${follower.id}`}
                            className="text-decoration-none"
                          >
                            <div className="friend-card mb-3">
                              <div className="friend-card-img">
                                {follower?.imageUrl === null ? (
                                  <img
                                    src={require("../../../helpers/images/avatar.jpg")}
                                    className="w-100"
                                    alt="follower"
                                  />
                                ) : (
                                  <img
                                    src={
                                      "http://localhost:39524/" +
                                      follower?.imageUrl
                                    }
                                    className="w-100"
                                    alt="follower"
                                  />
                                )}
                              </div>
                              <div className="friend-card-info">
                                <div className="followers-name text-lowercase text-center">
                                  @{follower.userName}
                                </div>
                              </div>
                              <div>
                                <button
                                  type="submit"
                                  className="w-100 btn-following"
                                  onClick={(e) => {
                                    deleteFollower(e, follower.id);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))
                    : "Nobody follows you."}
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className="row d-flex justify-content-center">
            <div className="col-md-8">
              <div className="user-friends">
                <div className="row">
                  {followingData && followingData.length > 0
                    ? followingData.map((following, index) => (
                        <div key={index} className="col-md-3">
                          <Link
                            to={`/user/${following.id}`}
                            className="text-decoration-none"
                          >
                            <div className="friend-card mb-3">
                              <div className="friend-card-img">
                                {following?.imageUrl === null ? (
                                  <img
                                    src={require("../../../helpers/images/avatar.jpg")}
                                    className="w-100"
                                    alt="following"
                                  />
                                ) : (
                                  <img
                                    src={
                                      "http://localhost:39524/" +
                                      following?.imageUrl
                                    }
                                    className="w-100"
                                  />
                                )}
                              </div>
                              <div className="friend-card-info">
                                <div className="followers-name text-lowercase text-center">
                                  @{following.userName}
                                </div>
                              </div>
                              <div>
                                <button
                                  className="w-100 btn-following"
                                  onClick={(e) => {
                                    unFollow(e, following.id);
                                  }}
                                >
                                  Unfollow
                                </button>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))
                    : "You don't follow anybody."}
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div className="row d-flex justify-content-center">
            <div className="col-md-8">
              <div className="user-friends">
                <div className="row">
                  {userPostsData && userPostsData.length > 0
                    ? userPostsData.map((post) =>
                        post.images || post.images.length > 0
                          ? post.images.map((img, index) => (
                              <div className="col-md-4" key={index}>
                                <div className="friend-card mb-3">
                                  <div className="friend-card-img">
                                    <img
                                      src={
                                        "http://localhost:39524/" +
                                        img?.imageUrl
                                      }
                                      className="w-100 photos"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))
                          : "You don't have any photo"
                      )
                    : null}
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <div className="row d-flex justify-content-center">
            <div className="col-md-8">
              <div className="user-friends">
                <div className="row">
                  {userPostsData && userPostsData.length > 0
                    ? userPostsData.map((post) =>
                        post.videos || post.videos.length > 0
                          ? post.videos.map((video, index) => (
                              <div className="col-md-4" key={index}>
                                <div className="friend-card mb-3">
                                  <div className="friend-card-img">
                                    <video controls className="w-100">
                                      <source
                                        src={
                                          "http://localhost:39524/" +
                                          video.videoUrl
                                        }
                                        type="video/mp4"
                                      />
                                    </video>
                                  </div>
                                </div>
                              </div>
                            ))
                          : "You don't have any video"
                      )
                    : null}
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={5}>
          <div className="about-list mobile">
            <h3>About</h3>
            <ul className="about text-capitalize">
              <li>
                <i>
                  <TbWorld style={{ color: "#3B82F6" }} />
                </i>
                Country |<span className="about-data">{userById.country}</span>
              </li>
              <li>
                <i>
                  <FaBirthdayCake style={{ color: "#EC4899" }} />
                </i>
                birth date |
                <span className="about-data">
                  <Moment format="DD/MM/YYYY">{userById.birthDate}</Moment>
                </span>
              </li>
              <li>
                <i>
                  <FaUniversity style={{ color: "#10B981" }} />
                </i>
                education |
                <span className="about-data">{userById.education}</span>
              </li>
              <li>
                <i>
                  <MdOutlineWork style={{ color: "#F59E0B" }} />
                </i>
                occupation |
                <span className="about-data">{userById.occupation}</span>
              </li>
              <li>
                <i>
                  <AiFillHeart style={{ color: "#EF4444" }} />
                </i>
                Relationship Status |
                <span className="about-data">
                  {userById.relationshipStatus}
                </span>
              </li>
            </ul>
            <Link to={"/setting"}>
              <button className="btn btn-primary w-100 mt-3">Edit</button>
            </Link>
          </div>
        </TabPanel>
      </div>
    </>
  );
};

export default Index;

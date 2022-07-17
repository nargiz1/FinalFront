import React, { useEffect, useState } from "react";
import "./index.css";
import {
  BsFillArrowDownCircleFill,
  BsFillPlusCircleFill,
} from "react-icons/bs";
import { setUsers } from "../../../../redux/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { setFollowing } from "../../../../redux/Follow/FollowSlice";
import { Link } from "react-router-dom";
import * as followServices from "../../../../services/FollowService";
import * as userServices from "../../../../services/UserService";

export default function PagesTabs() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 4,
  });

  const page_limit = 4;

  const fetchData = async () => {
    const users = await userServices.getUsersService(
      pagination.skip,
      pagination.limit
    );
    dispatch(setUsers(users));
  };

  const handleShowMore = (e, _limit) => {
    e.preventDefault();
    setPagination({ ...pagination, limit: _limit });
  };

  useEffect(() => {
    fetchData();
  }, [pagination, dispatch]);

  let visitedPage = page_limit + pagination.limit;

  const currentUser = useSelector((state) => state.user.currentUser);
  const following = useSelector((state) => state.follow.following);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFollow = async (id) => {
    const data = await followServices.followService(id);
    const user = await userServices.getUserService();
    const following = await followServices.getSubscribesService(user);
    dispatch(setFollowing(following));
  };
  const handleUnfollow = async (id) => {
    const data = await followServices.unFollowService(id);
    const user = await userServices.getUserService();
    const following = await followServices.getSubscribesService(user);
    dispatch(setFollowing(following));
  };

  return (
    <>
      <div className="row align-items-center justify-content-center">
        {users
          ? users.users?.map((user, index) =>
              user.id !== currentUser.id ? (
                <div key={index} className="col-md-6 col-lg-4 mb-4">
                  <div className="pages-card">
                    <div className="pages-card-top">
                      {user?.imageUrl === "Resources\\Images\\" ? (
                        <img
                          src={require("../../../../helpers/images/avatar.jpg")}
                          className="w-100"
                        />
                      ) : (
                        <img
                          src={"http://localhost:39524/" + user?.imageUrl}
                          className="w-100"
                        />
                      )}
                    </div>
                    <div className="pages-card-body">
                      <h5 className="pages-card-title">{user.fullName}</h5>
                      <Link
                        to={`/user/${user.id}`}
                        key={index}
                        className="text-decoration-none"
                      >
                        <h5 className="pages-card-title text-lowercase">
                          @{user.userName}
                        </h5>
                      </Link>
                      <div className="d-flex justify-content-end">
                        {Boolean(following.find((f) => f.id === user.id)) ? (
                          <button
                            className="following-button"
                            onClick={(e) => {
                              handleUnfollow(user.id);
                              // e.stopPropagation();
                            }}
                          >
                            Following
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
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
            )
          : null}
        {pagination.limit < users.count ? (
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
    </>
  );
}

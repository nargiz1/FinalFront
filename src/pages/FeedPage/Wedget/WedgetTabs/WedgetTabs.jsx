import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userServices from "../../../../services/UserService";
import * as followServices from "../../../../services/FollowService";
import {
  setFollowers,
  setFollowing,
} from "../../../../redux/Follow/FollowSlice";
import "./WedgetTabs.css";
import Tabs from "../../../../components/Tabs/Tabs";
import TabPanel from "../../../../components/Tabs/TabPanel";
import { setCurrentUser } from "../../../../redux/User/UserSlice";
import { Link } from "react-router-dom";

export default function WedgetTabs() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const following = useSelector((state) => state.follow.following);
  const followers = useSelector((state) => state.follow.followers);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const currentUser = await userServices.getUserService();
      const following = await followServices.getSubscribesService(currentUser);
      const followers = await followServices.getFollowersService(currentUser);
      dispatch(setCurrentUser(currentUser));
      dispatch(setFollowers(followers));
      dispatch(setFollowing(following));
    })();
  }, [dispatch]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        activeTab={value}
        handleTabChange={handleChange}
        tabs={["Following", "Followers"]}
      >
        <TabPanel value={value} index={0}>
          {following && following.length > 0
            ? following.map((f, index) => (
              <Link to={`user/${f.id}`}  key={index} className="text-decoration-none text-black">
                <div
                  className="d-flex align-items-center mb-3 text-dark text-decoration-none"
                >
                  {
                    f.imageUrl===null?(
                        <div>
                    <img
                      className="profile-photo"
                      src={require("../../../../helpers/images/avatar.jpg")}
                      alt="profile-photo"
                    />
                  </div>

                    ):(
                      <div>
                      <img
                        className="profile-photo"
                        src={"http://localhost:39524/" + f?.imageUrl}
                        alt="profile-photo"
                      />
                    </div>
                    )
                  }
                  <div className="ms-2">@{f.userName}</div>
                </div></Link>
              ))
            : ("You don't follow anybody.")}
        </TabPanel>
        <TabPanel value={value} index={1}>
        {followers && followers.length > 0
            ? followers.map((f, index) => (
              <Link to={`user/${f.id}`} key={index} className="text-decoration-none text-black">
                <div
                  className="d-flex align-items-center mb-3 text-dark text-decoration-none"
                >
                  {
                    f.imageUrl===null?(
                        <div>
                    <img
                      className="profile-photo"
                      src={require("../../../../helpers/images/avatar.jpg")}
                      alt="profile-photo"
                    />
                  </div>

                    ):(
                      <div>
                      <img
                        className="profile-photo"
                        src={"http://localhost:39524/" + f?.imageUrl}
                        alt="profile-photo"
                      />
                    </div>
                    )
                  }
                
                  <div className="ms-2">@{f.userName}</div>
                </div>
              </Link>
              ))
            : ("Nobody follows you.")}
        </TabPanel>
      </Tabs>
    </>
  );
}

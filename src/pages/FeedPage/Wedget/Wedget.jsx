import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userServices from "../../../services/UserService";
import * as followServices from "../../../services/FollowService";
import {
  setFollowers,
  setFollowing,
} from "../../../redux/Follow/FollowSlice";
import { setCurrentUser } from "../../../redux/User/UserSlice";

import WedgetTabs from "./WedgetTabs/WedgetTabs";

function Wedget() {
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
  return (
    <div className="wedget position-fixed">
      <WedgetTabs />
    </div>
  );
}

export default Wedget;

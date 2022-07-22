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
 
  return (
    <div className="wedget position-fixed">
      <WedgetTabs />
    </div>
  );
}

export default Wedget;

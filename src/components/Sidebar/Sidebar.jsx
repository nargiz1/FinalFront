import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiMessageDetail} from "react-icons/bi";
import {IoLogOutOutline} from 'react-icons/io5'
import { CgProfile } from "react-icons/cg";
import { AiFillHome} from "react-icons/ai";
import { RiFlag2Fill,RiLockPasswordLine } from "react-icons/ri";
import * as authServices from "../../services/AuthService";

import { setLogin } from "../../redux/Auth/AuthSlice";
import "../Sidebar/Sidebar.css";
import SidebarRow from "./SidebarRow/SidebarRow";

function Sidebar({ isOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const logoutHandler = () => {
    authServices.LogoutService();
    sessionStorage.removeItem("token");
    dispatch(setLogin(null));
    window.location.reload();
    navigate("/");
    
  };

  return (
    <div
      className={`sidebar scroll-bar`}
      style={
        isOpen
          ? { width: "inherit" }
          : { maxWidth: "30%", backgroundColor: "white" }
      }
    >
      <div
      className={`border-end ps-2 pe-2`}
      
      >
      <div className="sidebar-top border-bottom pt-lg-3 pt-sm-0">
        <SidebarRow
          Icon={AiFillHome}
          title="Feed"
          color="#2563EB"
          isOpen={isOpen}
        />
        <SidebarRow
          Icon={RiFlag2Fill}
          title="Pages"
          link="pages"
          color="#F59E0B"
          isOpen={isOpen}
        />
          <SidebarRow
            Icon={BiMessageDetail}
            title="Messages"
            link="messages"
            color="#6366F1"
            isOpen={isOpen}
          />
        {/* <SidebarRow
          Icon={MdGroups}
          title="Groups"
          link="groups"
          color="#EF4444"
          isOpen={isOpen}
        /> */}

        {show ? (
          <>
          {/* <SidebarRow
            Icon={BsFillCameraVideoFill}
            title="Videos"
            link="videos"
            color="#3B82F6"
            isOpen={isOpen}
          /> */}
            {/* <SidebarRow
              Icon={HiPhotograph}
              title="Photos"
              link="photos"
              color="#EC4899"
              isOpen={isOpen}
            /> */}
            {/* <SidebarRow
              Icon={BsFillBagFill}
              title="Products"
              link="products"
              color="#10B981"
              isOpen={isOpen}
            /> */}
          </>
        ) : null}

        {/* {isOpen ? (
          <button
            className="more-less d-flex mb-2"
            onClick={() => setShow(!show)}
          >
            <div>
              <MdOutlineKeyboardArrowDown />
            </div>
            {show ? "See Less" : "See More"}
          </button>
        ) : null} */}
      </div>
      <div className="sidebar-middle border-bottom pt-3">
        {isOpen ? <h3 className="mb-3 ps-2">Contacts</h3> : null}

        <div className="contact-person">
          <a
            href="#"
            className="d-flex align-items-center text-dark text-decoration-none"
          >
            <div>
              <img
                className="profile-photo"
                src={require("../../helpers/images/avatar3.jpg")}
                alt="profile-photo"
              />
            </div>
            {isOpen ? <h4>Fidan Ganbarli</h4> : null}
          </a>
        </div>
      </div>
      <div className="sidebar-bottom border-bottom pt-3">
        {isOpen ? <h3 className="mb-3 ps-2">Pages</h3> : null}

        <div className="d-flex justify-content-between align-items-center pages-item">
          <Link to="/profile">
          <div
            className="d-flex align-items-center"
          >
            <CgProfile />
            {isOpen ? (
                <h4>Profile</h4>
                ) : null}
          </div>
                </Link>
        </div>
        <div className="d-flex justify-content-between align-items-center pages-item">
          <Link to="/privacy">
          <div
            className="d-flex align-items-center"
          >
            <RiLockPasswordLine />
            {isOpen ? (
                <h4>Privacy</h4>
                ) : null}
          </div>
                </Link>
        </div>
        <div className="d-flex justify-content-between align-items-center pages-item">
           <Link to="/login"> 
          <div
            onClick={(e) => logoutHandler()}
            className="d-flex align-items-center"
          >
            <IoLogOutOutline />
            {isOpen ? (
                <h4>Logout</h4>
                ) : null}
          </div>
                </Link> 
        </div>
      </div>
    </div>
    </div>
  );
}

export default Sidebar;

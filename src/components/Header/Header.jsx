import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { MdShoppingCart } from "react-icons/md";
import { RiNotification2Fill } from "react-icons/ri";
import { BiMessageDetail } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { setCurrentUser } from "../../redux/User/UserSlice";
import Logo from "../../helpers/images/logo.png";
import "../Header/Header.css";
import * as userServices from "../../services/UserService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Header({ isOpen, setIsOpen, showIcon = true, handleShow }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      const user = await userServices.getUserService();
      dispatch(setCurrentUser(user));
    })();
  }, [dispatch]);

  const currentUser = useSelector((state) => state.user.currentUser);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleModalShow = () => setShow(true);

  const [searchUser, setSearchUser] = useState("");
  const [userData, setUserData] = useState([]);
  const [showData, setShowData] = useState(false);

  const handleOpenSidebar = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await userServices.SearchUserService(searchUser);
    setUserData(resp);
    setShowData(true);
  };

  return (
    <>
      <nav className="header navbar navbar-expand-lg bg-white">
        <div className="container-fluid align-items-center">
          <a className="navbar-brand">
            <div className="header-left d-sm-none d-md-none d-lg-block icon-desktop">
              {showIcon && (
                <i className="header-bar">
                  <HiOutlineMenuAlt1 onClick={handleOpenSidebar} />
                </i>
              )}
              <img src={Logo} alt="Logo" />
            </div>

            <div
              className="header-left d-sm-block d-md-block d-lg-none"
              onClick={handleShow}
            >
              <i className="header-bar">
                <HiOutlineMenuAlt1 />
              </i>
              <img src={Logo} alt="Logo" />
            </div>
          </a>
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarSupportedContent"
          >
            <div className="d-flex w-100 justify-content-center">
              <div className="header-center position-relative ">
                <i className="position-absolute">
                  <BsSearch />
                </i>

                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Search for Friends..."
                    onChange={(e) => setSearchUser(e.target.value)}
                  />
                </form>
                {showData ? (
                  <div className="search-user-data mb-4">
                    {userData && userData.length > 0 ? (
                      userData.map((user, index) => (
                        <Link to={`/user/${user.id}`} key={index}>
                          <div key={index} className="search-user">
                            {user.fullName}
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div>User not found</div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="header-right d-flex">
              <a 
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/messages");
                }}
              >
                <BiMessageDetail />
              </a>
              <Link to={`/user/${currentUser.id}`}>
                <div>
                  <img
                    src={"http://localhost:39524/" + currentUser?.imageUrl}
                    alt="profile-photo"
                    className="post-profile"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;

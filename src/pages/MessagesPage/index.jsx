import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FiEdit, FiSend } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import Button from "react-bootstrap/Button";
import ModalBootstrapt from "react-bootstrap/Modal";
import Layout from "../../components/Layout";
import "./index.css";
import * as userServices from "../../services/UserService";
import { AiOutlinePlus, AiTwotoneEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdOutlineIosShare } from "react-icons/md";
import { Modal } from "@mui/material";
import { HiOutlinePhotograph } from "react-icons/hi";

const Index = () => {
  const data = useSelector((state) => state.user.currentUser);
  const [searchUser, setSearchUser] = useState("");
  const [userData, setUserData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [checked, setChecked] = React.useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await userServices.SearchUserService(searchUser);
    setUserData(resp);
    setShowData(true);
  };
  return (
    <Layout showIcon={false}>
      <div className="chat-content">
        <div className="row g-0">
          <div className="col-md-3">
            <div className="message-inbox border-end">
              <div className="chat d-flex justify-content-between border-bottom">
                <h3>Chats</h3>
                <>
                  <div onClick={handleShow}>
                    <FiEdit />
                  </div>
                  <ModalBootstrapt show={show} onHide={handleClose}>
                    <ModalBootstrapt.Header closeButton>
                      <ModalBootstrapt.Title>
                        Create Group
                      </ModalBootstrapt.Title>
                    </ModalBootstrapt.Header>
                    <ModalBootstrapt.Body>
                      <form>
                        <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <input
                            required
                            className="form-control w-100 shadow-none border-0"
                            type="text"
                            name="email"
                            placeholder="Group name..."
                            // onChange={(e) =>
                            //   handleChange(e.target.name, e.target.value)
                            // }
                          />
                        </div>
                        <div className="profile-upload me-3">
                          <label htmlFor="photo">
                            <div className="user-profile-upload">
                              <HiOutlinePhotograph className="text-danger" />
                            </div>
                          </label>
                          <input
                            type="file"
                            accept="images/*"
                            id="photo"
                            className="custom-file-upload d-none"
                            name="ImageFile"
                            // onChange={(e) =>{
                            //   e.stopPropagation();
                            //   handleProfileChange("ImageFile", e.target.files)
                            // }}
                          />
                        </div>

                        </div>
                   
                      </form>
                    </ModalBootstrapt.Body>
                    <ModalBootstrapt.Footer>
                      <Button variant="primary" onClick={handleClose}>
                        Create
                      </Button>
                    </ModalBootstrapt.Footer>
                  </ModalBootstrapt>
                </>
              </div>
              <div className="chat-wrapper">
                <div className="message-content">
                  <div className="d-flex align-items-center">
                    <div>
                      <a
                        href="#"
                        className="d-flex align-items-center mb-3 text-dark text-decoration-none"
                      >
                        <div>
                          <img
                            className="profile-photo"
                            src={require("../../helpers/images/avatar2.jpg")}
                            alt="profile-photo"
                          />
                        </div>
                      </a>
                    </div>
                    <div className="message-by ms-3">
                      <div className="message-by-headline position-relative">
                        <h5>Stella Johnson</h5>
                      </div>
                      <p>laoreet dolore magna aliquam erat...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="thread border-start">
              <div className="message-heading d-flex justify-content-between border-bottom">
                <h6 className="mb-0">Ayshan Gambarova</h6>
                <div className="d-flex">
                  <div
                    className="edit-messages messages-prop d-flex align-items-center"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                  >
                    <AiTwotoneEdit />
                    <span className="ms-1"></span>
                  </div>
                  <div
                    className="offcanvas offcanvas-end"
                    tabIndex="-1"
                    id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel"
                  >
                    <div className="offcanvas-header">
                      <h5
                        className="offcanvas-title"
                        id="offcanvasRightLabel"
                      ></h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="offcanvas-body">
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="message-canvas-photo">
                          <img
                            src={require("../../helpers/images/avatar.jpg")}
                            className="w-100"
                          />
                        </div>
                      </div>
                      <div className="text-center mt-2">
                        <div className="message-canvas-name">
                          Ayshan Gambarova
                        </div>
                        <div>Group 21 participants</div>
                        <div className="tabs">
                          <div className="tab-2">
                            <label htmlFor="tab2-1">Add</label>
                            <input
                              id="tab2-1"
                              name="tabs-two"
                              type="radio"
                              defaultChecked={checked}
                              onChange={() => setChecked(!checked)}
                            />
                            <div>
                              <form onSubmit={handleSubmit}>
                                <input
                                  type="text"
                                  placeholder="Add member..."
                                  className="w-100 message-canvas-search"
                                  onChange={(e) =>
                                    setSearchUser(e.target.value)
                                  }
                                />
                              </form>
                              {showData ? (
                                <div className="message-canvas-search-user-data mb-4">
                                  {userData && userData.length > 0 ? (
                                    userData.map((user, index) => (
                                      // <div key={index} className="d-flex justify-content-between align-items-center">
                                      //   <Link
                                      //     to={`/user/${user.id}`}
                                      //   >
                                      //     <div
                                      //       className="message-canvas-search-user"
                                      //     >
                                      //       {user.fullName}
                                      //     </div>
                                      //   </Link>
                                      //   <div className="add-member-btn member-btn">+</div>
                                      // </div>
                                      <div className="member-wrapper" key={index}>
                                        <div
                                          className="d-flex align-items-center justify-content-between"
                                        >
                                          <Link
                                            to={`/user/${user.id}`}
                                            className="text-decoration-none text-black"
                                          >
                                            <div className="d-flex align-items-center">
                                              <div>
                                                <a
                                                  href="#"
                                                  className="d-flex align-items-center mb-3 text-dark text-decoration-none"
                                                >
                                                  <div>
                                                    <img
                                                      className="profile-photo"
                                                      src={require("../../helpers/images/avatar2.jpg")}
                                                      alt="profile-photo"
                                                    />
                                                    {/* <img
                                                    className="profile-photo"
                                                    src={"http://localhost:39524/" + user?.imageUrl}
                                                    alt="profile-photo"
                                                  /> */}
                                                  </div>
                                                </a>
                                              </div>
                                              <div className="ms-2">
                                                {user.fullName}
                                              </div>
                                            </div>
                                          </Link>

                                          <div className="add-member-btn member-btn">
                                            +
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <div>User not found</div>
                                  )}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="tab-2">
                            <label htmlFor="tab2-2">Search</label>
                            <input id="tab2-2" name="tabs-two" type="radio" />
                            <div className="member-wrapper">
                              <div className="d-flex align-items-center justify-content-between">
                                <Link
                                  to={"/user"}
                                  className="text-decoration-none text-black"
                                >
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <a
                                        href="#"
                                        className="d-flex align-items-center mb-3 text-dark text-decoration-none"
                                      >
                                        <div>
                                          <img
                                            className="profile-photo"
                                            src={require("../../helpers/images/avatar2.jpg")}
                                            alt="profile-photo"
                                          />
                                        </div>
                                      </a>
                                    </div>
                                    <div className="ms-2">Bashir Azizov</div>
                                  </div>
                                </Link>

                                <div className="remove-member-btn member-btn">
                                  -
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <Link
                                  to={"/user"}
                                  className="text-decoration-none text-black"
                                >
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <a
                                        href="#"
                                        className="d-flex align-items-center mb-3 text-dark text-decoration-none"
                                      >
                                        <div>
                                          <img
                                            className="profile-photo"
                                            src={require("../../helpers/images/avatar2.jpg")}
                                            alt="profile-photo"
                                          />
                                        </div>
                                      </a>
                                    </div>
                                    <div className="ms-2">Bashir Azizov</div>
                                  </div>
                                </Link>

                                <div className="remove-member-btn member-btn">
                                  -
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="delete-messages messages-prop d-flex align-items-center">
                    <RiDeleteBinLine />
                    <span className="ms-1"></span>
                  </div>
                </div>
              </div>
              <div className="py-3 messages-wrapper">
                <div className="message-date w-100 text-center">
                  <span>06 December, 2022</span>
                </div>
                <div className="message-area mt-3">
                  <div className="pe-4 ps-4">
                    <div className="w-100 d-flex justify-content-end align-items-center position-relative mb-2">
                      <div className="sender">
                        <a
                          href="#"
                          className="d-flex align-items-center mb-3 text-dark text-decoration-none"
                        >
                          <div>
                            <img
                              className="profile-photo"
                              src={require("../../helpers/images/avatar.jpg")}
                              alt="profile-photo"
                            />
                          </div>
                        </a>
                      </div>
                      <div className="message-blue">Salam necesen?</div>
                    </div>
                    <div className="w-100 d-flex justify-content-start align-items-center mt-3 position-relative mb-2">
                      <div className="reciver">
                        <a
                          href="#"
                          className="d-flex align-items-center mb-3 text-dark text-decoration-none"
                        >
                          <div>
                            <img
                              className="profile-photo"
                              src={require("../../helpers/images/avatar4.jpg")}
                              alt="profile-photo"
                            />
                          </div>
                        </a>
                      </div>
                      <div className="message-gray">Yaxshi sen?</div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div className="send-area border-top">
                <div className="row d-flex justify-content-between align-items-center">
                  <div className="col-md-1">
                    <button className="share-button">
                      <MdOutlineIosShare />
                    </button>
                  </div>
                  <div className="col-md-10">
                    <input
                      type="text"
                      className=" w-100"
                      placeholder="Your Message..."
                    />
                  </div>
                  <div className="col-md-1">
                    <button className="send-button">
                      <FiSend />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

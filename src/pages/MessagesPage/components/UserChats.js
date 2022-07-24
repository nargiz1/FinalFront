import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import ModalBootstrapt from "react-bootstrap/Modal";
import { HiOutlinePhotograph } from "react-icons/hi";
import Button from "react-bootstrap/Button";
import { useDispatch } from 'react-redux';
import * as chatServices from "../../../services/ChatSevice";
import { useNavigate } from "react-router-dom";
import { setGroupChats } from '../../../redux/Chat/GroupChatSlice';

export function UserChats({ joinRoom, setChat, closeConnection, setGroup }) {
  const privateChats = useSelector((state) => state.privateChat.privateChats);
  const user = useSelector((state) => state.user.currentUser);
  const groupChats = useSelector((state) => state.groupChat.groupChats);

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: "",
    imageFile: [],
  });

  const handleChange = (name, value) => {
    setNewGroup({
      ...newGroup,
      [name]: value,
    });
  };

  const dispatch = useDispatch();
  const handleGroup = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", newGroup.name);
    formData.append("ImageFile", newGroup.imageFile[0])
    await chatServices.CreateGroup(formData);
    Array.from(document.querySelectorAll("input")).forEach(
    (input) => (input.value = ""));
    const groups = await chatServices.getUserGroups(user);
    dispatch(setGroupChats(groups));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const groupArray = [...groupChats];
  // const prChatArray = [...privateChats];
  // const allChats = [...groupArray, ...prChatArray];
  // const sorted = allChats.sort((a, b) => b.created - a.created);
  // console.log(allChats);

  return (
    <div className="col-md-3">
      <div className="message-inbox border-end">
        <div className="chat d-flex justify-content-between border-bottom">
          <h3>Chats</h3>
          <>
            <div onClick={handleShow}>
              <FiEdit style={{ cursor: "pointer" }} />
            </div>
            <ModalBootstrapt show={show} onHide={handleClose}>
              <ModalBootstrapt.Header closeButton>
                <ModalBootstrapt.Title>Create Group</ModalBootstrapt.Title>
              </ModalBootstrapt.Header>
              <ModalBootstrapt.Body>
                <form
                  onSubmit={handleGroup}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <input
                        required
                        className="form-control w-100 shadow-none border-0"
                        type="text"
                        name="name"
                        placeholder="Group name..."
                        onChange={(e) => handleChange("name", e.target.value)}
                      />
                    </div>
                    <div className="profile-upload me-3 img">
                      <label htmlFor="photo" style={{ cursor: "pointer" }}>
                        <div className="user-profile-upload">
                          <HiOutlinePhotograph className="text-danger" />
                        </div>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        id="photo"
                        className="custom-file-upload d-none"
                        name="imageFile"
                        onChange={(e) => {
                          e.stopPropagation();
                          handleChange("imageFile", e.target.files);
                        }}
                      />
                    </div>
                  </div>
                </form>
              </ModalBootstrapt.Body>
              <ModalBootstrapt.Footer>
                <Button variant="primary" onClick={handleGroup}>Create</Button>
              </ModalBootstrapt.Footer>
            </ModalBootstrapt>
          </>
        </div>
        <div className="chat-wrapper">
          {privateChats.map((chat, index) => (
            <div className="message-content" key={index}>
              <div className="d-flex align-items-center">
                <div>
                  <a
                    href="#"
                    className="d-flex align-items-center mb-3 text-dark text-decoration-none"
                  >
                    <div>
                      <img
                        className="profile-photo"
                        src={
                          "http://localhost:39524/" +
                          (chat.userTwo.userName == user.userName
                            ? chat.userOne.imageUrl
                            : chat.userTwo.imageUrl)
                        }
                        alt="profile-photo"
                      />
                    </div>
                  </a>
                </div>
                <div
                  className="message-by ms-3"
                  onClick={(e) => {
                    e.preventDefault();
                    closeConnection();
                    setGroup("");
                    joinRoom(
                      chat.userTwo.userName == user.userName
                        ? chat.userTwo.userName
                        : chat.userOne.userName,
                      chat.id.toString()
                      );
                    setChat(chat);
                    navigate(`/messages?chat=${chat.id}`)
                  }}
                >
                  <div className="message-by-headline position-relative">
                    {chat.userTwo.userName == user.userName ? (
                      <h5>{chat.userOne.fullName}</h5>
                    ) : (
                      <h5>{chat.userTwo.fullName}</h5>
                    )}
                    {/* <span>4 hours ago</span> */}
                  </div>
                  {/* <p>laoreet dolore magna aliquam erat...</p> */}
                </div>
              </div>
            </div>
          ))}
          {groupChats.map((group, index) => (
            <div className="message-content" key={index}>
              <div className="d-flex align-items-center">
                <div>
                  <a
                    href="#"
                    className="d-flex align-items-center mb-3 text-dark text-decoration-none"
                  >
                    <div>
                      <img
                        className="profile-photo"
                        src={"http://localhost:39524/" + group.imageUrl}
                        alt="profile-photo"
                      />
                    </div>
                  </a>
                </div>
                <div
                  className="message-by ms-3"
                  onClick={(e) => {
                    e.preventDefault();
                    closeConnection();
                    setChat("");
                    setGroup(group);
                    joinRoom(user.userName, group.id.toString());
                    navigate(`/messages?group=${group.id}`)
                  }}
                >
                  <div className="message-by-headline position-relative">
                    <h5>{group.name}</h5>
                    {/* <span>4 hours ago</span> */}
                  </div>
                  {/* <p>laoreet dolore magna aliquam erat...</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

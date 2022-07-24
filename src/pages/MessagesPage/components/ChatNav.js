import { RiDeleteBinLine } from "react-icons/ri"
import { useSelector } from "react-redux";
import { AiTwotoneEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from 'react';
import * as UserService from "../../../services/UserService";
import * as chatServices from "../../../services/ChatSevice";
import { setGroupChat, setGroupChatMembers } from '../../../redux/Chat/GroupChatSlice';
import { useDispatch } from 'react-redux';
import { AiOutlinePlus } from "react-icons/ai";



export function ChatNav({ deleteChat, deleteGroup, group }) {

  const data = useSelector((state) => state.user.currentUser);
  const [searchUser, setSearchUser] = useState("");
  const [userData, setUserData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [checked, setChecked] = useState(true);
  const [clicked, setClicked] = useState(true);


  const privateChat = useSelector((state) => state.privateChat.Chat);
  const groupChat = useSelector((state) => state.groupChat.group);
  const currentUser = useSelector((state) => state.user.currentUser);
  const groupChatMembers = useSelector((state) => state.groupChat.groupMembers);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await UserService.SearchUserService(searchUser);
    setUserData(resp);
    setShowData(true);
    console.log("searching user resp", resp);
  };

  var dispatch = useDispatch();
  const addMember = async (user, group) => {
    var member = {
      userId: user.id,
      groupId: group.id
    }
    await chatServices.AddGroupMember(member);
    const groupChatMembers = await chatServices.getGroupMembers(groupChat.id);
    dispatch(setGroupChatMembers(groupChatMembers));
    await UserService.SearchUserService(searchUser);
  }

  const deleteMember = async (user, group) => {
    console.log(user, group);
    var member = {
      userId: user.id,
      groupId: group.id
    }
    await chatServices.DeleteGroupMember(member);
    const groupChatMembers = await chatServices.getGroupMembers(groupChat.id);
    dispatch(setGroupChatMembers(groupChatMembers));
    await UserService.SearchUserService(searchUser);
  }

  const handleGroupPicChange = async (name, value) => {
    console.log("name",name);
    const formData = new FormData();
    Array.from(value).forEach((ImageFile) =>
      formData.append("ImageFile", ImageFile)
    );
    formData.append("Id", group.id);
    await chatServices.UpdateGroup(formData);
    const groupChat = await chatServices.getGroup(group.id);
    dispatch(setGroupChat(groupChat));
  };

  
  return (
    <>
      {privateChat.userTwo != undefined && (
        <>
          <div className="message-heading d-flex justify-content-between border-bottom">
            {privateChat.userTwo.userName == currentUser.userName ?
              <h6>{privateChat.userOne.fullName}</h6>
              :
              <h6>{privateChat.userTwo.fullName}</h6>}
            <a className="delete-messages d-flex align-items-center" >
              <RiDeleteBinLine />
              <span className="ms-1" onClick={e => deleteChat(privateChat)} >Delete conversation</span>
            </a>
          </div>
        </>
      )}
      {groupChat.users && (
        <>
          <div className="col-md-12">
            <div className="thread border-start">
              <div className="message-heading d-flex justify-content-between border-bottom">
                <h6 className="mb-0">{groupChat.name}</h6>
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
                      <div className="d-flex align-items-center justify-content-center position-relative">
                        <div className="message-canvas-photo">
                          <img
                            src={"http://localhost:39524/" + groupChat.imageUrl}
                            className="w-100"
                          />
                        </div>
                        <div className="profile-upload">
                          <label htmlFor="photo">
                            <div className="photo-icon">
                              <AiOutlinePlus />
                            </div>
                          </label>
                          <input
                            type="file"
                            accept="images/*"
                            id="photo"
                            className="custom-file-upload d-none"
                            name="ImageFile"
                            multiple
                            onChange={(e) =>
                              handleGroupPicChange("ImageFile", e.target.files)
                            }
                          />
                        </div>
                      </div>
                      <div className="text-center mt-2">
                        <div className="message-canvas-name">
                          {groupChat.name}
                        </div>
                        <div>{groupChatMembers.length+1} members</div>
                        <div className="tabs">
                          <div className="tab-2">
                            <label htmlFor="tab2-1"
                            onClick={() => setClicked(true)}
                            >Add</label>
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
                                      <div key={index} className={`member-wrapper ${clicked === true ? "d-block" : "d-none"
                                      }`}>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <Link to={`/user/${user.id}`} className="text-decoration-none text-black">
                                            <div className="d-flex align-items-center">
                                              <div>
                                                <a
                                                  href="#"
                                                  className="d-flex align-items-center mb-3 text-dark text-decoration-none"
                                                >
                                                  <div>
                                                    <img
                                                      className="profile-photo"
                                                      src={"http://localhost:39524/" + user.imageUrl}
                                                      alt="profile-photo"
                                                    />
                                                  </div>
                                                </a>
                                              </div>
                                              <div className="ms-2">{user.fullName}</div>
                                            </div>
                                          </Link>
                                          {(!groupChatMembers.some((member) => member.userName === user.userName) && (user.userName !== currentUser.userName)) && (
                                            <div className="add-member-btn member-btn" onClick={e => {
                                              e.preventDefault();
                                              addMember(user, groupChat);
                                            }
                                            }>+</div>
                                          )}
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
                            <label htmlFor="tab2-2"
                            onClick={() => setClicked(false)}
                            >Members</label>
                            <input id="tab2-2" name="tabs-two" type="radio" />
                            <div className="member-wrapper">
                              {groupChatMembers.map((user, index) =>
                                <div key={index} className="d-flex align-items-center justify-content-between">
                                  <Link to={"/user"} className="text-decoration-none text-black">
                                    <div className="d-flex align-items-center">
                                      <div>
                                        <a
                                          href="#"
                                          className="d-flex align-items-center mb-3 text-dark text-decoration-none"
                                        >
                                          <div>
                                            <img
                                              className="profile-photo"
                                              src={"http://localhost:39524/" + user.imageUrl}
                                              alt="profile-photo"
                                            />
                                          </div>
                                        </a>
                                      </div>
                                      <div className="ms-2">{user.userName}</div>
                                    </div>
                                  </Link>
                                  <div className="remove-member-btn member-btn" onClick={e => {
                                    e.preventDefault();
                                    deleteMember(user, groupChat)}
                                    }>-</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="delete-messages messages-prop d-flex align-items-center">
                    <RiDeleteBinLine onClick={e => deleteGroup(groupChat.id)} />
                    <span className="ms-1"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>

  )
}
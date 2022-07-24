import { FiSend } from "react-icons/fi";
import { useState } from "react";
import * as messageServices from "../../../services/MessageService";
import { useSelector } from "react-redux";
import { MdOutlineIosShare } from "react-icons/md";


export function MessageForm({ sendMessage, usersInRoom }) {
  const user = useSelector((state) => state.user.currentUser);
  const privateChat = useSelector((state) => state.privateChat.Chat);
  const groupChat = useSelector((state) => state.groupChat.group);


  const [message, setmessage] = useState({
    userId: "",
    userName: "",
    userImage: "",
    text: "",
    isRead: false,
    privateChatId: "",
    GroupChatId: ""
  });
  const handleChange = (name, value) => {
    setmessage({
      ...message, [name]: value,
      isRead: usersInRoom.some(x=> x != user.userName) ? true : false,
      privateChatId: privateChat.id,
      GroupChatId: groupChat.id,
      userId: user.id,
      userName: user.userName,
      userImage: user.imageUrl
    });
  };
  const handleMessage = async (e) => {
    try {
      const resp = await messageServices.CreateMessage(message);
      Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
      );
      console.log(message)
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const sendFile = async (e) => {
    
  }

  return (
    <div className="send-area border-top">
      <div className="row d-flex justify-content-between align-items-center position-relative">
        <div className="col-md-10 col-sm-8">
          <form onSubmit={e => {
            e.preventDefault();
            handleMessage();
            sendMessage(message);
          }}>
            <input
              type="text"
              name="text"
              className="w-100"
              placeholder="Your Message..."
              onChange={e => handleChange(e.target.name, e.target.value)}
            />
          </form>
        </div>
        <div className="col-md-1 col-sm-2">
          <div className="profile-upload file-upload ">
            <label htmlFor="photo">
              <div className="photo-icon share-button">
                < MdOutlineIosShare />
              </div>
            </label>
            <input
              type="file"
              accept="*"
              id="photo"
              className="custom-file-upload d-none"
              name="File"
              multiple
            />
          </div>
        </div>
        <div className="col-md-1 col-sm-2">
          <button className="send-button"
            onClick={e => {
              e.preventDefault();
              handleMessage();
              sendMessage(message);
            }}>
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  )
}
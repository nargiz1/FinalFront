import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import "./index.css";
import Layout from "../../components/Layout";
import { UserChats } from './components/UserChats';
import { MessageForm } from './components/MessageForm';
import { Chat } from './components/Chat';
import { ChatNav } from './components/ChatNav';
import { useDispatch } from 'react-redux';
import * as messageService from "../../services/MessageService";
import { setMessage } from "../../redux/Message/MessageSlice"
import { useSelector } from "react-redux";
import * as chatService from "../../services/ChatSevice";
import { setPrivateChats, setPrivateChat, setChatExists } from "../../redux/Chat/PrivateChatSlice";
import * as UserService from "../../services/UserService";
import { setCurrentUser } from '../../redux/User/UserSlice';
import * as chatServices from "../../services/ChatSevice";
import { setGroupChats, setGroupChat, setGroupChatMembers } from '../../redux/Chat/GroupChatSlice';
import { ChatBubbleOutlineTwoTone } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";



const Index = ({joinRoom, users, sendMessage, messages1, closeConnection}) => {

 

  const [chat, setChat] = useState();
  const [group, setGroup] = useState();

  const user = useSelector((state) => state.user.currentUser);
  const privateChat = useSelector((state) => state.privateChat.Chat);
  const groupChat = useSelector((state) => state.groupChat.group);
  
  console.log(user)
  const search = useLocation().search;
  const chatId = new URLSearchParams(search).get("chat")
  const groupId =new URLSearchParams(search).get("group")

  console.log(groupId);

  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      const user = await UserService.getUserService();
      const privateChats = await chatService.getUserChats(user);
      const groups = await chatService.getUserGroups(user);
      dispatch(setCurrentUser(user));
      dispatch(setPrivateChats(privateChats));
      dispatch(setGroupChats(groups));
    })();
  }, [groupChat, dispatch])

  useEffect(() => {
    (async function () {
      setChat(chatId)
      const privateChat = await chatService.getChat(chat);
      const msg = {
        userId: user.id,
        privateChatId: chat,
      }
      // const resp = await messageService.MessagesAreRead(msg);
      const messages = await messageService.getChatMessages(privateChat.id);
      dispatch(setPrivateChat(privateChat));
      dispatch(setMessage(messages));
    })();
    
  }, [chat, users, dispatch]);

  useEffect(() => {
    (async function () {
      const groupChat = await chatService.getGroup(groupId);
      const groupChatMembers = await chatService.getGroupMembers(group.id);
      const msg = {
        userId: user.id,
        groupChatId: group.id,
      }
      // const resp = await messageService.MessagesAreRead(msg);
      const messages = await messageService.getGroupMessages(groupChat);
      dispatch(setGroupChat(groupChat));
      dispatch(setGroupChatMembers(groupChatMembers));
      dispatch(setMessage(messages));
    })();
  }, [group, users, dispatch]);

  const deleteChat = async (chat) => {
    await chatServices.DeleteChat(chat.id);
    dispatch(setChatExists(false));
    window.location.reload();
  }
  const deleteGroup = async (groupId) => {
    chatServices.DeleteGroup(groupId);
    const member = {
      userId: user.id,
      groupId: groupId
    }
    await chatServices.DeleteGroupMember(member);
    window.location.reload();
  }

  return (
    <Layout showIcon={false}>
      <div className="chat-content">
        <div className="row g-0">
          <UserChats closeConnection={closeConnection} setChat={setChat} setGroup={setGroup} joinRoom={joinRoom} />
          <div className="col-md-9">
            <div className="thread border-start">
              {(chat || group) && (
                <>
                  <ChatNav deleteChat={deleteChat} deleteGroup={deleteGroup} group={group}/>
                  <Chat messages={messages1} usersInRoom={users} />
                  <MessageForm sendMessage={sendMessage} usersInRoom={users}/>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

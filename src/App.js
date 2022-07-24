import React,{useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import * as userServices from "../src/services/UserService";
import * as followServices from "../src/services/FollowService";
import  { setCurrentUser,setUsers } from '../src/redux/User/UserSlice';
import  { setFollowers,setFollowing } from '../src/redux/Follow/FollowSlice';
import FeedPage from "./pages/FeedPage/index";
import "./App.css";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'


const GroupsPage = React.lazy(() => import("./pages/GroupsPage/index"));
const PagesPage = React.lazy(() => import("./pages/PagesPage/index"));
const PhotosPage = React.lazy(() => import("./pages/PhotosPage/index"));
const ProductsPage = React.lazy(() => import("./pages/ProductsPage/index"));
const VideosPage = React.lazy(() => import("./pages/VideosPage/index"));
const MessagesPage = React.lazy(() => import("./pages/MessagesPage/index"));
const LoginPage = React.lazy(() => import("./pages/LoginPage/index"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage/index"));
const ForgetPasswordPage = React.lazy(() => import("./pages/ForgotPasswordPage/index"));
const ResetPage = React.lazy(() => import("./pages/ResetPasswordPage/index"));
const ProfilePage = React.lazy(() => import("./pages/SettingPage/Profile"));
const PrivacyPage = React.lazy(() => import("./pages/SettingPage/Privacy"));
const UserPage = React.lazy(() => import("./pages/UserPage/index"));



function App() {
  const dispatch= useDispatch();

  useSelector((state) => state.auth.token);
  useSelector((state) => state.auth.resetToken);
  const token = sessionStorage.getItem("token");
  const resetToken = sessionStorage.getItem("resetToken");
  
  useEffect(() => {
    (async function() {
      if (token) {
        const user=await userServices.getUserService();
        dispatch(setCurrentUser(user));
      }
      
    })();
  }, [dispatch])


  const [connection, setConnection] = useState();
  const [messages1, setMessages1] = useState([]);
  const [users, setUsers] = useState([]);

  const joinRoom = async (user, room) => {
    try{
    const connection = new HubConnectionBuilder()
    .withUrl("http://localhost:39524/chat")
    .configureLogging(LogLevel.Information)
    .build();

  connection.on("UsersInRoom", (users) => {
    setUsers(users);
  })

  connection.on("ReceiveMessage", (message) => {
    const messageObject = JSON.parse(message);
    setMessages1(messages1 => [...messages1, messageObject]);
  });

  connection.onclose(e => {
    setConnection();
    setMessages1([]);
  })

  await connection.start();
  await connection.invoke("JoinRoom", { user, room });
  setConnection(connection);
  
} catch (e) {
  console.log(e);
}
  };
  
  console.log(users)

  const closeConnection = async () => {
    try {
      await connection.stop()
    } catch (e) {
      console.log(e);
    }
  }

  const sendMessage = async (message) => {
    try {
      var messageString = JSON.stringify(message)
      await connection.invoke("SendMessage", messageString);
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <>
        <ToastContainer autoClose={2000} position="bottom-right" />
    <Routes>
    <Route path="/reset" element={<ResetPage />} />

      {token !== null && (
        <>
          <Route path="/" element={<FeedPage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/messages" element={<MessagesPage users={users} 
          joinRoom={joinRoom} 
          sendMessage={sendMessage} 
          messages1={messages1} 
          closeConnection={closeConnection}/>} />
          <Route path="/pages" element={<PagesPage />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/user/:userId" element={<UserPage 
           joinRoom={joinRoom}
          />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
      {token === null && (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forget" element={<ForgetPasswordPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
    </>
  );
}

export default App;

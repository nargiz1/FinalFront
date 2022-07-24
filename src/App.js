import React,{useEffect} from "react";
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
  return (
    <>
        <ToastContainer autoClose={2000} position="bottom-right" />
    <Routes>
    <Route path="/reset" element={<ResetPage />} />

      {token !== null && (
        <>
          <Route path="/" element={<FeedPage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/pages" element={<PagesPage />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/user/:userId" element={<UserPage />} />
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

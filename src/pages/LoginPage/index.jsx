import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as authServices from "../../services/AuthService";
import * as userServices from "../../services/UserService";
import { setLogin } from "../../redux/Auth/AuthSlice";
import { setCurrentUser } from "../../redux/User/UserSlice";
import LoginSVG from "../../helpers/images/login.svg";
import {Formik,Form} from 'formik';

const Index = () => {
  const dispatch = useDispatch();

  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const backToLogin = {
    textDecoration: "none",
    color: "#393939",
    fontStyle: "italic",
  };

  const handleChange = (name, value) => {
    setAuthData({ ...authData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authData.email !== "" && authData.password !== "") {
      try {
        const resp = await authServices.LoginService(authData);
        if (resp && resp.token) {
          dispatch(setLogin(resp.token));
          sessionStorage.setItem("token", resp.token);
          const user = await userServices.getUserService();
          dispatch(setCurrentUser(user));
          if (user.isActive === false) {
            sessionStorage.removeItem("token");
            dispatch(setLogin(null));
            toast.error("You haven't login,please contact admin.");
            navigate("/login");
          } else {
            toast.success("User was loggined successfully!");
            navigate("/");
          }
        } else {
          toast.error("User was not loggined or Please, look to gmail!");
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="row vh-100 justify-content-center align-items-center">
          
          <div className="col-md-6 col-lg-7 login-img">
            <img src={LoginSVG} alt="Login" className="w-100" />
          </div>
          <div className="col-md-6 col-lg-5 login-form">
            <div className="register-sign-in sign-in pt-5">
              <h3 className="mb-4 text-center">Log In Now!</h3>
              <form>
                <div className="mb-3">
                  <input
                    id="email"
                    required
                    className="form-control w-100 shadow-none"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </div>
                <div className="mb-4">
                  <input
                    id="password"
                    required
                    className="form-control w-100 shadow-none"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </div>
                <div className="mb-4">
                  <button
                    className="w-100 fw-bold"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Log In
                  </button>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Link style={backToLogin} to="/forget">
                      Forgot account?
                    </Link>
                  </div>
                  <div>
                    <Link style={backToLogin} to="/register">
                      Registration
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

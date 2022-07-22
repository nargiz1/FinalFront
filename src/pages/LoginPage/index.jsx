import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as authServices from "../../services/AuthService";
import * as userServices from "../../services/UserService";
import { setLogin } from "../../redux/Auth/AuthSlice";
import { setCurrentUser } from "../../redux/User/UserSlice";
import LoginSVG from "../../helpers/images/login.svg";

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email.")
      .required("Email is required."),
    password: Yup.string()
      .min(8, "min length")
      .required("Password is required.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log("values formik: ", values);
    },
  });


  useEffect(() => {
    if (Object.entries(formik.errors).length === 0 && Object.entries(formik.touched).length !== 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formik]);
  


  const backToLogin = {
    textDecoration: "none",
    color: "#393939",
    fontStyle: "italic",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const resp = await authServices.LoginService(formik.values);
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
          toast.error("User was not loggined!");
        }
      } catch (error) {
        console.log("error: ", error);
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={
                      formik.touched.email && formik.errors.email
                        ? { border: "1px solid red" }
                        : null
                    }
                    value={formik.values.email}
                  />

                  {formik.touched.email && formik.errors.email && (
                    <p style={{ color: "red",fontSize:"13px" }}>{formik.errors.email}</p>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    id="password"
                    required
                    className="form-control w-100 shadow-none"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={
                      formik.touched.password && formik.errors.password
                        ? { border: "1px solid red" }
                        : null
                    }
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p style={{ color: "red",fontSize:"13px" }}>{formik.errors.password}</p>
                  )}
                </div>
                <div className="mb-4">
                  <button
                    className="w-100 fw-bold"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={disabled}
                    style={ disabled ? { backgroundColor: 'grey', color: '#fff', cursor: 'not-allowed' } : null}
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

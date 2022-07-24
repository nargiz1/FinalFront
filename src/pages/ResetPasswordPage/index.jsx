import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import * as authServices from "../../services/AuthService";
import ResetSVG from "../../helpers/images/reset.svg";

const Index = () => {
  const navigate = useNavigate();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token").replace(/ /g, "+");
  const [disabled, setDisabled] = useState(true);
  // const token=new URLSearchParams(search).get('token');

  const email = new URLSearchParams(search).get("email");

  useEffect(() => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("email", email);
  }, [token, email]);

  const validationSchema = Yup.object({

    newPassword: Yup.string()
      .min(8, "Too Short!")
      .required("Password is required.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters,one Uppercase,one Lowercase,one Number and one special case character"
      ),
      passwordConfirm: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Passwords must match."
    ),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      passwordConfirm: "",
      email:"",
      token:""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log("values formik: ", values);
    },
  });

  

  useEffect(() => {
    if (
      Object.entries(formik.errors).length === 0 &&
      Object.entries(formik.touched).length !== 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formik]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");
    formik.values.email = email;
    formik.values.token = token;
    
      try {
        const resp = await authServices.ResetPasswordService(formik.values);
        if (resp) {
          toast.success("You changed your password successfully!");
          const timer = setTimeout(() => {
            navigate("/")
          }, 3000);
        } else {
          toast.error("Something went wrong!");
        }
      } catch (error) {
        console.log("error: ", error);
      }
    
  };

  const backToForgot = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    navigate("/forget");
  };

  return (
    <>
      <div className="container">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-6 col-lg-7 reset-img">
            <img src={ResetSVG} alt="reset" className="w-100" />
          </div>
          <div className="col-md-6 col-lg-5 login-form">
            <div className="register-sign-in sign-in pt-5">
              <h3 className="mb-4 text-center">Reset Now!</h3>
              <form>
                <div className="mb-3">
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter your new password"
                    className="form-control w-100 shadow-none"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={
                      formik.touched.newPassword && formik.errors.newPassword
                        ? { border: "1px solid red" }
                        : null
                    }
                    value={formik.values.newPassword}
                  />
                  {formik.touched.newPassword && formik.errors.newPassword && (
                    <p style={{ color: "red", fontSize: "13px" }}>
                      {formik.errors.newPassword}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="passwordConfirm"
                    placeholder="Enter your confirm password"
                    className="form-control w-100 shadow-none"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={
                      formik.touched.passwordConfirm &&
                      formik.errors.passwordConfirm
                        ? { border: "1px solid red" }
                        : null
                    }
                    value={formik.values.passwordConfirm}
                  />
                  {formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm && (
                      <p style={{ color: "red", fontSize: "13px" }}>
                        {formik.errors.passwordConfirm}
                      </p>
                    )}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <button onClick={backToForgot} className="fw-bold">
                      Go back
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="fw-bold"
                      disabled={disabled}
                      style={
                        disabled
                          ? {
                              backgroundColor: "grey",
                              color: "#fff",
                              cursor: "not-allowed",
                            }
                          : null
                      }
                    >
                      Confirm
                    </button>
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

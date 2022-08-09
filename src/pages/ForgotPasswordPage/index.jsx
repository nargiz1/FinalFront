import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { setReset } from "../../redux/Auth/AuthSlice";
import * as authServices from "../../services/AuthService";

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);


  const backToLogin = {
    textDecoration: "none",
    color: "#393939",
    fontStyle:"italic"
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email.")
      .required("Email is required.")
  });

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
    },
  });


  useEffect(() => {
    if (Object.entries(formik.errors).length === 0 && Object.entries(formik.touched).length !== 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formik]);

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const resp = await authServices.ForgotPasswordService(formik.values.email);
        if (resp) {
          sessionStorage.setItem("resetToken", resp);
          sessionStorage.setItem("currentMail", formik.values);
          dispatch(setReset(resp));
          toast.success(
            "Check your email address to reset your password!"
          );
          
        }
      } catch (error) {
        console.log("error: ", error);
      }
      const timer = setTimeout(() => {
        navigate("/")
      }, 3000);
      
  
  };
  return (
    <div className="container">
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="register-sign-in sign-in pt-5">
            <div className="mb-4 text-center">
            <h3>Find Your Account</h3>
            <p>Please enter your email to search for your account.</p>
            </div>
            <form>
              <div className="mb-3">
                <input
                  id="mail"
                  required
                  className="custom-input w-100 shadow-none"
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
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Link to="/login" style={backToLogin}>
                    Back to login
                  </Link>
                </div>
                <div>
                  <button
                    className=" w-100 fw-bold"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={disabled}
                    style={ disabled ? { backgroundColor: 'grey', color: '#fff', cursor: 'not-allowed' } : null}
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Index;

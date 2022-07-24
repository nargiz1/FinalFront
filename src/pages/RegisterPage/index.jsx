import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import * as authServices from "../../services/AuthService";
import RegisterSVG from "../../helpers/images/register.svg";

const Index = () => {
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Full name is required."),
    birthDate: Yup.string().required("Birth date is required"),
    userName: Yup.string()
      .min(3, "Too Short!")
      .max(30, "Too Long!")
      .required("User name is required."),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required."),
    password: Yup.string()
      .min(8, "Too Short!")
      .required("Password is required.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters,one Uppercase,one Lowercase,one Number and one special case character"
      ),
    passwordConfirm: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match."
    ),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      birthDate: "",
      userName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log("values formik: ", values);
    },
  });

  const [disabled, setDisabled] = useState(true);

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

  const navigate = useNavigate();
  const backToLogin = {
    textDecoration: "none",
    color: "#393939",
    fontStyle: "italic",
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const resp = await authServices.RegisterService(formik.values);
      if (resp) {
        toast.success(
          "User was registered successfully,check your email address to confirm your account!"
        );
        navigate("/login");
      } 
    } catch (error) {
      toast.error(error?.resp?.data);
      console.log("error: ", error.resp);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center mt-3">
        <div className="col-lg-7">
          <div className="register-img">
            <img src={RegisterSVG} alt="Register" className="w-100" />
          </div>
        </div>
        <div className="col-sm-12 col-lg-5 register-form">
          <div className="register-sign-in register pt-lg-5">
            <h3 className="mb-4 text-center">Welcome!</h3>
            <form>
              <div className="mb-4">
                <input
                  id="fullName"
                  required
                  className="form-control w-100 shadow-none"
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={
                    formik.touched.fullName && formik.errors.fullName
                      ? { border: "1px solid red" }
                      : null
                  }
                  value={formik.values.fullName}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p style={{ color: "red",fontSize:"13px" }}>{formik.errors.fullName}</p>
                )}
              </div>

              <div className="mb-4">
                <input
                  id="userName"
                  required
                  className="form-control w-100 shadow-none"
                  type="text"
                  name="userName"
                  placeholder="Username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={
                    formik.touched.userName && formik.errors.userName
                      ? { border: "1px solid red" }
                      : null
                  }
                  value={formik.values.userName}
                />
                {formik.touched.userName && formik.errors.userName && (
                  <p style={{ color: "red" ,fontSize:"13px"}}>{formik.errors.userName}</p>
                )}
              </div>
              <div className="mb-4">
                <input
                  id="birthDate"
                  required
                  className="form-control w-100 shadow-none"
                  type="datetime-local"
                  name="birthDate"
                  placeholder="Birth date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={
                    formik.touched.birthDate && formik.errors.birthDate
                      ? { border: "1px solid red" }
                      : null
                  }
                  value={formik.values.birthDate}
                />
                {formik.touched.birthDate && formik.errors.birthDate && (
                  <p style={{ color: "red",fontSize:"13px" }}>{formik.errors.birthDate}</p>
                )}
              </div>

              <div className="mb-4">
                <input
                  id="email"
                  required
                  className="form-control w-100 shadow-none"
                  type="email"
                  name="email"
                  placeholder="Email address"
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
                <input
                  id="passwordConfirm"
                  required
                  className="form-control w-100 shadow-none"
                  type="password"
                  name="passwordConfirm"
                  placeholder="Confirm password"
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
                    <p style={{ color: "red",fontSize:"13px" }}>
                      {formik.errors.passwordConfirm}
                    </p>
                  )}
              </div>

              <div className="mb-3">
                <button
                  className="fw-bold w-100"
                  type="submit"
                  onClick={handleRegister}
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
                  Register
                </button>
              </div>
              <div className="text-end">
                <Link style={backToLogin} to="/login">
                  Back to login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

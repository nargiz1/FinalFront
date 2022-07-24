import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as authServices from "../../services/AuthService";
import * as userServices from "../../services/UserService";
import { setCurrentUser } from "../../redux/User/UserSlice";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";

const Privacy = () => {
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    (async function () {
      const user = await userServices.getUserService();
      dispatch(setCurrentUser(user));
    })();
  }, [dispatch]);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email.").required("Email is required."),
    currentPassword: Yup.string()
      .min(8, "min length")
      .required("Current password is required.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    newPassword: Yup.string()
      .min(8, "Too Short!")
      .required("New password is required.")
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
      email: "",
      currentPassword: "",
      newPassword: "",
      passwordConfirm: "",
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
    try {
      const resp = await authServices.ChangePasswordService(formik.values);
      if (resp) {
        toast.success("You changed your password successfully!");
        const timer = setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <Layout>
      <div className="container mb-5 mt-3">
        <h5 className="text-center mb-3">Change Password</h5>
        <form>
          <div className="row justify-content-center align-items-center">
            <div className="col-md-10 col-lg-6">
              <div className="register-sign-in setting">
                <div>
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="form-control w-100 shadow-none mb-3"
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
                    <p style={{ color: "red", fontSize: "13px" }}>
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    name="currentPassword"
                    className="form-control w-100 shadow-none mb-3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={
                      formik.touched.currentPassword &&
                      formik.errors.currentPassword
                        ? { border: "1px solid red" }
                        : null
                    }
                    value={formik.values.currentPassword}
                  />
                  {formik.touched.currentPassword &&
                    formik.errors.currentPassword && (
                      <p style={{ color: "red", fontSize: "13px" }}>
                        {formik.errors.currentPassword}
                      </p>
                    )}
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="New password"
                    name="newPassword"
                    className="form-control w-100 shadow-none mb-3"
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
                <div>
                  <input
                    type="password"
                    placeholder="New password again"
                    name="passwordConfirm"
                    className="form-control w-100 shadow-none mb-3"
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
                <div>
                  <button
                    className="w-100 fw-bold mt-3"
                    onClick={handleSubmit}
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
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Privacy;

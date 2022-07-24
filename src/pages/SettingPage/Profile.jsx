import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as userServices from "../../services/UserService";
import { setCurrentUser } from "../../redux/User/UserSlice";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";

const Profile = () => {
 
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
    FullName: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Full name is required."),
    Country: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
    Education: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
    Occupation: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
    RelationshipStatus: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
    Status: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
    PhoneNumber: Yup.string().min(10, "Too Short!").max(10, "Too Long!"),

    SocialMediaLinks: Yup.array().of(
      Yup.object().shape({
        link: Yup.string().matches(/((https?):\/\/)/, "Enter correct url!"),
      })
    ),
  });

  const formik = useFormik({
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log("values formik: ", values);
    },
  });

  useEffect(() => {
    if (currentUser) {
      formik.setValues({
        FullName: currentUser?.fullName,
        UserId: currentUser?.id,
        Country: currentUser?.country,
        Education: currentUser?.education,
        Occupation: currentUser?.occupation,
        RelationshipStatus: currentUser?.relationshipStatus,
        Status: currentUser?.status,
        PhoneNumber: currentUser?.phoneNumber,
        SocialMediaLinks: currentUser?.socialMediaLinks,
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (Object.entries(formik.errors).length === 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formik]);

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await userServices.UpdateUserService(formik.values);

      if (resp) {
        toast.success("User was edited successfully!");
        navigate("/user");
      }
    } catch (error) {
      toast.error(error?.resp?.data);
    }
  };

  const handleServiceAdd = (name, value) => {
    let resultData = [...formik.values.SocialMediaLinks, value];
    formik.setFieldValue(name, resultData);
  };

  const handleServiceRemove = (name, index) => {
    const list = [...formik.values.SocialMediaLinks];
    list.splice(index, 1);
    formik.setFieldValue(name, list);
  };

  const handleServiceChange = (e, index) => {
    let changeInputVal = formik.values?.SocialMediaLinks.map((service, i) => {
      if (i === index) {
        return { link: e.target.value };
      }
      return service;
    });
    formik.setFieldValue("SocialMediaLinks", changeInputVal);
  };


  return (
    <Layout>
      <div className="container mb-5 mt-3">
        <h5 className="text-center mb-3">Update Profile</h5>
        <form onSubmit={handleUserSubmit}>
          <div className="row justify-content-center align-items-center">
            <div className="col-md-10 col-lg-6">
              <div className="register-sign-in setting">
                <div>
                  <input
                    type="text"
                    placeholder="Fullname"
                    name="FullName"
                    required
                    className="form-control w-100 shadow-none mb-3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={
                      formik.touched.FullName && formik.errors.FullName
                        ? { border: "1px solid red" }
                        : null
                    }
                    value={formik?.values?.FullName}
                  />
                  {formik.touched.FullName && formik.errors.FullName && (
                    <p style={{ color: "red", fontSize: "13px" }}>
                      {formik.errors.FullName}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Country"
                    name="Country"
                    className="form-control w-100 shadow-none mb-3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={
                      formik.touched.Country && formik.errors.Country
                        ? { border: "1px solid red" }
                        : null
                    }
                    value={formik?.values?.Country}
                  />
                  {formik.touched.Country && formik.errors.Country && (
                    <p style={{ color: "red", fontSize: "13px" }}>
                      {formik.errors.Country}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Education"
                    name="Education"
                    className="form-control w-100 shadow-none mb-3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={
                      formik.touched.Education && formik.errors.Education
                        ? { border: "1px solid red" }
                        : null
                    }
                    value={formik?.values?.Education}
                  />
                  {formik.touched.Education && formik.errors.Education && (
                    <p style={{ color: "red", fontSize: "13px" }}>
                      {formik.errors.Education}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Occupation"
                    name="Occupation"
                    className="form-control w-100 shadow-none mb-3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={
                      formik.touched.Occupation && formik.errors.Occupation
                        ? { border: "1px solid red" }
                        : null
                    }
                    value={formik?.values?.Occupation}
                  />
                  {formik.touched.Occupation && formik.errors.Occupation && (
                    <p style={{ color: "red", fontSize: "13px" }}>
                      {formik.errors.Occupation}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Relationship status"
                    name="RelationshipStatus"
                    className="form-control w-100 shadow-none mb-3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={
                      formik.touched.RelationshipStatus &&
                      formik.errors.RelationshipStatus
                        ? { border: "1px solid red" }
                        : null
                    }
                    value={formik?.values?.RelationshipStatus}
                  />
                  {formik.touched.RelationshipStatus &&
                    formik.errors.RelationshipStatus && (
                      <p style={{ color: "red", fontSize: "13px" }}>
                        {formik.errors.RelationshipStatus}
                      </p>
                    )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Status"
                    name="Status"
                    className="form-control w-100 shadow-none mb-3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={
                      formik.touched.Status && formik.errors.Status
                        ? { border: "1px solid red" }
                        : null
                    }
                    value={formik?.values?.Status}
                  />
                  {formik.touched.Status && formik.errors.Status && (
                    <p style={{ color: "red", fontSize: "13px" }}>
                      {formik.errors.Status}
                    </p>
                  )}
                </div>
                <div className="position-relative">
                  {formik.values?.SocialMediaLinks?.map(
                    (singleService, index) => (
                      <div key={index}>
                        <input
                          type="text"
                          placeholder="Social media links"
                          name="SocialMediaLinks"
                          className="form-control w-100 shadow-none mb-3"
                          onChange={(e) => handleServiceChange(e, index)}
                          value={singleService.link}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            handleServiceAdd("SocialMediaLinks", {
                              link: "",
                            })
                          }
                          style={{
                            position: "absolute",
                            right: "40px",
                            top: "8px",
                            width: "26px",
                            height: "26px",
                            padding: "0px",
                          }}
                        >
                          +
                        </button>
                        {formik.values?.SocialMediaLinks?.length !== 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              handleServiceRemove("SocialMediaLinks", index)
                            }
                            style={{
                              position: "absolute",
                              right: "8px",
                              top: "8px",
                              width: "26px",
                              height: "26px",
                              padding: "0px",
                            }}
                          >
                            -
                          </button>
                        )}
                      </div>
                    )
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Phone number"
                    name="PhoneNumber"
                    className="form-control w-100 shadow-none mb-3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={
                      formik.touched.PhoneNumber && formik.errors.PhoneNumber
                        ? { border: "1px solid red" }
                        : null
                    }
                    value={formik?.values?.PhoneNumber}
                  />
                  {formik.touched.PhoneNumber && formik.errors.PhoneNumber && (
                    <p style={{ color: "red", fontSize: "13px" }}>
                      {formik.errors.PhoneNumber}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    onClick={handleUserSubmit}
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
                    className="w-100 fw-bold mt-3"
                  >
                    Update
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

export default Profile;

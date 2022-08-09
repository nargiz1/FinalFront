import React, { useEffect, useState } from "react";
import * as postServices from "../../services/PostService";
import { useDispatch, useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdVideoCall } from "react-icons/md";
import "./CreatePost.css";
import { setPosts, setUserPosts } from "../../redux/Post/PostSlice";
import moment from "moment";
import { Link } from "react-router-dom";
import * as userServices from "../../services/UserService";
import Button from "react-bootstrap/Button";
import ModalBootstrapt from "react-bootstrap/Modal";
import { setCurrentUser } from "../../redux/User/UserSlice";

const CreatePost = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    (async function () {
      const user = await userServices.getUserService();
      dispatch(setCurrentUser(user));
    })();
  }, [dispatch]);

  const [createPost, setCreatePost] = useState({
    Text: "",
    IsPrivate: false,
    Location: "",
    ImageFiles: [],
    VideoFiles: [],
    PublicationTime: "",
  });
  const handleChange = (name, value) => {
    setCreatePost({ ...createPost, [name]: value });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const date = new Date();
    if (createPost.PublicationTime == "") {
      createPost.PublicationTime = moment(date).format();
    }
    formData.append("PublicationTime", createPost.PublicationTime);
    formData.append("Text", createPost.Text);
    formData.append("IsPrivate", createPost.IsPrivate);
    formData.append("Location", createPost.Location);
    Array.from(createPost.ImageFiles).forEach((ImageFile) =>
      formData.append("ImageFiles", ImageFile)
    );
    Array.from(createPost.VideoFiles).forEach((VideoFile) =>
      formData.append("VideoFiles", VideoFile)
    );
    formData.append("PublicationTime", createPost.PublicationTime);

    await postServices.createPostService(formData);

    const timer = setTimeout(async () => {
      const data = await postServices.getAllPostsService();
      dispatch(setPosts(data));
      const userPosts = await postServices.getUserPostsService(currentUser);
      dispatch(setUserPosts(userPosts));
    }, 1000);

    setCreatePost({
      Text: "",
      IsPrivate: false,
      Location: "",
      ImageFiles: [],
      VideoFiles: [],
      PublicationTime: "",
    });
  };

  return (
    <>
      <div className="createPost p-3">
        <div className="createPost-top">
          <Link to={`/user/${currentUser.id}`}>
            <div>
              {currentUser?.imageUrl === null ? (
                <img
                  src={require("../../helpers/images/avatar.jpg")}
                  alt="profile-photo"
                  className="post-profile"
                />
              ) : (
                <img
                  src={"http://localhost:39524/" + currentUser?.imageUrl}
                  alt="profile-photo"
                  className="post-profile"
                />
              )}
            </div>
          </Link>

          <input
            className="createPost-input w-100"
            placeholder="Crate your post..."
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
            disabled
          />

          <form>
            <div
              className={`modal fade create `}
              id="exampleModal1"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>

                  <div className="modal-body">
                    <div className="d-flex align-items-center">
                      <a href="#">
                        <div className="user-info">
                          <FaUserAlt />
                        </div>
                      </a>

                      <input
                        type="text"
                        placeholder="What's Your Mind?"
                        className="w-100 bg-white"
                        name="Text"
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                      />
                    </div>

                    <div className="add-post">
                      <div className="text-center mb-3">Add to your post</div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex">
                          <div className="me-2">
                            <label htmlFor="photo">
                              <div className="photo-icon">
                                <HiOutlinePhotograph />
                              </div>
                            </label>
                            <input
                              type="file"
                              accept="images/*"
                              id="photo"
                              className="custom-file-upload d-none"
                              name="ImageFiles"
                              multiple
                              onChange={(e) =>
                                handleChange(e.target.name, e.target.files)
                              }
                            />
                          </div>
                          <div className="me-2">
                            <label htmlFor="video">
                              <div className="video-icon">
                                <MdVideoCall />
                              </div>
                            </label>
                            <input
                              type="file"
                              title=""
                              id="video"
                              className="custom-file-upload d-none"
                              name="VideoFiles"
                              multiple
                              onChange={(e) =>
                                handleChange(e.target.name, e.target.files)
                              }
                            />
                          </div>
                          <div className="d-flex">
                            <input
                              type="text"
                              id="location"
                              className="custom-file-upload"
                              placeholder="Location..."
                              name="Location"
                              onChange={(e) =>
                                handleChange(e.target.name, e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="IsPrivate"> Private Post</label>
                          <input
                            type="checkbox"
                            id="IsPrivate"
                            name="IsPrivate"
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.checked)
                            }
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <label htmlFor="schedule">Schedule post*</label>
                        <input
                          type="datetime-local"
                          id="schedule"
                          name="PublicationTime"
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-primary "
                      onClick={handleClick}
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;

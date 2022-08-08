import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AiOutlineDelete, AiOutlineHeart, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { BsShare, BsEmojiLaughing } from "react-icons/bs";
import { GoKebabHorizontal } from "react-icons/go";
import * as postServices from "../../services/PostService";
import * as commentServices from "../../services/CommentService";
import * as likeServices from "../../services/LikeService";
import "./Post.css";
import Moment from "react-moment";
import Carousel from "react-bootstrap/Carousel";
import {  setPosts, setUserPosts } from "../../redux/Post/PostSlice";
import Modal from "react-bootstrap/Modal";

const Post = ({ post, likeTest, setLikeTest, userById }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const isClickedLike = useSelector((state) => state.post.isClickedLike);
  const [showComment, setShowComment] = useState(true);
  const [like, setLike] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [createComment, setCreateComment] = useState({
    text: "",
    postId: post.id,
    commentId: 0,
  });

  const handleChange = (name, value) => {
    setCreateComment({ ...createComment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (createComment.text !== "" && createComment.postId !== "") {
      try {
        const resp = await commentServices.CommentPostService(createComment);
        getAllPosts();
        getUserPosts();
        Array.from(document.querySelectorAll("input")).forEach(
          input => (input.value = "")
        );
      } catch (error) {
        console.log("error: ", error);
      }
    }
  };

  const getAllPosts = async () => {
    const data = await postServices.getAllPostsService();
    dispatch(setPosts(data));
  };
  const getUserPosts = async () => {
    const userPosts = await postServices.getUserPostsService(userById);
    dispatch(setUserPosts(userPosts));
  }

  const deletePost = async (id) => {
    await postServices.deletePostService(id);
    getAllPosts();
    getUserPosts();
  };
  const deleteComment = async (id) => {
    await commentServices.deleteCommentService(id);
    getAllPosts();
    getUserPosts();
  };

  const handleLikePost = async (e, id) => {
    e.preventDefault();

    const likeData = await likeServices.likePostService(id);

    if (likeData) {
      setLikeTest(true);
    } else {
      await likeServices.removePostLikeService(id);
      setLikeTest(false);
    }

    getAllPosts();
    getUserPosts();
  };

  const isExistLikedUser = post.likes?.some(
    (elem) => elem.userId === currentUser?.id
  );

  return (
    <>
      <div className="post mt-4 mb-4">
        <div className="post-top d-flex align-items-center justify-content-between p-3">
          <div className="d-flex align-items-center">
            <Link to={`/user/${post?.user?.id}`}>
              <div>
                {post?.user?.imageUrl === null ? (
                  <img
                    src={require("../../helpers/images/avatar.jpg")}
                    alt="profile-photo"
                    className="post-profile"
                  />
                ) : (
                  <img
                    src={"http://localhost:39524/" + post?.user?.imageUrl}
                    alt="profile-photo"
                    className="post-profile"
                  />
                )}
              </div>
            </Link>

            <div className="ms-3 text-start">
              <div className="username text-lowercase">
                <Link to={`/user/${post?.user?.id}`} className="username">
                  {post?.user?.userName || "user"}
                </Link>
              </div>
              <div className="d-flex align-items-center">
                <span className="post-date text-capitalize">
                  {post.location}
                </span>
              </div>
            </div>
          </div>
          {
            post.user.id==currentUser.id?(
              <div className="dropdown">
              <GoKebabHorizontal
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <ul className="dropdown-menu post-events">
                
                {showComment ? (
                  <li onClick={(e) => setShowComment(!showComment)}>
                    Disable comments
                  </li>
                ) : (
                  <li onClick={(e) => setShowComment(!showComment)}>
                    Unable comments
                  </li>
                )}
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  Delete
                </li>
              </ul>
            </div>

            ):null
          }
        
        </div>
        <div className="post-body">
          <Carousel interval={null}>
            {post?.images && post.images?.length > 0
              ? post?.images.map((img, index) => (
                  <Carousel.Item key={index} className="p-0">
                    <img
                      style={{ height: "257px" }}
                      src={"http://localhost:39524/" + img?.imageUrl}
                      alt="post"
                      className="w-100"
                    />
                  </Carousel.Item>
                ))
              : null}
            {post?.videos && post?.videos?.length > 0
              ? post?.videos.map((video, index) => (
                  <Carousel.Item key={index} className="p-0">
                    <video controls key={index} className="w-100">
                      <source
                        style={{ height: "257px" }}
                        src={"http://localhost:39524/" + video.videoUrl}
                        type="video/mp4"
                        alt="video"
                      />
                    </video>
                  </Carousel.Item>
                ))
              : null}
          </Carousel>
          {post?.text !== null ? (
            <p className="ps-3 pe-3 text-start mt-3">{post?.text}</p>
          ) : null}

          <div className="post-body-bottom p-3">
            <div className="d-flex justify-content-between mb-3">
              <div className="d-flex">
                <a
                  href="#"
                  className="d-flex align-items-center me-4 text-decoration-none"
                  onClick={(e) => handleLikePost(e, post.id)}
                >
                  <div className="post-interaction">
                    {isExistLikedUser ? (
                      <div>
                        <AiOutlineLike
                          style={{ fontSize: "21px", color: "red" }}
                        />
                      </div>
                    ) : (
                      <div>
                        <AiOutlineLike style={{ fontSize: "21px" }} />
                      </div>
                    )}
                  </div>
                </a>

                {showComment ? (
                  <>
                    <div
                      className="post-interaction"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <div onClick={handleShow}>
                        <FaRegComment />
                      </div>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Comments</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {post.comments && post.comments.length > 0 ? (
                          post.comments.map((comment, index) => (
                            <div
                              key={index}
                              className="d-flex align-items-center modal-comment"
                            >
                              <div className="modal-comment-img">
                                {comment?.user?.imageUrl === null ? (
                                  <img
                                    src={require("../../helpers/images/avatar.jpg")}
                                    alt="commenter-img"
                                    className="w-100"
                                  />
                                ) : (
                                  <img
                                    src={
                                      "http://localhost:39524/" +
                                      comment?.user?.imageUrl
                                    }
                                    alt="commenter-img"
                                    className="w-100"
                                  />
                                )}
                              </div>
                              <div className="modal-comment-text">
                                {comment?.text}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div>There is no comment of this post.</div>
                        )}
                      </Modal.Body>
                    </Modal>
                  </>
                ) : null}
              </div>
              
            </div>

            {post.likes?.length > 0 ? (
              <div className="d-flex align-items-center like-content">
                <div className="avatar-group d-flex ps-2">
                  <div className="avatar-item">
                    {post.likes?.user?.imageUrl == null ? (
                      <img
                        src={require("../../helpers/images/avatar.jpg")}
                        alt="liker-img"
                        className="w-100"
                      />
                    ) : (
                      <img
                        src={
                          "http://localhost:39524/" +
                          post.likes[0]?.user?.imageUrl
                        }
                        alt={post.id}
                        className="w-100"
                      />
                    )}
                  </div>
                  {
                    <div className="ms-2">
                      Liked <strong>{post.likes[0]?.user?.fullName}</strong>
                      {post.likes?.length > 1 ? (
                        <>
                          <span> and </span>
                          <strong>{post.likes?.length - 1} other</strong>
                        </>
                      ) : null}
                    </div>
                  }
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {showComment ? (
          <div className="post-bottom p-3">
            {post.comments?.length > 0
              ? post.comments.map((comment, index) => (
                  <div
                    key={index}
                    className="comment-area d-flex justify-content-between"
                  >
                    <div className="d-flex mb-3">
                      <Link to={`/user/${comment?.user?.id}`}>
                        <div>
                          {comment?.user?.imageUrl === null ? (
                            <img
                              src={require("../../helpers/images/avatar.jpg")}
                              alt="commenter-img"
                              className="post-profile"
                            />
                          ) : (
                            <img
                              src={
                                "http://localhost:39524/" +
                                comment.user?.imageUrl
                              }
                              alt="commenter-img"
                              className="post-profile"
                            />
                          )}
                        </div>
                      </Link>
                      <div className="comment-content ms-3">
                        <div className="comment align-items-center">
                          <p>{comment.text}</p>
                        </div>
                      </div>
                    </div>
                    {post.userId == currentUser?.id ||
                    comment.userId == currentUser?.id ? (
                      <div
                        className="comment-delete"
                        onClick={() => {
                          deleteComment(comment.id);
                        }}
                      >
                        <AiOutlineDelete />
                      </div>
                    ) : null}
                  </div>
                ))
              : null}

            {
              <div className="mb-3" onClick={handleShow}>
                {post.comments?.length > 3 ? (
                  <a href="#" className="more-comment">
                    {/* View {post.comments?.length - 1} more comments */}
                    View more comments
                  </a>
                ) : null}
              </div>
            }

       
              <div className="post-input position-relative">
                <form onSubmit={handleSubmit}>
                  
                  <input
                    type="text"
                    className="w-100"
                    name="text"
                    placeholder="Add a comment..."
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </form>
              </div>
          
            

          </div>
        ) :   (<p className="m-0 p-2 text-start">Comments are off.</p>)}
            <div className="p-2 d-flex align-items-center">
              <span className="post-date">
                <Moment fromNow>{post.created}</Moment>
              </span>
            </div>
      </div>
    </>
  );
};

export default Post;

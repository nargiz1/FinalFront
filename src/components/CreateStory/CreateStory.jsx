import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import Carousel from "../Carousel/Carousel";
import "./CreateStory.css";
import * as storyServices from "../../services/StoryService";
import { setStories } from "../../redux/Story/StorySlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const CreateStory = () => {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.story.stories);
  const [show, setShow] = useState(false);
  const [selectedStory, setSelectedStory] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    let findSelectedStory = stories.find((item) => item.id === id);
    setSelectedStory(findSelectedStory);
    setShow(true);
  };

  useEffect(() => {
    (async function () {
      const allStories = await storyServices.getAllStoriesService();
      dispatch(setStories(allStories));
    })();
  }, [dispatch]);

  const handleStoryChange = async (name, value) => {
    const formData = new FormData();
    Array.from(value).forEach((File) => formData.append("File", File));
    const resp = await storyServices.createStoryService(formData);
    await storyServices.storyExpireService(resp.id);
    const allStories = await storyServices.getAllStoriesService();
    dispatch(setStories(allStories));

    // const userById = await userServices.getUserByIdService(userId);
    // dispatch(setUserById(userById));
  };
  return (
    <div className="d-flex align-items-center mb-3">
      <div className="add-story">
        <label htmlFor="story-photo">
          <div className="photo-icon">
            <IoMdAdd />
          </div>
        </label>
        <input
          type="file"
          accept="image/*, video/*"
          id="story-photo"
          className="custom-file-upload d-none"
          name="File"
          onChange={(e) => handleStoryChange("File", e.target.files)}
        />
      </div>
      <div className="stories w-100">
        <Carousel mdViewCount={3}>
          {stories && stories.length > 0
            ? stories.map((story, index) => (
                <div key={index} className="story-wrapper">
                  <div
                    className="story-owner"
                    onClick={() => handleShow(story.id)}
                  >
                    {story?.user?.imageUrl === null ? (
                      <img
                        src={require("../../helpers/images/avatar.jpg")}
                        alt="user"
                        className="w-100"
                      />
                    ) : (
                      <img
                        src={"http://localhost:39524/" + story?.user?.imageUrl}
                        alt="user"
                        className="w-100"
                      />
                    )}
                  </div>
                </div>
              ))
            : null}
        </Carousel>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-lowercase">
            @{selectedStory?.user?.userName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="story">
            {selectedStory?.imageUrl !== null ? (
              <img
                src={"http://localhost:39524/" + selectedStory?.imageUrl}
                alt="story"
                className="w-100 h-100"
              />
            ) : (
              <video controls className="w-100">
                <source
                  style={{ height: "257px" }}
                  src={"http://localhost:39524/" + selectedStory?.videoUrl}
                  type="video/mp4"
                  alt="video"
                />
              </video>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateStory;

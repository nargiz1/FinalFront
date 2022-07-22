import React from "react";
import { IoMdAdd } from "react-icons/io";
import Carousel from "../Carousel/Carousel";
import * as storyServices from "../../services/StoryService";
import "./CreateStory.css";
const CreateStory = () => {
  const handleStoryChange = async (name, value) => {
    const formData = new FormData();
    Array.from(value).forEach((File) =>
      formData.append("File", File)
    );
   const resp= await storyServices.createStoryService(formData);
   await storyServices.storyExpireService(resp.id);

    
    // const userById = await userServices.getUserByIdService(userId);
    // dispatch(setUserById(userById));
  };
  return (
    <div className="d-flex align-items-center mb-3">
      <div className="add-story">
        <label htmlFor="photo">
          <div className="photo-icon">
            <IoMdAdd />
          </div>
        </label>
        <input
          type="file"
          accept="image/*, video/*"
          id="photo"
          className="custom-file-upload d-none"
          name="File"
          onChange={(e) =>
            handleStoryChange("File", e.target.files)
          }
        />
      </div>
      <div className="stories w-100">
        <Carousel mdViewCount={3}>
          <div className="story-wrapper">
            <div className="story-owner">
              <img
                src={require("../../helpers/images/avatar.jpg")}
                alt="user"
                className="w-100"
              />
            </div>
            <div className="story">
              <img
                src={require("../../helpers/images/story1.jpg")}
                alt="story"
                className="w-100 h-100"
              />
            </div>
          </div>
          <div className="story-wrapper">
            <div className="story-owner">
              <img
                src={require("../../helpers/images/avatar.jpg")}
                alt="user"
                className="w-100"
              />
            </div>
            <div className="story">
              <img
                src={require("../../helpers/images/story1.jpg")}
                alt="story"
                className="w-100 h-100"
              />
            </div>
          </div>
        
         

        </Carousel>
      </div>
    </div>
  );
};

export default CreateStory;

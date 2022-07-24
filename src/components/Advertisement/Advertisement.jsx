import React from "react";
import Moment from "react-moment";
import Carousel from "react-bootstrap/Carousel";

const Advertisement = ({adv}) => {
  return (
    <div className="post mt-4 mb-4">
      <div className="post-top d-flex align-items-center justify-content-between p-3">
      </div>
       <div className="post-body">
            {adv?.imageUrl && (
              <img
                style={{ height: "257px" }}
                src={"http://localhost:39524/" + adv?.imageUrl}
                alt="post"
                className="w-100"
              />

            )}
            {adv.videoUrl && (
                    <video controls className="w-100">
                      <source
                        style={{ height: "257px" }}
                        src={"http://localhost:39524/" + adv?.videoUrl}
                        type="video/mp4"
                        alt="video"
                      />
                    </video>

            )}
          {adv?.text !== null ? (
            <p className="ps-3 pe-3 text-start mt-3">{adv?.text}</p>
          ) : null}
  
      </div> 
   
   
    </div>
  );
};

export default Advertisement;

import React from "react";
import Moment from "react-moment";
import Carousel from "react-bootstrap/Carousel";

const Advertisement = ({adv}) => {
  return (
    <div className="post mt-4 mb-4">
      <div className="post-top d-flex align-items-center justify-content-between p-3">
      </div>
       <div className="post-body">
      <Carousel interval={null}>
            {adv?.images && adv.images?.length > 0
              ? adv?.images.map((img, index) => (
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
            {adv?.videos && adv?.videos?.length > 0
              ? adv?.videos.map((video, index) => (
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
          {adv?.text !== null ? (
            <p className="ps-3 pe-3 text-start mt-3">{adv?.text}</p>
          ) : null}
  
      </div> 
   
   
    </div>
  );
};

export default Advertisement;

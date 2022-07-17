import React from "react";

const Advertisement = () => {
  return (
    <div class="post mt-4 mb-4">
      <div class="post-top d-flex align-items-center justify-content-between p-3">
      </div>
      <div class="post-body">
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
  
      </div>
      <div class="post-bottom p-3">
        <div class="mb-3">Text</div>
      </div>
      <div class="p-2 d-flex align-items-center">
        <span class="post-date">
          <time datetime="1658055905506">17/07/2022</time>
        </span>
      </div>
    </div>
  );
};

export default Advertisement;

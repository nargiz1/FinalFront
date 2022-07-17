import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postServices from "../../../services/PostService";
import * as advServices from "../../../services/AdvService";
import { setPosts } from "../../../redux/Post/PostSlice";
import { setAdvs } from "../../../redux/Adv/AdvSlice";
import CreatePost from "../../../components/CreatePost/CreatePost";
import Post from "../../../components/Post/Post";
import Advertisement from "../../../components/Advertisement/Advertisement";
import "../Feed/Feed.css";
import { BsFillArrowDownCircleFill } from "react-icons/bs";

function Feed() {
  const dispatch = useDispatch();
  var advIndex=0;


  const data = useSelector((state) => state.post.posts);
  const advs = useSelector((state) => state.adv.adv);
  console.log("advs re",advs);
  const [likeTest, setLikeTest] = useState(false);
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 3,
  });

  const page_limit = 3;

  const fetchData = async () => {
    const responseData = await postServices.getAllPostsService(
      pagination.skip,
      pagination.limit
    );
    dispatch(setPosts(responseData));
  };

  const handleShowMore = (e, _limit) => {
    e.preventDefault();
    setPagination({ ...pagination, limit: _limit });
  };

  useEffect(() => {
    (async function() {
      fetchData();
      const advs=await advServices.getAllAdv();
      dispatch(setAdvs(advs));
    })();
  }, [likeTest, pagination, dispatch]);

  let visitedPage = page_limit + pagination.limit;

  return (
    <div className="feed">
      <CreatePost />

      {data && data?.allPosts?.length > 0?
       
       data.allPosts.map((item, index) => (
        <>
        <Post
          post={item}
          key={index}
          likeTest={likeTest}
          setLikeTest={setLikeTest}
        />
        
      {index%3===0 && (
        advs?.ads?.map((item,index)=>(
          <Advertisement adv={item} key={index}/>
        ))
      )}
        </>
            ))
        : null}

      {pagination.limit < data.count ? (
        <div className="d-flex justify-content-center mb-3">
          <div onClick={(e) => handleShowMore(e, visitedPage)} className="show-more">
           <BsFillArrowDownCircleFill/>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Feed;
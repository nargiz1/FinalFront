import Axios from "../helpers/setupAxios";
import { useSelector } from "react-redux";

export async function getAllPostsService(skip, take) {
  try {
    return await (
      await Axios.get(`/api/Post/getAllPosts`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        params: {            
            "Skip": skip,
            "Take": take,
        }
      })
      ).data;
  } catch (error) {
    console.log("err: ", error);
  }
};

export async function getUserPostsService(user,skip, take) {
  try {
    return await (
      await Axios.get(`/api/Post/getUserPosts`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        params:{
          "userId":`${user.id}`,
          "Skip": skip,
          "Take": take,
        }
       
      })
      ).data;
  } catch (error) {
    console.log("err: ", error);
  }
};

export async function createPostService(formData) {
  try {
    return await (
      await Axios.post(`/api/Post/create`, formData , {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Accept": "application/json",
        },   
      })
      ).data;
  } catch (error) {
    console.log("err: ", error);
  }
};
export async function deletePostService(payload) {
  try {
    return await (
      await Axios.post(`/api/Post/delete`,  payload , {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      })
      ).data;
  } catch (error) {
    console.log("err: ", error);
  }
};




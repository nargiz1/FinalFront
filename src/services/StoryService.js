import Axios from "../helpers/setupAxios";

export async function createStoryService(formData) {
    try {
      return await (
        await Axios.post(`/api/Story/create`, formData , {
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
  export async function storyExpireService(payload) {
    try {
      return await (
        await Axios.post(`/api/Story/story`, payload , {
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
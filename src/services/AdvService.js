import Axios from "../helpers/setupAxios";

export async function getAllAdv() {
  try {
    return await (
      await Axios.get(`/api/Advertisement/getAll`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          accept: "application/json",
        },
        params:{
            "Skip": 0,
            "Take": 5,
          }
      })
    ).data;
  } catch (error) {
    console.log("err: ", error);
  }
}
import Axios from "../helpers/setupAxios";
export async function CommentPostService(payload) {
  try {
    return await (
      await Axios.post(`/api/Comment/commentPost`, payload, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
    ).data;
  } catch (error) {
    console.log("err: ", error);
  }
}
export async function getPostCommentsService(postId) {
  try {
    return await (
      await Axios.get(`/api/Comment/getPostComments`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        params:{
          "postId":postId,
        }
      })
    ).data;
  } catch (error) {
    console.log("err: ", error);
  }
}
export async function deleteCommentService(payload) {
  try {
    return await (
      await Axios.post(`/api/Comment/delete`, payload, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
    ).data;
  } catch (error) {
    console.log("err: ", error);
  }
}

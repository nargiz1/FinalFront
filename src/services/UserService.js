import Axios from "../helpers/setupAxios";

export async function getUserService() {
  try {
    return await (
      await Axios.get(`/api/User/user`, {
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
export async function SearchUserService(searchUser) {
  try {
    return await (
      await Axios.get(`/api/User/seacrhUser`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        params: {
          query: `${searchUser}`,
        },
      })
    ).data;
  } catch (error) {
    console.log("err: ", error);
  }
}
export async function UpdateUserService(payload) {
  try {
    return await (
      await Axios.post(`/api/User/update`, payload, {
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
export async function getUsersService(skip, take) {
  try {
    return await (
      await Axios.get(`/api/User/users`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        params: {
          Skip: skip,
          Take: take,
        },
      })
    ).data;
  } catch (error) {
    console.log("err: ", error);
  }
}
export async function profilePicService(payload) {
  try {
    return await (
      await Axios.post(`/api/User/profilePic`, payload, {
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
export async function coverPicService(payload) {
  try {
    return await (
      await Axios.post(`/api/User/coverPic`, payload, {
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
export async function getUserByIdService(userId) {
  try {
    return await (
      await Axios.get(`/api/User/userById`,{
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        params:{
          "userId":`${userId}`,
        }
      })
      ).data;
  } catch (error) {
    console.log("err: ", error);
  }
};


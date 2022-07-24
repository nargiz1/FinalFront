import Axios from "../helpers/setupAxios"

export async function CreateChat(payload) {
    try {
        return await (await Axios.post(`/api/PrivateChat/Create`, payload, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
                'accept':'application/json'
            }
        })).data;
    } catch (error) {
        console.log('err: ', error);
    }
};

export async function DeleteChat(payload) {
    try {
        return await (await Axios.post(`/api/PrivateChat/Delete`, payload, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
                'accept':'application/json'
            }
        })).data;
    } catch (error) {
        console.log('err: ', error);
    }
};

export async function getUserChats(user){
    try{
        return await(
            await Axios.get(`/api/PrivateChat/getUserPrivateChats`, {
                headers: {
                  "Access-Control-Allow-Origin" : "*",
                  "Content-Type" : 'application/json',
                  "accept" : 'application/json'
                },
                params : {
                    "userId" : `${user.id}`,
                }
              })
        ).data
    }catch(error){
        console.log("err: " + error)
    }
}
export async function ChatDoesntExist(user){
    try{
        return await(
            await Axios.get(`/api/PrivateChat/chatDoesntExists`, {
                headers: {
                  "Access-Control-Allow-Origin" : "*",
                  "Content-Type" : 'application/json',
                  "accept" : 'application/json'
                },
                params : {
                    "userId" : `${user.id}`,
                }
              })
        ).data
    }catch(error){
        console.log("err: " + error)
    }
}
export async function getChat(chat){
    try{
        return await(
            await Axios.get(`/api/PrivateChat/getChat`, {
                headers: {
                  "Access-Control-Allow-Origin" : "*",
                  "Content-Type" : 'application/json',
                  "accept" : 'application/json'
                },
                params : {
                    "chatId" : chat,
                }
              })
        ).data
    }catch(error){
        console.log("err: " + error)
    }
}

//groups
export async function CreateGroup(payload) {
    try {
        return await (await Axios.post(`/api/GroupChat/Create`, payload, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
                'accept':'application/json'
            }
        })).data;
    } catch (error) {
        console.log('err: ', error);
    }
};

export async function DeleteGroup(payload) {
    try {
        return await (await Axios.post(`/api/GroupChat/Delete`, payload, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
                'accept':'application/json'
            }
        })).data;
    } catch (error) {
        console.log('err: ', error);
    }
};

export async function getUserGroups(user){
    try{
        return await(
            await Axios.get(`/api/GroupChat/getUserGroupChats`, {
                headers: {
                  "Access-Control-Allow-Origin" : "*",
                  "Content-Type" : 'application/json',
                  "accept" : 'application/json'
                },
                params : {
                    "userId" : `${user.id}`,
                }
              })
        ).data
    }catch(error){
        console.log("err: " + error)
    }
};

export async function getGroup(group){
    try{
        return await(
            await Axios.get(`/api/GroupChat/getGroupChat`, {
                headers: {
                  "Access-Control-Allow-Origin" : "*",
                  "Content-Type" : 'application/json',
                  "accept" : 'application/json'
                },
                params : {
                    "chatId" : group,
                }
              })
        ).data
    }catch(error){
        console.log("err: " + error)
    }
};

export async function getGroupMembers(group){
    try{
        return await(
            await Axios.get(`/api/GroupChat/getGroupMembers`, {
                headers: {
                  "Access-Control-Allow-Origin" : "*",
                  "Content-Type" : 'application/json',
                  "accept" : 'application/json'
                },
                params : {
                    "groupId" : group,
                }
              })
        ).data
    }catch(error){
        console.log("err: " + error)
    }
};

export async function AddGroupMember(payload) {
    try {
        return await (await Axios.post(`/api/GroupChat/addMember`, payload, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
                'accept':'application/json'
            }
        })).data;
    } catch (error) {
        console.log('err: ', error);
    }
};

export async function DeleteGroupMember(payload) {
    try {
        return await (await Axios.post(`/api/GroupChat/deleteMember`, payload, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
                'accept':'application/json'
            }
        })).data;
    } catch (error) {
        console.log('err: ', error);
    }
};

export async function UpdateGroup(payload) {
    try {
        return await (await Axios.post(`/api/GroupChat/update`, payload, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
                'accept':'application/json'
            }
        })).data;
    } catch (error) {
        console.log('err: ', error);
    }
};
export async function UpdateGroupName(payload) {
    try {
        return await (await Axios.post(`/api/GroupChat/changeName`, payload, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
                'accept':'application/json'
            }
        })).data;
    } catch (error) {
        console.log('err: ', error);
    }
};
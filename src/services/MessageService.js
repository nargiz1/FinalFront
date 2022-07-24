import Axios from "../helpers/setupAxios"

export async function getChatMessages(id){
    try{
        return await(
            await Axios.get(`/api/Message/getChatMessages`, {
                headers: {
                  "Access-Control-Allow-Origin" : "*",
                  "Content-Type" : 'application/json',
                  "accept" : 'application/json'
                },
                params : {
                    "chatId" : id,
                }
              })
        ).data
    }catch(error){
        console.log("err: " + error)
    }
}

export async function CreateMessage(payload) {
    try {
        return await (await Axios.post(`/api/Message/Create`, payload, {
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

export async function DeleteMessage(payload) {
    try {
        return await (await Axios.post(`/api/Message/Delete`, payload, {
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
export async function MessageIsRead(payload) {
    try {
        return await (await Axios.post(`/api/Message/isRead`, payload, {
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

export async function MessagesAreRead(payload) {
    try {
        return await (await Axios.post(`/api/Message/areRead`, payload, {
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

//group

export async function getGroupMessages(group){
    try{
        return await(
            await Axios.get(`/api/Message/getGroupMessages`, {
                headers: {
                  "Access-Control-Allow-Origin" : "*",
                  "Content-Type" : 'application/json',
                  "accept" : 'application/json'
                },
                params : {
                    "chatId" : group.id,
                }
              })
        ).data
    }catch(error){
        console.log("err: " + error)
    }
}

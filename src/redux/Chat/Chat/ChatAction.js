import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { setMessages1, setUsersChat, setConnection } from './ChatSlice';

export const fetchJoinRoom = (user, room) => async (dispatch) => {
    try {
        const connection = new HubConnectionBuilder()
          .withUrl("http://localhost:39524/chat")
          .configureLogging(LogLevel.Information)
          .build();
  
        connection.on("UsersInRoom", (users) => {
          dispatch(setUsersChat(users));
        })
  
        connection.on("ReceiveMessage", (message) => {
          const messageObject = JSON.parse(message);
          dispatch(setMessages1(messages1 => [...messages1, messageObject]));
        });
  
        connection.onclose(e => {
          dispatch(setConnection());
          dispatch(setMessages1([]));
        })
  
        await connection.start();
        await connection.invoke("JoinRoom", { user, room });
        dispatch(setConnection(connection));
        
      } catch (e) {
        console.log(e);
      }
}
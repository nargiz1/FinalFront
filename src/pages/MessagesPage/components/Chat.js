import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsCheck } from 'react-icons/bs'
import {BsCheck2All} from 'react-icons/bs'


export function Chat({ messages }) {

  const messageRef = useRef();
  
  const messagesDb = useSelector((state) => state.message.messages);
  const user = useSelector((state) => state.user.currentUser);
  const chat = useSelector((state) => state.privateChat.Chat);


  // useEffect(()=> {
    
  // },[chat]);
  

  useEffect(() => {
    if (messageRef && messageRef.current) {
      messageRef.current.scrollIntoView();
    }
  }, [messages, messagesDb]);

  return (
    <div className="py-3 messages-wrapper">
      {/* <div className="message-date w-100 text-center">
        <span>06 December, 2022</span>
      </div> */}
      <div className="message-area mt-3">
        <div className="pe-4 ps-4" >
          {messagesDb && (
            messagesDb.map((m, index) => 
              <div ref={index===messagesDb.length - 1 && !messages.length ? messageRef : null} key={index} className={
                `mb-2 w-100 d-flex align-items-center position-relative justify-content-${m.userId == user.id ? "end" : "start"}`
              }>
                <div className={m.userId == user.id ?
                  "sender"
                  : "reciver"
                }>
                  <a
                    href="#"
                    className="d-flex align-items-center mb-3 text-dark text-decoration-none"
                  >
                    <div>
                      <img
                        className="profile-photo"
                        src={"http://localhost:39524/" + (m.user.imageUrl)}
                        alt="profile-photo"
                      />
                    </div>
                  </a>
                </div>
                <div className={m.userId == user.id ?
                  "message-blue"
                  : "message-gray"
                }>{m.text}
                <span className="isRead">
                {m.isRead === true ? 
                <BsCheck2All/> :
                <BsCheck/>
              }
                </span>
                </div>
              </div>
            ))}
          {messages.map((m, index) =>
            <div key={index} className={
              `mb-2 w-100 d-flex align-items-center position-relative justify-content-${m.userId == user.id ? "end" : "start"}`
            } ref={index===messages.length - 1 ? messageRef : null}>
              <div className={m.userId == user.id ?
                "sender"
                : "reciver"
              }>
                <a
                  href="#"
                  className="d-flex align-items-center mb-3 text-dark text-decoration-none"
                >
                  <div>
                    <img
                      className="profile-photo"
                      src={"http://localhost:39524/" + (m.userImage)}
                      alt="profile-photo"
                    />
                  </div>
                </a>
              </div>
              <div className={m.userId == user.id ?
                "message-blue"
                : "message-gray"
              }>{m.text} 
              <span className="isRead">
                {m.isRead === true ? 
                <BsCheck2All/> :
                <BsCheck/>
              }
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
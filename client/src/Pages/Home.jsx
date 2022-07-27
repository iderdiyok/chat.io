import "./Home.css";
import Navigation from "../Components/Navigation";
import Message from "../Components/messages/Message"
import { apiBaseUrl } from "../api/api"
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client"
import ChatHeader from "../Components/chatBox/ChatHeader";
import ChatFooter from "../Components/chatBox/ChatFooter";
import Aside from "../Components/Aside";


const Home = (props) => {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();
  const [showConversations, setShowConversations] = useState(false)

  //Connection to socketIO and getMessages from socket
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        created_at: Date.now(),
      });
    });
  }, []);
  
  //set live messages from socket saved messages
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  //Add user to socket
  useEffect(() => {
    socket.current.emit("addUser", props.userInfo?._id);
  }, [props.userInfo]);

  //get messages from DB
  useEffect(() => {
    const getMessages = async () => {
      try {
        fetch(`${apiBaseUrl}/api/messages/${currentChat?._id}`, {
          headers: {
              token: "JWT " + props.token
          }
        })
        .then(response => response.json())
        .then(conversationMessages => setMessages(conversationMessages.foundMessage))
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat, props.token]);
  
  //scroll to last message in chat body
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="d-flex">
      <Navigation user={props.userInfo} showConversations={showConversations} setShowConversations={setShowConversations}/>

      {/* Conversation */}
      <Aside 
        showConversations={showConversations}
        setCurrentChat={setCurrentChat}
        currentUser={props.userInfo}
        token={props.token}
      />
      {/* Conversation */}

      {/* chatBox */}
      <main class="col main" >
        <div class="container h-100">
          {currentChat ?  
          <div class="d-flex flex-column h-100 position-relative">
            {/* chat-header */}
            <ChatHeader userInfo={props.userInfo}/>
            {/* chat-body */}
            <div class="chat-body flex-1 h-100 hide-scrollbar">
              <div class="chat-body-inner pb-12">
                <div class="pb-6 pb-lg-12">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message 
                        message={m} 
                        own={m.sender === props.userInfo._id} 
                        currentUser={props.userInfo} 
                        token={props.token}
                      />
                    </div>  
                  ))}
                </div>
              </div>
            </div>
            {/* chat-footer */}
            <ChatFooter
              newMessage={newMessage} 
              setNewMessage={setNewMessage}
              messages={messages} 
              setMessages={setMessages}
              userInfo={props.userInfo}
              currentChat={currentChat}
              socket={socket}
              token={props.token}
            />
          </div>
          : <p class="d-flex align-items-center justify-content-center text-muted fw-bold">Open a conversation to start a chat</p>}
        </div>
      </main>
      {/* chatBox */}
    </div>
  );
};
  
  export default Home;
import "./Home.css";
import Navigation from "../Components/Navigation";
import Conversation from "../Components/conversation/Conversation";
import Message from "../Components/messages/Message"
import { apiBaseUrl } from "../api/api"
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client"
import AllUsers from "../Components/allUsers/AllUsers";


const Home = (props) => {

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();
  const [showConversations, setShowConversations] = useState(false)


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

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", props.userInfo?._id);
  }, [props.userInfo]);
  //get conversations
  useEffect(() => {
    const getConversations = async () => {
      try {
        fetch(`${apiBaseUrl}/api/conversations/${props.userInfo._id}`, {
          headers: {
              token: "JWT " + props.token
          }
        })
        .then(response => response.json())
        .then(userConversations => setConversations(userConversations.foundConversation))
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [ props.token, props.userInfo]);

  //get messages
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


  //new message
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const message = {
      sender: props.userInfo._id,
      text: newMessage,
      conversation_id: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== props.userInfo._id
    );

    socket.current.emit("sendMessage", {
      senderId: props.userInfo._id,
      receiverId,
      text: newMessage,
    });

    try {
      fetch(`${apiBaseUrl}/api/messages/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: "JWT " + props.token
        },
        credentials: "include",
        body: JSON.stringify({message})
      })
      .then(response => response.json())
      .then(newMessage => setMessages([...messages, newMessage]))
      setNewMessage("")
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);





    return (
      <div className="d-flex">
        <Navigation user={props.userInfo} showConversations={showConversations} setShowConversations={setShowConversations}/>

        {/* Conversation */}
        <aside class="col-4 sidebar bg-light p-5">
          <div class="tab-content h-100" role="tablist">
            {/* Titel */}
            <div class="mb-8">
                <h2 class="fw-bold m-0">{showConversations ? "Chats" : "Users"}</h2>
            </div>
            {/* Search */}
            <div class="mb-5">
              <form action="#">
                  <div class="input-group">
                      <div class="input-group-text">
                          <div class="icon icon-lg">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                          </div>
                      </div>
                      <input type="text" class="form-control form-control-lg ps-0" placeholder="Search users" aria-label="Search for users..."/>
                  </div>
              </form>
            </div>
            {showConversations 
              ? 
                conversations
                ?
                conversations.map((c) => (
                  <div onClick={() => setCurrentChat(c)} className="card border-0 text-reset my-5">
                    <Conversation conversation={c} currentUser={props?.userInfo} token={props.token}/>
                  </div>
                ))
                :
                <p>Loading ...</p>
              : 
                <AllUsers token={props.token} currentId={props.userInfo?._id} setCurrentChat={setCurrentChat}/>
            }
          </div>
        </aside>
        {/* Conversation */}

        {/* chatBox */}
        <main class="col main" >
          <div class="container h-100">
            {currentChat ?  
            <div class="d-flex flex-column h-100 position-relative">
              {/* chat-header */}
              <div class="chat-header border-bottom py-4 py-lg-7">
                <div class="row align-items-center">
                  <div class="col-8 col-xl-12">
                    <div class="row align-items-center text-center text-xl-start">
                        <div class="col-12 col-xl-6">
                          <div class="row align-items-center gx-5">
                            <div class="col-auto">
                              <div class="avatar d-none d-xl-inline-block">
                                <img class="avatar-img" src={props.userInfo?.avatar} alt=""/>
                              </div>
                            </div>
                            <div class="col overflow-hidden">
                              <h5 class="text-truncate">{props.userInfo?.name}</h5>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
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
              <div class="chat-footer pb-3 pb-lg-7 position-absolute bottom-0 start-0">
                  
                  <div class="dz-preview bg-dark" id="dz-preview-row" data-horizontal-scroll="">
                  </div>
                  <form class="chat-form rounded-pill bg-dark">
                      <div class="row align-items-center gx-0">
                          <div class="col">
                              <div class="input-group">
                                  <textarea 
                                    class="form-control px-0" 
                                    placeholder="Type your message..." 
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={(e) => {e.key === "Enter" && handleSubmit(e);}}
                                  ></textarea>
                              </div>
                          </div>
                          <div class="col-auto">
                              <button class="btn btn-icon btn-primary rounded-circle ms-5" onClick={handleSubmit}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                              </button>
                          </div>
                      </div>
                  </form>
              </div>
            </div>
            : <p class="d-flex align-items-center justify-content-center text-muted fw-bold">Open a conversation to start a chat</p>}
          </div>
        </main>
        {/* chatBox */}
  </div>
    );
  };
  
  export default Home;
import Conversation from "./conversation/Conversation";
import AllUsers from "./allUsers/AllUsers";
import { apiBaseUrl } from "../api/api"
import { useEffect, useState } from "react";

const Aside = (props) => {
  const [conversations, setConversations] = useState([]);

  //get conversations
  useEffect(() => {
    const getConversations = async () => {
      try {
        fetch(`${apiBaseUrl}/api/conversations/${props.currentUser._id}`, {
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
  }, [props.currentUser, props.token]);

  return (
      <aside class="col-4 sidebar bg-light p-5">
        <div class="tab-content h-100" role="tablist">
          {/* Titel */}
          <div class="mb-8">
              <h2 class="fw-bold m-0">{props.showConversations ? "Chats" : "Users"}</h2>
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
          {props.showConversations 
            ? 
              conversations
              ?
              conversations.map((c) => (
                <div onClick={() => props.setCurrentChat(c)} className="card border-0 text-reset my-5">
                  <Conversation conversation={c} currentUser={props?.currentUser} token={props.token}/>
                </div>
              ))
              :
              <p>Loading ...</p>
            : 
              <AllUsers token={props.token} currentId={props.currentUser?._id} setCurrentChat={props.setCurrentChat}/>
          }
        </div>
      </aside>
  );
}

export default Aside;  
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../api/api"

const Conversation = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const friendId = props.conversation.members.find((m) => m !== props.currentUser._id);
        const getUser = async () => {
          try {
            fetch(apiBaseUrl + "/api/users?userId=" + friendId, {
                headers: {
                    token: "JWT " + props.token
                }
            })
            .then(response => response.json())
            .then(userInfoResult => setUser(userInfoResult))
          } catch (err) {
            console.log(err);
          }
        };
        getUser();
      }, [props.currentUser, props.conversation, props.token]);

    return (
        <div class="card-body">
            <div class="row gx-5">
                <div class="col-auto">
                    <div class="avatar">
                        <img src={user?.avatar} alt="#" class="avatar-img"/>
                    </div>
                </div>

                <div class="col">
                    <div class="d-flex align-items-center mb-3">
                        <h5 class="me-auto mb-0">{user ? user.name : "name"}</h5>
                        <span class="text-muted extra-small ms-2">
                        {new Date(props.conversation?.created_at).toLocaleString('de-DE', {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>

                    {/* <div class="d-flex align-items-center">
                        <div class="line-clamp me-auto">
                            Last message from friend
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
 
export default Conversation;
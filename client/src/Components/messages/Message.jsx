import { useState, useEffect } from "react";
import { apiBaseUrl } from "../../api/api"

const Message = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!props.own) {
            const friendId = props.message.sender ;
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
        }
      }, [props.message, props.own, props.token]);

    return (
        <div className="py-3">
            <div className="message-divider">
                <small className="text-muted">
                {new Date(props.message?.created_at).toLocaleString('de-DE', {weekday: 'long', day: 'numeric', month: 'short' })}
                </small>
            </div>

            <div className={props.own ? "message" : "message message-out"}>
                <img className="avatar avatar-img" src={props.own ? props.currentUser?.avatar : user?.avatar} alt=""/>
                
                <div className="message-inner">
                    <div className="message-body">
                        <div className="message-content">
                            <div className="message-text">
                                <p>{props.message.text}</p>
                            </div>
                        </div>
                    </div>

                    <div className="message-footer">
                        <span className="extra-small text-muted">
                        {new Date(props.message?.created_at).toLocaleString('de-DE', {hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
}
 
export default Message;
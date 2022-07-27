import { apiBaseUrl } from "../../api/api"

const ChatFooter = (props) => {

    //new message
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const message = {
            sender: props.userInfo._id,
            text: props.newMessage,
            conversation_id: props.currentChat._id,
        };

        const receiverId = props.currentChat.members.find(
            (member) => member !== props.userInfo._id
        );

        props.socket.current.emit("sendMessage", {
            senderId: props.userInfo._id,
            receiverId,
            text: props.newMessage,
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
            .then(newMessage => props.setMessages([...props.messages, newMessage]))
            props.setNewMessage("")
        } catch (err) {
            console.log(err);
        }
    };

    return (
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
                            value={props.newMessage}
                            onChange={(e) => props.setNewMessage(e.target.value)}
                            onKeyDown={(e) => {e.key === "Enter" && handleSubmit(e);}}
                            ></textarea>
                        </div>
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-icon btn-primary rounded-circle ms-5" onClick={handleSubmit()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ChatFooter;
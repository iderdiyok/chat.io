const ChatHeader = (props) => {
    return (
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
    );
}
 
export default ChatHeader;
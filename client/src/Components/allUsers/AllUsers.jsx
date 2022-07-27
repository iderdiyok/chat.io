import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../api/api"

const AllUsers = (props) => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const getUser = async () => {
          try {
            fetch(apiBaseUrl + "/api/users/allUsers", {
                headers: {
                    token: "JWT " + props.token
                }
            })
            .then(response => response.json())
            .then(allUsersResult => setUsers(allUsersResult))
          } catch (err) {
            console.log(err);
          }
        };
        getUser();
      }, [props.token]);

      const handleClick = async (user) => {
        try {
            fetch(`${apiBaseUrl}/api/conversations/find/${props.currentId}/${user._id}`, {
                headers: {
                    token: "JWT " + props.token
                }
            })
            .then(response => response.json())
            .then(usersConversation => props.setCurrentChat(usersConversation.foundConversation))
        } catch (err) {
          console.log(err);
        }
      };
    return (
        <>
        {users?.map(user => (
            <div className="card border-0 text-reset my-5" onClick={() => handleClick(user)}>
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
                    </div>
                </div>
            </div>
        </div>
        </div>
        ))}
        </>
    );
}
 
export default AllUsers;
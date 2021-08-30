import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../app.css';

const WorkspaceUsers = () => {
    const [message, setMessage] = useState("");

    const [workspaceId, setWorkspaceId] = useState(0);
    const [userId, setUserId] = useState(0);

    const [showNewWorkspaceUser, setShowNewWorkspaceUser] = useState(false);
    const history = useHistory();

    const { getAccessTokenSilently } = useAuth0();

    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const callShowNewUser = () => {
        setShowNewWorkspaceUser(true);    
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            let pbiWorkspaceUserData = {
                userId: userId,
                workspaceId: workspaceId 
            };
            const token = await getAccessTokenSilently();
            const createPbiWorkspaceUserResponse = await fetch(`${serverUrl}/workspaceusers`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(pbiWorkspaceUserData)
            });
            console.log('createPbiWorkspaceUserResponse is ' + createPbiWorkspaceUserResponse);
            const createPbiWorkspaceUserResponseData = await createPbiWorkspaceUserResponse.json();
            console.log('createPbiWorkspaceUserResponseData is ' + createPbiWorkspaceUserResponseData);

            history.push("./admin");
        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <div>
            <div className="container">
                <h1>Workspace Users</h1>
            </div>
            <div>
            <button
                type="button"
                className="btn btn-primary"
                onClick={callShowNewUser}
                >
                New Workdpace User
            </button>
            </div>
            {showNewWorkspaceUser &&
            <div>
                <form onSubmit={handleSubmit}>
                <label>
                    User Id:
                    <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
                </label>
                <label>
                    Workspace Id:
                    <input type="text" value={workspaceId} onChange={e => setWorkspaceId(e.target.value)} />
                </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>}

        </div>
    );
}

export default WorkspaceUsers;
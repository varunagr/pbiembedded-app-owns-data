import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../app.css';

const Workspaces = () => {
    const [message, setMessage] = useState("");
    const [showDiv, setShowDiv] = useState(false);
    const [workspaceName, setWorkspaceName] = useState("");
    const [tenantId, setTenantId] = useState(0);
    const [workspaceLocation, setWorkspaceLocation] = useState("");
    const history = useHistory();
    const { getAccessTokenSilently } = useAuth0();
    const serverUrl = 'http://localhost:8080';

    const callShowDiv = async () => {
        setShowDiv(!showDiv);    
    };
    const handleSubmit = async (evt) => {
        evt.preventDefault();
       try {
     /*        let data = {
                tenantName: tenantName
            };
            const createTenantResponse = await fetch(`${serverUrl}/tenants`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log('createTenantResponse is ' + createTenantResponse);
            const createTenantResponseData = await createTenantResponse.json();
            console.log('createTenantResponseData is ' + createTenantResponseData);
*/
            let pbiWorkspaceData = {
                workspaceLocation: workspaceLocation,
                workspaceName: workspaceName,
                tenantId: tenantId
            };
            const token = await getAccessTokenSilently();
            const createPbiWorkspaceResponse = await fetch(`${serverUrl}/workspaces`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(pbiWorkspaceData)
            });
            console.log('createPbiWorkspaceResponse is ' + createPbiWorkspaceResponse);
            const createPbiWorkspaceResponseData = await createPbiWorkspaceResponse.json();
            console.log('createPbiWorkspaceResponseData is ' + createPbiWorkspaceResponseData);

            history.push("./admin");
        } catch (error) {
            setMessage(error.message);
        }
    };
    return (
        <div>
            <div className="container">
                <h1>Tenants</h1>
            </div>
            <div>
            <button
                type="button"
                className="btn btn-primary"
                onClick={callShowDiv}
                >
                Add Workspace
            </button>
            </div>
            {showDiv &&
            <div>
                <form onSubmit={handleSubmit}>
                <label>
                    Workspace Name:
                    <input type="text" value={workspaceName} onChange={e => setWorkspaceName(e.target.value)} />
                </label>
                <label>
                   Workspace Location:
                    <input type="text" value={workspaceLocation} onChange={e => setWorkspaceLocation(e.target.value)} />
                </label>
                <label>
                   Tenant Id:
                    <input type="text" value={tenantId} onChange={e => setTenantId(e.target.value)} />
                </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>}
        </div>
    );
}

export default Workspaces;
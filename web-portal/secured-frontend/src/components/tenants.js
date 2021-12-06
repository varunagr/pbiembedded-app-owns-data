import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../app.css';

const Tenants = () => {
    const [message, setMessage] = useState("");
    const [showDiv, setShowDiv] = useState(false);
    const [tenantName, setTenantName] = useState("");
    const [tenant, setTenant] = useState({});
    const history = useHistory();
    const { getAccessTokenSilently } = useAuth0();
    const serverUrl = 'http://localhost:8080';

    const callShowDiv = async () => {
        setShowDiv(!showDiv);    
    };
    
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            let tenantData = {
                tenantName: tenantName
            };
            const token = await getAccessTokenSilently();
            const createTenantResponse = await fetch(`${serverUrl}/tenants`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(tenantData)
            });
            const createTenantResponseData = await createTenantResponse.json();
            console.log('createTenantResponseData is ' + createTenantResponseData);
            setTenant(createTenantResponseData);


            let pbiWorkspaceData = {
                workspaceLocation: "eastus",
                workspaceName: tenantName,
                tenantId: createTenantResponseData.id
            };
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
                Show
            </button>
            </div>
            {showDiv &&
            <div>
                <form onSubmit={handleSubmit}>
                <label>
                    Tenant Name:
                    <input type="text" value={tenantName} onChange={e => setTenantName(e.target.value)} />
                </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>}
        </div>
    );
};

export default Tenants;
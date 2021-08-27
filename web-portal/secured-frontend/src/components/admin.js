import '../app.css';
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory, Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Admin = () => {
    const [message, setMessage] = useState("");
    const [tenants, setTenants] = useState([]);
    const [showTenants, setShowTenants] = useState(false);
    const [showWorkspaces, setShowWorkspaces] = useState(false);
    const [workspaces, setWorkspaces] = useState([]);
    const history = useHistory();
    const serverUrl = process.env.REACT_APP_SERVER_URL;

      const callTenants = async () => {
        console.log('Inside callTenants');
        try {
          const response = await fetch(`${serverUrl}/tenants`);
          console.log('Got the response inside callTenants');
          const responseData = await response.json();
          console.log('Got the responseData inside callTenants');
    
          setTenants(responseData);
          setShowWorkspaces(false);
          setShowTenants(true);
        } catch (error) {
          setMessage(error.message);
        }
      };

      const callNavigateTenants = () => {
        history.push('./tenants');
      };

      const callNavigateWorkspaces = () => {
        history.push('./workspaces');
      }

      const callWorkspaces = async () => {
        try {
          const response = await fetch(`${serverUrl}/workspaces`);
          console.log('Got respons back from workspaces');
          const responseData = await response.json();
          console.log('Thre responseData from callWorkspaces is ' + responseData);
          setWorkspaces(responseData);
          setShowTenants(false);
          setShowWorkspaces(true);
        } catch (error) {
          setMessage(error.message);
        }
      };

    return (
        <div className="container">
          <h1>External API</h1>
          <p>
            Use these buttons to call an external API. The protected API call has an
            access token in its authorization header. The API server will validate
            the access token using the Auth0 Audience value.
          </p>
          <div
            className="btn-group mt-5"
            role="group"
            aria-label="External API Requests Examples"
          >
            <button type="button" className="btn btn-primary" onClick={callTenants}>
              Tenants
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={callWorkspaces}
            >
              Workspaces
            </button>
          </div>
          {message && (
            <div className="mt-5">
              <h6 className="muted">Result</h6>
              <div className="container-fluid">
                <div className="row">
                  <code className="col-12 text-light bg-dark p-4">{message}</code>
                </div>
              </div>
            </div>
          )}
          {showTenants &&(
              <div>
                <div>Tenants</div>
                <div>
                    <button type="button" className="btn btn-primary" onClick={callNavigateTenants}>Add Tenant</button>
                </div>
                <div>
                <ul>
                    {tenants.map(tenant => (
                        <li key={tenant.id}><Link to={`/tenants/${tenant.id}`}>{tenant.tenantName}</Link></li>
                    ))}
                    {workspaces.map(workspace => (
                        <li key={workspace.id}><Link to={`/workspaces/${workspace.id}`}>{workspace.workspaceName}</Link></li>
                    ))}
                </ul>
                </div>
              </div>
          )}
          {showWorkspaces && (
            <div>
                <div>Workspaces</div>
                <div>
                    <button type="button" className="btn btn-primary" onClick={callNavigateWorkspaces}>Add Workspace</button>
                </div>
                <div>
                <ul>
                    {tenants.map(workspsace => (
                        <li key={workspsace.id}><Link to={`/workspaces/${workspsace.id}`}>{workspsace.tenantName}</Link></li>
                    ))}
                    {workspaces.map(workspace => (
                        <li key={workspace.id}><Link to={`/workspaces/${workspace.id}`}>{workspace.workspaceName}</Link></li>
                    ))}
                </ul>
                </div>
              </div>
          )}
        </div>
      );
}

export default Admin;
import '../app.css';
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import WorkspaceUsers from './workspace-users';

const Admin = () => {
    const [message, setMessage] = useState("");
    const [tenants, setTenants] = useState([]);
    const [users, setUsers] = useState([]);
    const [workspaceUsers, setWorkspaceUsers] = useState({});
    const [dataSets, setDatasets] = useData({});

    const [showTenants, setShowTenants] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [showWorkspaces, setShowWorkspaces] = useState(false);
    const [showWorkspaceUsers, setShowWorkspaceUsers] = useState(false);
    const [showWorkspaceReports, setShowWorkspaceReports] = useState(false);
    const [showDatasets, setShowDatasets] = useState(false);
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
          showNone();
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

      const callNavigateUsers = () => {
          history.push('./users');
      }

      const callNavigateWorkspaceUsers = () => {
          history.push('./workspaceusers');
      }

      const callNavigateWorkspaceReports = () => {
        history.push('./workspace-reports');
      }

      const callNavigateDatasets = () => {
        history.push('./datasets');
      }

      const showNone = () => {
        setShowTenants(false);
        setShowUsers(false); 
        setShowWorkspaces(false);
        setShowWorkspaceUsers(false);
        setShowWorkspaceReports(false);
        setShowDatasets(false);
      }

      const callWorkspaces = async () => {
        try {
          const response = await fetch(`${serverUrl}/workspaces`);
          console.log('Got respons back from workspaces');
          const responseData = await response.json();
          console.log('Thre responseData from callWorkspaces is ' + responseData);
          setWorkspaces(responseData);
          showNone();
          setShowWorkspaces(true);
        } catch (error) {
          setMessage(error.message);
        }
      };

      const callWorkspaceUsers = async () => {
        try {
          const response = await fetch(`${serverUrl}/workspaceusers`);
          console.log('Got respons back from workspaceusers');
          const responseData = await response.json();
          console.log('Thre responseData from callWorkspaceUsers is ' + responseData);
          setWorkspaceUsers(responseData);
          showNone();
          setShowWorkspaceUsers(true);
        } catch (error) {
          setMessage(error.message);
        }
      };

      const callUsers = async () => {
        try {
            const response = await fetch(`${serverUrl}/users`);
            console.log('Got respons back from users');
            const responseData = await response.json();
            console.log('Thre responseData from callUsers is ' + responseData);
            console.log('The email address is ' + responseData.email);
            setUsers(responseData);
            showNone();
            setShowUsers(true);
          } catch (error) {
            setMessage(error.message);
          }
      }

      const callDatasets = async () => {
        try {
            const response = await fetch(`${serverUrl}/datasets`);
            console.log('Got respons back from datasets');
            const responseData = await response.json();
            console.log('Thre responseData from callDatasets is ' + responseData);
            console.log('The dataset name is ' + responseData.dataSetName);
            setDatasets(responseData);
            showNone();
            setShowDatasets(true);
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={callUsers}
            >
              Users
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={callWorkspaceUsers}
            >
              Workspace Users
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={callDatasets}
            >
              Datasets
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
                    {workspaces.map(workspsace => (
                        <li key={workspsace.id}><Link to={`/workspaces/${workspsace.id}`}>{workspsace.id} - {workspsace.workspaceName}</Link></li>
                    ))}
                </ul>
                </div>
              </div>
          )}
          {showUsers && (
            <div>
                <div>Users</div>
                <div>
                    <button type="button" className="btn btn-primary" onClick={callNavigateUsers}>Add User</button>
                </div>
                <div>
                <ul>
                    {users.map(user => (
                        <li key={user.id}><Link to={`/users/${user.id}`}>{user.id} / {user.email}</Link></li>
                    ))}
                </ul>
                </div>
              </div>
          )}
          {showWorkspaceUsers && (
            <div>
                <div>Users</div>
                <div>
                    <button type="button" className="btn btn-primary" onClick={callNavigateWorkspaceUsers}>Add Workspace User</button>
                </div>
                <div>
                <ul>
                    {workspaceUsers.map(workspaceUser => (
                        <li key={workspaceUser.id}><Link to={`/users/${workspaceUser.id}`}>{workspaceUser.id} - {workspaceUser.userId}/{workspaceUser.workspaceId}</Link></li>
                    ))}
                </ul>
                </div>
              </div>
          )}
          {showWorkspaceReports && (
            <div>
                <div>Users</div>
                <div>
                    <button type="button" className="btn btn-primary" onClick={callNavigateWorkspaceReports}>Add Workspace Reports</button>
                </div>
                <div>
                <ul>
                    {users.map(workspaceReport => (
                        <li key={workspaceReport.id}><Link to={`/workspace-reports/${workspaceReport.id}`}>{workspaceReport.workspaceId}/{workspaceReport.reportId}</Link></li>
                    ))}
                </ul>
                </div>
              </div>
          )}
          {showDatasets && (
            <div>
                <div>Datasets</div>
                <div>
                    <button type="button" className="btn btn-primary" onClick={callNavigateDatasets}>Add Datasets</button>
                </div>
                <div>
                <ul>
                    {users.map(dataSet => (
                        <li key={dataSet.id}><Link to={`/datasets/${dataSet.id}`}>{dataSet.dataSetName}</Link></li>
                    ))}
                </ul>
                </div>
              </div>
          )}
        </div>
      );
}

export default Admin;
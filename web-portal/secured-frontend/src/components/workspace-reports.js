import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../app.css';

const WorkspaceReports = () => {
    const [message, setMessage] = useState("");

    const [workspaceId, setWorkspaceId] = useState(0);
    const [reportId, setReportId] = useState(0);

    const [showNewWorkspaceReport, setShowNewWorkspaceReport] = useState(false);
    const { getAccessTokenSilently } = useAuth0();
    const history = useHistory();

    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const callShowNewWorkspaceReport = () => {
        setShowNewWorkspaceReport(true);    
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            let pbiWorkspaceUserData = {
                workspaceId: workspaceId,
                reportId: reportId 
            };
            const token = await getAccessTokenSilently();
            const createPbiWorkspaceReportResponse = await fetch(`${serverUrl}/workspacereports`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(pbiWorkspaceUserData)
            });
            console.log('createPbiWorkspaceReportResponse is ' + createPbiWorkspaceReportResponse);
            const createPbiWorkspaceReportResponseData = await createPbiWorkspaceReportResponse.json();
            console.log('createPbiWorkspaceUserResponseData is ' + createPbiWorkspaceReportResponseData);

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
                onClick={callShowNewWorkspaceReport}
                >
                New Workdpace User
            </button>
            </div>
            {showNewWorkspaceReport &&
            <div>
                <form onSubmit={handleSubmit}>
                <label>
                    Workspace Id:
                    <input type="text" value={workspaceId} onChange={e => setWorkspaceId(e.target.value)} />
                </label>
                <label>
                    Report Id:
                    <input type="text" value={reportId} onChange={e => setReportId(e.target.value)} />
                </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>}

        </div>
    );
}

export default WorkspaceReports;
import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../app.css';

const Datasets = () => {
    const [message, setMessage] = useState("");
    const [showDiv, setShowDiv] = useState(false);

    const history = useHistory();
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const [tenandId, setTenantId] = useState(0);
    const [workspaceId, setWorkspaceId] = useState(0);
    const [pbiWorkspace, setPbiWorkspace] = useState("");
    const [pbiId, setPbiId] = useState("");
    const [dataSetName, setDataSetName] = useState("");
    const [createdBy, setCreatedBy] = useState("");

    const callShowDiv = async () => {
        setShowDiv(!showDiv);    
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            let data = {
                tenandId: tenandId,
                workspaceId: workspaceId,
                pbiWorkspace: pbiWorkspace,
          //      pbiId: pbiId,
                dataSetName: dataSetName,
                createdBy: createdBy 
            };
            const createDatasetResponse = await fetch(`${serverUrl}/datasets`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log('createDatasetResponse is ' + createDatasetResponse);
            const createDatasetResponseData = await createDatasetResponse.json();
            console.log('createDatasetResponseData is ' + createDatasetResponseData);

            history.push("./admin");
        } catch (error) {
            setMessage(error.message);
        }
    }
    return (
        <div>
            <div className="container">
                <h1>Users</h1>
            </div>
            <div>
            <button
                type="button"
                className="btn btn-primary"
                onClick={callShowDiv}
                >
                New Dataset
            </button>
            </div>
            {showDiv &&
            <div>
                <form onSubmit={handleSubmit}>
                <label>
                    Tenant Id:
                    <input type="text" value={tenandId} onChange={e => setTenantId(e.target.value)} />
                </label>
                <label>
                    Workspace Id:
                    <input type="text" value={workspaceId} onChange={e => setTenantId(e.target.value)} />
                </label>
                <label>
                    Power BI Workspace:
                    <input type="text" value={pbiWorkspace} onChange={e => setPbiWorkspace(e.target.value)} />
                </label>
                <label>
                    Power BI Id:
                    <input type="text" value={pbiId} onChange={e => setPbiId(e.target.value)} />
                </label>
                <label>
                    Dataset Name:
                    <input type="text" value={dataSetName} onChange={e => setDataSetName(e.target.value)} />
                </label>
                <label>
                    Created By:
                    <input type="text" value={createdBy} onChange={e => setCreatedBy(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
                </form>
            </div>}
        </div>
    );
}

export default Datasets;
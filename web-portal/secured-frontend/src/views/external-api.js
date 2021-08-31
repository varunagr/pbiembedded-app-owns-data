import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory, Link } from "react-router-dom";

const ExternalApi = () => {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [dataSets, setDatasets] = useState([]);
  const [userDataSets, setUserDataSets] = useState([]);
  const history = useHistory();
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const { getAccessTokenSilently } = useAuth0();

  const callAdmin = () => {
    history.push("/admin");
  };

  const callApi = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/public`);

      const responseData = await response.json();

      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(
        `${serverUrl}/api/private`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();
      setMessage(responseData.message);

    } catch (error) {
      setMessage(error.message);
    }
  };

  const callGetUsers = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(
        `${serverUrl}/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      const responseData = await response.json();

      setUsers(responseData);

      let message = "";
      responseData.forEach(element => {
        message += element.email + " ";
      });

      setMessage(message);
    } catch (error) {
      setMessage(error.message);
    }
  }

  const callGetUserReports = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `${serverUrl}/users/1/reports`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      const responseData = await response.json();
      setReports(responseData);
    } catch (error) {
      setMessage(error.message);
    }
  }

  const callGetUserDatasetsFromApi = async() => {
    try {
    const token = await getAccessTokenSilently();
    const response = await fetch(
      `${serverUrl}/users/1/datasets`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      console.log('Got the response back from callGetUserDatasetsFromApi.  The value is ' + responseData);
     // setUserDataSets(responseData);
     setDatasets(responseData);
    } catch (error) {
      setMessage(error.message);
    }
  }

  const callGetUserDataSets = async() => {
    try {
      //const response = await fetch(`${serverUrl}/users/1/reports`);
      //const responseData = await response.json();
      const responseData = [
        {
          id: "714dbd7d-cde7-43bd-8b28-0b06f3f8285f",
          dataSetName: "Weather"
        }
      ]
      setDatasets(responseData);
    } catch (error) {
      setMessage(error.message);
    }
  }

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
        <button type="button" className="btn btn-primary" onClick={callApi}>
          Get Public Message
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={callSecureApi}
        >
          Get Protected Message
        </button>
        <button
        type="button"
        className="btn btn-primary"
        onClick={callGetUserDataSets}
        >
          Get Datasets
        </button>
        <button
        type="button"
        className="btn btn-primary"
        onClick={callGetUserDatasetsFromApi}
        >
          Get User Datasets
        </button>
        <button
        type="button"
        className="btn btn-primary"
        onClick={callAdmin}
        >
          Admin
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
      <ul>
      {reports.map(report => (
        <li key={report.id}><Link to={`/reports/${report.id}`}>{report.reportName}</Link></li>
      ))}
      {dataSets.map(dataset => (
        <li key={dataset.id}><Link to={`/datasets/${dataset.id}/f9ee0ebe-14f2-45ec-af3a-34e4c4a399e3`}>{dataset.dataSetName}</Link></li>
      //<li key={dataset.id}><Link to={`/datasets/${dataset.pbiId}/${dataset.pbiWorkspaceId}`}>{dataset.dataSetName}</Link></li>
      ))}
    </ul>
    </div>
  );
};

export default ExternalApi;

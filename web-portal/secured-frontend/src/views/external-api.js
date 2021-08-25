import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const ExternalApi = () => {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [dataSets, setDatasets] = useState([]);
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const { getAccessTokenSilently } = useAuth0();

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
      const response = await fetch(`${serverUrl}/users`);
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
      const response = await fetch(`${serverUrl}/users/1/reports`);
      const responseData = await response.json();
      setReports(responseData);
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
          id: "19516b10-b7c4-408f-a6e2-c200fa45ee4a",
          name: "SalesReportTemplate"
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
          onClick={callGetUserReports}
        >
          Get Reports
        </button>
        <button
        type="button"
        className="btn btn-primary"
        onClick={callGetUserDataSets}
        >
          Get Datasets
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
        <li key={dataset.id}><Link to={`/datasets/${dataset.id}/f9ee0ebe-14f2-45ec-af3a-34e4c4a399e3`}>{dataset.name}</Link></li>
      ))}
    </ul>
    </div>
  );
};

export default ExternalApi;

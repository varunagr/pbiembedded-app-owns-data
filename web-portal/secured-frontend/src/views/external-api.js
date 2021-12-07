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
  const serverUrl = 'http://localhost:8080';

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
      // const token = await getAccessTokenSilently();
      const token = 'dummy'
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
          id: "7476e48c-62af-40c1-b54f-9a478f39d76e",
          dataSetName: "climate_change_dataset"
        },
        {
          id: "c521caeb-49ca-4b76-99c3-bac5a676056f",
          dataSetName: "esg_ratings_dataset"
        }
      ]
      setDatasets(responseData);
    } catch (error) {
      setMessage(error.message);
    }
  }

  const callGetUserReports = async() => {
    console.log("ENTERRRRRRRRRRRRRRR");
    try {
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EQTBPRE0wTlRVNFJETkRRalpETkVFMlJETTJOemc0TUVZNE5qRTBOakZETlVVNFF6QTBOdyJ9.eyJodHRwczovL2FjY291bnRzLm1zY2kuY29tL21zY2lfdXNlcl9pZCI6InR0WlVhejlnNFBBdUN0UDRVWGl2VjMxSTdMdTlRNVU0VVFuWkxVRzJNTUEiLCJodHRwczovL2FjY291bnRzLm1zY2kuY29tL3RlbmFudHMiOlsiTVNDSSJdLCJodHRwczovL2FjY291bnRzLm1zY2kuY29tL2RvbWFpbiI6Im1zY2kuY29tIiwiaHR0cHM6Ly9hY2NvdW50cy5tc2NpLmNvbS9yb2xlcyI6W10sImlzcyI6Imh0dHBzOi8vbXNjaS1xYTEuYXV0aDAuY29tLyIsInN1YiI6IndhYWR8dHRaVWF6OWc0UEF1Q3RQNFVYaXZWMzFJN0x1OVE1VTRVUW5aTFVHMk1NQSIsImF1ZCI6WyJkYXRhZXhwbG9yZXItcWEiLCJodHRwczovL21zY2ktcWExLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2Mzg4NTkzNjksImV4cCI6MTYzODg2Mjk2OSwiYXpwIjoia1p2ZllBY0JWMHU1cmdHSFluTVZsQU5pUFdUN2w3SWkiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHJlYWQ6ZGF0YVNldCBvZmZsaW5lX2FjY2VzcyJ9.Sc-Q7BdpILEr-shPaPekMbI_i11mRuvmxaVONCMQmYHADBSsKy_0AGgkonij0JyT94WlBeMK_ZprRtTTx5R-ZmNoVuf9gvo9yuppeM213ikyZc1sPX9hAKEewMPtrYux8fpKNqkX0VRYaSLtXY5tswRCIch-aE5ab4odzEEPoZT2plnP6BOD713ysG-VSeQH3lim-oK9ANI2sAkZqHm5GykR3frgFEtlFJ6N1K-XyH80XudQldtNkcmvaoBwR3jUsBPTR8PdHq727dLO_CzUhvsO1bukaN3uB9rs3r9JJp3cvgZYcMdkse7mZZQNbl3tCQViQ7Os37eoMUzkDEkpmg";
    const response = await fetch(
      `${serverUrl}/users/report`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      console.log('Got the response back from callGetUserDatasetsFromApi.  The value is ' + responseData);
     // setUserDataSets(responseData);
     setReports(responseData);
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
        onClick={callGetUserReports}
        >
          Get Reports
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

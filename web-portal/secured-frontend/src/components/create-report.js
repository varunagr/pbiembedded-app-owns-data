import logo from './logo.svg';
import '../app.css';
import { useEffect, useState } from 'react';
import { service, factories, models, IEmbedConfiguration } from "powerbi-client";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory, Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const CreateReport = () => {
    const powerbi = new service.Service(factories.hpmFactory, factories.wpmpFactory, factories.routerFactory);
    const { getAccessTokenSilently } = useAuth0();
    const [embedConfig, setEmbedConfig] = useState({});
    const [clonedReport, setClonedReport] = useState({});
    const [message, setMessage] = useState("");
    const history = useHistory();
    
    const { datasetId, workspaceId } = useParams();
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const callCloneReport = async(reportId, reportName, sourceWorkspaceId, destinationWorkspaceId) => {
        let data = {
            sourceWorkspaceId: sourceWorkspaceId,
            destinationWorkspaceId: destinationWorkspaceId,
            reportId: reportId,
            reportName: reportName
        };
        try {
          const token = await getAccessTokenSilently();
          const clonedReportResponse = await fetch(`${serverUrl}/reports/${reportId}/clone`, {
              method: 'POST',
              mode: 'cors',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify(data)
          });
          console.log('Got the clone response with a value of ' + clonedReportResponse);
          const clonedReportResponseData = await clonedReportResponse.json();
          console.log('Got the json value of ' + clonedReportResponseData);
          console.log('The new report id is ' + clonedReportResponseData.pbiIdentifier);
          // delete the origional report with the passed in reportId
          history.push(`/reports/${clonedReportResponseData.pbiIdentifier}`);
         // setClonedReport(clonedReportResponseData);
        } catch (error) {
          setMessage(error.message);
        }
    };

    useEffect(() => {
        console.log('entered useEffect()');

        const callGetEmbedConfig = async () => {
       //     try {
              const pbiConfigResponse = await fetch(`${serverUrl}/datasets/${datasetId}/config`);
              const pbiConfigResponseData = await pbiConfigResponse.json();
    
              console.log('Inside callGetEmbedConfig. The response back was ' + pbiConfigResponseData);
    
              setEmbedConfig(pbiConfigResponseData);


       //     } catch (error) {
      //        setMessage(error.message);
       //     }

            console.log('After callGetEmbedConfig()');

        let reportContainer = document.getElementById("reportContainer");
        
        let embedCreateConfiguration = {
            type: "report",
            tokenType: 1,
            accessToken: pbiConfigResponseData.embedToken.token,
            embedUrl: pbiConfigResponseData.embedDatasets[0].createReportEmbedURL,
            datasetId: pbiConfigResponseData.embedDatasets[0].id,
            permissions: models.Permissions.All,
            settings: {
              panes: {
                filters: {
                  expanded: true,
                  visible: true
                }
              },
            }
        };

        if (reportContainer != null) {
            let report = powerbi.createReport(reportContainer, embedCreateConfiguration);
            // Clear any other loaded handler events
            report.off("loaded");

            // Triggers when a content schema is successfully loaded
            report.on("loaded", function () {
            console.log("Report load successful");
            });

            // Clear any other rendered handler events
            report.off("rendered");

            // Triggers when a content is successfully embedded in UI
            report.on("rendered", function () {
                console.log("Report render successful");
            });

            report.off("saved");
            report.on("saved", function (event) {
                let reportId = event.detail.reportObjectId;
                let reportName = event.detail.reportName;
                let sourceWorkspaceId = "f9ee0ebe-14f2-45ec-af3a-34e4c4a399e3";
                let destinationWorkspaceId = "6e5482de-8849-4ec2-b432-0939f3a15f31";
                callCloneReport(reportId, reportName, sourceWorkspaceId, destinationWorkspaceId);
            });
        } else {
            console.log('Report container was not found');
        }
        };

        callGetEmbedConfig();   
    }, []);
    return (
        <div className="App">
          <header className="App-header">
            <div id="reportContainer" className="Embed-container">
            </div>
          </header>
        </div>
      );
}

export default CreateReport;
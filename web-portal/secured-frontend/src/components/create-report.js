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
    const serverUrl = 'http://localhost:8080';

    const callCloneReport = async(reportId, reportName, sourceWorkspaceId, destinationWorkspaceId) => {
        let data = {
            sourceWorkspaceId: sourceWorkspaceId,
            destinationWorkspaceId: destinationWorkspaceId,
            reportId: reportId,
            reportName: reportName
        };
        try {
          // const token = await getAccessTokenSilently();
          const token = 'dummy';
          const clonedReportResponse = await fetch(`${serverUrl}/reports/${reportId}/clone`, {
              method: 'POST',
              mode: 'cors',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify(data)
          });
          const clonedReportResponseData = await clonedReportResponse.json();
          // delete the origional report with the passed in reportId
          history.push(`/reports/${clonedReportResponseData.pbiIdentifier}`);
        } catch (error) {
          setMessage(error.message);
        }
    };

    useEffect(() => {
        console.log('entered useEffect()');

        const callGetEmbedConfig = async () => {
              const pbiConfigResponse = await fetch(`${serverUrl}/datasets/config?datasetIds=7476e48c-62af-40c1-b54f-9a478f39d76e,c521caeb-49ca-4b76-99c3-bac5a676056f`);
              const pbiConfigResponseData = await pbiConfigResponse.json();
              setEmbedConfig(pbiConfigResponseData);

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

                

                report.on("saveAsTriggered", function (event) {
                    let saveAsParameters = {
                        name: "newReport5",
                        targetWorkspaceId: "fae2e405-c57d-4015-b72e-c5c691728a26"
                    };
                    report.saveAs(saveAsParameters);
                    console.log("sss");
                });

           

                report.off("saved");
                // report.on("saved", function (event) {
                //     let reportId = event.detail.reportObjectId;
                //     let reportName = event.detail.reportName;
                //     let sourceWorkspaceId = "a586fb0a-38b7-4808-928f-a03c4b7292ee";
                //     let destinationWorkspaceId = "fae2e405-c57d-4015-b72e-c5c691728a26";
                //     callCloneReport(reportId, reportName, sourceWorkspaceId, destinationWorkspaceId);
                // });
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
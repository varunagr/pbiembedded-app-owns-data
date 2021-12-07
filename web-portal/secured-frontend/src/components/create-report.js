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

    const callPostSave = async(reportId, reportWorkspaceId) => {
      let data = {
        reportPbId: reportId,
        reportWorkspacePbId: reportWorkspaceId
      };
      try {
        // const token = await getAccessTokenSilently();
        const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EQTBPRE0wTlRVNFJETkRRalpETkVFMlJETTJOemc0TUVZNE5qRTBOakZETlVVNFF6QTBOdyJ9.eyJodHRwczovL2FjY291bnRzLm1zY2kuY29tL21zY2lfdXNlcl9pZCI6InR0WlVhejlnNFBBdUN0UDRVWGl2VjMxSTdMdTlRNVU0VVFuWkxVRzJNTUEiLCJodHRwczovL2FjY291bnRzLm1zY2kuY29tL3RlbmFudHMiOlsiTVNDSSJdLCJodHRwczovL2FjY291bnRzLm1zY2kuY29tL2RvbWFpbiI6Im1zY2kuY29tIiwiaHR0cHM6Ly9hY2NvdW50cy5tc2NpLmNvbS9yb2xlcyI6W10sImlzcyI6Imh0dHBzOi8vbXNjaS1xYTEuYXV0aDAuY29tLyIsInN1YiI6IndhYWR8dHRaVWF6OWc0UEF1Q3RQNFVYaXZWMzFJN0x1OVE1VTRVUW5aTFVHMk1NQSIsImF1ZCI6WyJkYXRhZXhwbG9yZXItcWEiLCJodHRwczovL21zY2ktcWExLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2Mzg4NTkzNjksImV4cCI6MTYzODg2Mjk2OSwiYXpwIjoia1p2ZllBY0JWMHU1cmdHSFluTVZsQU5pUFdUN2w3SWkiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHJlYWQ6ZGF0YVNldCBvZmZsaW5lX2FjY2VzcyJ9.Sc-Q7BdpILEr-shPaPekMbI_i11mRuvmxaVONCMQmYHADBSsKy_0AGgkonij0JyT94WlBeMK_ZprRtTTx5R-ZmNoVuf9gvo9yuppeM213ikyZc1sPX9hAKEewMPtrYux8fpKNqkX0VRYaSLtXY5tswRCIch-aE5ab4odzEEPoZT2plnP6BOD713ysG-VSeQH3lim-oK9ANI2sAkZqHm5GykR3frgFEtlFJ6N1K-XyH80XudQldtNkcmvaoBwR3jUsBPTR8PdHq727dLO_CzUhvsO1bukaN3uB9rs3r9JJp3cvgZYcMdkse7mZZQNbl3tCQViQ7Os37eoMUzkDEkpmg";

        const clonedReportResponse = await fetch(`${serverUrl}/reports/post/save`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });
      
      } catch (error) {
        setMessage(error.message);
      }
  };

    useEffect(() => {
        console.log('entered useEffect()');

        const callGetEmbedConfig = async () => {
            const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EQTBPRE0wTlRVNFJETkRRalpETkVFMlJETTJOemc0TUVZNE5qRTBOakZETlVVNFF6QTBOdyJ9.eyJodHRwczovL2FjY291bnRzLm1zY2kuY29tL21zY2lfdXNlcl9pZCI6InR0WlVhejlnNFBBdUN0UDRVWGl2VjMxSTdMdTlRNVU0VVFuWkxVRzJNTUEiLCJodHRwczovL2FjY291bnRzLm1zY2kuY29tL3RlbmFudHMiOlsiTVNDSSJdLCJodHRwczovL2FjY291bnRzLm1zY2kuY29tL2RvbWFpbiI6Im1zY2kuY29tIiwiaHR0cHM6Ly9hY2NvdW50cy5tc2NpLmNvbS9yb2xlcyI6W10sImlzcyI6Imh0dHBzOi8vbXNjaS1xYTEuYXV0aDAuY29tLyIsInN1YiI6IndhYWR8dHRaVWF6OWc0UEF1Q3RQNFVYaXZWMzFJN0x1OVE1VTRVUW5aTFVHMk1NQSIsImF1ZCI6WyJkYXRhZXhwbG9yZXItcWEiLCJodHRwczovL21zY2ktcWExLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2Mzg4NTkzNjksImV4cCI6MTYzODg2Mjk2OSwiYXpwIjoia1p2ZllBY0JWMHU1cmdHSFluTVZsQU5pUFdUN2w3SWkiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHJlYWQ6ZGF0YVNldCBvZmZsaW5lX2FjY2VzcyJ9.Sc-Q7BdpILEr-shPaPekMbI_i11mRuvmxaVONCMQmYHADBSsKy_0AGgkonij0JyT94WlBeMK_ZprRtTTx5R-ZmNoVuf9gvo9yuppeM213ikyZc1sPX9hAKEewMPtrYux8fpKNqkX0VRYaSLtXY5tswRCIch-aE5ab4odzEEPoZT2plnP6BOD713ysG-VSeQH3lim-oK9ANI2sAkZqHm5GykR3frgFEtlFJ6N1K-XyH80XudQldtNkcmvaoBwR3jUsBPTR8PdHq727dLO_CzUhvsO1bukaN3uB9rs3r9JJp3cvgZYcMdkse7mZZQNbl3tCQViQ7Os37eoMUzkDEkpmg";

              const pbiConfigResponse = await fetch(`${serverUrl}/datasets/d1/config`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              const pbiConfigResponseData = await pbiConfigResponse.json();
              setEmbedConfig(pbiConfigResponseData);

            let reportContainer = document.getElementById("reportContainer");
            
            let embedCreateConfiguration = {
                type: "report",
                tokenType: 1,
                accessToken: pbiConfigResponseData.accessToken,
                embedUrl: pbiConfigResponseData.embedUrl,
                datasetId: pbiConfigResponseData.datasetId,
                permissions: models.Permissions.All,
                settings: {
                  useCustomSaveAsDialog: true,
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
                        name: "newreport2",
                        targetWorkspaceId: pbiConfigResponseData.targetWorkspaceId
                    };
                    report.saveAs(saveAsParameters);
                    console.log("sss");
                });

           

                report.off("saved");
                report.on("saved", function (event) {
                    let reportId = event.detail.reportObjectId;
                    callPostSave(reportId,pbiConfigResponseData.targetWorkspaceId);
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
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

const Report = () => {
    const [reportConfig, setReportConfig] = useState({});
    const [message, setMessage] = useState("");

    const { reportId } = useParams();
    const { getAccessTokenSilently } = useAuth0();
    const serverUrl = 'http://localhost:8080';

    console.log('Got the reportId from the params ' + reportId);

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
        const callGetReportConfig = async () => {
          try {
            const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EQTBPRE0wTlRVNFJETkRRalpETkVFMlJETTJOemc0TUVZNE5qRTBOakZETlVVNFF6QTBOdyJ9.eyJodHRwczovL2FjY291bnRzLm1zY2kuY29tL21zY2lfdXNlcl9pZCI6InR0WlVhejlnNFBBdUN0UDRVWGl2VjMxSTdMdTlRNVU0VVFuWkxVRzJNTUEiLCJodHRwczovL2FjY291bnRzLm1zY2kuY29tL3RlbmFudHMiOlsiTVNDSSJdLCJodHRwczovL2FjY291bnRzLm1zY2kuY29tL2RvbWFpbiI6Im1zY2kuY29tIiwiaHR0cHM6Ly9hY2NvdW50cy5tc2NpLmNvbS9yb2xlcyI6W10sImlzcyI6Imh0dHBzOi8vbXNjaS1xYTEuYXV0aDAuY29tLyIsInN1YiI6IndhYWR8dHRaVWF6OWc0UEF1Q3RQNFVYaXZWMzFJN0x1OVE1VTRVUW5aTFVHMk1NQSIsImF1ZCI6WyJkYXRhZXhwbG9yZXItcWEiLCJodHRwczovL21zY2ktcWExLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2Mzg4NTkzNjksImV4cCI6MTYzODg2Mjk2OSwiYXpwIjoia1p2ZllBY0JWMHU1cmdHSFluTVZsQU5pUFdUN2w3SWkiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHJlYWQ6ZGF0YVNldCBvZmZsaW5lX2FjY2VzcyJ9.Sc-Q7BdpILEr-shPaPekMbI_i11mRuvmxaVONCMQmYHADBSsKy_0AGgkonij0JyT94WlBeMK_ZprRtTTx5R-ZmNoVuf9gvo9yuppeM213ikyZc1sPX9hAKEewMPtrYux8fpKNqkX0VRYaSLtXY5tswRCIch-aE5ab4odzEEPoZT2plnP6BOD713ysG-VSeQH3lim-oK9ANI2sAkZqHm5GykR3frgFEtlFJ6N1K-XyH80XudQldtNkcmvaoBwR3jUsBPTR8PdHq727dLO_CzUhvsO1bukaN3uB9rs3r9JJp3cvgZYcMdkse7mZZQNbl3tCQViQ7Os37eoMUzkDEkpmg";

            const response = await fetch(
              `${serverUrl}/reports/${reportId}/config`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log('Inside callGetReportConfig.  Got a response back of ' + response);
            const responseData = await response.json();
      
            setReportConfig(responseData);
            console.log('After settings report config to state');
          } catch (error) {
            setMessage(error.message);
          }
        };
  
        callGetReportConfig();
      }, []);

    return (

        <PowerBIEmbed
          embedConfig = {{
            type: 'report',   // Supported types: report, dashboard, tile, visual and qna
            id: reportConfig.reportId,
            //embedUrl: reportConfig.embedUrl,
            embedUrl: reportConfig.embedUrl,
            accessToken: reportConfig.accessToken,
            tokenType: models.TokenType.Embed,
            permissions: models.Permissions.All,
            //datasetBinding:{datasetId : "7476e48c-62af-40c1-b54f-9a478f39d76e"},
            viewMode: models.ViewMode.Edit,
            settings: {
              panes: {
                filters: {
                  expanded: true,
                  visible: true
                }
              },
       //       background: models.BackgroundType.Transparent,
            }
          }}

          eventHandlers = { 
            new Map([
              ['loaded', function () {console.log('Report loaded');}],
              ['rendered', function () {console.log('Report rendered');}],
              ['error', function (event) {console.log(event.detail);}],
              ['saved', function (event,reportConfig) {
                let reportId = event.detail.reportObjectId;
                console.log("workspaceidsdddddddddd", reportConfig.config.groupId);
                callPostSave(reportId,reportConfig.config.groupId);
                console.log('Report saved');}]
            ])
          }
            
          cssClassName = { "Embed-container" }

          getEmbeddedComponent = { (embeddedReport) => {
            window.report = embeddedReport;
          }}
        />
      );
};

export default Report;
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
        const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EQTBPRE0wTlRVNFJETkRRalpETkVFMlJETTJOemc0TUVZNE5qRTBOakZETlVVNFF6QTBOdyJ9.eyJodHRwczovL2FjY291bnRzLm1zY2kuY29tL21zY2lfdXNlcl9pZCI6InR0WlVhejlnNFBBdUN0UDRVWGl2VjMxSTdMdTlRNVU0VVFuWkxVRzJNTUEiLCJodHRwczovL2FjY291bnRzLm1zY2kuY29tL3RlbmFudHMiOlsiTVNDSSJdLCJodHRwczovL2FjY291bnRzLm1zY2kuY29tL2RvbWFpbiI6Im1zY2kuY29tIiwiaHR0cHM6Ly9hY2NvdW50cy5tc2NpLmNvbS9yb2xlcyI6W10sImlzcyI6Imh0dHBzOi8vbXNjaS1xYTEuYXV0aDAuY29tLyIsInN1YiI6IndhYWR8dHRaVWF6OWc0UEF1Q3RQNFVYaXZWMzFJN0x1OVE1VTRVUW5aTFVHMk1NQSIsImF1ZCI6WyJkYXRhZXhwbG9yZXItcWEiLCJodHRwczovL21zY2ktcWExLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2Mzg3OTQ1MjEsImV4cCI6MTYzODc5ODEyMSwiYXpwIjoia1p2ZllBY0JWMHU1cmdHSFluTVZsQU5pUFdUN2w3SWkiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHJlYWQ6ZGF0YVNldCBvZmZsaW5lX2FjY2VzcyJ9.WQ3H0HY1gweueP5-jv2a_E4fqlzhDrxWGQIWB1qXM6yvojzM5-o0b5SnE0lpjn5uyMtcg8ieT7mbjSn6UfAkWsyqDvsCGugVvjK3e_3rOYHpU8QbBYS-zHmStXTCcggxMjqsQgTGUdoSIu7s-U16q8C46FaWh4NktmXrrS_ZbyPPxrZHk2sJuL35wWJA47GgiMv4UWRB52AXCB2F7cfDPHvz81RIyPDRRaAPY07fMphYymHj9mJjJNCsL-Qj83qCTABrK8BmotzIvf81Amo2VaefZE3HQoUcsrjv8g62h1t96oCAYOPFkhyKah4dr69BUKr4-JRYgNIIGtDb0A-B9Q";

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
            const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EQTBPRE0wTlRVNFJETkRRalpETkVFMlJETTJOemc0TUVZNE5qRTBOakZETlVVNFF6QTBOdyJ9.eyJodHRwczovL2FjY291bnRzLm1zY2kuY29tL21zY2lfdXNlcl9pZCI6InR0WlVhejlnNFBBdUN0UDRVWGl2VjMxSTdMdTlRNVU0VVFuWkxVRzJNTUEiLCJodHRwczovL2FjY291bnRzLm1zY2kuY29tL3RlbmFudHMiOlsiTVNDSSJdLCJodHRwczovL2FjY291bnRzLm1zY2kuY29tL2RvbWFpbiI6Im1zY2kuY29tIiwiaHR0cHM6Ly9hY2NvdW50cy5tc2NpLmNvbS9yb2xlcyI6W10sImlzcyI6Imh0dHBzOi8vbXNjaS1xYTEuYXV0aDAuY29tLyIsInN1YiI6IndhYWR8dHRaVWF6OWc0UEF1Q3RQNFVYaXZWMzFJN0x1OVE1VTRVUW5aTFVHMk1NQSIsImF1ZCI6WyJkYXRhZXhwbG9yZXItcWEiLCJodHRwczovL21zY2ktcWExLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2Mzg3OTQ1MjEsImV4cCI6MTYzODc5ODEyMSwiYXpwIjoia1p2ZllBY0JWMHU1cmdHSFluTVZsQU5pUFdUN2w3SWkiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHJlYWQ6ZGF0YVNldCBvZmZsaW5lX2FjY2VzcyJ9.WQ3H0HY1gweueP5-jv2a_E4fqlzhDrxWGQIWB1qXM6yvojzM5-o0b5SnE0lpjn5uyMtcg8ieT7mbjSn6UfAkWsyqDvsCGugVvjK3e_3rOYHpU8QbBYS-zHmStXTCcggxMjqsQgTGUdoSIu7s-U16q8C46FaWh4NktmXrrS_ZbyPPxrZHk2sJuL35wWJA47GgiMv4UWRB52AXCB2F7cfDPHvz81RIyPDRRaAPY07fMphYymHj9mJjJNCsL-Qj83qCTABrK8BmotzIvf81Amo2VaefZE3HQoUcsrjv8g62h1t96oCAYOPFkhyKah4dr69BUKr4-JRYgNIIGtDb0A-B9Q";

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
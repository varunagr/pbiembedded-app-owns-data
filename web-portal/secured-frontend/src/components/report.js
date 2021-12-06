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
    
      useEffect(() => {
        const callGetReportConfig = async () => {
          try {
            // const token = await getAccessTokenSilently();
            const token = 'dummy';
            const response = await fetch(
              `${serverUrl}/reports/${reportId}/pbiconfig?workSpacePbid=fae2e405-c57d-4015-b72e-c5c691728a26&datasetIds=7476e48c-62af-40c1-b54f-9a478f39d76e`,
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
            id: reportConfig.pbiIdentifier,
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
              ['saved', function (event) {console.log('Report saved');}]
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
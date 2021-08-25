import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

const Report = () => {
    const [reportConfig, setReportConfig] = useState({});
    const [message, setMessage] = useState("");

    const { reportId } = useParams();
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    console.log('Got the reportId from the params ' + reportId);
    
      useEffect(() => {
        const callGetReportConfig = async () => {
          try {
            const response = await fetch(`${serverUrl}/reports/${reportId}/pbiconfig`);
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
              ['error', function (event) {console.log(event.detail);}]
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
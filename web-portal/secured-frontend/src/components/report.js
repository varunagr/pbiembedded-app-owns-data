import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Report = () => {
    const [reportConfig, setReportConfig] = useState({});
    const [message, setMessage] = useState("");

    const { reportId } = useParams();
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    
    const callGetReportConfig = async () => {
        try {
          const response = await fetch(`${serverUrl}/reports/{reportId}/pbiconfig`);
          const responseData = await response.json();
    
          setReportConfig(responseData.message);
        } catch (error) {
          setMessage(error.message);
        }
      };

    return (
        <div>THE REPORT GOES HERE with an id of ${reportId}</div>
      );
}

export default Report;
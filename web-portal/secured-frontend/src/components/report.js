import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

const Report = () => {
    const [reportConfig, setReportConfig] = useState({});
    const [message, setMessage] = useState("");

    const { reportId } = useParams();
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    console.log('Got the reportId from the params ' + reportId);
    
    const callGetReportConfig = async () => {
        try {
          const response = await fetch(`${serverUrl}/reports/${reportId}/pbiconfig`);
          const responseData = await response.json();
    
          setReportConfig(responseData);
        } catch (error) {
          setMessage(error.message);
        }
      };

      callGetReportConfig();

    return (

        <PowerBIEmbed
          embedConfig = {{
            type: 'report',   // Supported types: report, dashboard, tile, visual and qna
            id: "19516b10-b7c4-408f-a6e2-c200fa45ee4a",
            //embedUrl: reportConfig.embedUrl,
            embedUrl: "https://app.powerbi.com/reportEmbed",
            accessToken: "H4sIAAAAAAAEACWSx66DRgAA_-VdHcmAqZFyoINpu2DTbvSOYemO8u95Ua6jOY3m7x-QXP0nyX_-_Dm0mouhn9m51Q29QMU49c19fLDo43ZhWHgr7uGb9pl7jmvcsn0rIJFub-_jsJss84QkKG65TEhbhSXX61QuJk_euatgF8koU9y8SAwCUh3wfCg7hY28G7vg03HmovVdSknIIy256_2LKVSyv9IR9I9Zh2CwmODZGaBG8OVGtJTRRFACIYoD0DM87enAhESb53EdV_AMXH0JBYYq7PJt1p3Rfovu9aDyku8ZxN_uzTYVnJO5pl027X1fg6GTsskg6H3SviJUeBKUd2q_4fnJTVMf7biSt_MaWfKbcDJFOvzeSKvQY1fpDuWcsTaF9XkOv9OhfXx6Qjae3NTtXGCGfCbM8-Z0fHp1SXwWlxaGxUSKIsYzi61rk8yr9c7M-LXO7utYn8lFqWZ7T0n3E9MxMhOs7W0mU3HxAgIfNSn70HC0S3E1IqTJI0-XS4x4U7rCcC59WRTIiPM032kd6o2MBTZcstAyLaWQD05pw1dABJ6vJALVr4gp0yXruGx_YyzVxSaxVa-alSKZBXeM0n4fiIHqGRJlOoAQn1lrr6-x6g0Hv3rRZtE7sYMnqw-JcmoH53yIWySec4WytivF1QiXmTHQdRquKlQKIrZxWMcLuRscBSRVC_O9GQJMuERCLp-lbVgMDntB9q69zuTCMhdfBDX_yEwaebJV5Gm_S2hD-hHsXg0pkyU-qpcErQ9cz5Cvig5rNH1l0qR9NY7gQfv8qGLC8ddfP3_8iOia1o9RXL-bP-mHqVmxHdCIv4eEnsfSnpS22TXkxexFOe-RLnfbhSufVVwl6DtmvTcmhBujfa4uAFKE3--fPvHRJRGKs1r8gubW-qYHzfVtmbSn-n0cp8L2mVHZH5W0Nh5y2GThxWPiT60ldYl71m5VZ_1Qb9c-AoEejxTwrslJElpVRPnmzIJM0c1vMZK4pC92veZ8D9M1TWfNoyfOgD6_s3ZRtM1xWZo4vOWQKkumeRhyifEv0hNUDRwYVSkMS69t0aeuxLgr8lHO6Hwu1uUR-Z0dKhL_YXLra7VUhq2H-MB2u0vL_qFWOy3sumhhHPfpjhcDASD9r1xC682GmFrNVYc8eZoAN8H_M19TXSDd_618Ydf2TM0rW7kgN5fqCH0A_re8phqTdUPFrybY351PAMAdlXjrq9MHb9SAeFvLV5f0NLv2w22eWuv-i8409HmJOu0nXJriRSaNUsnayduCsxhUOI1tGX3O_faxVJXWHuYQbdNUj9-lEodjdzOjRYRYuNkK35o0Z-yt3juU7oFFjXU4kc7uXEkWIj492kHW-oqUqPVFgedNyzFsirbAkMjrdrhcYO0hZA41VhmQqwr0UCfEHgf5SEFw0cqHr6e8PbDntKx7sLbN2MFnZa4j3-gn89JuCUhhe-SP5bGZsdY9pwaXOCOdytW_KW_u7II4Vxaxke12IJ6-nSYUdxE1vrOzYm4Yk0J7Rd4XYRwOEgVhuyYd7CY3Jkgm7jn-9_w__wKiGoJW2gUAAA==.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLUVBU1QyLUItUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOmZhbHNlfX0=",
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
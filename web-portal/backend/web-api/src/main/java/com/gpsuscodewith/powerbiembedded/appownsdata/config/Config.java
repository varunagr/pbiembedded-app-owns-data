package com.gpsuscodewith.powerbiembedded.appownsdata.config;

/**
 * Configuration class
 */
public abstract class Config {

    // Set this to true, to show debug statements in console
    public static final boolean DEBUG = false;

    //	Two possible Authentication methods:
    //	- For authentication with master user credential choose MasterUser as AuthenticationType.
    //	- For authentication with app secret choose ServicePrincipal as AuthenticationType.
    //	More details here: https://aka.ms/EmbedServicePrincipal
    public static final String authenticationType = "ServicePrincipal";

    //	Common configuration properties for both authentication types
    // Enter workspaceId / groupId
    public static final String workspaceId = "f9ee0ebe-14f2-45ec-af3a-34e4c4a399e3";

    // The id of the report to embed.
    public static final String reportId = "cb5b07b5-114c-4a83-b320-ec3433a77a45";

    // Enter Application Id / Client Id
    public static final String clientId = "d424a540-68fd-47eb-9123-5159d8eda653";

    // Enter MasterUser credentials
    public static final String pbiUsername = "";
    public static final String pbiPassword = "";

    // Enter ServicePrincipal credentials
    public static final String tenantId = "3b6493fa-f7f3-458c-acd8-5356564158e1";
    public static final String appSecret = "e74C-rCtaPb2~4_W106q5-3c3S8-vJJx~m";

    //	DO NOT CHANGE
    public static final String authorityUrl = "https://login.microsoftonline.com/";
    public static final String scopeUrl = "https://analysis.windows.net/powerbi/api/.default";

    public static final String datasetFilePath = "/Users/bobjacobs/work/src/github.com/gpsuscodewith/pbiembedded-app-owns-data/web-portal/backend/web-api/src/main/resources/SalesReportTemplate.pbix";


    private Config() {
        //Private Constructor will prevent the instantiation of this class directly
        throw new IllegalStateException("Config class");
    }
}
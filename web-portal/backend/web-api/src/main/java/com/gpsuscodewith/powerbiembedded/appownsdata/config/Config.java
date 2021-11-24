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
    public static final String workspaceId = "a586fb0a-38b7-4808-928f-a03c4b7292ee";
    //public static final String workspaceId = "6e5482de-8849-4ec2-b432-0939f3a15f31";

    // The id of the report to embed.
    public static final String reportId = "6d864ca0-ed17-4dac-acd8-18e6a3fa2f84";

    // this reportId is the dataset for report 6d864ca0-ed17-4dac-acd8-18e6a3fa2f84
   // public static final String reportId = "19516b10-b7c4-408f-a6e2-c200fa45ee4a";

    // Enter Application Id / Client Id
    public static final String clientId = "3a316f2a-fdb2-411d-8845-1e169d658250";

    // Enter MasterUser credentials
    public static final String pbiUsername = "";
    public static final String pbiPassword = "";

    // Enter ServicePrincipal credentials
    public static final String tenantId = "7a9376d4-7c43-480f-82ba-a090647f651d";
    public static final String appSecret = "j-Zk7MGU56_E_45Axv~5_kedXrRQVq_y7X";

    //	DO NOT CHANGE
    public static final String authorityUrl = "https://login.microsoftonline.com/";
    public static final String scopeUrl = "https://analysis.windows.net/powerbi/api/.default";

    public static final String datasetFilePath = "/Users/bobjacobs/work/src/github.com/gpsuscodewith/pbiembedded-app-owns-data/web-portal/backend/web-api/src/main/resources/API_POC.pbix";

    public static final String email = "varun.agrawal@msci.com";

    private Config() {
        //Private Constructor will prevent the instantiation of this class directly
        throw new IllegalStateException("Config class");
    }
}
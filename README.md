PowerBI Embedded App Owns Data Sample
==================================

# Abstract
This repository contains sample code for an App Owns Data implementation for PowerBI Embedded for multitenant deployments.  The sample code is not meant for production use. It is explicit and imperitive with the intention of teaching rather than maintainability or production-level performance. In some cases, there are some harcoded values with code-comments so that the needed values or more easy to understand. In a real-world scenario, those values would be replaced by parameters. The inspiration for this sample came from a .NET implementatino found at the [PowerBiDevCamp](https://github.com/PowerBiDevCamp/App-Owns-Data-Starter-Kit).

# Tech Stack
For this sample, the following tech stack will be used.
* Authentication - Auth0
* Front End - React
* Backend - Java with JPA
* Data - Azure SQL Database

# Auth0 Setup
The frontend of this sample was origionally generated from the Auth0 sample project.  Detailed instructions for setting up you Auth0 instance so that it will work with this project can be found at [Auth0 Setup](web-portal/secured-frontend/README.md).

# PowerBI Embedded Setup
To run this sample solution, you will need a Microsoft 365 tenant in which you have
permissions to create and manage Azure AD applications and security
groups. You will also need Power BI Service administrator permissions to
configure Power BI settings to give the service principal for an Azure
AD application to ability to access the Power BI REST API. If you do not
have a Microsoft 365 environment for testing, you can create a App-Owns-Data development
environment for free by following the steps in **[Create a Development Environment for Power BI
Embedding](https://github.com/PowerBiDevCamp/Camp-Sessions/raw/master/Create%20Power%20BI%20Development%20Environment.pdf)**.

Once you have a tenant, you will need to configure Azure AD with both a service principal and security group.  You will also need to configure you Power BI tenant-level settings for service principal access.  The following two sections will step you through those setup tasks in detail.

## Create an Azure AD security group named Power BI Apps

Navigate to the **[Groups management
page](https://portal.azure.com/#blade/Microsoft_AAD_IAM/GroupsManagementMenuBlade/AllGroups)** in
the Azure portal. Once you get to the **Groups** page in the Azure
portal, click the **New group** link.

<img src="Docs\media\image22.png" width=700  />

In the **New Group** dialog, Select a **Group type** of **Security** and
enter a **Group name** of **Power BI Apps**. Click the **Create** button
to create the new Azure AD security group.

<img src="Docs\media\image23.png" width=700  />

Verify that you can see the new security group named **Power BI
Apps** on the Azure portal **Groups** page.

<img src="Docs\media\image24.png" width=700  />

## Configure Power BI tenant-level settings for service principal access

Next, you need you enable a tenant-level setting named **Allow service
principals to use Power BI APIs**. Navigate to the Power BI Service
admin portal at <https://app.powerbi.com/admin-portal>. In the Power BI
Admin portal, click the **Tenant settings** link on the left.

<img src="Docs\media\image25.png"  />

Move down to **Developer settings**  and expand **Allow service
principals to use Power BI APIs** section.

<img src="Docs\media\image26.png" />

Note that the **Allow service principals to use Power BI APIs** setting
is initially set to **Disabled**.

<img src="Docs\media\image27.png"  />

Change the setting to **Enabled**. After that, set the **Apply
to** setting to **Specific security groups** and add the **Power BI
Apps** security group as shown in the screenshot below. Click
the **Apply** button to save your configuration changes.

<img src="Docs\media\image28.png"  />

You will see a notification indicating it might take up to 15 minutes to
apply these changes to the organization.

<img src="Docs\media\image29.png"  />

Now scroll upward in the **Tenant setting** section of the Power BI
admin portal and locate **Workspace settings**.

<img src="Docs\media\image30.png" width=600 />

Note that a new Power BI tenant has an older policy where only users who
have the permissions to create Office 365 groups can create new Power BI
workspaces. You must reconfigure this setting so that service principals
in the **Power BI Apps** group will be able to create new workspaces.

<img src="Docs\media\image31.png" width=550  />

In **Workspace settings**, set **Apply to** to **Specific security**
groups, add the **Power BI Apps** security group and click
the **Apply** button to save your changes.

<img src="Docs\media\image32.png" width=550 />

You have now completed the configuration of the required Power BI
tenant-level settings.

### Create the **App-Owns-Data Service App in Azure AD**

Navigate to the [App
registration](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps) page
in the Azure portal and click the **New registration** link.

<img src="Docs\media\image33.png"  />

On the **Register an application** page, enter an application name of
**App-Owns-Data Service App** and accept the default selection
for **Supported account types** of **Accounts in this organizational
directory only**.

<img src="Docs\media\image34.png" width=750 />

Complete the following steps in the **Redirect URI** section.

-   Leave the default selection of **Web** in the dropdown box
-   Enter a **Redirect URI** of <https://localhost:44300/signin-oidc>
-   Click the **Register** button to create the new Azure AD application.

<img src="Docs\media\image35.png" width=750  />

After creating a new Azure AD application in the Azure portal, you
should see the Azure AD application overview page which displays
the **Application ID**. Note that the ***Application ID*** is often
called the ***Client ID***, so don't let this confuse you. You will need
to copy this Application ID and store it so you can use it later to
configure the support acquiring app-only access tokens from Azure AD
using for Client Credentials Flow.

<img src="Docs\media\image36.png" width=700 />

Copy the **Client ID** (aka Application ID) and paste it into a text
document so you can use it later in the setup process. Note that
this **Client ID** value will be used by both the
**AppOwnsDataAdmin** project and the **AppOwnsDataWebApi** project to
configure authentication for the service principal with Azure AD.

<img src="Docs\media\image37.png"  width=550 />

Next, repeat the same step by copying the **Tenant ID** and copying that
into the text document as well.

<img src="Docs\media\image38.png"  width=650 />

Your text document should now contain the **Client ID** and **Tenant
ID** as shown in the following screenshot.

<img src="Docs\media\image39.png" width=500 />

Next, you need to create a Client Secret for the application. Click on
the **Certificates & secrets** link in the left navigation to move to
the **Certificates & secrets** page. On the **Certificates &
secrets** page, click the **New client secret** button as shown in the
following screenshot.

<img src="Docs\media\image40.png"  />

In the **Add a client secret** dialog, add a **Description** such
as **Test Secret** and set **Expires** to any value you'd like from the
dropdown list. Click the **Add** button to create the new Client Secret.

<img src="Docs\media\image41.png" width=450 />

Once you have created the Client Secret, you should be able to see
its **Value** in the **Client secrets** section. Click on the **Copy to
clipboard** button to copy the **Value** for the Client Secret into the
clipboard.

<img src="Docs\media\image42.png" width=700  />

Paste the **Client Secret** into the same text document with
the **Client ID** and **Tenant ID**.

<img src="Docs\media\image43.png" width=500 />

The last thing is to add the service principal for this app to Azure AD
Security group named **Power BI Apps**.

<img src="Docs\media\image44.png" width=750 />

Navigate to the **Members** page for the **Power BI Apps** security
group using the **Members** link in the left navigation. Add the Azure
AD application named **App-Owns-Data Service App** as a group member.

<img src="Docs\media\image45.png" />

You have now completed the registration of the Azure AD application
named **App-Owns-Data Service App**. This is the Azure application that
will be used to authenticate as a service principal in order to call the
Power BI REST API. The **App-Owns-Data Service App** will also be used
to authenticate administrative users who need to use the
**AppOwnsDataAdmin** application.

In the next section, you will create a new Azure AD application named
**App-Owns-Data Client App**. This Azure AD application will be used to
secure the custom web API exposed by **AppOwnsDataWebApi**. The
**AppOwnsDataClient** application will be configured to use this Azure
AD application to authenticate users and to acquire access tokens in the
browser so it can execute secure API calls on **AppOwnsDataWebApi**.

## Create the **App-Owns-Data Client App in Azure AD**

Navigate to the **[App
registration](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps)** page
in the Azure portal and click the **New registration** link.

<img src="Docs\media\image46.png"   />

On the **Register an application** page, enter an application name of
**App-Owns-Data Client App** and change **Supported account
types** to **Accounts in any organizational directory and personal
Microsoft accounts**.

<img src="Docs\media\image47.png" />

Complete the following steps in the **Redirect URI** section.

1.  Change the setting of the dropdown box to **Single page application (SPA)**.
2.  Enter a **Redirect URI** of <https://localhost:44301/>.
3.  Click the **Register** button to create the new Azure AD application.

<img src="Docs\media\image48.png" />

After creating a new Azure AD application in the Azure portal, you
should see the Azure AD application overview page which displays
the **Application ID**. Copy the **Client ID** (aka Application ID) and
paste it into a text document so you can use it later in the setup
process. Note that this **Client ID** value will be used
by **AppOwnsDataClient** project and the **AppOwnsDataWebApi** project
to configure authentication with Azure AD.

<img src="Docs\media\image49.png" width=500 />

The **App-Owns-Data Client App** will be used to secure the API
endpoints of **AppOwnsDataWebApi**. When creating an Azure AD
application to secure a custom Web API like this, it is necessary to
create a custom scope for a delegated permission. As a developer, you
can create a new custom scope using any name you'd like. In the solution
for the **App-Owns-Data Starter Kit**, the custom scope will be given a
name of **Reports.Embed**.

On the summary page for **App-Owns-Data Client App**, click the **Expose
an API** link in the left navigation.

<img src="Docs\media\image50.png"  />

On the **Expose an API** page, click the **Add a scope** button.

<img src="Docs\media\image51.png"  />

On the **Add a scope** pane, you will be prompted to set an
**Application ID URI** before you will be able to create a new scope.
Click **Save and continue** to accept the default setting of **api://**
followed the application ID.

<img src="Docs\media\image52.png" width=600 />

The **Add a scope** pane should now present a form to enter data for the
new scope.

<img src="Docs\media\image53.png" width=500 />
The **ActivityLog** table is generated using the table schema defined by
the **ActivityLogEntry** class.

<img src="Docs\media\image19.png" width=400  />

The database model itself is created by the **AppOwnsDataDB** class
which derives from **DbContext**.

<img src="Docs\media\image20.png"  />

The **AppOwsDataShared** project contains a public class named
**AppOwnsDataDbService** which contains all the shared logic to execute
read and write operations on the **AppOwnsDataDB** database. The
**AppOwnsDataAdmin** application and **AppOwnsDataWebApi** both access
**AppOwnsDataDB** by calling public methods in the
**AppOwnsDataDbService** class.

<img src="Docs\media\image21.png" width=800 />

## Set up your development environment

This section provides a step-by-step guide for setting up
the **App-Owns-Data Starter Kit** solution for testing. To complete
these steps, you will require a Microsoft 365 tenant in which you have
permissions to create and manage Azure AD applications and security
groups. You will also need Power BI Service administrator permissions to
configure Power BI settings to give the service principal for an Azure
AD application to ability to access the Power BI REST API. If you do not
have a Microsoft 365 environment for testing, you can create a App-Owns-Data development
environment for free by following the steps in **[Create a Development Environment for Power BI
Embedding](https://github.com/PowerBiDevCamp/Camp-Sessions/raw/master/Create%20Power%20BI%20Development%20Environment.pdf)**.

To set up the  **App-Owns-Data Starter Kit** solution for testing, you
will need to configure a Microsoft 365 tenant by completing the
following tasks.

-   Create an Azure AD security group named **Power BI Apps**
-   Configure Power BI tenant-level settings for service principal access
-   Create the Azure AD Application named **App-Owns-Data Service App**
-   Create the Azure AD Application named **App-Owns-Data Client App**

The following four sections will step through each of these setup tasks
in step-by-step detail.

## Create an Azure AD security group named Power BI Apps

Navigate to the **[Groups management
page](https://portal.azure.com/#blade/Microsoft_AAD_IAM/GroupsManagementMenuBlade/AllGroups)** in
the Azure portal. Once you get to the **Groups** page in the Azure
portal, click the **New group** link.

<img src="Docs\media\image22.png" width=700  />

In the **New Group** dialog, Select a **Group type** of **Security** and
enter a **Group name** of **Power BI Apps**. Click the **Create** button
to create the new Azure AD security group.

<img src="Docs\media\image23.png" width=700  />

Verify that you can see the new security group named **Power BI
Apps** on the Azure portal **Groups** page.

<img src="Docs\media\image24.png" width=700  />

## Configure Power BI tenant-level settings for service principal access

Next, you need you enable a tenant-level setting named **Allow service
principals to use Power BI APIs**. Navigate to the Power BI Service
admin portal at <https://app.powerbi.com/admin-portal>. In the Power BI
Admin portal, click the **Tenant settings** link on the left.

<img src="Docs\media\image25.png"  />

Move down to **Developer settings**  and expand **Allow service
principals to use Power BI APIs** section.

<img src="Docs\media\image26.png" />

Note that the **Allow service principals to use Power BI APIs** setting
is initially set to **Disabled**.

<img src="Docs\media\image27.png"  />

Change the setting to **Enabled**. After that, set the **Apply
to** setting to **Specific security groups** and add the **Power BI
Apps** security group as shown in the screenshot below. Click
the **Apply** button to save your configuration changes.

<img src="Docs\media\image28.png"  />

You will see a notification indicating it might take up to 15 minutes to
apply these changes to the organization.

<img src="Docs\media\image29.png"  />

Now scroll upward in the **Tenant setting** section of the Power BI
admin portal and locate **Workspace settings**.

<img src="Docs\media\image30.png" width=600 />

Note that a new Power BI tenant has an older policy where only users who
have the permissions to create Office 365 groups can create new Power BI
workspaces. You must reconfigure this setting so that service principals
in the **Power BI Apps** group will be able to create new workspaces.

<img src="Docs\media\image31.png" width=550  />

In **Workspace settings**, set **Apply to** to **Specific security**
groups, add the **Power BI Apps** security group and click
the **Apply** button to save your changes.

<img src="Docs\media\image32.png" width=550 />

You have now completed the configuration of the required Power BI
tenant-level settings.

## Create the **App-Owns-Data Service App in Azure AD**

Navigate to the [App
registration](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps) page
in the Azure portal and click the **New registration** link.

<img src="Docs\media\image33.png"  />

On the **Register an application** page, enter an application name of
**App-Owns-Data Service App** and accept the default selection
for **Supported account types** of **Accounts in this organizational
directory only**.

<img src="Docs\media\image34.png" width=750 />

Complete the following steps in the **Redirect URI** section.

-   Leave the default selection of **Web** in the dropdown box
-   Enter a **Redirect URI** of <https://localhost:44300/signin-oidc>
-   Click the **Register** button to create the new Azure AD application.

<img src="Docs\media\image35.png" width=750  />

After creating a new Azure AD application in the Azure portal, you
should see the Azure AD application overview page which displays
the **Application ID**. Note that the ***Application ID*** is often
called the ***Client ID***, so don't let this confuse you. You will need
to copy this Application ID and store it so you can use it later to
configure the support acquiring app-only access tokens from Azure AD
using for Client Credentials Flow.

<img src="Docs\media\image36.png" width=700 />

Copy the **Client ID** (aka Application ID) and paste it into a text
document so you can use it later in the setup process. Note that
this **Client ID** value will be used by both the
**AppOwnsDataAdmin** project and the **AppOwnsDataWebApi** project to
configure authentication for the service principal with Azure AD.

<img src="Docs\media\image37.png"  width=550 />

Next, repeat the same step by copying the **Tenant ID** and copying that
into the text document as well.

<img src="Docs\media\image38.png"  width=650 />

Your text document should now contain the **Client ID** and **Tenant
ID** as shown in the following screenshot.

<img src="Docs\media\image39.png" width=500 />

Next, you need to create a Client Secret for the application. Click on
the **Certificates & secrets** link in the left navigation to move to
the **Certificates & secrets** page. On the **Certificates &
secrets** page, click the **New client secret** button as shown in the
following screenshot.

<img src="Docs\media\image40.png"  />

In the **Add a client secret** dialog, add a **Description** such
as **Test Secret** and set **Expires** to any value you'd like from the
dropdown list. Click the **Add** button to create the new Client Secret.

<img src="Docs\media\image41.png" width=450 />

Once you have created the Client Secret, you should be able to see
its **Value** in the **Client secrets** section. Click on the **Copy to
clipboard** button to copy the **Value** for the Client Secret into the
clipboard.

<img src="Docs\media\image42.png" width=700  />

Paste the **Client Secret** into the same text document with
the **Client ID** and **Tenant ID**.

<img src="Docs\media\image43.png" width=500 />

The last thing is to add the service principal for this app to Azure AD
Security group named **Power BI Apps**.

<img src="Docs\media\image44.png" width=750 />

Navigate to the **Members** page for the **Power BI Apps** security
group using the **Members** link in the left navigation. Add the Azure
AD application named **App-Owns-Data Service App** as a group member.

<img src="Docs\media\image45.png" />

You have now completed the registration of the Azure AD application
named **App-Owns-Data Service App**. This is the Azure application that
will be used to authenticate as a service principal in order to call the
Power BI REST API. The **App-Owns-Data Service App** will also be used
to authenticate administrative users who need to use the
**AppOwnsDataAdmin** application.

In the next section, you will create a new Azure AD application named
**App-Owns-Data Client App**. This Azure AD application will be used to
secure the custom web API exposed by **AppOwnsDataWebApi**. The
**AppOwnsDataClient** application will be configured to use this Azure
AD application to authenticate users and to acquire access tokens in the
browser so it can execute secure API calls on **AppOwnsDataWebApi**.

## Create the **App-Owns-Data Client App in Azure AD**

Navigate to the **[App
registration](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps)** page
in the Azure portal and click the **New registration** link.

<img src="Docs\media\image46.png"   />

On the **Register an application** page, enter an application name of
**App-Owns-Data Client App** and change **Supported account
types** to **Accounts in any organizational directory and personal
Microsoft accounts**.

<img src="Docs\media\image47.png" />

Complete the following steps in the **Redirect URI** section.

1.  Change the setting of the dropdown box to **Single page application (SPA)**.
2.  Enter a **Redirect URI** of <https://localhost:44301/>.
3.  Click the **Register** button to create the new Azure AD application.

<img src="Docs\media\image48.png" />

After creating a new Azure AD application in the Azure portal, you
should see the Azure AD application overview page which displays
the **Application ID**. Copy the **Client ID** (aka Application ID) and
paste it into a text document so you can use it later in the setup
process. Note that this **Client ID** value will be used
by **AppOwnsDataClient** project and the **AppOwnsDataWebApi** project
to configure authentication with Azure AD.

<img src="Docs\media\image49.png" width=500 />

The **App-Owns-Data Client App** will be used to secure the API
endpoints of **AppOwnsDataWebApi**. When creating an Azure AD
application to secure a custom Web API like this, it is necessary to
create a custom scope for a delegated permission. As a developer, you
can create a new custom scope using any name you'd like. In the solution
for the **App-Owns-Data Starter Kit**, the custom scope will be given a
name of **Reports.Embed**.

On the summary page for **App-Owns-Data Client App**, click the **Expose
an API** link in the left navigation.

<img src="Docs\media\image50.png"  />

On the **Expose an API** page, click the **Add a scope** button.

<img src="Docs\media\image51.png"  />

On the **Add a scope** pane, you will be prompted to set an
**Application ID URI** before you will be able to create a new scope.
Click **Save and continue** to accept the default setting of **api://**
followed the application ID.

<img src="Docs\media\image52.png" width=600 />

The **Add a scope** pane should now present a form to enter data for the
new scope.

<img src="Docs\media\image53.png" width=500 />

Fill out the data in the **App a scope** pane using these steps.

1.  Add a **Scope name** of **Reports.Embed**.
2.  For the **Who can consent** setting, select **Admins and users**.
3.  Fill in all display names and descriptions using the text shown in the following screenshot.
4.  Click the **Add scope** button.

<img src="Docs\media\image54.png" />

You should now see the new scopes in the **Scopes defined by this API**
section. If you copy the scope value to the clipboard, you will see that
is created in the format of
**api://\[ApplicationID\]/Reports.Embed**.

<img src="Docs\media\image55.png" style="width:4.73089in;height:1.43558in" />

## Running the Sample

There are 2 key projects the need to be run to run the sample:
1. Secured-Backed
2. Frontend

The Secured Backend is a Java Spring application so it will require that the JDK is installed on your machines. You can launchced using the following command in the backend/web-api directory:
````sh
mvn spring-boot:run
````
You can also open the project in an IDE such as IntelliJ and launch it through a debuuger if you would like to set break points.

The frontend can be started by executing the following commands in the /secured-frontend directory.  Please note you will need NodeJS to be installed on your machine.  If you do not have NodeJS installed on your machine, please visit nodejs.org for instructions on how to install it for your particular operating system.
````sh
npm install
npm start
````

## Sample Scenarios

The sample app demonstrates a few key scenarious for multitenant app owns data deployments. Here is a description of the scenarious and how to walk through them.

### Federated Identity With Multi-Tenant Authorization

As mentioned above, this sample uses Federated Identity by integrating with Auth0.  After launching the application, you will see a "Log In" button at the top right corner of the application.  Clicking the button will launch the Auth0 PKCE flow where you will create a user in Auth0 or use one of their identity providers (Google, Twitter, Facebook, etc.) After successfully authenticating, you wil be redirected back to the application.  At the top of the application there is a tab lapeled "Profile".  Clicking on this will show you the contents of the JWT token that was delivered by Auth0.  We will use the token's audience (the user) as the main identifier for which we will create a user in the Admin tasks.

### Calling Protected APIs

The code samples have protected backend REST APIs.  All these endpoints are projected by OAuth and mappings are configured in your Java Spring configuration.  You will see blue buttons in the sample application that launch certain scenarious.  The "Get Public Messace" will call an unprotected backend API, where the "Get Protected Message" will call a protected endpoint.  This will allow you to experiement with the mapping configurations in the backed Java code and see how the configuration is set up.  You can also look at the React code for silently getting a token and passing it as a bearer token.  The Java security code will need this to authorize the user.

### Admin Functionality

Rather than building a seperate admin site, this sample includes a tab for admin functionality.  It is assumed that the logged in user is a site admin.  In a real-world scenario, the logged in user would need a permissions enabling him/her to perform administrative tasks.  

After clicking on the admin tab, you will see several sub tabs:
1. Tenants
2. Workspaces
3. Users
4. Workspace Users
5. Datasets

Clicking on "Tenants" will show you all current teantns in the system.  You will also be shown an "Add Tenant" buttont that will allow you to create a new tenant.  After filling out the form, the React code will send a secure REST call to the backend, where the backend service will createa new Power BI workspace and record the settings.  The relationship between tenant and workspace will be recoded as well.  The default Power BI admin user will be added to the Power BI tenant automatically.  

Clicking on "Workspaces" offers the same functinoality as "Tenants" in that it will show all current workspaces and allow you to create a new workspace.

The "Users" tab enables you to create users in the system.  There is a text for that asks you for the IDP user id.  You can find this from the content of the JWT that Auth0 sent by looking at the "Profile" tab at the top of the site.

The "Workspace Users" tab allows you to create an association between a user and a workspace.  By clicking on the "Users" and "Workspace" tabs, you can find the ID values of the user and workspace that you want to link.  Just enter those values and click submit.

For "Datasets" you can see all the current Datasets and click on "Add Dataset" to create a new Dataset.  In the "New Dataset" form, you will need to know the powbi workspace id.  You can find that by looking at your Power BI instance.  As a convenience, the value is being returned from the /workspaces api call and logged to the console.  Browser developer tools can be used to quickly find that value.  When you create a new dataset, a local .pbix file that sits in the source code will be uploaded.  This creates a new report and dataset.  This process simulates a new dataset/datasource being published, where an out-of-band process will create the .pbix file and use the backed API to upload it.

### Embedding functionality

After you have created tenants/workspaces/users/workspace users/datasets from the admin tab, you will be able to experiment with the actual embdedding functionality.  This will be a similar experience that an end-user will see.  

From the main set of buttons, you can click on "Get Datasets".  This will show the experience of opening a dataset in edit mode, creating an report, saving it to a new workspace, and viewing it.  This tab, for simplicity sake, uses hardocded dataset/workspace data so you can focus on the code needed to display and clone only.  You can extend this by adding security trimming similar to what you will see in the "Get User Datasets" tab.

In the "Get User Datasets" tab the ui will call a backend API to determine all the datasets that the current user has access to see.  Examples of how to perform filtern over screams can be found in the DatasetsController class, and additional security trimming can be added there.  The data model can also be extended to support additional relationships and attributes to meet future security requirements.

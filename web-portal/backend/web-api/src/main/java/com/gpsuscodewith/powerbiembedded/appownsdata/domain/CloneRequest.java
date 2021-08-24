package com.gpsuscodewith.powerbiembedded.appownsdata.domain;

public class CloneRequest {
    public String getReportId() {
        return reportId;
    }

    public void setReportId(String reportId) {
        this.reportId = reportId;
    }

    private String reportId;

    public String getSourceWorkspaceId() {
        return sourceWorkspaceId;
    }

    public void setSourceWorkspaceId(String sourceWorkspaceId) {
        this.sourceWorkspaceId = sourceWorkspaceId;
    }

    private String sourceWorkspaceId;

    public String getDestinationWorkspaceId() {
        return destinationWorkspaceId;
    }

    public void setDestinationWorkspaceId(String destinationWorkspaceId) {
        this.destinationWorkspaceId = destinationWorkspaceId;
    }

    private String destinationWorkspaceId;

    public String getReportName() {
        return reportName;
    }

    public void setReportName(String reportName) {
        this.reportName = reportName;
    }

    private String reportName;

}

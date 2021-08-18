package com.gpsuscodewith.powerbiembedded.appownsdata.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="pbiworkspace")
public class PbiWorkspace {
    @Id
    @GeneratedValue
    private Long id;
    private String workspaceLocation;
    private String workspaceName;
    private String pbiIdentifier;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWorkspaceLocation() {
        return workspaceLocation;
    }

    public void setWorkspaceLocation(String workspaceLocation) {
        this.workspaceLocation = workspaceLocation;
    }

    public String getWorkspaceName() {
        return workspaceName;
    }

    public void setWorkspaceName(String workspaceName) {
        this.workspaceName = workspaceName;
    }

    public String getPbiIdentifier() {
        return pbiIdentifier;
    }

    public void setPbiIdentifier(String pbiIdentifier) {
        this.pbiIdentifier = pbiIdentifier;
    }
}

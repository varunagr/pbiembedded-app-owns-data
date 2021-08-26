package com.gpsuscodewith.powerbiembedded.appownsdata.domain;

public class GroupConfig {
    private String id;
    private String capacityId;
    private String description;
    private String name;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCapacityId() {
        return capacityId;
    }

    public void setCapacityId(String capacityId) {
        this.capacityId = capacityId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

}

package com.gpsuscodewith.powerbiembedded.appownsdata.domain;

public class DatasetConfig {
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    private String id;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    private String description;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private String name;

    public String getCreateReportEmbedURL() {
        return CreateReportEmbedURL;
    }

    public void setCreateReportEmbedURL(String createReportEmbedURL) {
        CreateReportEmbedURL = createReportEmbedURL;
    }

    private String CreateReportEmbedURL;

    public String getQnaEmbedURL() {
        return QnaEmbedURL;
    }

    public void setQnaEmbedURL(String qnaEmbedURL) {
        QnaEmbedURL = qnaEmbedURL;
    }

    private String QnaEmbedURL;

    public String getWebUrl() {
        return webUrl;
    }

    public void setWebUrl(String webUrl) {
        this.webUrl = webUrl;
    }

    private String webUrl;

    public String getContentProviderType() {
        return ContentProviderType;
    }

    public void setContentProviderType(String contentProviderType) {
        ContentProviderType = contentProviderType;
    }

    private String ContentProviderType;
}

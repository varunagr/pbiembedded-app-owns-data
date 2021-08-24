package com.gpsuscodewith.powerbiembedded.appownsdata.domain;

import java.util.List;

/**
 * Properties for embedding the report
 */
public class EmbedConfig {
    public List<ReportConfig> embedReports;

    public List<DatasetConfig> embedDatasets;

    public EmbedToken embedToken;

    public String errorMessage;
}

package com.gpsuscodewith.powerbiembedded.appownsdata.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.gpsuscodewith.powerbiembedded.appownsdata.config.Config;
import com.gpsuscodewith.powerbiembedded.appownsdata.domain.*;
import com.gpsuscodewith.powerbiembedded.appownsdata.repositories.PbiWorkspaceRepository;
import com.gpsuscodewith.powerbiembedded.appownsdata.repositories.WorkspaceReportRepository;
import com.gpsuscodewith.powerbiembedded.appownsdata.repositories.ReportRepository;
import com.gpsuscodewith.powerbiembedded.appownsdata.services.AzureADService;
import com.gpsuscodewith.powerbiembedded.appownsdata.services.PowerBiService;
import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/reports")
public class ReportController {
    static final Logger logger = LoggerFactory.getLogger(ReportController.class);
    private final ReportRepository reportRepository;
    private final WorkspaceReportRepository workspaceReportRepository;
    private final PbiWorkspaceRepository workspaceRepository;

    public ReportController(ReportRepository reportRepository,
                            WorkspaceReportRepository workspaceReportRepository,
                            PbiWorkspaceRepository workspaceRepository) {
        this.reportRepository = reportRepository;
        this.workspaceReportRepository = workspaceReportRepository;
        this.workspaceRepository = workspaceRepository;
    }

    @GetMapping
    public Iterable<Report> getReports() {
        return reportRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Report createUser(@RequestBody Report report) {
        return reportRepository.save(report);
    }

    @PostMapping("{reportId}/clone")
    public Report cloneReport(@PathVariable String reportId, @RequestBody CloneRequest cloneRequest) throws JSONException, JsonProcessingException {
        String accessToken = null;
        try {
            accessToken = AzureADService.getAccessToken();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }

        ReportConfig reportConfig = PowerBiService.cloneReport(accessToken,
                cloneRequest.getSourceWorkspaceId(),
                reportId,
                cloneRequest.getReportName(),
                cloneRequest.getDestinationWorkspaceId());

        Report report = new Report();
        report.setReportName(reportConfig.reportName);
        report.setPbiIdentifier(reportConfig.id);
        report.setAccessToken(reportConfig.accessToken);
        report.setEmbedUrl(reportConfig.embedUrl);
        return report;
    }

    @GetMapping("/{reportId}/savereportconfig") Report getReportConfig(@PathVariable String reportId) {
        String accessToken = null;
        try {
            accessToken = AzureADService.getAccessToken();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }

        String workspacePbiIdentifier = Config.workspaceId;
        String destinationWorkspacePbiIdentifier = "6e5482de-8849-4ec2-b432-0939f3a15f31";

        ArrayList<String> reportIds = new ArrayList<String>();
        reportIds.add(reportId);

        ArrayList<String> workspaceIds = new ArrayList<String>();
        workspaceIds.add(destinationWorkspacePbiIdentifier);

        ArrayList<String> datasetIds = new ArrayList<String>();
        datasetIds.add("19516b10-b7c4-408f-a6e2-c200fa45ee4a");

        try {
            // EmbedConfig embedConfig = PowerBiService.getCreateReportEmbedToken(accessToken, workspacePbiIdentifier, "19516b10-b7c4-408f-a6e2-c200fa45ee4a");
            //(String accessToken, String workspaceId, String reportId, ArrayList<String> additionalDatasetIds, ArrayList<String> additionalWorkspaces)

            EmbedConfig embedConfig = PowerBiService.getEmbedConfig(accessToken, workspacePbiIdentifier, reportIds.get(0), null, workspaceIds);

            //ReportConfig reportConfig = embedConfig.embedReports.stream().filter(x -> x.reportId.equalsIgnoreCase(reportPbiIdentifier)).findFirst().get();
            ReportConfig reportConfig = embedConfig.embedReports.get(0);
            reportConfig.accessToken = reportConfig.accessToken;

            Report report = new Report();
            report.setAccessToken(embedConfig.embedToken.token);
            report.setPbiIdentifier("19516b10-b7c4-408f-a6e2-c200fa45ee4a");
            report.setEmbedUrl(reportConfig.embedUrl);
            return report;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return null;
    }

    @GetMapping("/{reportId}/pbiconfig")
    public Report getNewSaveReportConfig(@PathVariable String reportId) {/*
        Report report = reportRepository.findById(reportId).get();

        WorkspaceReport workspaceReport = workspaceReportRepository
                .findAll()
                .stream()
                .filter(x -> x.getReportId() == reportId)
                .findFirst()
                .orElse(null);

        PbiWorkspace workspace = workspaceRepository.findById(workspaceReport.getWorkspaceId()).get();
*/
        String accessToken = null;
        try {
            accessToken = AzureADService.getAccessToken();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }

        //String reportPbiIdentifier = report.getPbiIdentifier();
        //String workspacePbiIdentifier = workspace.getPbiIdentifier();
        String workspacePbiIdentifier = Config.workspaceId;
        workspacePbiIdentifier = "6e5482de-8849-4ec2-b432-0939f3a15f31";
        //String reportPbiIdentifier = Config.reportId;
        String reportPbiIdentifier = reportId;

        ArrayList<String> reportIds = new ArrayList<String>();
        reportIds.add(reportPbiIdentifier);

        ArrayList<String> datasetIds = new ArrayList<String>();
        datasetIds.add("714dbd7d-cde7-43bd-8b28-0b06f3f8285f");
       // ArrayList<String> workspaceIds = new ArrayList<String>();
       // workspaceIds.add("6e5482de-8849-4ec2-b432-0939f3a15f31");

        try {
           // EmbedConfig embedConfig = PowerBiService.getCreateReportEmbedToken(accessToken, workspacePbiIdentifier, "19516b10-b7c4-408f-a6e2-c200fa45ee4a");
            EmbedConfig embedConfig = PowerBiService.getReportEmbedConfig(accessToken, workspacePbiIdentifier, reportIds, datasetIds);

            //ReportConfig reportConfig = embedConfig.embedReports.stream().filter(x -> x.reportId.equalsIgnoreCase(reportPbiIdentifier)).findFirst().get();
            ReportConfig reportConfig = embedConfig.embedReports.get(0);
            reportConfig.accessToken = reportConfig.accessToken;

            Report report = new Report();
            report.setAccessToken(embedConfig.embedToken.token);
            report.setPbiIdentifier(reportPbiIdentifier);
            report.setEmbedUrl(reportConfig.embedUrl);
            return report;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return null;
    }
}

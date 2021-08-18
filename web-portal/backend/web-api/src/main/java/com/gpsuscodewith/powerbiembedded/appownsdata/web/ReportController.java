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

    @GetMapping("/{reportId}/pbiconfig")
    public Report getReportConfig(@PathVariable Long reportId) {/*
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
        String reportPbiIdentifier = Config.reportId;
        ArrayList<String> reportIds = new ArrayList<String>();
        reportIds.add(reportPbiIdentifier);

        try {
            EmbedConfig embedConfig = PowerBiService.getEmbedConfig(accessToken, workspacePbiIdentifier, reportIds);
            //ReportConfig reportConfig = embedConfig.embedReports.stream().filter(x -> x.reportId.equalsIgnoreCase(reportPbiIdentifier)).findFirst().get();
            ReportConfig reportConfig = embedConfig.embedReports.get(0);
            reportConfig.accessToken = reportConfig.accessToken;

            Report report = new Report();
            report.setAccessToken(embedConfig.embedToken.token);
            report.setPbiIdentifier(Config.reportId);
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

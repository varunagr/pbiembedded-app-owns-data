package com.gpsuscodewith.powerbiembedded.appownsdata.web;

import com.gpsuscodewith.powerbiembedded.appownsdata.domain.User;
import com.gpsuscodewith.powerbiembedded.appownsdata.domain.WorkspaceReport;
import com.gpsuscodewith.powerbiembedded.appownsdata.repositories.UserRepository;
import com.gpsuscodewith.powerbiembedded.appownsdata.repositories.WorkspaceReportRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.concurrent.ExecutionException;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/workspacereports")
public class WorkspaceReportController {
    static final Logger logger = LoggerFactory.getLogger(WorkspaceReportController.class);
    private final WorkspaceReportRepository workspaceReportRepository;

    public WorkspaceReportController(WorkspaceReportRepository workspaceReportRepository) {
        this.workspaceReportRepository = workspaceReportRepository;
    }

    @GetMapping
    public Iterable<WorkspaceReport> getWorkspaceReports() {
        return workspaceReportRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WorkspaceReport createUser(@RequestBody WorkspaceReport workspaceReport) {
        return workspaceReportRepository.save(workspaceReport);
    }
}

package com.gpsuscodewith.powerbiembedded.appownsdata.web;

import com.gpsuscodewith.powerbiembedded.appownsdata.domain.*;
import com.gpsuscodewith.powerbiembedded.appownsdata.repositories.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {
    static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserRepository userRepository;
    private final PbiWorkspaceUserRepository pbiWorkspaceUserRepository;
    private final WorkspaceReportRepository workspaceReportRepository;
    private final ReportRepository reportRepository;

    public UserController(UserRepository userRepository,
                          PbiWorkspaceUserRepository pbiWorkspaceUserRepository,
                          WorkspaceReportRepository workspaceReportRepository,
                          ReportRepository reportRepository) {
        this.userRepository = userRepository;
        this.pbiWorkspaceUserRepository = pbiWorkspaceUserRepository;
        this.workspaceReportRepository = workspaceReportRepository;
        this.reportRepository = reportRepository;
    }

    @GetMapping
    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{userId}/reports")
    public Iterable<Report> getAvailableReports(@PathVariable Long userId) {

        PbiWorkspaceUser workspaceUser = pbiWorkspaceUserRepository
                .findAll()
                .stream()
                .filter(x -> x.getUserId() == userId)
                .findFirst()
                .orElse(null);

        if (workspaceUser != null) {
            List<WorkspaceReport> workspaceReports = workspaceReportRepository
                    .findAll();

            List<Long> reportIds = new ArrayList<Long>();
            for (WorkspaceReport workspaceReport : workspaceReports) {
                reportIds.add(workspaceReport.getReportId());
            }

            List<Report> reports = reportRepository.findAllById(reportIds);
            return reports;
        } else {
            return null;
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }
}

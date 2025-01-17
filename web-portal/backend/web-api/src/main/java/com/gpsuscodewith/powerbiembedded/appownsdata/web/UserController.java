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
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.security.*;
import java.util.stream.Collectors;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {
    static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserRepository userRepository;
    private final PbiWorkspaceUserRepository pbiWorkspaceUserRepository;
    private final WorkspaceReportRepository workspaceReportRepository;
    private final ReportRepository reportRepository;
    private final DatasetRepository datasetRepository;

    public UserController(UserRepository userRepository,
                          PbiWorkspaceUserRepository pbiWorkspaceUserRepository,
                          WorkspaceReportRepository workspaceReportRepository,
                          ReportRepository reportRepository,
                          DatasetRepository datasetRepository) {
        this.userRepository = userRepository;
        this.pbiWorkspaceUserRepository = pbiWorkspaceUserRepository;
        this.workspaceReportRepository = workspaceReportRepository;
        this.reportRepository = reportRepository;
        this.datasetRepository = datasetRepository;
    }

    @GetMapping
    public Iterable<User> getUsers(Principal principal) {
        String principalName = principal.getName();
        return userRepository.findAll();
    }

    @GetMapping("/me")
    public User getUserByPrincipal(Principal principal) {
        String principalName = principal.getName();
        return getUserByIdpName(principalName);
    }

    public User getUserByIdpName(String idpName) {
        return userRepository
                .findAll()
                .stream()
                .filter(x -> x.getUserId().equalsIgnoreCase(idpName))
                .findFirst()
                .orElse(null);
    }

    @GetMapping("/{userId}/datasets")
    public Iterable<Dataset> getAvailableDatasets(@PathVariable Long userId, Principal principal) {
        String principalName = principal.getName();
        User user = findUser(principal);
        List<Long> userWorkspaces = getUserWorkspaces(user.getId());
        return getDatasetsByWorkspaces(userWorkspaces);
    }

    private List<Dataset> getDatasetsByWorkspaces(List<Long> workspaceIds) {
        List<Dataset> filteredDatasets = datasetRepository
                .findAll()
                .stream()
                .filter(dataset -> workspaceIds.stream()
                        .anyMatch(l ->
                            dataset.getWorkspaceId() == l
                        )
                ).collect(Collectors.toList());
        return filteredDatasets;
    }

    private List<Long> getUserWorkspaces(Long userId) {
        List<PbiWorkspaceUser> workspaceUsers = pbiWorkspaceUserRepository
                .findAll()
                .stream()
                .filter(workspaceUser -> workspaceUser.getUserId() == userId)
                .collect(Collectors.toList());

        ArrayList<Long> workspaceIds = new ArrayList<Long>();
        for(PbiWorkspaceUser pbiWorkspaceUser : workspaceUsers) {
            workspaceIds.add(pbiWorkspaceUser.getWorkspaceId());
        }
        return workspaceIds;
    }

    private User findUser(Principal principal) {
        List<User> users = userRepository.findAll();
        for (User u : users) {
            if (u.getUserId().equalsIgnoreCase(principal.getName())) {
                return u;
            }
        }
        return null;
    }

    @GetMapping("/{userId}/reports")
    public Iterable<Report> getAvailableReports(@PathVariable Long userId, Principal principal) {
        String principalName = principal.getName();

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
    public User createUser(@RequestBody User user, Principal principal) {
        String emailAddress = user.getEmail();
        return userRepository.save(user);
    }
}

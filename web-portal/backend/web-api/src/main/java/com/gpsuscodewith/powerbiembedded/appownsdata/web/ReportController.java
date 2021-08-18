package com.gpsuscodewith.powerbiembedded.appownsdata.web;

import com.gpsuscodewith.powerbiembedded.appownsdata.domain.Report;
import com.gpsuscodewith.powerbiembedded.appownsdata.domain.User;
import com.gpsuscodewith.powerbiembedded.appownsdata.repositories.ReportRepository;
import com.gpsuscodewith.powerbiembedded.appownsdata.repositories.UserRepository;
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
@RequestMapping("/reports")
public class ReportController {
    static final Logger logger = LoggerFactory.getLogger(ReportController.class);
    private final ReportRepository reportRepository;

    public ReportController(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
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
}

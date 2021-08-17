package com.gpsuscodewith.powerbiembedded.appownsdata.web;

import com.gpsuscodewith.powerbiembedded.appownsdata.domain.Dataset;
import com.gpsuscodewith.powerbiembedded.appownsdata.domain.PbiWorkspace;
import com.gpsuscodewith.powerbiembedded.appownsdata.repositories.PbiWorkspaceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.concurrent.ExecutionException;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/workspaces")
public class PbiWorkspaceController {
    static final Logger logger = LoggerFactory.getLogger(PbiWorkspaceController.class);
    private final PbiWorkspaceRepository pbiWorkspaceRepository;

    public PbiWorkspaceController(PbiWorkspaceRepository pbiWorkspaceRepository) {
        this.pbiWorkspaceRepository = pbiWorkspaceRepository;
    }

    @GetMapping
    public Iterable<PbiWorkspace> getPbiWorkspaces() {
        return pbiWorkspaceRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PbiWorkspace createPbiWorkspace(@RequestBody PbiWorkspace pbiWorkspace) {
        return pbiWorkspaceRepository.save(pbiWorkspace);
    }
}

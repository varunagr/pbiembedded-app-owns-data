package com.gpsuscodewith.powerbiembedded.appownsdata.web;

import com.gpsuscodewith.powerbiembedded.appownsdata.domain.PbiWorkspaceUser;
import com.gpsuscodewith.powerbiembedded.appownsdata.repositories.PbiWorkspaceUserRepository;
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
@RequestMapping("/workspaceusers")
public class PbiWorkspaceUserController {
    static final Logger logger = LoggerFactory.getLogger(PbiWorkspaceUserController.class);
    private final PbiWorkspaceUserRepository pbiWorkspaceUserRepository;

    public PbiWorkspaceUserController(PbiWorkspaceUserRepository pbiWorkspaceUserRepository) {
        this.pbiWorkspaceUserRepository = pbiWorkspaceUserRepository;
    }

    @GetMapping
    public Iterable<PbiWorkspaceUser> getPbiWorkspaceUsers() {
        return pbiWorkspaceUserRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PbiWorkspaceUser createPbiWorkspaceUser(@RequestBody PbiWorkspaceUser pbiWorkspaceUser) {
        return pbiWorkspaceUserRepository.save(pbiWorkspaceUser);
    }
}

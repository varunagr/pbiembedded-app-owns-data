package com.gpsuscodewith.powerbiembedded.appownsdata.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.gpsuscodewith.powerbiembedded.appownsdata.domain.Dataset;
import com.gpsuscodewith.powerbiembedded.appownsdata.domain.GroupConfig;
import com.gpsuscodewith.powerbiembedded.appownsdata.domain.PbiWorkspace;
import com.gpsuscodewith.powerbiembedded.appownsdata.repositories.PbiWorkspaceRepository;
import com.gpsuscodewith.powerbiembedded.appownsdata.services.AzureADService;
import com.gpsuscodewith.powerbiembedded.appownsdata.services.PowerBiService;
import org.json.JSONException;
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
    public PbiWorkspace createPbiWorkspace(@RequestBody PbiWorkspace pbiWorkspace) throws JSONException, JsonProcessingException {
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
        GroupConfig groupConfig = PowerBiService.createGroup(accessToken, pbiWorkspace.getWorkspaceName());
        pbiWorkspace.setPbiIdentifier(groupConfig.getId());
        String addUserResponse = PowerBiService.addUserToGroup(
                accessToken,
                pbiWorkspace.getPbiIdentifier(),
                "varun.agrawal@msci.com",
                "Admin");
        return pbiWorkspaceRepository.save(pbiWorkspace);
    }
}

package com.gpsuscodewith.powerbiembedded.appownsdata.web;

//import com.azure.core.annotation.Delete;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.gpsuscodewith.powerbiembedded.appownsdata.config.Config;
import com.gpsuscodewith.powerbiembedded.appownsdata.domain.*;
import com.gpsuscodewith.powerbiembedded.appownsdata.repositories.DatasetRepository;
//import org.simpleframework.xml.Path;
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
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/datasets")
public class DatasetsController {
    static final Logger logger = LoggerFactory.getLogger(DatasetsController.class);
    private final DatasetRepository datasetRepository;

    public DatasetsController(DatasetRepository datasetRepository) {
        this.datasetRepository = datasetRepository;
    }

    @GetMapping
    public List<Dataset> getDatasets() {
        return datasetRepository.findAll();
    }

    @GetMapping("/{id}")
    public Dataset getDataset(@PathVariable Long id) {
        return datasetRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("{id}/config")
    public EmbedConfig getDatasetConfig(@PathVariable String id) {
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

        ArrayList<String> datasetIds = new ArrayList<String>();
        datasetIds.add(id);

        ArrayList<String> reportIds = new ArrayList<String>();

        try {
            EmbedConfig embedConfig = PowerBiService.getReportEmbedConfig(accessToken, workspacePbiIdentifier, reportIds, datasetIds);
          //  DatasetConfig datasetConfig = embedConfig.embedDatasets.get(0);
            return embedConfig;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return null;
    }

    @PostMapping
    public ResponseEntity createDataset(@RequestBody Dataset dataset) throws URISyntaxException, IOException {
        // Get access token
        String accessToken;
        try {
            accessToken = AzureADService.getAccessToken();
        } catch (ExecutionException | MalformedURLException | RuntimeException ex) {
            // Log error message
            logger.error(ex.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());

        } catch (InterruptedException interruptedEx) {
            // Log error message
            logger.error(interruptedEx.getMessage());

            Thread.currentThread().interrupt();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(interruptedEx.getMessage());
        }

        DatasetConfig result = PowerBiService.importFile(accessToken, Config.datasetFilePath);

        // call get report in group and grab dataset id from response
        dataset.setPbiId(result.getId());
        Dataset savedDataset = datasetRepository.save(dataset);

        return ResponseEntity.created(new URI("/datasets/" + savedDataset.getId())).body(savedDataset);
    }

    @PutMapping("{id}")
    public ResponseEntity updateDataset(@PathVariable Long id, @RequestBody Dataset dataset) {
        Dataset currentDataset = datasetRepository.findById(id).orElseThrow(RuntimeException::new);
        currentDataset.setDataSetName(dataset.getDataSetName());
        currentDataset.setPbiWorkspace(dataset.getPbiWorkspace());
        currentDataset.setTenantId(dataset.getTenantId());
        currentDataset = datasetRepository.save(dataset);

        return ResponseEntity.ok(currentDataset);
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteDataset(@PathVariable Long id) {
        datasetRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}

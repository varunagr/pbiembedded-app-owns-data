package com.gpsuscodewith.powerbiembedded.appownsdata.web;

//import com.azure.core.annotation.Delete;
import com.gpsuscodewith.powerbiembedded.appownsdata.config.Config;
import com.gpsuscodewith.powerbiembedded.appownsdata.domain.Dataset;
import com.gpsuscodewith.powerbiembedded.appownsdata.repositories.DatasetRepository;
//import org.simpleframework.xml.Path;
import com.gpsuscodewith.powerbiembedded.appownsdata.services.AzureADService;
import com.gpsuscodewith.powerbiembedded.appownsdata.services.PowerBiService;
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

    @PostMapping
    public ResponseEntity createDataset(@RequestBody Dataset dataset) throws URISyntaxException, IOException {
        Dataset savedDataset = datasetRepository.save(dataset);

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

        String result = PowerBiService.importFile(accessToken, Config.datasetFilePath);

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

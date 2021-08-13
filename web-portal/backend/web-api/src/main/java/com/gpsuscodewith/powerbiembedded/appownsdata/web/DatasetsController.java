package com.gpsuscodewith.powerbiembedded.appownsdata.web;

//import com.azure.core.annotation.Delete;
import com.gpsuscodewith.powerbiembedded.appownsdata.domain.Dataset;
import com.gpsuscodewith.powerbiembedded.appownsdata.repositories.DatasetRepository;
//import org.simpleframework.xml.Path;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/datasets")
public class DatasetsController {

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
    public ResponseEntity createDataset(@RequestBody Dataset dataset) throws URISyntaxException {
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

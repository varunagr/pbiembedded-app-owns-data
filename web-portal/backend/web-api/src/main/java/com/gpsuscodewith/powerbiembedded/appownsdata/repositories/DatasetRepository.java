package com.gpsuscodewith.powerbiembedded.appownsdata.repositories;

import com.gpsuscodewith.powerbiembedded.appownsdata.domain.Dataset;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DatasetRepository extends JpaRepository<Dataset, Long> {
}

package com.gpsuscodewith.powerbiembedded.appownsdata.repositories;

import com.gpsuscodewith.powerbiembedded.appownsdata.domain.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long>  {
}

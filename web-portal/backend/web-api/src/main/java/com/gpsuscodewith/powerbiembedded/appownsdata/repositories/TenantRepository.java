package com.gpsuscodewith.powerbiembedded.appownsdata.repositories;

import com.gpsuscodewith.powerbiembedded.appownsdata.domain.Report;
import com.gpsuscodewith.powerbiembedded.appownsdata.domain.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TenantRepository extends JpaRepository<Tenant, Long> {
}

package com.gpsuscodewith.powerbiembedded.appownsdata.repositories;

import com.gpsuscodewith.powerbiembedded.appownsdata.domain.PbiWorkspaceUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PbiWorkspaceUserRepository extends JpaRepository<PbiWorkspaceUser, Long> {
}

package com.gpsuscodewith.powerbiembedded.appownsdata.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gpsuscodewith.powerbiembedded.appownsdata.domain.User;

public interface UserRepository extends JpaRepository<User, Long>  {
}

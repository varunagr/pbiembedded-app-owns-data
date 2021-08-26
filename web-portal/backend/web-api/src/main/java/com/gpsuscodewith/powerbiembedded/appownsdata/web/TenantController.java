package com.gpsuscodewith.powerbiembedded.appownsdata.web;

import com.gpsuscodewith.powerbiembedded.appownsdata.domain.Report;
import com.gpsuscodewith.powerbiembedded.appownsdata.domain.Tenant;
import com.gpsuscodewith.powerbiembedded.appownsdata.repositories.TenantRepository;
import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/tenants")
public class TenantController {
    static final Logger logger = LoggerFactory.getLogger(TenantController.class);

    private TenantRepository tenantRepository;

    public TenantController(TenantRepository tenantRepository) {
        this.tenantRepository = tenantRepository;
    }

    @GetMapping
    public Iterable<Tenant> getTenants() {
        return tenantRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Tenant createUser(@RequestBody Tenant tenant) {
        return tenantRepository.save(tenant);
    }
}

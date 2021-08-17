package com.gpsuscodewith.powerbiembedded.appownsdata.web;

import com.gpsuscodewith.powerbiembedded.appownsdata.domain.PbiWorkspace;
import com.gpsuscodewith.powerbiembedded.appownsdata.domain.User;
import com.gpsuscodewith.powerbiembedded.appownsdata.repositories.DatasetRepository;
import com.gpsuscodewith.powerbiembedded.appownsdata.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.concurrent.ExecutionException;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {
    static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }
}

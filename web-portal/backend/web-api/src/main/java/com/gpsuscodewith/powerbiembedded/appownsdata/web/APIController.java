package com.gpsuscodewith.powerbiembedded.appownsdata.web;


import com.gpsuscodewith.powerbiembedded.appownsdata.domain.Message;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.security.*;

/**
 * Handles requests to "/api" endpoints.
 * @see com.auth0.example.security.SecurityConfig to see how these endpoints are protected.
 */
@RestController
@RequestMapping(path = "api", produces = MediaType.APPLICATION_JSON_VALUE)
// For simplicity of this sample, allow all origins. Real applications should configure CORS for their use case.
@CrossOrigin(maxAge = 3600)
public class APIController {

    @GetMapping(value = "/public")
    public Message publicEndpoint() {
        return new Message("All good. You DO NOT need to be authenticated to call /api/public.");
    }

    @GetMapping(value = "/private")
    public Message privateEndpoint(Principal principal) {
        return new Message("All good. You can see this because you are Authenticated.  Your name is " + principal.getName());
    }

    @GetMapping(value = "/private-scoped")
    public Message privateScopedEndpoint(Principal principal) {
        return new Message("All good. You can see this because you are Authenticated with a Token granted the 'read:messages' scope.  Your username is " + principal.getName());
    }
}

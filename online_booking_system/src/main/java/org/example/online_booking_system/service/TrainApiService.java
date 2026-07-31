package org.example.online_booking_system.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class TrainApiService {

    @Value("${rapid.api.key}")
    private String apiKey;

    @Value("${rapid.api.host}")
    private String apiHost;

    @Autowired
    private RestTemplate restTemplate;
    public String searchTrains(String source,
                               String destination,
                               String date) {

        String url = UriComponentsBuilder

                .fromHttpUrl(
                        "https://" + apiHost
                                + "/between/"
                                + source
                                + "/"
                                + destination
                )

                .queryParam("date", date)

                .toUriString();

        HttpHeaders headers = new HttpHeaders();

        headers.set("x-rapidapi-key", apiKey);

        headers.set("x-rapidapi-host", apiHost);

        HttpEntity<String> entity =
                new HttpEntity<>(headers);

        return restTemplate.exchange(

                url,

                HttpMethod.GET,

                entity,

                String.class

        ).getBody();

    }

}
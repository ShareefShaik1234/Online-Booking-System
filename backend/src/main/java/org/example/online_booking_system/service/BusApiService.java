package org.example.online_booking_system.service;

import org.example.online_booking_system.dto.RouteDTO;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class BusApiService {

    @Value("${geoapify.api.key}")
    private String geoApiKey;

    @Value("${openroute.api.key}")
    private String openRouteApiKey;

    @Autowired
    private RestTemplate restTemplate;

    // ==========================================
    // GET ROUTE
    // ==========================================

    public RouteDTO getRoute(String source, String destination) {

        try {

            double[] sourceCoordinates = getCoordinates(source);

            double[] destinationCoordinates = getCoordinates(destination);

            return getRouteDetails(

                    source,

                    destination,

                    sourceCoordinates,

                    destinationCoordinates

            );

        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException("Unable to fetch route.");

        }

    }
    // ==========================================
// GET CITY COORDINATES USING GEOAPIFY
// ==========================================

    private double[] getCoordinates(String city) {

        try {

            String url =

                    "https://api.geoapify.com/v1/geocode/search?text="

                            + URLEncoder.encode(city, StandardCharsets.UTF_8)

                            + "&limit=1"

                            + "&apiKey="

                            + geoApiKey;

            String response =

                    restTemplate.getForObject(url, String.class);

            JSONObject json =

                    new JSONObject(response);

            JSONArray features =

                    json.getJSONArray("features");

            if (features.length() == 0) {

                throw new RuntimeException(

                        "City Not Found : " + city

                );

            }

            JSONArray coordinates =

                    features.getJSONObject(0)

                            .getJSONObject("geometry")

                            .getJSONArray("coordinates");

            double longitude =

                    coordinates.getDouble(0);

            double latitude =

                    coordinates.getDouble(1);

            System.out.println(

                    city + " -> "

                            + latitude

                            + ", "

                            + longitude

            );

            return new double[]{

                    longitude,

                    latitude

            };

        } catch (Exception e) {

            throw new RuntimeException(

                    "Unable to fetch coordinates for "

                            + city

            );

        }

    }

// ==========================================
// GET ROUTE DETAILS FROM OPENROUTESERVICE
// ==========================================

    private RouteDTO getRouteDetails(

            String source,

            String destination,

            double[] sourceCoordinates,

            double[] destinationCoordinates

    ) {

        String url =
                "https://api.openrouteservice.org/v2/directions/driving-car";

        JSONObject body = new JSONObject();

        JSONArray coordinates = new JSONArray();

        coordinates.put(

                new JSONArray()

                        .put(sourceCoordinates[0])

                        .put(sourceCoordinates[1])

        );

        coordinates.put(

                new JSONArray()

                        .put(destinationCoordinates[0])

                        .put(destinationCoordinates[1])

        );

        body.put("coordinates", coordinates);

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        headers.setBearerAuth(openRouteApiKey);

        HttpEntity<String> entity =

                new HttpEntity<>(

                        body.toString(),

                        headers

                );

        ResponseEntity<String> response =

                restTemplate.exchange(

                        url,

                        HttpMethod.POST,

                        entity,

                        String.class

                );

        return parseRoute(

                source,

                destination,

                response.getBody()

        );

    }

    // ==========================================
// PARSE OPENROUTESERVICE RESPONSE
// ==========================================

    private RouteDTO parseRoute(

            String source,

            String destination,

            String response

    ) {

        JSONObject json = new JSONObject(response);

        JSONArray routes = json.getJSONArray("routes");

        if (routes.length() == 0) {

            throw new RuntimeException("Route Not Found");

        }

        JSONObject summary =

                routes.getJSONObject(0)

                        .getJSONObject("summary");

        double distance =

                summary.getDouble("distance") / 1000.0;

        double duration =

                summary.getDouble("duration") / 60.0;

        RouteDTO dto = new RouteDTO();

        dto.setSource(source);

        dto.setDestination(destination);

        dto.setDistance(

                Math.round(distance * 100.0) / 100.0

        );

        dto.setDuration((int) Math.round(duration));

        return dto;

    }
}
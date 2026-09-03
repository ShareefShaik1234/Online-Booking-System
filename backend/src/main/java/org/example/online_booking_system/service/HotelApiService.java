package org.example.online_booking_system.service;

import org.example.online_booking_system.dto.HotelDTO;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class HotelApiService {

    @Value("${geoapify.api.key}")
    private String apiKey;

    @Autowired
    private RestTemplate restTemplate;

    public List<HotelDTO> searchHotels(String city) {

        List<HotelDTO> hotelList = new ArrayList<>();

        try {

            // -----------------------------
            // STEP 1 : Get Latitude & Longitude
            // -----------------------------

            String encodedCity = URLEncoder.encode(city, StandardCharsets.UTF_8);

            String geoUrl =
                    "https://api.geoapify.com/v1/geocode/search?text="
                            + encodedCity
                            + "&limit=1&apiKey="
                            + apiKey;

            String geoResponse =
                    restTemplate.getForObject(geoUrl, String.class);

            JSONObject geoJson = new JSONObject(geoResponse);

            JSONArray geoFeatures =
                    geoJson.getJSONArray("features");

            if (geoFeatures.length() == 0) {

                return hotelList;

            }

            JSONObject geometry =
                    geoFeatures.getJSONObject(0)
                            .getJSONObject("geometry");

            JSONArray coordinates =
                    geometry.getJSONArray("coordinates");

            double longitude = coordinates.getDouble(0);

            double latitude = coordinates.getDouble(1);

            // -----------------------------
            // STEP 2 : Search Hotels
            // -----------------------------

            String hotelUrl =
                    "https://api.geoapify.com/v2/places"
                            + "?categories=accommodation.hotel"
                            + "&filter=circle:"
                            + longitude + ","
                            + latitude + ",50000"
                            + "&limit=20"
                            + "&apiKey="
                            + apiKey;

            String hotelResponse =
                    restTemplate.getForObject(hotelUrl, String.class);

            JSONObject hotelJson =
                    new JSONObject(hotelResponse);

            JSONArray hotels =
                    hotelJson.getJSONArray("features");

            for (int i = 0; i < hotels.length(); i++) {

                JSONObject properties =
                        hotels.getJSONObject(i)
                                .getJSONObject("properties");

                HotelDTO hotel = new HotelDTO();

                hotel.setName(
                        properties.optString(
                                "name",
                                "Unknown Hotel"));

                hotel.setAddress(
                        properties.optString(
                                "formatted",
                                "Address Not Available"));

                hotel.setLatitude(latitude);

                hotel.setLongitude(longitude);

                hotelList.add(hotel);

            }

        }

        catch (Exception e) {

            e.printStackTrace();

        }

        return hotelList;

    }

}
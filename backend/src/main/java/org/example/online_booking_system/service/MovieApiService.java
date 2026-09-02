package org.example.online_booking_system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MovieApiService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    @Autowired
    private RestTemplate restTemplate;


    // ==========================================
    // COMMON API METHOD
    // ==========================================

    private String callApi(String url) {

        try {

            HttpHeaders headers = new HttpHeaders();

            headers.set("Accept", "application/json");

            /*
             * TMDB supports API key authentication.
             * We keep using the v3 api_key parameter below.
             */

            HttpEntity<String> entity =
                    new HttpEntity<>(headers);

            ResponseEntity<String> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.GET,
                            entity,
                            String.class
                    );

            return response.getBody();

        }

        catch (Exception e) {

            System.out.println("====================================");
            System.out.println("TMDB API ERROR");
            System.out.println("URL: " + url);
            System.out.println("ERROR: " + e.getMessage());
            System.out.println("====================================");

            throw new RuntimeException(
                    "Unable to connect to TMDB API",
                    e
            );

        }

    }


    // ==========================================
    // POPULAR MOVIES
    // ==========================================

    public String getPopularMovies() {

        String url =
                "https://api.themoviedb.org/3/movie/popular"
                        + "?api_key=" + apiKey
                        + "&language=en-US"
                        + "&page=1";

        return callApi(url);

    }


    // ==========================================
    // NOW PLAYING
    // ==========================================

    public String getNowPlayingMovies() {

        String url =
                "https://api.themoviedb.org/3/movie/now_playing"
                        + "?api_key=" + apiKey
                        + "&language=en-US"
                        + "&page=1";

        return callApi(url);

    }


    // ==========================================
    // TOP RATED
    // ==========================================

    public String getTopRatedMovies() {

        String url =
                "https://api.themoviedb.org/3/movie/top_rated"
                        + "?api_key=" + apiKey
                        + "&language=en-US"
                        + "&page=1";

        return callApi(url);

    }


    // ==========================================
    // TRENDING
    // ==========================================

    public String getTrendingMovies() {

        String url =
                "https://api.themoviedb.org/3/trending/movie/day"
                        + "?api_key=" + apiKey
                        + "&language=en-US";

        return callApi(url);

    }


    // ==========================================
    // MOVIES BY LANGUAGE
    // ==========================================

    public String getMoviesByLanguage(String lang) {

        String url =
                "https://api.themoviedb.org/3/discover/movie"
                        + "?api_key=" + apiKey
                        + "&with_original_language=" + lang
                        + "&sort_by=popularity.desc"
                        + "&language=en-US"
                        + "&page=1";

        return callApi(url);

    }

}
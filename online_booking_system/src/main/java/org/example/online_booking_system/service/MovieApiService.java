package org.example.online_booking_system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MovieApiService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    @Autowired
    private RestTemplate restTemplate;

    // ==========================
    // POPULAR MOVIES
    // ==========================

    public String getPopularMovies() {

        return callApi(
                "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey
        );

    }

    // ==========================
    // NOW PLAYING
    // ==========================

    public String getNowPlayingMovies() {

        return callApi(
                "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apiKey
        );

    }

    // ==========================
    // TOP RATED
    // ==========================

    public String getTopRatedMovies() {

        return callApi(
                "https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKey
        );

    }

    // ==========================
    // TRENDING
    // ==========================

    public String getTrendingMovies() {

        return callApi(
                "https://api.themoviedb.org/3/trending/movie/day?api_key=" + apiKey
        );

    }

    // ==========================
    // LANGUAGE
    // ==========================

    public String getMoviesByLanguage(String lang) {

        return callApi(
                "https://api.themoviedb.org/3/discover/movie"
                        + "?api_key=" + apiKey
                        + "&with_original_language=" + lang
                        + "&sort_by=popularity.desc"
        );

    }

    // ==========================
    // COMMON METHOD
    // ==========================

    private String callApi(String url) {

        return restTemplate.getForObject(url, String.class);

    }

}
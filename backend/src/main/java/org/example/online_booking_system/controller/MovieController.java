package org.example.online_booking_system.controller;

import org.example.online_booking_system.entity.MovieEntity;
import org.example.online_booking_system.service.MovieApiService;
import org.example.online_booking_system.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class MovieController {

    @Autowired
    private MovieService service;

    @Autowired
    private MovieApiService movieApiService;

    // =====================================
    // BOOK MOVIE
    // =====================================

    @PostMapping("/movie/book")
    public String bookMovie(@RequestBody MovieEntity movie) {

        return service.bookMovie(movie);

    }

    // =====================================
    // VIEW ALL BOOKINGS
    // =====================================

    @GetMapping("/movie/view")
    public List<MovieEntity> viewMovies() {

        return service.getMovies();

    }

    // =====================================
    // DELETE BOOKING
    // =====================================

    @DeleteMapping("/movie/delete/{id}")
    public String deleteMovie(@PathVariable int id) {

        return service.cancelMovie(id);

    }

    // =====================================
    // POPULAR MOVIES
    // =====================================

    @GetMapping("/movie/popular")
    public String getPopularMovies() throws Exception {

        return movieApiService.getPopularMovies();

    }

    // =====================================
    // NOW PLAYING MOVIES
    // =====================================

    @GetMapping("/movie/now-playing")
    public String getNowPlayingMovies() throws Exception {

        return movieApiService.getNowPlayingMovies();

    }

    // =====================================
    // TOP RATED MOVIES
    // =====================================

    @GetMapping("/movie/top-rated")
    public String getTopRatedMovies() throws Exception {

        return movieApiService.getTopRatedMovies();

    }

    // =====================================
    // TRENDING MOVIES
    // =====================================

    @GetMapping("/movie/trending")
    public String getTrendingMovies() throws Exception {

        return movieApiService.getTrendingMovies();

    }

    // =====================================
    // MOVIES BY LANGUAGE
    // =====================================

    @GetMapping("/movie/language/{lang}")
    public String getMoviesByLanguage(@PathVariable String lang) throws Exception {

        return movieApiService.getMoviesByLanguage(lang);

    }

}
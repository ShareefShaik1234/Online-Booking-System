package org.example.online_booking_system.service;

import org.example.online_booking_system.entity.MovieEntity;
import org.example.online_booking_system.repository.MovieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    @Autowired
    MovieRepo repo;

    // Book Movie
    public String bookMovie(MovieEntity movie){

        repo.save(movie);

        return "Movie Booked Successfully";
    }

    // View Bookings
    public List<MovieEntity> getMovies(){

        return repo.findAll();

    }

    // Cancel Booking
    public String cancelMovie(int id){

        repo.deleteById(id);

        return "Movie Booking Cancelled";
    }

}
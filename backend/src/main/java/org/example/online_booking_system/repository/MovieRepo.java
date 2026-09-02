package org.example.online_booking_system.repository;

import org.example.online_booking_system.entity.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepo extends JpaRepository<MovieEntity,Integer> {

}
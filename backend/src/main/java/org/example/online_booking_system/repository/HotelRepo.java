package org.example.online_booking_system.repository;

import org.example.online_booking_system.entity.HotelEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelRepo extends JpaRepository<HotelEntity,Integer> {

}
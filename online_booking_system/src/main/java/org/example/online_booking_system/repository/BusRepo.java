package org.example.online_booking_system.repository;

import org.example.online_booking_system.entity.BusEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusRepo extends JpaRepository<BusEntity,Integer> {

}
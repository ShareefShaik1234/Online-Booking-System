package org.example.online_booking_system.repository;

import org.example.online_booking_system.entity.TrainEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainRepo extends JpaRepository<TrainEntity, Integer> {

}
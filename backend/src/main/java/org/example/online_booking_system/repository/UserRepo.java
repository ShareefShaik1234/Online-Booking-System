package org.example.online_booking_system.repository;

import org.example.online_booking_system.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<UserEntity, String> {

    UserEntity findByUsername(String username);

    UserEntity findByUsernameAndPassword(String username, String password);

}
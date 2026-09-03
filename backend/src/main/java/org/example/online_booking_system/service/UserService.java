package org.example.online_booking_system.service;

import org.example.online_booking_system.entity.UserEntity;
import org.example.online_booking_system.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepo repo;

    // Register User
    public String register(UserEntity user){

        UserEntity u = repo.findByUsername(user.getUsername());

        if(u != null){
            return "Username Already Exists";
        }

        repo.save(user);

        return "Registration Successful";
    }

    // Login User
    public String login(UserEntity user){

        UserEntity u = repo.findByUsernameAndPassword(
                user.getUsername(),
                user.getPassword());

        if(u != null){
            return "Login Successful";
        }

        return "Invalid Username or Password";
    }

    public List<UserEntity> getUsers(){

        return repo.findAll();

    }

}
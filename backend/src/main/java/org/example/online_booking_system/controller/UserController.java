package org.example.online_booking_system.controller;

import org.example.online_booking_system.entity.UserEntity;
import org.example.online_booking_system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    UserService service;

    @PostMapping("/register")
    public String register(@RequestBody UserEntity user){

        return service.register(user);

    }

    @PostMapping("/login")
    public String login(@RequestBody UserEntity user){

        return service.login(user);

    }
    @GetMapping("/users")
    public List<UserEntity> getUsers(){

        return service.getUsers();

    }

}
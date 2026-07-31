package org.example.online_booking_system.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class AdminController {

    @PostMapping("/admin/login")
    public String adminLogin(@RequestBody Map<String,String> admin){

        String username=admin.get("username");
        String password=admin.get("password");

        if(username.equals("admin") && password.equals("admin123")){

            return "Admin Login Successful";

        }

        return "Invalid Admin Credentials";

    }



}
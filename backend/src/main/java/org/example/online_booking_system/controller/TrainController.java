package org.example.online_booking_system.controller;

import org.example.online_booking_system.entity.TrainEntity;
import org.example.online_booking_system.service.TrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.example.online_booking_system.service.TrainApiService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class TrainController {

    @Autowired
    TrainService service;
    @Autowired
    private TrainApiService trainApiService;

    @PostMapping("/train/book")
    public String bookTrain(@RequestBody TrainEntity train){

        return service.bookTrain(train);

    }

    @GetMapping("/train/view")
    public List<TrainEntity> viewTrain(){

        return service.viewTrain();

    }

    @DeleteMapping("/train/delete/{id}")
    public String deleteTrain(@PathVariable int id){

        return service.deleteTrain(id);

    }
// ==========================================
// SEARCH TRAINS BETWEEN STATIONS
// ==========================================

    @GetMapping("/train/search")
    public String searchTrains(

            @RequestParam String source,

            @RequestParam String destination,

            @RequestParam String date

    ) {

        return trainApiService.searchTrains(

                source,

                destination,

                date

        );

    }
}
package org.example.online_booking_system.controller;

import org.example.online_booking_system.dto.RouteDTO;
import org.example.online_booking_system.entity.BusEntity;
import org.example.online_booking_system.service.BusApiService;
import org.example.online_booking_system.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class BusController {

    @Autowired
    private BusService service;

    @Autowired
    private BusApiService busApiService;

    // ==========================
    // Book Bus
    // ==========================

    @PostMapping("/bus/book")
    public String bookBus(@RequestBody BusEntity bus){

        return service.bookBus(bus);

    }

    // ==========================
    // View Bus Bookings
    // ==========================

    @GetMapping("/bus/view")
    public List<BusEntity> viewBus(){

        return service.viewBus();

    }

    // ==========================
    // Delete Bus Booking
    // ==========================

    @DeleteMapping("/bus/delete/{id}")
    public String deleteBus(@PathVariable int id){

        return service.deleteBus(id);

    }

    // ==========================
    // Search Route using OpenRouteService
    // ==========================

    @GetMapping("/bus/route")
    public RouteDTO getRoute(
            @RequestParam String source,
            @RequestParam String destination){

        return busApiService.getRoute(source, destination);

    }

}
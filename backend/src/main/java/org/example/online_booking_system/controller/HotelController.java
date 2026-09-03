package org.example.online_booking_system.controller;

import org.example.online_booking_system.dto.HotelDTO;
import org.example.online_booking_system.entity.HotelEntity;
import org.example.online_booking_system.service.HotelApiService;
import org.example.online_booking_system.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/hotel")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @Autowired
    private HotelApiService hotelApiService;

    // ===========================
    // Book Hotel
    // POST : /hotel/book
    // ===========================

    @PostMapping("/book")
    public String bookHotel(@RequestBody HotelEntity hotel) {

        return hotelService.bookHotel(hotel);

    }

    // ===========================
    // View All Bookings
    // GET : /hotel/view
    // ===========================

    @GetMapping("/view")
    public List<HotelEntity> viewHotel() {

        return hotelService.viewHotel();

    }

    // ===========================
    // Delete Booking
    // DELETE : /hotel/delete/{id}
    // ===========================

    @DeleteMapping("/delete/{id}")
    public String deleteHotel(@PathVariable int id) {

        return hotelService.deleteHotel(id);

    }

    // ===========================
    // Search Hotels Using Geoapify
    // GET : /hotel/search?city=Hyderabad
    // ===========================

    @GetMapping("/search")
    public List<HotelDTO> searchHotels(@RequestParam String city) {

        return hotelApiService.searchHotels(city);

    }

}
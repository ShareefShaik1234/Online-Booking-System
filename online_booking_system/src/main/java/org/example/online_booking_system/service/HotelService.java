package org.example.online_booking_system.service;

import org.example.online_booking_system.entity.HotelEntity;
import org.example.online_booking_system.repository.HotelRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    @Autowired
    HotelRepo repo;

    public String bookHotel(HotelEntity hotel){

        repo.save(hotel);

        return "Hotel Booked Successfully";

    }

    public List<HotelEntity> viewHotel(){

        return repo.findAll();

    }

    public String deleteHotel(int id){

        repo.deleteById(id);

        return "Hotel Booking Cancelled";

    }

}
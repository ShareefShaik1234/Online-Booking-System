package org.example.online_booking_system.service;

import org.example.online_booking_system.entity.BusEntity;
import org.example.online_booking_system.repository.BusRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusService {

    @Autowired
    BusRepo repo;

    public String bookBus(BusEntity bus){

        repo.save(bus);

        return "Bus Booked Successfully";

    }

    public List<BusEntity> viewBus(){

        return repo.findAll();

    }

    public String deleteBus(int id){

        repo.deleteById(id);

        return "Bus Booking Cancelled";

    }

}
package org.example.online_booking_system.service;

import org.example.online_booking_system.entity.TrainEntity;
import org.example.online_booking_system.repository.TrainRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainService {

    @Autowired
    TrainRepo repo;

    public String bookTrain(TrainEntity train){

        repo.save(train);

        return "Train Booked Successfully";

    }

    public List<TrainEntity> viewTrain(){

        return repo.findAll();

    }

    public String deleteTrain(int id){

        repo.deleteById(id);

        return "Train Booking Cancelled";

    }

}
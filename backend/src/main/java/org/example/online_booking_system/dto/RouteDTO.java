package org.example.online_booking_system.dto;

public class RouteDTO {

    private String source;

    private String destination;

    private double distance;

    private double duration;

    public RouteDTO() {
    }

    public RouteDTO(String source,
                    String destination,
                    double distance,
                    double duration) {

        this.source = source;
        this.destination = destination;
        this.distance = distance;
        this.duration = duration;

    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public double getDuration() {
        return duration;
    }

    public void setDuration(double duration) {
        this.duration = duration;
    }

}
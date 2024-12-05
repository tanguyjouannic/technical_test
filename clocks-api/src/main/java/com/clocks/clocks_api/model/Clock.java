package com.clocks.clocks_api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.util.UUID;

@Entity
public class Clock {

    @Id
    @GeneratedValue
    private UUID id;

    private String label;
    private String timezone;

    public Clock() {

    }

    public Clock(String label, String timezone) {
        this.label = label;
        this.timezone = timezone;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
    
    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }
}

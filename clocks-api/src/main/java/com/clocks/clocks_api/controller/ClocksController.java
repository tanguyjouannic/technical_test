package com.clocks.clocks_api.controller;

import com.clocks.clocks_api.model.Clock;
import com.clocks.clocks_api.repository.ClocksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/clocks")
public class ClocksController {

    @Autowired
    private ClocksRepository clockRepository;

    // GET method to retrieve all clocks.
    @GetMapping
    public List<Clock> getAllClocks() {
        return clockRepository.findAll();
    }

    // POST method to create a new clock.
    @PostMapping
    public Clock createClock(@RequestParam String label, @RequestParam String timezone) {
        Clock clock = new Clock(label, timezone);
        return clockRepository.save(clock);
    }

    // DELETE method to delete a clock by UUID.
    @DeleteMapping
    public void deleteClock(@RequestParam UUID id) {
        clockRepository.deleteById(id);
    }

    // PUT method to update a clock by UUID.
    @PutMapping
    public Clock updateClock(@RequestParam UUID id, @RequestParam String label, @RequestParam String timezone) {
        Clock clock = clockRepository.findById(id).orElseThrow(() -> new RuntimeException("Clock not found"));
        clock.setLabel(label);
        clock.setTimezone(timezone);
        return clockRepository.save(clock);
    }
}
package com.g0urd.grad_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.g0urd.grad_project.models.Driver;
import com.g0urd.grad_project.service.DriverService.DriverService;

@CrossOrigin(maxAge = 3360)
@RestController
public class DriverController {

    @Autowired
    private DriverService driverService;

    @GetMapping("/api/v1/driver")
    public ResponseEntity<List<Driver>> fetchAllDrivers() {
        return ResponseEntity.ok(driverService.fetchAllDrivers());
    }

    @PostMapping("/api/v1/driver")
    public ResponseEntity<Driver> createDriver(
            @RequestBody Driver driver) {
        return ResponseEntity.ok(driverService.createDriver(driver));
    }

    @PutMapping("/api/v1/driver/{id}")
    public ResponseEntity<Driver> updateDriver(
            @PathVariable("id") Long id,
            @RequestBody Driver driver) {
        return ResponseEntity.ok(driverService.updateDriver(driver));
    }

    @DeleteMapping("/api/v1/driver/{id}")
    public ResponseEntity<Boolean> deleteDriver(@PathVariable("id") Long id) {
        return ResponseEntity.ok(driverService.deleteDriver(id));
    }

}

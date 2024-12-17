package com.g0urd.grad_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g0urd.grad_project.models.Vehicle;
import com.g0urd.grad_project.service.VehicleService.VehicleService;

@CrossOrigin(maxAge = 3360)
@RestController
@RequestMapping("/api/scheduler")
@PreAuthorize("hasRole('SCHEDULER')")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @GetMapping("/vehicle")
    public ResponseEntity<List<Vehicle>> fetchAllVehicles() {
        return ResponseEntity.ok(vehicleService.fetchAllVehicles());
    }

    @PostMapping("/vehicle")
    public ResponseEntity<Vehicle> createVehicle(
            @RequestBody Vehicle vehicle) {
        return ResponseEntity.ok(vehicleService.createVehicle(vehicle));
    }

    @PutMapping("/vehicle/{id}")
    public ResponseEntity<Vehicle> updateVehicle(
            @PathVariable("id") Long id,
            @RequestBody Vehicle vehicle) {
        return ResponseEntity.ok(vehicleService.updateVehicle(vehicle));
    }

    @DeleteMapping("/vehicle/{id}")
    public ResponseEntity<Boolean> deleteVehicle(@PathVariable("id") Long id) {
        return ResponseEntity.ok(vehicleService.deleteVehicle(id));
    }

}

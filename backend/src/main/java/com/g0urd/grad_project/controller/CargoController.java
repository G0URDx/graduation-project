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

import com.g0urd.grad_project.models.Cargo;
import com.g0urd.grad_project.service.CargoService.CargoService;

@CrossOrigin(maxAge = 3360)
@RestController
public class CargoController {

    @Autowired
    CargoService cargoService;

    @GetMapping("/api/v1/cargo")
    public ResponseEntity<List<Cargo>> fetchAllCargos() {
        return ResponseEntity.ok(cargoService.fetchAllCargos());
    }

    @PostMapping("/api/v1/cargo")
    public ResponseEntity<Cargo> createCargo(
            @RequestBody Cargo cargo) {
        return ResponseEntity.ok(cargoService.createCargo(cargo));
    }

    @PutMapping("/api/v1/cargo/{id}")
    public ResponseEntity<Cargo> updateCargo(
            @PathVariable("id") Long id,
            @RequestBody Cargo cargo) {
        return ResponseEntity.ok(cargoService.updateCargo(cargo));
    }

    @DeleteMapping("/api/v1/cargo/{id}")
    public ResponseEntity<Boolean> deleteCargo(@PathVariable("id") Long id) {
        return ResponseEntity.ok(cargoService.deleteCargo(id));
    }

}

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

import com.g0urd.grad_project.models.Curatorship;
import com.g0urd.grad_project.service.CuratorshipService.CuratorshipService;

@CrossOrigin(maxAge = 3360)
@RestController
@RequestMapping("/api/manager")
@PreAuthorize("hasRole('MANAGER')")
public class CuratorshipController {

    @Autowired
    private CuratorshipService curatorshipService;

    @GetMapping("/curatorship")
    public ResponseEntity<List<Curatorship>> fetchAllCuratorships() {
        return ResponseEntity.ok(curatorshipService.fetchAllCuratorships());
    }

    @PostMapping("/curatorship")
    public ResponseEntity<Curatorship> createCuratorship(
            @RequestBody Curatorship curatorship) {
        return ResponseEntity.ok(curatorshipService.createCuratorship(curatorship));
    }

    @PutMapping("/curatorship/{id}")
    public ResponseEntity<Curatorship> updateCuratorship(
            @PathVariable("id") Long id,
            @RequestBody Curatorship curatorship) {
        return ResponseEntity.ok(curatorshipService.updateCuratorship(curatorship));
    }

    @DeleteMapping("/curatorship/{id}")
    public ResponseEntity<Boolean> deleteCuratorship(@PathVariable("id") Long id) {
        return ResponseEntity.ok(curatorshipService.deleteCuratorship(id));
    }

}

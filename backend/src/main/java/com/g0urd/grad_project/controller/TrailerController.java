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

import com.g0urd.grad_project.models.Trailer;
import com.g0urd.grad_project.service.TrailerService.TrailerService;

@CrossOrigin(maxAge = 3360)
@RestController
@RequestMapping("/api/scheduler")
@PreAuthorize("hasRole('SCHEDULER')")
public class TrailerController {

    @Autowired
    private TrailerService trailerService;

    @GetMapping("/trailer")
    public ResponseEntity<List<Trailer>> fetchAllTrailers() {
        return ResponseEntity.ok(trailerService.fetchAllTrailers());
    }

    @PostMapping("/trailer")
    public ResponseEntity<Trailer> createTrailer(
            @RequestBody Trailer trailer) {
        return ResponseEntity.ok(trailerService.createTrailer(trailer));
    }

    @PutMapping("/trailer/{id}")
    public ResponseEntity<Trailer> updateTrailer(
            @PathVariable("id") Long id,
            @RequestBody Trailer trailer) {
        return ResponseEntity.ok(trailerService.updateTrailer(trailer));
    }

    @DeleteMapping("/trailer/{id}")
    public ResponseEntity<Boolean> deleteTrailer(@PathVariable("id") Long id) {
        return ResponseEntity.ok(trailerService.deleteTrailer(id));
    }

}

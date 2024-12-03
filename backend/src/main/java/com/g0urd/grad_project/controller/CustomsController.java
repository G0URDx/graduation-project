package com.g0urd.grad_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g0urd.grad_project.models.Customs;
import com.g0urd.grad_project.service.CustomsService.CustomsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(maxAge = 3360)
@RestController
public class CustomsController {

    @Autowired
    private CustomsService customsService;

    @GetMapping("/api/v1/customs")
    public ResponseEntity<List<Customs>> fetchAllCustoms() {
        return ResponseEntity.ok(customsService.fetchAllCustoms());
    }

    @PostMapping("/api/v1/customs")
    public ResponseEntity<Customs> createCustoms(
            @RequestBody Customs customs) {
        return ResponseEntity.ok(customsService.createCustoms(customs));
    }

    @PutMapping("/api/v1/customs/{id}")
    public ResponseEntity<Customs> updateCustoms(
            @PathVariable("id") Long id,
            @RequestBody Customs customs) {
        return ResponseEntity.ok(customsService.updateCustoms(customs));
    }

    @DeleteMapping("/api/v1/customs/{id}")
    public ResponseEntity<Boolean> deleteCustoms(@PathVariable("id") Long id) {
        return ResponseEntity.ok(customsService.deleteCustoms(id));
    }

}

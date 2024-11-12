package com.g0urd.grad_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.g0urd.grad_project.models.TransportationOffer;
import com.g0urd.grad_project.service.TransportationOfferService.TransportationOfferService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(maxAge = 3360)
@RestController
public class TransportationOfferController {

    @Autowired
    private TransportationOfferService transportationOfferService;

    @GetMapping("/api/v1/transportation-offer")
    public ResponseEntity<List<TransportationOffer>> fetchAllTransportationOffers() {
        return ResponseEntity.ok(transportationOfferService.fetchAllTransportationOffers());
    }

    @PostMapping("/api/v1/transportation-offer")
    public ResponseEntity<TransportationOffer> createTransportationOffer(
            @RequestBody TransportationOffer transportationOffer) {
        return ResponseEntity.ok(transportationOfferService.createTransportationOffer(transportationOffer));
    }

    @PutMapping("/api/v1/transportation-offer/{id}")
    public ResponseEntity<TransportationOffer> updateTransportationOffer(
            @PathVariable("id") Long id,
            @RequestBody TransportationOffer transportationOffer) {
        return ResponseEntity.ok(transportationOfferService.updateTransportationOffer(transportationOffer));
    }

    @DeleteMapping("/api/v1/transportation-offer/{id}")
    public ResponseEntity<Boolean> deleteTransportationOffer(@PathVariable("id") Long id) {
        return ResponseEntity.ok(transportationOfferService.deleteTransportationOffer(id));
    }

}

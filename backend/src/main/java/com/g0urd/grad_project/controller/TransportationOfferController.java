package com.g0urd.grad_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin(maxAge = 3360)
@RestController
@RequestMapping("/api/manager")
@PreAuthorize("hasRole('MANAGER')")
public class TransportationOfferController {

    @Autowired
    private TransportationOfferService transportationOfferService;

    @GetMapping("/transportation-offer")
    public ResponseEntity<List<TransportationOffer>> fetchAllTransportationOffers() {
        return ResponseEntity.ok(transportationOfferService.fetchAllTransportationOffers());
    }

    @GetMapping("/transportation-offer/my-offers")
    public ResponseEntity<List<TransportationOffer>> fetchMyOffers() {
        return ResponseEntity.ok(transportationOfferService.findAllByCurrentManager());
    }

    @PostMapping("/transportation-offer")
    public ResponseEntity<TransportationOffer> createTransportationOffer(
            @RequestBody TransportationOffer transportationOffer) {
        return ResponseEntity.ok(transportationOfferService.createTransportationOffer(transportationOffer));
    }

    @PutMapping("/transportation-offer/{id}")
    public ResponseEntity<TransportationOffer> updateTransportationOffer(
            @PathVariable("id") Long id,
            @RequestBody TransportationOffer transportationOffer) {
        return ResponseEntity.ok(transportationOfferService.updateTransportationOffer(transportationOffer));
    }

    @DeleteMapping("/transportation-offer/{id}")
    public ResponseEntity<Boolean> deleteTransportationOffer(@PathVariable("id") Long id) {
        return ResponseEntity.ok(transportationOfferService.deleteTransportationOffer(id));
    }

}

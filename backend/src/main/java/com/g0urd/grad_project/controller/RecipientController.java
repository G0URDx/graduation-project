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

import com.g0urd.grad_project.models.Recipient;
import com.g0urd.grad_project.service.RecipientService.RecipientService;

@CrossOrigin(maxAge = 3360)
@RestController
public class RecipientController {

    @Autowired
    private RecipientService recipientService;

    @GetMapping("/api/v1/recipient")
    public ResponseEntity<List<Recipient>> fetchAllRecipients() {
        return ResponseEntity.ok(recipientService.fetchAllRecipients());
    }

    @PostMapping("/api/v1/recipient")
    public ResponseEntity<Recipient> createRecipient(
            @RequestBody Recipient recipient) {
        return ResponseEntity.ok(recipientService.createRecipient(recipient));
    }

    @PutMapping("/api/v1/recipient/{id}")
    public ResponseEntity<Recipient> updateRecipient(
            @PathVariable("id") Long id,
            @RequestBody Recipient recipient) {
        return ResponseEntity.ok(recipientService.updateRecipient(recipient));
    }

    @DeleteMapping("/api/v1/recipient/{id}")
    public ResponseEntity<Boolean> deleteRecipient(@PathVariable("id") Long id) {
        return ResponseEntity.ok(recipientService.deleteRecipient(id));
    }

}

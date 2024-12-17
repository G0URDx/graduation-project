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

import com.g0urd.grad_project.models.Sender;
import com.g0urd.grad_project.service.SenderService.SenderService;

@CrossOrigin(maxAge = 3360)
@RestController
@RequestMapping("/api/manager")
@PreAuthorize("hasRole('MANAGER')")
public class SenderController {

    @Autowired
    private SenderService senderService;

    @GetMapping("/sender")
    public ResponseEntity<List<Sender>> fetchAllSenders() {
        return ResponseEntity.ok(senderService.fetchAllSenders());
    }

    @PostMapping("/sender")
    public ResponseEntity<Sender> createSender(
            @RequestBody Sender sender) {
        return ResponseEntity.ok(senderService.createSender(sender));
    }

    @PutMapping("/sender/{id}")
    public ResponseEntity<Sender> updateSender(
            @PathVariable("id") Long id,
            @RequestBody Sender sender) {
        return ResponseEntity.ok(senderService.updateSender(sender));
    }

    @DeleteMapping("/sender/{id}")
    public ResponseEntity<Boolean> deleteSender(@PathVariable("id") Long id) {
        return ResponseEntity.ok(senderService.deleteSender(id));
    }

}

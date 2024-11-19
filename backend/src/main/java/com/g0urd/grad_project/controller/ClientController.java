package com.g0urd.grad_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g0urd.grad_project.models.Client;
import com.g0urd.grad_project.service.ClientService.ClientService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(maxAge = 3360)
@RestController
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/api/v1/client")
    public ResponseEntity<List<Client>> fetchAllClients() {
        return ResponseEntity.ok(clientService.fetchAllClients());
    }

    @PostMapping("/api/v1/client")
    public ResponseEntity<Client> createClient(
            @RequestBody Client client) {
        return ResponseEntity.ok(clientService.createClient(client));
    }

    @PutMapping("/api/v1/client/{id}")
    public ResponseEntity<Client> updateClient(
            @PathVariable("id") Long id,
            @RequestBody Client client) {
        return ResponseEntity.ok(clientService.updateClient(client));
    }

    @DeleteMapping("/api/v1/client/{id}")
    public ResponseEntity<Boolean> deleteClient(@PathVariable("id") Long id) {
        return ResponseEntity.ok(clientService.deleteClient(id));
    }

}

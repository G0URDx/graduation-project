package com.g0urd.grad_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g0urd.grad_project.models.Client;
import com.g0urd.grad_project.service.ClientService.ClientService;
import com.g0urd.grad_project.service.CuratorshipService.CuratorshipService;

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
public class ClientController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private CuratorshipService curatorshipService;

    @GetMapping("/client")
    public ResponseEntity<List<Client>> fetchAllClients() {
        return ResponseEntity.ok(clientService.fetchAllClients());
    }

    @PostMapping("/client")
    public ResponseEntity<Client> createClient(
            @RequestBody Client client) {
        return ResponseEntity.ok(clientService.createClient(client));
    }

    @PutMapping("/client/{id}")
    public ResponseEntity<Client> updateClient(
            @PathVariable("id") Long id,
            @RequestBody Client client) {
        return ResponseEntity.ok(clientService.updateClient(client));
    }

    @DeleteMapping("/client/{id}")
    public ResponseEntity<Boolean> deleteClient(@PathVariable("id") Long id) {
        curatorshipService.deleteByClientId(id);
        boolean isDeleted = clientService.deleteClient(id);
        return ResponseEntity.ok(isDeleted);
    }

}

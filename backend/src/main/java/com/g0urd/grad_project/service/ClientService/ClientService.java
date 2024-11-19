package com.g0urd.grad_project.service.ClientService;

import java.util.List;

import com.g0urd.grad_project.models.Client;

public interface ClientService {

    List<Client> fetchAllClients();

    Client findById(Long id);

    Client createClient(Client client);

    Client updateClient(Client client);

    Boolean deleteClient(Long id);

}

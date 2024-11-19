package com.g0urd.grad_project.service.ClientService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g0urd.grad_project.models.Client;
import com.g0urd.grad_project.repository.ClientRepository;

@Service
public class ClientServiceImplementation implements ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public List<Client> fetchAllClients() {
        return (List<Client>) clientRepository.findAll();
    }

    @Override
    public Client findById(Long id) {
        return clientRepository.findById(id).get();
    }

    @Override
    public Client createClient(Client client) {
        return clientRepository.save(client);
    }

    @SuppressWarnings("null")
    @Override
    public Client updateClient(Client client) {
        Client clientObject = clientRepository.findById(client.getId_client()).get();
        if (clientObject != null) {
            clientObject.setName_client(client.getName_client());
            clientObject.setLocation_client(client.getLocation_client());
            clientObject.setWork_number_client(client.getWork_number_client());
            clientObject.setTax_number_client(client.getTax_number_client());
            clientObject.setEmployee_client(client.getEmployee_client());
            clientObject.setDescription_client(client.getDescription_client());
        }
        return clientRepository.save(clientObject);
    }

    @Override
    public Boolean deleteClient(Long id) {
        Client clientObject = clientRepository.findById(id).get();
        if (clientObject != null) {
            clientRepository.delete(clientObject);
            return true;
        }
        return false;
    }

}

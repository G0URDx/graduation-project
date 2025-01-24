package com.g0urd.grad_project.service.CuratorshipService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g0urd.grad_project.models.Client;
import com.g0urd.grad_project.models.Curatorship;
import com.g0urd.grad_project.repository.CuratorshipRepository;

import jakarta.transaction.Transactional;

@Service
public class CuratorshipServiceImplementation implements CuratorshipService {

    @Autowired
    private CuratorshipRepository curatorshipRepository;

    @Override
    public List<Curatorship> fetchAllCuratorships() {
        return (List<Curatorship>) curatorshipRepository.findAll();
    }

    @Override
    public Curatorship findById(Long id) {
        return curatorshipRepository.findById(id).get();
    }

    @Override
    public Curatorship createCuratorship(Curatorship curatorship) {
        return curatorshipRepository.save(curatorship);
    }

    @SuppressWarnings("null")
    @Override
    public Curatorship updateCuratorship(Curatorship curatorship) {
        Curatorship curatorshipObject = curatorshipRepository.findById(curatorship.getId_curatorship()).get();
        if (curatorshipObject != null) {
            curatorshipObject.setNameManager(curatorship.getNameManager());
            curatorshipObject.setClient(curatorship.getClient());
            curatorshipObject.setStatus_curatorship(curatorship.getStatus_curatorship());
        }
        return curatorshipRepository.save(curatorshipObject);
    }

    @Override
    public Boolean deleteCuratorship(Long id) {
        Curatorship curatorshipObject = curatorshipRepository.findById(id).get();
        if (curatorshipObject != null) {
            curatorshipRepository.delete(curatorshipObject);
            return true;
        }
        return false;
    }

    @Transactional
    @Override
    public void deleteByClientId(Long clientId) {
        Client client = new Client();
        client.setId_client(clientId);
        curatorshipRepository.deleteByClient(client);
    }

}

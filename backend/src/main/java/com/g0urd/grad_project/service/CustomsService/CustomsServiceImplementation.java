package com.g0urd.grad_project.service.CustomsService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g0urd.grad_project.models.Customs;
import com.g0urd.grad_project.repository.CustomsRepository;

@Service
public class CustomsServiceImplementation implements CustomsService {

    @Autowired
    private CustomsRepository customsRepository;

    @Override
    public List<Customs> fetchAllCustoms() {
        return (List<Customs>) customsRepository.findAll();
    }

    @Override
    public Customs findById(Long id) {
        return customsRepository.findById(id).get();
    }

    @Override
    public Customs createCustoms(Customs customs) {
        return customsRepository.save(customs);
    }

    @SuppressWarnings("null")
    @Override
    public Customs updateCustoms(Customs customs) {
        Customs customsObject = customsRepository.findById(customs.getId_customs()).get();
        if (customsObject != null) {
            customsObject.setName_customs(customs.getName_customs());
            customsObject.setLocation_customs(customs.getLocation_customs());
        }
        return customsRepository.save(customsObject);
    }

    @Override
    public Boolean deleteCustoms(Long id) {
        Customs customsObject = customsRepository.findById(id).get();
        if (customsObject != null) {
            customsRepository.delete(customsObject);
            return true;
        }
        return false;
    }

}

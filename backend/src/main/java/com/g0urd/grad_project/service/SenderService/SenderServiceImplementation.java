package com.g0urd.grad_project.service.SenderService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g0urd.grad_project.models.Sender;
import com.g0urd.grad_project.repository.SenderRepository;

@Service
public class SenderServiceImplementation implements SenderService {

    @Autowired
    private SenderRepository senderRepository;

    @Override
    public List<Sender> fetchAllSenders() {
        return (List<Sender>) senderRepository.findAll();
    }

    @Override
    public Sender findById(Long id) {
        return senderRepository.findById(id).get();
    }

    @Override
    public Sender createSender(Sender sender) {
        return senderRepository.save(sender);
    }

    @SuppressWarnings("null")
    @Override
    public Sender updateSender(Sender sender) {
        Sender senderObject = senderRepository.findById(sender.getId_sender()).get();
        if (senderObject != null) {
            senderObject.setName_sender(sender.getName_sender());
            senderObject.setLocation_sender(sender.getLocation_sender());
        }
        return senderRepository.save(senderObject);
    }

    @Override
    public Boolean deleteSender(Long id) {
        Sender senderObject = senderRepository.findById(id).get();
        if (senderObject != null) {
            senderRepository.delete(senderObject);
            return true;
        }
        return false;
    }

}

package com.g0urd.grad_project.service.RecipientService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g0urd.grad_project.models.Recipient;
import com.g0urd.grad_project.repository.RecipientRepository;

@Service
public class RecipientServiceImplementation implements RecipientService {

    @Autowired
    private RecipientRepository recipientRepository;

    @Override
    public List<Recipient> fetchAllRecipients() {
        return (List<Recipient>) recipientRepository.findAll();
    }

    @Override
    public Recipient findById(Long id) {
        return recipientRepository.findById(id).get();
    }

    @Override
    public Recipient createRecipient(Recipient recipient) {
        return recipientRepository.save(recipient);
    }

    @SuppressWarnings("null")
    @Override
    public Recipient updateRecipient(Recipient recipient) {
        Recipient recipientObject = recipientRepository.findById(recipient.getId_recipient()).get();
        if (recipientObject != null) {
            recipientObject.setName_recipient(recipient.getName_recipient());
            recipientObject.setLocation_recipient(recipient.getLocation_recipient());
        }
        return recipientRepository.save(recipientObject);
    }

    @Override
    public Boolean deleteRecipient(Long id) {
        Recipient recipientObject = recipientRepository.findById(id).get();
        if (recipientObject != null) {
            recipientRepository.delete(recipientObject);
            return true;
        }
        return false;
    }

}

package com.g0urd.grad_project.service.RecipientService;

import java.util.List;

import com.g0urd.grad_project.models.Recipient;

public interface RecipientService {

    List<Recipient> fetchAllRecipients();

    Recipient findById(Long id);

    Recipient createRecipient(Recipient recipient);

    Recipient updateRecipient(Recipient recipient);

    Boolean deleteRecipient(Long id);

}

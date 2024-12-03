package com.g0urd.grad_project.service.SenderService;

import java.util.List;

import com.g0urd.grad_project.models.Sender;

public interface SenderService {

    List<Sender> fetchAllSenders();

    Sender findById(Long id);

    Sender createSender(Sender sender);

    Sender updateSender(Sender sender);

    Boolean deleteSender(Long id);

}

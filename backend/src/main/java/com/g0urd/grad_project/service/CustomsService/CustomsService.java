package com.g0urd.grad_project.service.CustomsService;

import java.util.List;

import com.g0urd.grad_project.models.Customs;

public interface CustomsService {

    List<Customs> fetchAllCustoms();

    Customs findById(Long id);

    Customs createCustoms(Customs customs);

    Customs updateCustoms(Customs customs);

    Boolean deleteCustoms(Long id);

}
